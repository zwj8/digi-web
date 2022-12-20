<template>
  <div class="wrap public-form">
    <el-form
      ref="form"
      label-position="top"
      label-width="80px"
      :model="form"
    >
      <!-- 企业信息 -->
      <span class="form-title">{{ $t('distr_apply.label_business_info') }}</span><span></span>
      <!-- 企业名称 -->
      <el-form-item
        :label="$t('distr_apply.form.business_name')"
        prop="company"
      >
        <el-input
          v-model="form.company"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.business_name')"
        ></el-input>
      </el-form-item>
      <!-- 网站（选填） -->
      <el-form-item
        :label="$t('distr_apply.form.site')"
        prop="site"
      >
        <el-input
          v-model="form.site"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.site')"
        ></el-input>
      </el-form-item>
      <!-- 联系人 -->
      <el-form-item
        :label="$t('distr_apply.form.name')"
        prop="name"
      >
        <el-input
          v-model="form.name"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.name')"
        ></el-input>
      </el-form-item>
      <!-- 业务邮箱 -->
      <el-form-item
        :label="$t('distr_apply.form.email')"
        prop="bizEmail"
      >
        <el-input
          v-model="form.bizEmail"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.email')"
        ></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item
        class="phone-select-fix"
        :label="$t('distr_apply.form.phone')"
        prop="phone"
      >
        <el-input
          v-model="form.phone"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.phone')"
        >
          <el-select
            slot="prepend"
            v-model="form.areaCode"
            :disabled="true"
            class="phone-code-select"
          >
            <el-option
              label="+86"
              value="+86"
            ></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <!-- 国家/地区 -->
      <el-form-item
        :label="$t('distr_apply.form.region')"
        prop="region"
        class="width-25"
      >
        <el-select
          v-model="form.region"
          :disabled="true"
        >
          <el-option
            label="中国大陆"
            value="CN"
          ></el-option>
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
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.province')"
          @change="handleAddressChange"
        >
        </el-cascader>
      </el-form-item>
      <i></i>
      <!-- 详细地址 -->
      <el-form-item
        :label="$t('distr_apply.form.address')"
        prop="street"
      >
        <el-input
          v-model="form.street"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.address')"
        ></el-input>
      </el-form-item>
      <!-- 邮政编码 -->
      <el-form-item
        :label="$t('distr_apply.form.post_code')"
        prop="zipCode"
      >
        <el-input
          v-model="form.zipCode"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.post_code')"
        ></el-input>
      </el-form-item>
      <!-- 佣金比例 -->
      <el-form-item
        :label="$t('distr_apply.form.comm_rate')"
        prop="commRate"
      >
        <el-input
          v-model.number="form.commRate"
          :disabled="true"
          :placeholder="$t('distr_apply.placeholder.comm_rate')"
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <i class="line"></i><i></i>
      <!-- 收款方式 -->
      <div class="payment-box">
        <div class="payment-box_type-select">
          <span class="title">{{ $t('distr_apply.label_charge_type') }}</span><i></i>
          <div class="payment_type-select">
            <div
              v-for="(type) in paymentType"
              :key="type.title"
              v-show="type.active"
              class="payment_type-select__item"
            >
              <span
                class="type"
                v-text="$t(type.title)"
              />
              <div
                v-for="(item) in type.option"
                :key="item.type"
                class="select-item"
                :class="{ active: item.active }"
                v-show="item.active"
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
          <div
            v-if="form.wdAccountType === 'CARD'"
            class="pay-form-item"
          >
            <!-- 姓名 -->
            <el-form-item
              v-if="form.option"
              :disabled="true"
              class="width-30"
              :label="$t('distr_apply.form.card.name')"
              prop="option.wdAccountContact"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.card.name')"
              ></el-input>
            </el-form-item>
            <!-- 卡号 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.card.card_number')"
              prop="wdAccount"
            >
              <el-input
                v-model="form.wdAccount"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.card.card_number')"
              ></el-input>
            </el-form-item>
            <!-- 开户行 -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.card.card_bank')"
              prop="option.wdCardBank"
            >
              <el-input
                v-model="form.option.wdCardBank"
                :disabled="true"
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
            >
              <el-input
                v-model="form.wdAccount"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.wechat.account')"
              ></el-input>
            </el-form-item>
            <!-- 微信所有人全名 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.wechat.account_contact')"
              prop="option.wdAccountContact"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :disabled="true"
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
            >
              <el-input
                v-model="form.wdAccount"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.alipay.account')"
              ></el-input>
            </el-form-item>
            <!-- 账号所有人全名 -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.alipay.account_contact')"
              prop="option.wdAccountContact"
            >
              <el-input
                v-model="form.option.wdAccountContact"
                :disabled="true"
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
            >
              <el-input
                v-model="form.wdAccount"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.account_name')"
              ></el-input>
            </el-form-item>
            <!-- Bank Account Number -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.account_number')"
              prop="option.wdBankNumber"
            >
              <el-input
                v-model="form.option.wdBankNumber"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.account_number')"
              ></el-input>
            </el-form-item>
            <!-- Bank Code -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.bank_code')"
              prop="option.wdBankCode"
            >
              <el-input
                v-model="form.option.wdBankCode"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.bank_code')"
              ></el-input>
            </el-form-item>
            <!-- Branch Code -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.branch_code')"
              prop="option.wdBranchCode"
            >
              <el-input
                v-model="form.option.wdBranchCode"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.branch_code')"
              ></el-input>
            </el-form-item>
            <!-- SWITF Code -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.switf_code')"
              prop="option.wdSwiftCode"
            >
              <el-input
                v-model="form.option.wdSwiftCode"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.switf_code')"
              ></el-input>
            </el-form-item>
            <!-- Account Location -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.account_location')"
              prop="option.wdAccountLocation"
            >
              <el-input
                v-model="form.option.wdAccountLocation"
                :disabled="true"
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
            >
              <el-input
                v-model="form.option.wdBankName"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.bank_name')"
              ></el-input>
            </el-form-item>
            <!-- Bank Address -->
            <el-form-item
              v-if="form.option"
              class="width-30"
              :label="$t('distr_apply.form.air.bank_address')"
              prop="option.wdBankAddr"
            >
              <el-input
                v-model="form.option.wdBankAddr"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.air.bank_address')"
              ></el-input>
            </el-form-item>
            <!-- City -->
            <el-form-item
              v-if="form.option"
              class="width-30 last"
              :label="$t('distr_apply.form.air.city')"
              prop="option.wdAwxCity"
            >
              <el-input
                v-model="form.option.wdAwxCity"
                :disabled="true"
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
            >
              <el-input
                v-model="form.wdAccount"
                :disabled="true"
                :placeholder="$t('distr_apply.placeholder.payoneer.account')"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import DISTR from '@/api/distr'
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
import { PAYMENT_MODE } from '@/constants/config'

