<template>
  <section class="item-main">
    <div class="item-main_header">
      <h4 class="item-main_header__title">{{ $t('apply_log.title') }}</h4>
      <span class="item-main_header__sub-title">{{ $t('apply_log.sub_title') }}</span>
    </div>
    <div class="item-main_form">
      <el-form
        ref="form"
        label-position="top"
        label-width="80px"
        :model="form"
        :rules="rules"
        class="public-form"
      >
        <!-- 企业名称 -->
        <el-form-item :label="$t('apply_log.form.company_name')" prop="business">
          <el-input v-model="form.business" :placeholder="$t('apply_log.placeholder.company_name')"></el-input>
        </el-form-item>
        <!-- 联系人 -->
        <el-form-item :label="$t('apply_log.form.contact_name')" prop="applicant">
          <el-input v-model="form.applicant" :placeholder="$t('apply_log.placeholder.company_name')"></el-input>
        </el-form-item>
        <!-- 联系人电话 -->
        <el-form-item :label="$t('apply_log.form.contact_name')" prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('apply_log.placeholder.contact_name')">
            <el-select slot="prepend" v-model="form.areaCode" class="phone-code-select">
              <el-option label="+86" value="+86"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!-- 联系人微信 -->
        <el-form-item :label="$t('apply_log.form.wechat')" prop="weChat">
          <el-input v-model="form.weChat" :placeholder="$t('apply_log.placeholder.wechat')"></el-input>
        </el-form-item>
        <!-- 产品类目 -->
        <el-form-item :label="$t('apply_log.form.catalog')" prop="goodsCategory">
          <el-select v-model="form.goodsCategory" :placeholder="$t('apply_log.placeholder.catalog')">
            <el-option v-for="(c, index) in categoryOption" :key="index" :value="c"></el-option>
          </el-select>
        </el-form-item>
        <!-- 发货地址 -->
        <el-form-item :label="$t('apply_log.form.consignment_address')" prop="address" >
          <el-input v-model="form.address" :placeholder="$t('apply_log.placeholder.consignment_address')"></el-input>
        </el-form-item>
        <!-- 日均单量 -->
        <el-form-item class="style-about-fix fix-30" :label="$t('apply_log.form.day_order')" prop="orderCount">
          <el-input v-model="form.orderCount" :placeholder="$t('apply_log.placeholder.day_order')"></el-input>
        </el-form-item>
        <!-- 是否需要上门揽件 -->
        <el-form-item class="style-about-fix fix-30" :label="$t('apply_log.form.to_home_service')" prop="toHome">
          <el-select v-model="form.toHome" :placeholder="$t('apply_log.placeholder.to_home_service')">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否需要打包服务 -->
        <el-form-item class="style-about-fix fix-30" :label="$t('apply_log.form.package_service')" prop="package">
          <el-select v-model="form.package" :placeholder="$t('apply_log.placeholder.package_service')">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <!-- 其他备注 -->
        <el-form-item :label="$t('apply_log.form.remark')" class="textarea-fix style-about-fix" prop="desc">
          <el-input v-model="form.desc" type="textarea" rows="4" :placeholder="$t('apply_log.placeholder.remark')"></el-input>
        </el-form-item>
        <el-form-item class="qr-code">
          <img :src="`${OSS_PREFIX}default/about_qr_code.png`" alt="" />
          <span>{{ $t('apply_log.text_qr_code') }}</span>
        </el-form-item>
      </el-form>
      <div class="btn-wrap">
        <com-btn @click.native="submit">{{ $t('apply_log.btn.submit') }}</com-btn>
      </div>
    </div>
  </section>
