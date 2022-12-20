<template>
  <section>
    <com-modal
      :value="visibility"
      :loading="loading"
      width="1000px"
      @close="handleClose"
    >
      <template #title>
        <h2 class="h2">课程订单信息</h2>
      </template>
      <div class="order-wrapper">
        <div class="order-info">
          <div class="order-info__wrap">
            <div class="item">
              <div class="item-label">
                订单账号：
              </div>
              <div class="item-content">{{ actName }}</div>
            </div>
            <div class="item">
              <div class="item-label">
                已选课程套餐：
              </div>
              <div class="item-content">{{ courseName }}</div>
            </div>
            <div class="item">
              <div class="item-label">价格：</div>
              <div class="item-content">
                {{ actPrice }}
              </div>
            </div>
          </div>
        </div>
        <div class="order-info">
          <div class="order-info__wrap">
            <div class="item h-50">
              <div class="item-label">
                优惠码：
              </div>
              <div class="item-content">
                <el-input
                  v-model="couponCode"
                  type="text"
                  placeholder="请输入优惠码"
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
                  <template v-for="(item, index) in checkout.payToolInfoList">
                    <div
                      v-if="item.available"
                      :key="item.paymentChannel"
                      class="ignore-pay-type__item"
                      :class="{ active: item.selected }"
                      @click="selectPayType(index)"
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
            <div class="price" v-if="checkout.priceInfo">
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
      </div>
    </com-modal>

    <!-- 联系我们 -->
    <part-contact-us :show="contactShow" @close="contactShow = false" />
  </section>
</template>
<script>
import PartContactUs from '@/components/part/PartContactUs'
import COMBO from '@/api/combo'
import { mapGetters } from 'vuex'
export default {
  name: 'PartPayment',
  mixins: [],
  components: {
    PartContactUs
  },
  filters: {},
  props: {
    visibility: { type: Boolean, default: false },
    // 课程ID
    courseId: { type: Number, default: 0 }
  },
  data () {
    return {
      loading: false,
      contactShow: false,
      modalVisible: false,
      couponCode: '', // 优惠码
      payType: '', // 支付类型
      payData: null, // 支付数据
      payShow: false,
      checkout: {}
    }
  },
  computed: {
    ...mapGetters('global/user', ['uid']),
    // 课程名
    courseName () {
      return this.checkout?.courseInfo?.subject || ''
    },
    // 下单账号
    actName () {
      return this.checkout?.account || ''
    },
    // 课程价格
    actPrice () {
      const _amount = this.checkout?.priceInfo?.payTotalAmount?.display
      if (_amount) return `${_amount} ${this.checkout?.priceInfo?.payTotalAmount?.currency}`
      return ''
    },
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
  watch: {
    visibility (val) {
      if (val) {
        this.firstCheckout()
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 选择支付方式
     * @param {*} index 被选支付的索引
     * @return {*}
     */
    selectPayType (index) {
      this.checkout.payToolInfoList = this.checkout.payToolInfoList.map(v => {
        v.selected = false
        return v
      })
      const tmp = this.checkout.payToolInfoList[index]
      tmp.selected = true
      this.payType = tmp.paymentChannel
      this.$set(this.checkout.payToolInfoList, index, tmp)
    },
    firstCheckout () {
      this.loading = true
      COMBO.Checkout({
        type: 'COURSE',
        itemId: this.courseId
      }).then(res => {
        this.checkout = res
        // 设置默认支付方式
        if (this.payType === '') {
          const _payHit = this.checkout?.payToolInfoList.find(v => v.selected)
          if (_payHit) this.payType = _payHit.paymentChannel
        }
      }).catch(e => { console.log(e) }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @description: checkout
     * @return {*}
     */
    check () {
      COMBO.Checkout({
        type: 'COURSE',
        paymentChannel: this.payType,
        itemId: this.courseId,
        couponCode: this.couponCode
      }).then(res => {
        this.checkout = res
      }).catch(e => { console.log(e) })
    },
    // 联系客服弹窗
    handleContact () {
      this.contactShow = true
    },
    handleClose () {
      this.$emit('close', false)
    },
    /**
     * @description: 创建订单
     * @return {*}
     */
    createOrder () {
      this.loading = true
      // checkout
      COMBO.Checkout({
        type: 'COURSE',
        uid: this.uid,
        paymentChannel: this.payType,
        itemId: this.checkout.courseInfo.id,
        couponCode: this.couponCode
      }).then(res => {
        this.checkout = res
      }).then(() => {
        const postData = {
          uid: this.uid,
          paymentChannel: this.payType,
          type: 'COURSE',
          itemId: this.checkout.courseInfo.id
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
          this.loading = false
        })
      })
    },
    // 收银台请求接口
    cashier (sn) {
      COMBO.Cashier(sn).then(res => {
        this.payData = res
        this.payShow = true
        this.loading = false
        // 设置收银台数据
        this.$store.dispatch(
          'global/cashier/setSource',
          {
            data: this.payData, // 展示数据
            itemId: this.checkout?.courseInfo?.id, // 课程 ID
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
        console.log(e)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style  lang="less" scoped>
.order-wrapper {
  .r-width(900);
  margin: 0 auto;
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
        width: 50%;
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
      }
    }
  }
}
</style>
