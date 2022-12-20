<template>
  <section>
    <el-card class="form-card">
      <el-form
        ref="form"
        label-position="top"
        label-width="80px"
        :model="form"
        :rules="rules"
      >
        <!-- 企业信息 -->
        <span class="form-title">{{ $t('distr_apply.label_business_info') }}</span><i></i>
        <!-- 企业名称 -->
        <el-form-item :label="$t('distr_apply.form.business_name')" prop="business">
          <el-input
            v-model="form.business"
            :placeholder="$t('distr_apply.placeholder.business_name')"
          ></el-input>
        </el-form-item>
        <!-- 网站（选填） -->
        <el-form-item :label="$t('distr_apply.form.site')" prop="site">
          <el-input v-model="form.site" :placeholder="$t('distr_apply.placeholder.site')"></el-input>
        </el-form-item>
        <!-- 联系地址 -->
        <span class="form-title">{{ $t('distr_apply.label_address') }}</span><i></i>
        <!-- 联系人 -->
        <el-form-item :label="$t('distr_apply.form.name')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('distr_apply.placeholder.name')"
          ></el-input>
        </el-form-item>
        <!-- 业务邮箱 -->
        <el-form-item :label="$t('distr_apply.form.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('distr_apply.placeholder.email')"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item class="phone-select-fix" :label="$t('distr_apply.form.phone')" prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('distr_apply.placeholder.phone')">
            <el-select slot="prepend" v-model="form.areaCode" class="phone-code-select">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!-- 国家/地区 -->
        <el-form-item :label="$t('distr_apply.form.region')" prop="region" class="width-25">
          <el-select v-model="form.region">
            <el-option label="中国大陆" value="CN"></el-option>
          </el-select>
        </el-form-item>
        <!-- 省/市 -->
        <el-form-item
          :label="$t('distr_apply.form.province')"
          prop="selectedOptions"
          class="width-25 last"
        >
          <el-cascader
            v-model="form.selectedOptions"
            size="large"
            :options="options"
            :placeholder="$t('distr_apply.placeholder.province')"
            @change="handleAddressChange"
          >
          </el-cascader>
        </el-form-item>
        <i></i>
        <!-- 详细地址 -->
        <el-form-item :label="$t('distr_apply.form.address')" prop="address">
          <el-input v-model="form.address" :placeholder="$t('distr_apply.placeholder.address')"></el-input>
        </el-form-item>
        <!-- 邮政编码 -->
        <el-form-item :label="$t('distr_apply.form.post_code')" prop="postCode">
          <el-input
            v-model="form.postCode"
            :placeholder="$t('distr_apply.placeholder.post_code')"
          ></el-input>
        </el-form-item>
        <!-- 申请类型 -->
        <el-form-item :label="$t('distr_apply.form.distr_type')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('distr_apply.form.distr_type')">
            <el-option v-for="item in  DISTR_TYPE" :key="item.code" :value="item.code" :label="$t(item.label)"></el-option>
          </el-select>
        </el-form-item>
        <!-- DUID -->
        <el-form-item :label="$t('distr_apply.form.aid')" prop="aid">
          <el-input
            v-model="form.aid"
            :placeholder="$t('distr_apply.placeholder.aid')"
          ></el-input>
        </el-form-item>
        <i class="line"></i><i></i>
        <!-- 收款方式 -->
        <div class="payment-box">
          <div class="payment-box_type-select">
            <span class="title">{{ $t('distr_apply.label_charge_type') }}</span><i></i>
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
                    <el-image
                      v-if="item.img"
                      :style="item.hw"
                      :src="item.img"
                    />
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
                  :placeholder="$t('distr_apply.placeholder.wechat.account_contact')"
                ></el-input>
              </el-form-item>
            </div>
            <div v-else-if="form.wdAccountType === 'ALIPAY'" class="pay-form-item">
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
                  :placeholder="$t('distr_apply.placeholder.alipay.account_contact')"
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
                  :placeholder="$t('distr_apply.placeholder.air.account_location')"
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
          <el-checkbox v-model="agreement">{{ $t('distr_apply.text_agreement') }}</el-checkbox>
          <span
            class="policy"
            @click="policyShow = true"
          >
            {{ $t('distr_apply.text_partnership_agreement') }}
          </span>
        </div>
        <div class="item">
          <com-btn @click.native="submit">{{ $t('distr_apply.btn.confirm') }}</com-btn>
          <com-btn @click.native="cancel">{{ $t('distr_apply.btn.cancel') }}</com-btn>
        </div>
      </div>
    </el-card>
    <part-partners-agreement :show="policyShow" @close="policyShow = false" />
  </section>
