<template>
  <com-modal :value="show" height="650px" @close="close">
    <template #title>
      <h1 class="h1">{{ $t('distr_apply.label_charge_type') }}</h1>
    </template>
    <el-form ref="form" :model="form">
      <!-- 收款方式 -->
      <div class="payment-box">
        <div class="payment-box_type-select">
          <div class="payment_type-select">
            <div
              v-for="(type, typeIndex) in paymentType"
              :key="type.title"
              class="payment_type-select__item"
            >
              <span class="type" v-text="$t(type.title)" />
              <div
                v-for="(item, itemIndex) in type.option"
                :key="item.type"
                class="select-item"
                :class="{ active: item.active }"
                @click="handleSelectPay(item.type, typeIndex, itemIndex)"
              >
                <div class="img">
                  <el-image v-if="item.img" :style="item.hw" :src="item.img" />
                </div>
                <span v-text="$t(item.label)"></span>
                <i class="el-icon-check"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 填写信息 -->
        <div class="payment-box_item">
          <div v-if="form.wdAccountType === 'CARD'" class="pay-form-item">
            <!-- 姓名 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.card.name')"
              prop="option.wdAccountContact"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :placeholder="$t('distr_apply.placeholder.card.name')"
              ></el-input>
            </el-form-item>
            <!-- 卡号 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.card.card_number')"
              prop="wdAccount"
              :rules="commonRules"
            >
              <el-input
                v-model="form.wdAccount"
                :placeholder="$t('distr_apply.placeholder.card.card_number')"
              ></el-input>
            </el-form-item>
            <!-- 开户行 -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.card.card_bank')"
              prop="option.wdCardBank"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdCardBank"
                :placeholder="$t('distr_apply.placeholder.card.card_bank')"
              ></el-input>
            </el-form-item>
          </div>
          <div
            v-else-if="form.wdAccountType === 'WECHATPAY'"
            class="pay-form-item"
          >
            <!-- 微信收款账号 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.wechat.account')"
              prop="wdAccount"
              :rules="commonRules"
            >
              <el-input
                v-model="form.wdAccount"
                :placeholder="$t('distr_apply.placeholder.wechat.account')"
              ></el-input>
            </el-form-item>
            <!-- 微信所有人全名 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.wechat.account_contact')"
              prop="option.wdAccountContact"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :placeholder="
                  $t('distr_apply.placeholder.wechat.account_contact')
                "
              ></el-input>
            </el-form-item>
          </div>
          <div
            v-else-if="form.wdAccountType === 'ALIPAY'"
            class="pay-form-item"
          >
            <!-- 支付宝账号 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.alipay.account')"
              prop="wdAccount"
              :rules="commonRules"
            >
              <el-input
                v-model="form.wdAccount"
                :placeholder="$t('distr_apply.placeholder.alipay.account')"
              ></el-input>
            </el-form-item>
            <!-- 账号所有人全名 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.alipay.account_contact')"
              prop="option.wdAccountContact"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :placeholder="
                  $t('distr_apply.placeholder.alipay.account_contact')
                "
              ></el-input>
            </el-form-item>
          </div>
          <div
            v-else-if="form.wdAccountType === 'AIRWALLEX'"
            class="pay-form-item"
          >
            <!-- Account Name -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.account_name')"
              prop="wdAccount"
              :rules="commonRules"
            >
              <el-input
                v-model="form.wdAccount"
                :placeholder="$t('distr_apply.placeholder.air.account_name')"
              ></el-input>
            </el-form-item>
            <!-- Bank Account Number -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.account_number')"
              prop="option.wdBankNumber"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdBankNumber"
                :placeholder="$t('distr_apply.placeholder.air.account_number')"
              ></el-input>
            </el-form-item>
            <!-- Bank Code -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.bank_code')"
              prop="option.wdBankCode"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdBankCode"
                :placeholder="$t('distr_apply.placeholder.air.bank_code')"
              ></el-input>
            </el-form-item>
            <!-- Branch Code -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.branch_code')"
              prop="option.wdBranchCode"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdBranchCode"
                :placeholder="$t('distr_apply.placeholder.air.branch_code')"
              ></el-input>
            </el-form-item>
            <!-- SWITF Code -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.switf_code')"
              prop="option.wdSwiftCode"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdSwiftCode"
                :placeholder="$t('distr_apply.placeholder.air.switf_code')"
              ></el-input>
            </el-form-item>
            <!-- Account Location -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.account_location')"
              prop="option.wdAccountLocation"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdAccountLocation"
                :placeholder="
                  $t('distr_apply.placeholder.air.account_location')
                "
              ></el-input>
            </el-form-item>
            <!-- Bank Name -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.bank_name')"
              prop="option.wdBankName"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdBankName"
                :placeholder="$t('distr_apply.placeholder.air.bank_name')"
              ></el-input>
            </el-form-item>
            <!-- Bank Address -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.bank_address')"
              prop="option.wdBankAddr"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdBankAddr"
                :placeholder="$t('distr_apply.placeholder.air.bank_address')"
              ></el-input>
            </el-form-item>
            <!-- City -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.city')"
              prop="option.wdAwxCity"
              :rules="commonRules"
            >
              <el-input
                v-model="form.option.wdAwxCity"
                :placeholder="$t('distr_apply.placeholder.air.city')"
              ></el-input>
            </el-form-item>
          </div>
          <div
            v-else-if="form.wdAccountType === 'PAYONEER'"
            class="pay-form-item"
          >
            <!-- 账户名（邮箱） -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.payoneer.account')"
              prop="wdAccount"
              :rules="commonRules"
            >
              <el-input
                v-model="form.wdAccount"
                :placeholder="$t('distr_apply.placeholder.payoneer.account')"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="btn-wrap">
      <div class="item">
        <com-btn @click.native="submit">{{ $t('distr_apply.btn.confirm') }}</com-btn>
        <com-btn @click.native="cancel">{{ $t('distr_apply.btn.cancel') }}</com-btn>
      </div>
    </div>
  </com-modal>
