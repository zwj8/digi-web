<template>
  <section class="checkout-wrap" v-loading="firstLoading">
    <template v-if="checkout.account">
      <div class="order-title">
        <h3 class="order-title__main">{{ $t('combo.checkout.title') }}</h3>
        <h4 class="order-title__sub">{{ $t('combo.checkout.sub_title') }}</h4>
      </div>
      <div class="order-info">
        <div class="order-info__wrap">
          <div class="item">
            <div class="item-label">
              {{ $t('combo.checkout.label_account') }}：
            </div>
            <div class="item-content">{{ checkout.account }}</div>
          </div>
          <div class="item">
            <div class="item-label">
              {{ $t('combo.checkout.label_selected_combo') }}：
            </div>
            <div class="item-content">{{ checkout.comboInfo.name }}</div>
          </div>
          <div class="item">
            <div class="item-label">{{ $t('combo.checkout.label_term') }}：</div>
            <div class="item-content">
              {{ checkout.comboInfo.term }}
              {{ $t('combo.checkout.text_unit_day') }}
            </div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div class="order-info__wrap">
          <div class="item h-50">
            <div class="item-label">
              {{ $t('combo.checkout.label_coupon_code') }}：
            </div>
            <div class="item-content">
              <el-input
                v-model="couponCode"
                type="text"
                :placeholder="$t('combo.checkout.placeholder_coupon_code')"
                @blur="check"
              ></el-input>
            </div>
            <span class="item-tip" v-text="checkout.couponDisableTips" />
          </div>
          <div class="item h-50">
            <div class="item-label">
              {{ $t('combo.checkout.label_pay_type') }}：
            </div>
            <div class="item-content">
              <div class="ignore-pay-type">
                <template v-for="item in checkout.payToolInfoList">
                  <div
                    v-if="item.available"
                    :key="item.paymentChannel"
                    class="ignore-pay-type__item"
                    :class="{ active: item.selected }"
                    @click="selectPayType(item)"
                  >
                    <img :src="item.channelIconUrl" :alt="item.tip" />
                    <span>{{ item.paymentChannel | paymentTypeFilter }}</span>
                    <i class="el-icon-check"></i>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="item-tip">
            {{ $t('combo.checkout.text_01') }}
            <span class="text-primary pointer" @click="handleContact">
              {{ $t('combo.checkout.contact_customer') }}
            </span>
          </div>
        </div>
      </div>
      <div class="order-settle">
        <div class="order-settle__wrap">
          <span
            v-if="checkout.priceInfo && checkout.priceInfo.promotionTips"
            class="promo-tag"
          >
            {{ checkout.priceInfo.promotionTips }}
          </span>
          <div class="price">
            <div class="p_item">
              <div class="p-label">
                {{ $t('combo.checkout.label_discount') }}：
              </div>
              <div class="p-content text-primary">
                {{ promotionLabel }}
              </div>
            </div>
            <div class="p_item">
              <div class="p-label">{{ $t('combo.checkout.label_price') }}：</div>
              <div class="p-content">
                {{ totalAmountLabel }}
              </div>
            </div>
            <div class="p_item">
              <div class="p-label">{{ $t('combo.checkout.label_paid') }}：</div>
              <div class="p-content">
                <span class="true-price">{{ payTotalAmountLabel }}</span>
                <span v-if="hasPromotion" class="false-price">{{
                  checkout.priceInfo.totalAmount.displayWithCur
                }}</span>
              </div>
            </div>
          </div>
          <div class="btn">
            <com-btn type="bg-primary" @click.native="createOrder">
              {{ $t('combo.btn.payment') }}
            </com-btn>
          </div>
        </div>
      </div>
    </template>
    <part-contact-us :show="contactShow" @close="contactShow = false" />
  </section>
