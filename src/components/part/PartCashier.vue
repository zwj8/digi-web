<template>
  <div v-if="show" class="ignore-wechat-pay-bg">
    <div class="ignore-wechat-pay-wrap">
      <header>
        <span class="pay-type">
          <img :src="payTypeObject.imgSrc" alt="" />
          {{ $t(payTypeObject.typeText) }}
        </span>
        <span class="cashier">{{ $t('combo.cashier.text_cashier') }}</span>
        <!-- <i class="el-icon-close" @click="close"></i> -->
      </header>
      <section>
        <!-- 微信二维码支付 -->
        <div v-if="compData && compData.qrCodeUrl" class="qr-code-wrap">
          <span class="tip">{{ timeLiftText }}</span>
          <div class="qr-code">
            <vue-qr
              :style="`width: ${qrCodeHW}; height: ${qrCodeHW};`"
              :text="compData && compData.qrCodeUrl"
              :margin="25"
            />
            <div
              v-show="timeoutShow"
              class="qr-code__timeout_bg"
              @click="refreshQrCode"
            >
              <i class="el-icon-refresh-right"></i>
            </div>
          </div>
          <span class="tip text-center">{{
            $t('combo.cashier.text_richscan') | plh([payTypeText])
          }}</span>
        </div>
        <!-- 支付宝body支付 -->
        <div v-else-if="compData && compData.body" class="wait-pay-wrap">
          <iframe
            name="payment"
            :height="qrCodeHW"
            :width="qrCodeHW"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
        <!-- 支付宝新页面支付 -->
        <div v-else class="wait-pay-new-page">
          <!-- 支付流程 -->
          <div class="pay-process">
            <div class="pay-process__item completed">
              <i class="el-icon-s-order"></i>
              <span>{{ $t('combo.cashier.text_create_order') }}</span>
            </div>
            <div class="process-icon">
              <i class="el-icon-more"></i>
              <i class="el-icon-circle-check"></i>
              <i class="el-icon-more"></i>
            </div>
            <div class="pay-process__item active">
              <i class="el-icon-time"></i>
              <span>{{ $t('combo.cashier.text_wait_pay') }}</span>
            </div>
            <div class="process-icon">
              <i class="el-icon-more"></i>
              <i
                :class="
                  timeoutShow ? 'el-icon-circle-check' : 'el-icon-loading'
                "
              ></i>
              <i
                :class="timeoutShow ? 'el-icon-more' : 'el-icon-more-outline'"
              ></i>
            </div>
            <div class="pay-process__item" :class="{ active: timeoutShow }">
              <i
                :class="timeoutShow ? 'el-icon-s-release' : 'el-icon-s-claim'"
              ></i>
              <span>{{
                timeoutShow
                  ? timeLiftText
                  : $t('combo.cashier.text_pay_confirm')
              }}</span>
            </div>
          </div>
          <span class="tip">{{ timeLiftText }}</span>
          <p class="link">
            {{$t('combo.cashier.text_link')}}
            <a :href="compData.redirectUrl" target="_blank">{{$t('combo.cashier.text_a_title')}}</a>
          </p>
        </div>
        <div class="pay-info-wrap">
          <span class="pay_title">{{ $t('combo.cashier.label_amount') }}</span>
          <span class="price">{{
            compData && compData.payAmount.displayWithCur
          }}</span>
          <div class="order-info">
            <span>{{ $t('combo.cashier.label_order') }}</span
            ><span>{{ compData && compData.orderSn }}</span>
          </div>
          <div class="order-info">
            <span>{{ $t('combo.cashier.label_paid_order') }}</span
            ><span>{{ compData && compData.paymentSn }}</span>
          </div>
          <div class="order-btn">
            <!-- 重新下单 -->
            <com-btn
              v-if="timeoutShow"
              size="mini"
              type="bg-primary"
              @click.native="recreateOrder"
            >
              {{ $t('combo.cashier.btn.recreate_order') }}
            </com-btn>
            <!-- 取消订单 -->
            <com-btn
              v-else
              size="mini"
              type="primary"
              @click.native="closeOrder"
              >{{ $t('combo.cashier.btn.cancel_order') }}</com-btn
            >
          </div>
        </div>
      </section>
    </div>
    <div id="payment-for-iframe"></div>
  </div>