</template>
<script>
import { PAYMENT_MODE } from '@/constants/config'
import DISTR from '@/api/distr'
const formSource = {
  wdAccountType: 'CARD', // 收款账号类型
  wdAccount: '', // 收款账号
  option: {}
}
export default {
  name: 'PartPayAccount',
  components: {},
  filters: {},
  props: {
    show: { type: Boolean, default: false }
  },
  data () {
    return {
      commonRules: {
        required: true,
        message: this.$t('distr_apply.valid.required'),
        trigger: 'blur'
      },
      duid: null,
      form: { ...formSource },
      paymentType: JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType))
      // rules: {
      //   wdAccount: [{ required: true, message: this.$t('distr_apply.valid.required'), trigger: 'blur' }]
      // }
    }
  },
  computed: {},
  watch: {
    show (newValue) {
      if (newValue) {
        this.getDistrInfo()
      }
    }
  },
  created () { },
  mounted () {
    this.paymentTypeInit()
  },
  methods: {
    close () {
      this.$emit('close')
    },
    // 支付方式初始化
    paymentTypeInit () {
      this.paymentType[0].option[0].active = true
      this.form.option = { ...PAYMENT_MODE.CardForm }
    },
    // 获取分销商自身信息
    getDistrInfo () {
      DISTR.GetInfo().then(res => {
        // 顺便更新一波vuex
        this.$store.dispatch('global/distr/set', res)
        this.duid = res.duid
        this.option = res.ext || {}
        // 是否有默认的收款类型
        let curIndex = 0
        let payIndex = 0
        PAYMENT_MODE.paymentType.forEach((item, index) => {
          const _pIndex = item.option.findIndex(p => p.type === res?.wdAccountType)
          if (_pIndex !== -1) {
            curIndex = index
            payIndex = _pIndex
          }
        })

        // 如果找不到支付方式，则默认为银行卡
        if (curIndex === 0 && payIndex === 0) this.form.wdAccountType = 'CARD'

        // 初始化支付方式
        this.handleSelectPay(this.form.wdAccountType, curIndex, payIndex, res.wdAccount)
      })
    },
    /**
     * @description: 选择支付方式
     * @param {*} type      支付方式
     * @param {*} typeIndex 支付货币索引 人民币/美元
     * @param {*} itemIndex 支付方式索引
     * @param {*} account   支付账号
     * @return {*}
     */
    handleSelectPay (type, typeIndex, itemIndex, account = '') {
      this.paymentType = JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType))

      this.paymentType[typeIndex].option[itemIndex].active = true
      this.$set(this.paymentType, typeIndex, this.paymentType[typeIndex])
      // 切换时，清空账号值
      this.form.wdAccount = account
      this.form.wdAccountType = type
      // 选择支付方式后，给form插入必须的值
      switch (type) {
        case 'CARD':
          this.form.option = { ...PAYMENT_MODE.CardForm }
          break
        case 'WECHATPAY':
          this.form.option = { ...PAYMENT_MODE.WeChatForm }
          break
        case 'ALIPAY':
          this.form.option = { ...PAYMENT_MODE.AlipayForm }
          break
        case 'AIRWALLEX':
          this.form.option = { ...PAYMENT_MODE.AirForm }
          break
        case 'PAYONEER':
          this.form.option = { ...PAYMENT_MODE.PayoneerForm }
          break
      }
    },
    /**
     * @description: 提交表单
     * @return {*}
     */
    submit () {
      this.$refs.form.validate(async (vaild) => {
        if (vaild) {
          const postData = {
            duid: this.duid,
            wdAccount: this.form.wdAccount,
            wdAccountType: this.form.wdAccountType,
            ...this.form.option
          }
          const loading = this.$loading()
          await DISTR.EditInfo(postData).then(res => {
            this.$message({
              type: 'success',
              message: this.$t('distr_apply.msg.change_success'),
              duration: 1500
            })
            loading.close()
            this.close()
          }).catch(e => {
            loading.close()
          })
        }
      })
    },
    /**
     * @description: 取消 / 重置申请信息
     */
    cancel () {
      this.form = {
        ...formSource
      }
      this.paymentTypeInit()
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.pay.type.less';
.payment-box {
  .r-width(1080);
  .r-height(400);
}
.payment_type-select__item:first-child {
  .type {
    padding-left: 0;
  }
}
.btn-wrap {
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  margin-top: 30px;
  .item {
    margin-bottom: 16px;
    .policy {
      font-size: 14px;
      color: @color-primary;
      .pointer;
    }
    .btn-primary:first-child {
      margin-right: 30px;
    }
  }
}
</style>