</template>
<script>
import PartContactUs from '@/components/part/PartContactUs'
import COMBO from '@/api/combo'
import { mapGetters } from 'vuex'
export default {
  name: 'ComboCheckout',
  components: {
    PartContactUs
  },
  data () {
    return {
      payType: '',
      payData: null,
      itemId: null,
      checkout: {},
      firstLoading: true,
      loading: null,
      payShow: false,
      couponCode: '', // 优惠码
      contactShow: false // 联系我们
    }
  },
  computed: {
    ...mapGetters('global/user', ['uid']),
    // 是否有折扣
    hasPromotion () {
      return this.checkout?.priceInfo?.promotionAmount?.value > 0
    },
    // 折扣
    promotionLabel () {
      let _amount = null
      if (this.checkout?.priceInfo?.promotionAmount?.value > 0) _amount = `- ${this.checkout.priceInfo.promotionAmount.displayWithCur} ${this.checkout.priceInfo.promotionAmount.currency}`
      else _amount = '---'
      return _amount
    },
    // 总价
    totalAmountLabel () {
      if (this.checkout?.priceInfo?.totalAmount?.value) return `${this.checkout.priceInfo.totalAmount.displayWithCur} ${this.checkout.priceInfo.totalAmount.currency}`
      return '---'
    },
    // 实付
    payTotalAmountLabel () {
      if (this.checkout?.priceInfo?.payTotalAmount?.value) return `${this.checkout.priceInfo.payTotalAmount.displayWithCur} ${this.checkout.priceInfo.payTotalAmount.currency}`
      return '---'
    }
  },
  watch: {},
  created () {
    this.itemId = this.$route.query?.itemId
    // 如果 itemId 没有参数，则返回套餐页
    if (!this.itemId) this.$router.push({ name: 'comboList' })
    this.firstCheckout()
  },
  mounted () { },
  methods: {
    /**
     * @description: 选择支付方式
     * @param {*} item 被选支付方式
     * @return {*}
     */
    selectPayType (item) {
      this.payType = item.paymentChannel
      this.check()
    },
    firstCheckout () {
      COMBO.Checkout({ type: 'VIP', itemId: this.itemId }).then(res => {
        this.checkout = res
        this.setData()
      }).catch(e => {
        this.$router.push({ name: 'comboList' })
      }).finally(() => {
        this.firstLoading = false
      })
    },
    check () {
      COMBO.Checkout({
        uid: this.uid,
        paymentChannel: this.payType,
        type: 'VIP',
        itemId: this.itemId,
        couponCode: this.couponCode
      }).then(res => {
        this.checkout = res
        this.setData()
      }).catch(e => {
        this.$router.push({ name: 'comboList' })
      })
    },
    setData () {
      // 设置默认付款方式
      if (this.checkout?.payToolInfoList) {
        this.checkout.payToolInfoList.forEach(v => {
          if (v.selected) this.payType = v.paymentChannel
        })
      }
      // 设置优惠卷码
      this.couponCode = this.checkout.couponCode ? this.checkout.couponCode : ''
    },
    // 创建订单
    createOrder () {
      this.loading = this.$loading()
      // checkout
      COMBO.Checkout({
        type: 'VIP',
        uid: this.uid,
        paymentChannel: this.payType,
        itemId: this.checkout.comboInfo.comboId,
        couponCode: this.couponCode
      }).then(res => {
        this.checkout = res
      }).then(() => {
        const postData = {
          uid: this.uid,
          paymentChannel: this.payType,
          type: 'VIP',
          itemId: this.checkout.comboInfo.comboId
        }
        if (this.checkout.selectedCouponId) {
          postData.selectedCouponId = this.checkout.selectedCouponId
        }
        // 创建订单
        COMBO.CreateOrder(postData).then(res => {
          if (res) {
            // 收银台
            this.cashier(res)
          }
        }).catch(e => {
          this.loading.close()
        })
      })
    },
    // 收银台请求接口
    cashier (sn) {
      COMBO.Cashier(sn).then(res => {
        this.payData = res
        this.payShow = true
        this.loading.close()
        // 设置收银台数据
        this.$store.dispatch(
          'global/cashier/setSource',
          {
            data: this.payData, // 展示数据
            itemId: this.checkout?.comboInfo?.comboId, // 套餐ID
            couponCode: this.couponCode // 优惠卷码
          }
        )
        // 设置收银台支付类型和弹窗
        this.$store.dispatch(
          'global/cashier/set',
          {
            status: this.payShow,
            type: this.payType
          }
        )
      }).catch(e => {
        this.loading.close()
      })
    },
    // 联系客服弹窗
    handleContact () {
      this.contactShow = true
    }
  }
}
</script>
<style  lang="less" scoped>
.checkout-wrap {
  margin: 0 auto;
  min-height: 300px;
  .r-width(1280);
  // width: 1280px;
  background: -webkit-linear-gradient(@bg-color, #fff);
  background: -webkit-gradient(@bg-color, #fff);
  background: -moz-linear-gradient(@bg-color, #fff);
  background: -o-linear-gradient(@bg-color, #fff);
  background: linear-gradient(@bg-color, #fff);
  .r-padding(0, 10);
}
@w: 70%;
@rem_min_w: (400 / @remPx);
@min_w: ~'@{rem_min_w}rem';
// @min_w: 400px;
.public_width {
  width: @w;
  min-width: @min_w;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.order {
  &-title {
    .flex-center;
    .r-padding-top(40);
    .r-padding-bottom(20);
    .r-border-bottom(1, solid, @color-light-gray);
    &__main,
    &__sub {
      text-align: center;
      .r-font-size(24);
    }
    &__sub {
      .r-padding-top(30);
      .r-font-size(21);
    }
  }
  &-info {
    .r-padding(20, 0);
    .r-border-bottom(1, solid, @color-light-gray);
    .flex-center;
    &__wrap {
      // .r-border(1, solid, red);
      .h-50 {
        .r-line-h-height(70);
        // @h: 70px;
        // min-height: @h;
        // line-height: @h;
        .item {
          &-label,
          &-content {
            .r-line-h-height(70);
            // min-height: @h;
            // line-height: @h;
          }
          &-tip {
            .r-padding-left(10);
            color: @color-danger;
            .r-font-size(14);
          }
        }
      }
      .public_width;
      .item {
        // @h: 45px;
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        &-label,
        &-content {
          .r-line-h-height(45);
          // min-height: @h;
          // line-height: @h;
        }
        &-label {
          .p2r(min-width, 100);
          // min-width: 100px;
          width: 30%;
          text-align: right;
          // .r-border(1, solid, green);
        }
        &-content {
          .p2r-calc-reduce(max-width, 70%, 30);
          // max-width: calc(70% - 30px);
          .r-padding-left(30);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .ignore-pay-type {
            .r-padding-top(10);
            display: flex;
            flex-flow: row wrap;
            &__item {
              .r-width-height(180, 45);
              // width: 180px;
              // height: 45px;
              .r-padding(0, 20);
              overflow: hidden;
              .r-margin-bottom(10);
              .r-border(1, solid, @color-light-gray);
              // .r-border-radius(6);
              box-sizing: border-box;
              display: flex;
              flex-flow: row nowrap;
              justify-content: center;
              align-items: center;
              position: relative;
              cursor: pointer;
              .no-select;
              .r-margin-right(10);
              .el-icon-check {
                .r-font-size(16);
                display: none;
                position: absolute;
                .p2r(right, 2);
                .p2r(bottom, 2);
                // right: 2px;
                // bottom: 2px;
              }
              img {
                .r-height(20);
                // height: 20px;
                .r-margin-right(10);
              }
              &.active {
                border-color: @color-primary;
                .el-icon-check {
                  display: inline-block;
                  color: #fff;
                  z-index: 1;
                }
                &::after {
                  // @w: 35px;
                  content: '';
                  position: absolute;
                  .r-width-height(35, 70);
                  // height: calc(@w * 2);
                  // width: @w;
                  background: @color-primary;
                  transform: rotate(45deg);
                  .p2r(right, -10);
                  .p2r(bottom, -35);
                  // right: -10px;
                  // bottom: -35px;
                }
              }

              // 禁用样式
              &.disabled {
                // 整个元素灰度
                filter: grayscale(1);
                // 不可点击的样式
                cursor: not-allowed;
                // 不可点击
                pointer-events: none;
              }
            }
          }
        }
      }
      // 额外加上的支付tip，只能打个补丁
      .item-tip {
        .r-font-size(14);
        .p2r-calc-add(padding-left, 30%, 30);
        // padding-left: calc(30% + 30px);
      }
    }
  }
  &-settle {
    .flex-center;
    &__wrap {
      // .r-border(1, solid, orange);
      .public_width;
      display: flex;
      align-items: flex-end;
      flex-flow: column;
      .promo-tag {
        .r-margin-top(10);
        .r-font-size(14);
        font-weight: 400;
        .r-border(1, solid, @color-primary);
        .r-border-radius(14);
        .r-padding(0, 10);
        color: @color-primary;
        background: @color-light-primary;
      }
      .price {
        .r-padding-top(10);
        width: 35%;
        .p2r(min-width, 100);
        // min-width: @min_w;
        // .r-border(1, solid, blue);
        display: flex;
        flex-flow: column;
        .p_item {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          .r-line-h-height(30);
          // @h: 30px;
          // height: @h;
          // line-height: @h;
          .r-font-size(14);
          .p-label {
            .p2r(min-width, 50);
            // min-width: 50px;
          }
          .p-content {
            text-align: right;
            .true-price {
              .r-font-size(24);
              color: @color-primary;
            }
            .false-price {
              color: @color-light-gray;
              // 删除线样式
              text-decoration: line-through;
            }
          }
        }
      }
      .btn {
        .r-margin-top(10);
        .r-margin-bottom(50);
      }
    }
  }
}
</style>