</template>
<script>
import WORK from '@/api/workorder'
const formSource = {
  business: '',
  applicant: '',
  areaCode: '+86',
  phone: '',
  weChat: '',
  goodsCategory: '',
  address: '',
  orderCount: '',
  toHome: '',
  package: '',
  desc: ''
}
export default {
  name: 'LogisticsView',
  components: {},
  data () {
    const categoryOption = ['女装男装', '鞋类箱包', '母婴用品', '护肤彩妆', '珠宝配饰', '家装建材', '家居家纺', '汽车用品', '手机数码', '运动户外', '家电办公', '其他']
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (value && !reg.test(value)) {
        callback(new Error(this.$t('valid.phone_error')))
      } else {
        callback()
      }
    }
    return {
      categoryOption,
      form: { ...formSource },
      rules: {
        business: [{ required: true, message: this.$t('apply_log.placeholder.company_name'), trigger: 'blur' }],
        applicant: [{ required: true, message: this.$t('apply_log.placeholder.contact_name'), trigger: 'blur' }],
        phone: [
          { validator: validatePhone, trigger: 'blur' },
          { required: true, message: this.$t('apply_log.placeholder.phone'), trigger: 'blur' }
        ],
        weChat: [{ required: true, message: this.$t('apply_log.placeholder.wechat'), trigger: 'blur' }],
        goodsCategory: [{ required: true, message: this.$t('apply_log.placeholder.catalog'), trigger: 'change' }],
        address: [{ required: true, message: this.$t('apply_log.placeholder.consignment_address'), trigger: 'blur' }],
        orderCount: [{ required: true, message: this.$t('apply_log.placeholder.day_order'), trigger: 'blur' }],
        toHome: [{ required: true, message: this.$t('apply_log.placeholder.to_home_service'), trigger: 'change' }],
        package: [{ required: true, message: this.$t('apply_log.placeholder.package_service'), trigger: 'change' }]
        // desc: [{ required: true, message: this.$t('logistics.remark_h'), trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    submit () {
      this.$refs.form.validate(async (vaild) => {
        if (vaild) {
          await WORK.New({
            type: 'LOGISTIC', // FB_AD_ACCOUNT_APPLY, CONTACT_US, TT_AD_ACCOUNT_APPLY LOGISTIC
            areaCode: this.form.areaCode,
            phone: this.form.phone,
            nick: this.form.applicant,
            ext: this.form
          }).then(res => {
            this.$message({
              type: 'success',
              message: this.$t('apply_log.msg.submit_success'),
              duration: 1500
            })
            this.$refs.form.resetFields()
          })
        }
      })
    }
  }
}
</script>
<style  lang="less" scoped>
// form 表单
.item-main {
  .r-width(1280);
  // @w: 1270px;
  // width: @w;
  .r-padding-top(68);
  // padding-top: 68px;
  .r-padding-bottom(81);
  // padding-bottom: 81px;
  margin: 0 auto;
  // 标题&副标题
  &_header {
    .r-margin-bottom(44);
    // margin-bottom: 44px;
    &__title {
      .r-font-size(36);
      // font-size: 36px;
      .r-margin-bottom(13);
      // margin-bottom: 13px;
    }
    &__sub-title {
      .r-font-size(28);
      // font-size: 28px;
    }
  }

  // 表单
  &_form {
    .r-margin-bottom(62);
    // margin-bottom: 62px;
    .el-form {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
    }
    .el-form-item {
      .p2r-calc-reduce(width, 50%, 30);
      // width: calc(50% - 30px);
      // 奇数项后面加margin分隔
      &:nth-child(odd) {
        .r-margin-right(30);
        // margin-right: 30px;
      }

      /deep/ .el-form-item__label {
        .r-line-height(18);
        // line-height: 18px;
      }

    }
    // 公司描述输入框的样式调整
    .textarea-fix {
      .r-width(1052);
      // width: 1052px;
    }
    .qr-code {
      height: auto;
      .r-width(153);
      // width: 153px;
      margin-left: auto;
      position: relative;
      img {
        .r-width-height(120);
        // @hw: 120px;
        // height: @hw;
        // width: @hw;
      }
      span {
        display: block;
        .r-width(120);
        // width: 120px;
        text-align: center;
        .r-font-size(16);
        // font-size: 16px;
        position: absolute;
        .p2r(bottom, -20);
        // bottom: -20px;
      }
    }
    .btn-wrap {
      text-align: center;
    }
  }
}

// 三个挤在同一列的表单样式修改
.fix-30 {
  width: 30% !important;
  .r-margin-right(50);
  // margin-right: 50px;
}

// 表单样式调整
.item-main {
  & .el-select {
    width: 100%;
    .p2r(min-width, 160);
    // min-width: 160px;
  }
  & /deep/ .el-radio-group {
    .r-margin-bottom(10);
    // margin-bottom: 10px;
  }
  & /deep/ .el-radio__label {
    .r-font-size(18);
    // font-size: 18px;
    .r-line-height(18);
    // line-height: 18px;
  }
  & /deep/ .el-checkbox {
    display: flex;
    align-items: center;
    .el-checkbox__label {
      .r-font-size(22);
      // font-size: 22px;
      .r-height(22);
      // height: 22px;
    }
  }
  & .el-form-item-error-fix .el-form-item__error {
    top: 60%;
    left: auto;
    right: 0;
  }
}
</style>