const formSource = {
  company: '',
  name: '',
  site: '',
  bizEmail: '',
  areaCode: '+86',
  phone: '',
  street: '',
  zipCode: '',
  region: 'CN',
  selectedOptions: [],
  commRate: '',
  wdAccountType: 'CARD', // 收款账号类型
  wdAccount: '', // 收款账号
  option: {}
}
export default {
  name: 'AccountDetail',
  components: {},
  data () {
    return {
      paymentType: JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType)),
      routeParams: null,
      options: provinceAndCityData,
      form: {
        ...formSource
      },
      disabledEdit: false, // 是否禁止编辑手机号和邮箱
      province: '',
      city: '',
      agreement: false,
      policyShow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    // 判断是新建或者编辑
    this.routeParams = this.$route.query
    if (!this.routeParams.isNew) {
      this.getFormData()
    } else {
      // 设置支付方式初始值
      this.paymentTypeInit()
    }
  },
  methods: {
    // 支付方式初始化
    paymentTypeInit () {
      // this.paymentType[0].active = true
      // this.paymentType[0].option[0].active = true
      this.form.option = { ...PAYMENT_MODE.CardForm }
    },
    /**
     * @description: 获取表单数据
     * @return {*}
     */
    getFormData () {
      DISTR.GetInfo().then(res => {
        res.zipCode = +res.zipCode
        res.selectedOptions = [TextToCode[res.province].code, TextToCode[res.province][res.city].code]
        this.form = {
          ...res
        }

        // 如果时已激活账号，禁止编辑邮箱和手机号
        if (res.stateLabel === '已激活') this.disabledEdit = true

        // 获取支付方式两项索引
        if (res.wdAccount && res.wdAccountType) {
          let curIndex, payIndex
          PAYMENT_MODE.paymentType.forEach((item, index) => {
            const _pIndex = item.option.findIndex(p => p.type === res.wdAccountType)
            if (_pIndex !== -1) {
              curIndex = index
              payIndex = _pIndex
            }
          })

          // 初始化支付方式
          this.handleSelectPay(res.wdAccountType, curIndex, payIndex, res.wdAccount)

          this.form.option = { ...res.ext }
        } else {
          // 设置支付方式初始值
          this.paymentTypeInit()
        }
      })
    },
    /**
     * @description: 地址更改
     * @param {*} value 更改的值
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
     * @param {*} account   支付账号
     * @return {*}
     */
    handleSelectPay (type, typeIndex, itemIndex, account = '') {
      this.paymentType = JSON.parse(JSON.stringify(PAYMENT_MODE.paymentType))

      this.paymentType[typeIndex].active = true
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
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.pay.type.less';
.wrap {
  .r-padding(10, 30);
}
.form-title {
  .r-font-size(18);
  display: block;
  .r-margin-bottom(15);
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
    .p2r-calc-reduce(width, 50%, 30);
    // width: calc(50% - 30px);
    .r-margin-right(30);
  }
  &.width-25 {
    .p2r-calc-reduce(width, 25%, 30);
    // width: calc(25% - 30px);
    .r-margin-right(30);
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
    .r-line-height(18);
  }
  &.paypal-form-fix {
    /deep/ .el-form-item__label {
      .r-font-size(20);
      .r-line-height(20);
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
  .r-margin(30, 0);
  border-bottom: 1px solid @color-light-gray;
}
.btn-wrap {
  text-align: center;
  display: flex;
  flex-flow: column;
  .r-margin-top(30);
  .item {
    .r-margin-bottom(10);
    .policy {
      .r-font-size(14);
      color: @color-primary;
      .pointer;
    }
    .btn-primary:first-child {
      .r-margin-right(30);
    }
  }
}
.phone-select-fix {
  /deep/ .el-select {
    .r-min-width(100);
  }
}
</style>