</template>
<script>
import PartPartnersAgreement from '@/components/part/PartPartnersAgreement'
import { provinceAndCityData, CodeToText } from 'element-china-area-data'
import { DISTR_TYPE, PAYMENT_MODE } from '@/constants/config'
// import com from '@/libs/util'
import DISTR from '@/api/distr'
const formSource = {
  business: '',
  site: '',
  name: '',
  email: '',
  areaCode: '+86',
  phone: '',
  address: '',
  postCode: '',
  type: '',
  aid: '',
  region: 'CN',
  selectedOptions: [],
  wdAccountType: 'CARD', // 收款账号类型
  wdAccount: '', // 收款账号
  option: {}
}
export default {
  name: 'DistrbutorView',
  components: {
    PartPartnersAgreement
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (value && !reg.test(value)) {
        callback(new Error(this.$t('distr_apply.valid.phone_error')))
      } else {
        callback()
      }
    }
    const validataProvince = (rule, value, callback) => {
      if (Array.isArray(value) && value.length === 0) {
        callback(new Error(this.$t('distr_apply.placeholder.province')))
      } else {
        callback()
      }
    }
    const validPostCode = (rule, value, callback) => {
      const reg = /^[0-9]+$/
      if (!reg.test(value)) {
        callback(new Error(this.$t('distr_apply.valid.post_code_error')))
      } else {
        callback()
      }
    }
    return {
      DISTR_TYPE,
      commonRules: {
        required: true,
        message: this.$t('distr_apply.valid.required'),
        trigger: 'blur'
      },
      paymentType: JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType)),
      options: provinceAndCityData,
      form: {
        ...formSource
      },
      province: '',
      city: '',
      agreement: false,
      policyShow: false,
      rules: {
        business: [{ required: true, message: this.$t('distr_apply.placeholder.business_name'), trigger: 'blur' }],
        name: [{ required: true, message: this.$t('distr_apply.placeholder.name'), trigger: 'blur' }],
        email: [
          { required: true, message: this.$t('distr_apply.placeholder.email'), trigger: 'blur' },
          { type: 'email', message: this.$t('distr_apply.valid.email_error'), trigger: ['blur', 'change'] }
        ],
        selectedOptions: [
          { validator: validataProvince, trigger: 'change' },
          { type: 'array', required: true, message: this.$t('distr_apply.placeholder.province'), trigger: 'change' }
        ],
        address: [{ required: true, message: this.$t('distr_apply.placeholder.address'), trigger: 'blur' }],
        postCode: [
          { validator: validPostCode, trigger: 'blur' },
          { required: true, message: this.$t('distr_apply.placeholder.post_code'), trigger: 'blur' }
        ],
        region: [{ required: true, message: this.$t('distr_apply.placeholder.region'), trigger: 'change' }],
        phone: [
          { validator: validatePhone, trigger: 'blur' },
          { required: true, message: this.$t('distr_apply.placeholder.phone'), trigger: 'blur' }
        ],
        wdAccount: [{ required: true, message: this.$t('distr_apply.valid.required'), trigger: 'blur' }],
        type: [{ required: true, message: this.$t('distr_apply.placeholder.distr_type'), trigger: 'change' }]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    // 设置支付方式初始值
    this.paymentTypeInit()
  },
  methods: {
    // 支付方式初始化
    paymentTypeInit () {
      this.paymentType[0].option[0].active = true
      this.form.option = { ...PAYMENT_MODE.CardForm }
    },
    submit () {
      if (!this.agreement) {
        this.$message({
          type: 'warning',
          message: this.$t('distr_apply.msg.allow'),
          duration: 2000
        })
        return false
      }
      this.$refs.form.validate(async (vaild) => {
        if (vaild) {
          await DISTR.Apply({
            type: this.form.type,
            aid: this.form.aid,
            name: this.form.name,
            areaCode: this.form.areaCode,
            phone: this.form.phone,
            company: this.form.business,
            bizEmail: this.form.email,
            region: this.form.region,
            province: this.province,
            city: this.city,
            street: this.form.address,
            zipCode: this.form.postCode,
            wdAccount: this.form.wdAccount,
            wdAccountType: this.form.wdAccountType,
            site: this.form.site,
            ...this.form.option
          }).then(res => {
            this.$message({
              type: 'success',
              message: this.$t('distr_apply.msg.apply_success'),
              duration: 1500
            })
            this.cancel()
            // 申请完更新一下用户个人信息
            this.$store.dispatch('global/user/loadFromRemote').then(() => {
              // 跳转到后台
              // this.$router.push({ name: 'accountList' })

              // 跳转到首页
              this.$router.push({ name: 'home' })
            })
          }).catch(e => {
            // this.$message.error(e.message)
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
      this.agreement = false
    },
    /**
     * @description: 省/市选项改变
     * @param {Array} value 被选中的地区数组
     * @return {*}
     */
    handleAddressChange (value) {
      this.province = CodeToText[value[0]]
      this.city = CodeToText[value[1]]
    },
    /**
     * @description: 选择支付方式
     * @param {*} type      支付方式
     * @param {*} typeIndex 支付货币索引 人民币/美元
     * @param {*} itemIndex 支付方式索引
     * @return {*}
     */
    handleSelectPay (type, typeIndex, itemIndex) {
      this.paymentType = JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType))

      this.paymentType[typeIndex].option[itemIndex].active = true
      this.$set(this.paymentType, typeIndex, this.paymentType[typeIndex])
      // 切换时，清空账号值
      this.form.wdAccount = ''
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
    }
  }
}
</script>
<style  lang="less" scoped>
.form-card {
  width: calc(100% - 100px);
  max-width: 1280px;
  min-width: 780px;
  margin: 50px auto;
  margin-top: 100px;
  .form-title {
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
    width: 100%;
  }
  .el-form {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .el-form-item {
    width: 50%;
    // 奇数项后面加margin分隔
    &:nth-child(odd) {
      width: calc(50% - 30px);
      margin-right: 30px;
    }
    &.width-25 {
      width: calc(25% - 30px);
      margin-right: 30px;
      &.last {
        width: 25%;
        margin-right: 0;
      }
    }
    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-cascader {
      width: 100%;
    }
    /deep/ .el-form-item__label {
      line-height: 18px;
    }
    &.paypal-form-fix {
      /deep/ .el-form-item__label {
        font-size: 20px;
        line-height: 20px;
      }
    }
    &.el-form-item-error-fix /deep/ .el-form-item__error {
      top: 60%;
      left: auto;
      right: 0;
    }
  }
  .line {
    display: block;
    width: 100%;
    margin: 30px 0;
    border-bottom: 1px solid @color-light-gray;
  }
  .btn-wrap {
    text-align: center;
    display: flex;
    flex-flow: column;
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
  .phone-select-fix {
    /deep/ .el-select {
      min-width: 100px;
    }
  }
  .payment-select-fix {
    /deep/ .el-select {
      min-width: 180px;
    }
  }
}

// 支付方式
.payment-box {
  width: 100%;
  .flex-public {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  // 第一层，分上下
  display: flex;
  flex-flow: column;
  // 选项
  &_type-select {
    .flex-public;
    .title {
      font-size: 18px;
    }
    .payment_type-select {
      .flex-public;
      // 人民币 / 美金
      &__item {
        .flex-public;
        font-size: 14px;
        .type {
          padding: 10px 20px;
        }
        .select-item {
          display: block;
          padding: 8px 15px;
          border-radius: 5px;
          border: 1px solid @color-gray;
          margin-right: 10px;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          .img {
            height: 20px;
            width: auto;
            margin-right: 5px;
          }
          span {
            height: 20px;
            line-height: 20px;
          }
          .el-icon-check {
            font-size: 14px;
            display: none;
            position: absolute;
            right: 2px;
            bottom: 0;
          }
          .pointer;

          // &.active {
          //   border: 2px solid @color-primary;
          // }
          &.active {
            border-color: @color-primary;
            .el-icon-check {
              display: inline-block;
              color: #fff;
              z-index: 1;
            }
            &::after {
              @w: 35px;
              content: '';
              position: absolute;
              height: calc(@w * 2);
              width: @w;
              background: @color-primary;
              transform: rotate(45deg);
              right: -15px;
              bottom: -35px;
            }
          }
        }
      }
    }
  }
  &_item {
    padding: 20px 0;
    .pay-form-item {
      display: flex;
      flex-flow: row wrap;
      .width-30 {
        width: calc(33% - 30px);
        margin-right: 30px;
        &.last {
          width: 33%;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