</template>
<script>
import COMBO from '@/api/combo'
import VueQr from 'vue-qr'
import { PAY_STATE, REM_PX } from '@/constants'
import { replacePLH } from '@/libs/util.i18n'
import { mapGetters } from 'vuex'
export default {
  name: 'PartCashier',
  props: {},
  components: {
    VueQr
  },
  filters: {
    plh (value, replaceArr) {
      return replacePLH(value, replaceArr)
    }
  },
  data () {
    return {
      timer: null,
      timeoutTimer: null,
      timeLiftText: '',
      compData: null,
      timeoutShow: false,
      sn: null,
      loading: null
    }
  },
  computed: {
    // 二维码尺寸
    qrCodeHW () {
      return `${280 / REM_PX}rem`
    },
    ...mapGetters('global/user', ['uid']),
    ...mapGetters('global/cashier', ['show', 'payType', 'data', 'itemId', 'couponCode']),
    payTypeText () {
      let typeText = ''
      switch (this.payType) {
        case 'WECHATPAY':
          typeText = this.$t('combo.cashier.platform.wechat')
          break
        case 'ALIPAY':
        case 'AWX_ALIPAY':
          typeText = this.$t('combo.cashier.platform.alipay')
          break
        case 'PAYPAL':
          typeText = this.$t('combo.cashier.platform.paypal')
          break
      }
      return typeText
    },
    payTypeObject () {
      let typeText = {}
      switch (this.payType) {
        case 'WECHATPAY':
          typeText = {
            imgSrc: `${this.OSS_PREFIX}pay-tool/wechatpay.png`,
            typeText: 'combo.cashier.payment_type.wechat'
          }
          break
        case 'ALIPAY':
        case 'AWX_ALIPAY':
          typeText = {
            imgSrc: `${this.OSS_PREFIX}pay-tool/alipay.png`,
            typeText: 'combo.cashier.payment_type.alipay'
          }
          break
        case 'PAYPAL':
          typeText = {
            imgSrc: null,
            typeText: 'combo.cashier.payment_type.paypal'
          }
          break
      }
      return typeText
    }
  },
  watch: {
    show (newValue) {
      if (newValue && this.data.orderSn) {
        this.compData = JSON.parse(JSON.stringify(this.data))
        this.start()
      } else {
        this.clearTimer()
        this.timeoutShow = false
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    start () {
      this.timeout()
      // body模式
      this.bodyModel()
      // AWX 支付宝模式
      this.awxModel()
      // 获取支付结果
      this.countdown()
    },
    // 支付宝body模式
    bodyModel () {
      if (this.compData && this.compData.body) {
        this.$nextTick(() => {
          const createBox = document.createElement('div')
          const pyBox = document.querySelector('#payment-for-iframe')
          pyBox.innerHTML = ''
          createBox.innerHTML = this.compData.body
          pyBox.appendChild(createBox)
          const fr = document.querySelector('form[name=punchout_form]')
          fr.setAttribute('target', 'payment')
          fr.submit()
        })
      }
    },
    // 支付宝 AWX 模式
    awxModel () {
      if (this.compData && this.compData.redirectUrl) {
        this.$nextTick(() => {
          // 模拟点击打开新页面
          // 创建一个a标签
          const aNode = document.createElement('a')
          // 赋予属性
          aNode.setAttribute('href', this.compData.redirectUrl)
          aNode.setAttribute('target', '_blank')
          aNode.setAttribute('id', 'awxpay')
          const aWrap = document.querySelector('.ignore-wechat-pay-bg')
          aWrap.appendChild(aNode)
          const aBtn = document.getElementById('awxpay')
          // 点击a标签
          aBtn.click()
          // 移除a标签
          aNode.remove()
        })
      }
    },
    // 倒计时
    countdown () {
      this.timer = setInterval(() => {
        const sn = this.sn || this.data.orderSn
        COMBO.GetPaymentState(sn).then(res => {
          // 如果状态不等于待支付，执行操作
          if (res.state !== PAY_STATE.created) {
            this.clearTimer()
            this.$message({
              type: res.state === PAY_STATE.confirm ? 'success' : 'error',
              message: res.tips
            })
            switch (res.state) {
              // 已支付
              case PAY_STATE.confirm:
                this.close()
                this.$router.push({
                  name: 'personalDetail',
                  query: {
                    tab: 'order'
                  }
                })
                break
              // 支付失败
              case PAY_STATE.failed:
                this.timeoutShow = true
                this.timeLiftText = res.tip || this.$t('combo.cashier.msg.paid_failed')
                break
              // 交易已关闭
              case PAY_STATE.close:
                this.timeoutShow = true
                this.timeLiftText = res.tip || this.$t('combo.cashier.msg.order_close')
                break
              // 已退款
              case PAY_STATE.refund:
                this.timeoutShow = true
                this.timeLiftText = res.tip || this.$t('combo.cashier.msg.user_refund')
                break
            }
          }
        })
      }, 3000)
      // 二维码过期倒计时
      this.timeoutTimer = setInterval(() => {
        this.timeout()
      }, 1000)
    },
    close () {
      this.timeoutShow = true
      this.$store.dispatch('global/cashier/close')
    },
    timeout () {
      const timeLift = Math.ceil((parseInt(this.data.expireAt) - new Date().getTime()) / 1000)
      if (timeLift < 0) {
        this.timeLiftText = this.$t('combo.cashier.text_qr_code_expired')
        this.timeoutShow = true
        this.clearTimer()
        return
      }
      let seconds = timeLift >= 60 ? timeLift % 60 : timeLift
      let minute = timeLift >= 60 ? (timeLift - seconds) / 60 : 0
      seconds = (seconds + '').length > 1 ? seconds : `0${seconds}`
      minute = (minute + '').length > 1 ? minute : `0${minute}`
      const timeLiftStr = `${minute} ${this.$t('combo.cashier.unit.min')} ${seconds} ${this.$t('combo.cashier.unit.sec')}`
      this.timeLiftText = replacePLH(this.$t('combo.cashier.text_countdown'), [timeLiftStr])
    },
    // 刷新二维码
    refreshQrCode () {
      this.$confirm(
        this.$t('combo.cashier.msg.if_recreate_order'),
        this.$t('combo.cashier.title_tip'),
        {
          confirmButtonText: this.$t('combo.btn.confirm'),
          cancelButtonText: this.$t('combo.btn.cancel')
        }
      ).then(() => {
        // 重新下单
        this.recreateOrder()
      }).catch(() => {
        // 取消操作
        this.$message({
          type: 'info',
          message: this.$t('combo.cashier.msg.cancel_action'),
          duration: 1000
        })
      })
    },
    // 重新下单
    recreateOrder () {
      this.loading = this.$loading()
      // checkout
      COMBO.Checkout({
        uid: this.uid,
        paymentChannel: this.payType,
        itemId: this.itemId,
        couponCode: this.couponCode
      }).then(res => {
        return res
      }).then(checkout => {
        const postData = {
          uid: this.uid,
          paymentChannel: this.payType,
          itemId: this.itemId
        }
        if (checkout.selectedCouponId) {
          postData.selectedCouponId = checkout.selectedCouponId
        }
        // 创建订单
        COMBO.CreateOrder(postData).then(sn => {
          if (sn) {
            this.sn = sn
            // 收银台
            COMBO.Cashier(this.sn).then(cashierRes => {
              this.timeoutShow = false
              this.compData = cashierRes
              this.start()
              this.loading.close()
            })
          }
        }).catch(e => {
          this.loading.close()
        })
      })
    },
    // 取消订单
    closeOrder () {
      const sn = this.sn || this.data.orderSn
      COMBO.CloseOrder(sn).then(res => {
        this.clearTimer()
        this.sn = null
        this.timeLiftText = this.$t('combo.cashier.msg.user_close_order')
        this.$message({
          type: 'warning',
          message: this.$t('combo.cashier.msg.user_close_order'),
          duration: 1000
        })
        this.close()
      })
    },
    clearTimer () {
      clearInterval(this.timer)
      clearInterval(this.timeoutTimer)
    }
  }
}
</script>
<style  lang="less" scoped>
.ignore-wechat-pay {
  &-bg {
    .r-font-size(14);
    // font-size: 14px;
    .popup-pulic;
  }
  &-wrap {
    // height: 500px;
    .r-width(850);
    // width: 850px;
    background: #fff;
    .r-border-radius(3);
    // border-radius: 3px;
    .r-padding(30);
    // padding: 30px;
    position: relative;
    box-sizing: border-box;
    header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      .r-height(30);
      // height: 30px;
      .el-icon-close {
        .r-font-size(20);
        // font-size: 20px;
        cursor: pointer;
        position: absolute;
        .p2r(right, 10);
        .p2r(top, 10);
        // right: 10px;
        // top: 10px;
      }
      .pay-type {
        display: flex;
        .r-height(20);
        // height: 20px;
        align-items: center;
        border-right: 1px solid @color-light-gray;
        .r-margin-right(10);
        // margin-right: 10px;
        .r-padding-right(10);
        // padding-right: 10px;
        img {
          .r-height(18);
          // height: 18px;
          .r-margin-right(10);
          // margin-right: 10px;
        }
      }
      .cashier {
        font-weight: bold;
      }
    }
    section {
      display: flex;
      justify-content: space-around;
      flex-flow: row nowrap;
      .pay-info-wrap,
      .wait-pay-wrap,
      .qr-code-wrap {
        .r-padding(50);
        // padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        align-items: center;
      }
      .after-public {
        @rem: (250 / @remPx);
        @rem_h: ~'@{rem}rem';
        // @h: 250px;
        content: '';
        position: absolute;
        height: @rem_h;
        border-right: 1px solid @color-light-gray;
        right: 0;
        top: calc(50% - @rem_h / 2);
      }
      // 微信二维码支付
      .qr-code-wrap {
        position: relative;
        .tip {
          .p2r(min-width, 400);
          // min-width: 400px;
          text-align: left;
        }
        .qr-code {
          position: relative;
          &__timeout_bg {
            .r-width-height(245);
            // height: 245px;
            // width: 245px;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            .p2r(top, 17);
            .p2r(left, 17);
            // top: 17px;
            // left: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            .pointer;
            i {
              .r-font-size(100);
              // font-size: 100px;
              // font-weight: bold;
              color: @color-light-gray;
            }
          }
        }
        &::after {
          .after-public;
        }
      }
      // 支付宝body支付
      .wait-pay-wrap {
        position: relative;
        .r-padding(50);
        // padding: 50px;
        .payment-iframe {
          .r-width-height(240);
          // @iframe-hw: 240px;
          // height: @iframe-hw;
          // width: @iframe-hw;
        }
        span {
          .r-margin-bottom(20);
          // margin-bottom: 20px;
        }
        .el-icon-loading {
          .r-font-size(20);
          // font-size: 20px;
          color: @color-gray;
          .r-margin-right(5);
          // margin-right: 5px;
        }
        &::after {
          .after-public;
        }
      }
      // 支付宝新页面支付
      .wait-pay-new-page {
        position: relative;
        .r-padding-right(50);
        // padding-right: 50px;
        .flex-cc;
        flex-flow: column;
        // icon大小
        .wait-icon {
          .r-font-size(100);
          // font-size: 100px;
          color: @color-primary;
          .r-margin-bottom(20);
          // margin-bottom: 20px;
        }
        // 支付流程
        .pay-process {
          .r-margin-bottom(30);
          // margin-bottom: 30px;
          .flex-sbc;
          // 支付流程连结样式
          .process-icon {
            color: @color-primary;
            .r-line-height(20);
            // line-height: 20px;
            .r-font-size(20);
            // font-size: 20px;
          }
          // 流程节点样式
          &__item {
            color: @color-light-gray;
            .r-padding(0, 10);
            // padding: 0 10px;
            .flex-cc;
            flex-flow: column;
            i {
              .r-font-size(60);
              // font-size: 60px;
            }
            &.completed {
              color: @color-primary;
              i {
                color: @color-primary;
              }
            }
            &.active {
              color: @color-primary;
              i {
                color: @color-primary;
              }
            }
          }
        }
        &::after {
          .after-public;
        }
        .tip {
          color: @color-gray;
        }
        .link {
          color: @color-gray;
          .r-margin-top(10);
          a {
            color: @color-primary;
          }
        }
      }
      .pay-info-wrap {
        align-items: flex-start;
        .price {
          .r-font-size(45);
          // font-size: 45px;
          font-weight: bold;
          .r-padding(40, 0);
          // padding: 40px 0;
          white-space: nowrap;
        }
        .order-info {
          .r-margin-bottom(20);
          // margin-bottom: 20px;
          display: flex;
          flex-flow: row nowrap;
          white-space: nowrap;
          span:first-child {
            display: inline-block;
            .r-width(80);
            // width: 80px;
            color: @color-gray;
          }
        }
        .order-btn {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
