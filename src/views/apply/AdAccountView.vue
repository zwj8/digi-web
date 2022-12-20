<template>
  <div class="owner">
    <header>
      <div class="qr-code">
        <div class="img">
          <img :src="`${OSS_PREFIX}default/owner_qr_code.png`" alt="" />
        </div>
        <span>{{ $t('apply_ad_account.text_add_wechat') }}</span>
      </div>
      <div class="nav">
        <div class="nav__wrap">
          <div class="btn-nav" :class="{ active: activeName === 'tiktok' }" @click="handleNav('tiktok')">{{ $t('apply_ad_account.nav_tiktok') }}</div>
          <div class="btn-nav" :class="{ active: activeName === 'facebook' }" @click="handleNav('facebook')">{{ $t('apply_ad_account.nav_facebook') }}</div>
        </div>
      </div>
    </header>
    <section class="main">
      <div class="main-tip">
        <p class="main-tip__title">{{ $t('apply_ad_account.text.text_01') + formType + $t('apply_ad_account.text.text_02') }}：</p>
        <p class="main-tip__item"><span>1.</span>{{ $t('apply_ad_account.text.text_03') }}</p>
        <p class="main-tip__item"><span>2.</span>{{ $t('apply_ad_account.text.text_04') }}</p>
        <p class="main-tip__item">{{ $t('apply_ad_account.text.text_05') }}</p>
        <p class="main-tip__item">{{ $t('apply_ad_account.text.text_06') }}</p>
      </div>
      <div v-show="activeName === 'tiktok'" class="main_form">
        <el-form ref="tiktokForm" class="form-fix" :model="tiktokForm" label-width="300px" :rules="rulesTT">
          <el-form-item label="申请账户类型：" prop="accType">
            <el-select v-model="tiktokForm.accType">
              <el-option v-for="(ac, index) in accTypeOption" :key="index" :value="ac"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户数量：" prop="accCount">
            <el-select v-model="tiktokForm.accCount">
              <el-option v-for="(count, index) in accConutOption" :key="index" :value="count"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="tiktokForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="job">
            <el-input v-model="tiktokForm.job" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact" class="el-form-item-error-fix phone-select-fix">
            <el-input v-model="tiktokForm.contact" placeholder="请输入">
              <el-select slot="prepend" v-model="tiktokForm.areaCode" class="phone-code-select">
                <el-option label="+86" value="+86"></el-option>
              </el-select>
            </el-input>
            <span class="el-form-item--tip">国内外电话均可</span>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="tiktokForm.email" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="companyName" class="el-form-item-error-fix">
            <el-input v-model="tiktokForm.companyName" placeholder="请输入"></el-input>
            <span class="el-form-item--tip">用于东坤公司内部资质审核及风险评估</span>
          </el-form-item>
          <el-form-item label="营业执照代码：" prop="companyCode">
            <el-input v-model="tiktokForm.companyCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="营业执照附件：">
            <el-upload class="company-code-uploader" action="#" :show-file-list="false">
              <img v-if="tiktokForm.imageUrl" :src="tiktokForm.imageUrl" class="img" />
              <i v-else class="el-icon-plus company-code-uploader-icon"></i>
            </el-upload>
            <span class="text-gray el-form-item--tip">请选择或者拖拽上传文件、限制每个20MB以内</span>
          </el-form-item>
          <el-form-item label="推广链接：" prop="link">
            <el-input v-model="tiktokForm.link" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="BC ID (TIKTOK的商务管理平台)：" prop="Platform">
            <el-input v-model="tiktokForm.Platform" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="账户时区UTC：" prop="timeZone">
            <el-input v-model="tiktokForm.timeZone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系人微信名（或微信号）：" prop="wechat">
            <el-input v-model="tiktokForm.wechat" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="公司规模：" prop="companyScale">
            <el-input v-model="tiktokForm.companyScale" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否有工厂：" prop="hasFactory">
            <el-select v-model="tiktokForm.hasFactory">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营模式：" prop="operationModel">
            <el-select v-model="tiktokForm.operationModel">
              <el-option v-for="(m, index) in operationModelOption" :key="index" :value="m"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类-一级类目：" prop="categoryLevel1">
            <el-select v-model="tiktokForm.categoryLevel1">
              <el-option v-for="(c, index) in categoryOption" :key="index" :value="c"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类-二级类目：" prop="categoryLevel2">
            <el-input v-model="tiktokForm.categoryLevel2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="当月消耗预算（美金）：" prop="amount">
            <el-input v-model.number="tiktokForm.amount" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="从何处获知东坤科技广告开户？" prop="where">
            <el-radio-group v-model="tiktokForm.where">
              <el-radio label="线上活动"></el-radio>
              <el-radio label="线下活动"></el-radio>
              <el-radio label="朋友推荐"></el-radio>
              <el-radio label="销售推荐"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
            <el-input v-if="tiktokForm.where === '其他'" v-model="tiktokForm.whereRemark" type="text" placeholder="请输入补充信息" prop="whereRemark"></el-input>
          </el-form-item>
          <el-form-item label="推荐人（选填）：">
            <el-input v-model="tiktokForm.recommend" placeholder="请输入" prop="recommend"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="activeName === 'facebook'" class="main_form">
        <el-form ref="facebookForm" class="public-fix" :model="facebookForm" label-width="300px" :rules="rulesFB">
          <el-form-item label="开户类型：" prop="accType">
            <el-select v-model="facebookForm.accType">
              <el-option v-for="(ac, index) in accTypeOption" :key="index" :value="ac"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户数量：" prop="accCount">
            <el-select v-model="facebookForm.accCount">
              <el-option v-for="(count, index) in accConutOption" :key="index" :value="count"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="facebookForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="job">
            <el-input v-model="facebookForm.job" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact" class="el-form-item-error-fix phone-select-fix">
            <el-input v-model="facebookForm.contact" placeholder="请输入">
              <el-select slot="prepend" v-model="facebookForm.areaCode" class="phone-code-select">
                <el-option label="+86" value="+86"></el-option>
              </el-select>
            </el-input>
            <span class="el-form-item--tip">国内外电话均可</span>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="facebookForm.email" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="companyName">
            <el-input v-model="facebookForm.companyName" placeholder="请输入"></el-input>
            <span class="el-form-item--tip">与营业执照上名称保持一致</span>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <!-- <el-cascader v-model="facebookForm.address" :props="addressProps"></el-cascader> -->
            <el-input v-model="facebookForm.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="现经营平台：" prop="Platform">
            <el-input v-model="facebookForm.Platform" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Facebook主页名：" prop="facebookIndexName">
            <el-input v-model="facebookForm.facebookIndexName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Facebook主页链接：" prop="facebookIndexLink">
            <el-input v-model="facebookForm.facebookIndexLink" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Facebook主页评分是否大于2分：" prop="ScoreGreaterThan2">
            <el-select v-model="facebookForm.ScoreGreaterThan2">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Facebook主页评分截图：" prop="facebookImageUrl">
            <el-upload class="company-code-uploader" action="#" :show-file-list="false">
              <img v-if="facebookForm.facebookImageUrl" :src="facebookForm.facebookImageUrl" class="img" />
              <i v-else class="el-icon-plus company-code-uploader-icon"></i>
            </el-upload>
            <span class="text-gray el-form-item--tip">请选择或者拖拽上传文件（最多5个）、限制每个20MB以内</span>
          </el-form-item>
          <el-form-item label="店铺/官网链接：" prop="officialLink">
            <el-input v-model="facebookForm.officialLink" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="facebook主页">
            <table class="facebook-table">
              <thead>
                <th></th>
                <th>主页名</th>
                <th>主页链接</th>
                <th>主页关联的域名</th>
              </thead>
              <tbody>
                <tr>
                  <td>主页2</td>
                  <td><input v-model="facebookForm.links.indexName_1" type="text"></td>
                  <td><input v-model="facebookForm.links.link_1" type="text"></td>
                  <td><input v-model="facebookForm.links.domain_1" type="text"></td>
                </tr>
                <tr>
                  <td>主页3</td>
                  <td><input v-model="facebookForm.links.indexName_2" type="text"></td>
                  <td><input v-model="facebookForm.links.link_2" type="text"></td>
                  <td><input v-model="facebookForm.links.domain_2" type="text"></td>
                </tr>
                <tr>
                  <td>主页4</td>
                  <td><input v-model="facebookForm.links.indexName_3" type="text"></td>
                  <td><input v-model="facebookForm.links.link_3" type="text"></td>
                  <td><input v-model="facebookForm.links.domain_3" type="text"></td>
                </tr>
                <tr>
                  <td>主页5</td>
                  <td><input v-model="facebookForm.links.indexName_4" type="text"></td>
                  <td><input v-model="facebookForm.links.link_4" type="text"></td>
                  <td><input v-model="facebookForm.links.domain_4" type="text"></td>
                </tr>
              </tbody>
            </table>
          </el-form-item>
          <el-form-item label="公司规模：" prop="companyScale">
            <el-input v-model="facebookForm.companyScale" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否有工厂：" prop="hasFactory">
            <el-select v-model="facebookForm.hasFactory">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营模式：" prop="operationModel">
            <el-select v-model="facebookForm.operationModel">
              <el-option v-for="(m, index) in operationModelOption" :key="index" :value="m"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类-一级类目：" prop="categoryLevel1">
            <el-select v-model="facebookForm.categoryLevel1">
              <el-option v-for="(c, index) in categoryOption" :key="index" :value="c"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类-二级类目：" prop="categoryLevel2">
            <el-input v-model="facebookForm.categoryLevel2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="主营业务（一级类目）：" prop="service">
            <el-input v-model="facebookForm.service" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="时区（如：GMT+8）：" prop="timeZone">
            <el-input v-model="facebookForm.timeZone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="Business Manager ID：" prop="BusinessManagerID">
            <el-input v-model="facebookForm.BusinessManagerID" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="当月消耗预算（美金）：" prop="amount">
            <el-input v-model="facebookForm.amount" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系人微信名（或微信号）：" prop="wechat">
            <el-input v-model="facebookForm.wechat" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="营业执照编号：" prop="companyCode">
            <el-input v-model="facebookForm.companyCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="营业执照附件：" prop="imageUrl">
            <el-upload class="company-code-uploader" action="#" :show-file-list="false">
              <img v-if="facebookForm.imageUrl" :src="facebookForm.imageUrl" class="img" />
              <i v-else class="el-icon-plus company-code-uploader-icon"></i>
            </el-upload>
            <span  class="el-form-item--tip text-gray">请选择或者拖拽上传文件、限制每个20MB以内</span>
          </el-form-item>
          <el-form-item label="从何处获知东坤科技广告开户？" prop="where">
            <el-radio-group v-model="facebookForm.where">
              <el-radio label="线上活动"></el-radio>
              <el-radio label="线下活动"></el-radio>
              <el-radio label="朋友推荐"></el-radio>
              <el-radio label="销售推荐"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
            <el-input v-if="facebookForm.where === '其他'" v-model="facebookForm.whereRemark" type="text" placeholder="请输入补充信息" prop="whereRemark"></el-input>
          </el-form-item>
          <el-form-item label="推荐人（选填）：" prop="recommend">
            <el-input v-model="facebookForm.recommend" placeholder="请输入" prop="recommend"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="main-tip">
        <p class="main-tip__title">请阅读并同意《东坤科技海外账户服务协议》</p>
        <p class="main-tip__item">感谢您选择深圳市东坤信息科技有限公司进行{{ formType }}海外广告账户开户，请您认真阅读并同意以下协议内容:</p>
        <p class="main-tip__item">一、保密协议</p>
        <p class="main-tip__item">
          东坤科技尊重并保护所有使用东坤科技海外账户服务协议的个人隐私权。东坤科技会按照本隐私权政策的规定使用您在申请海外账时根据东坤科技要求提供的个人注册信息(商家应法律要求需公示的企业名称及相关工商注册信息除外)。除特殊情况外，在未征得您事先许可的情况下，东坤科技不会将这些信息对外披露。
        </p>
        <p class="main-tip__item">二、退款协议</p>
        <p class="main-tip__item"><span>1.</span>开户费用一经缴纳不予退还;</p>
        <p class="main-tip__item"><span>2.</span>通过东坤科技进行广告费用充值的客户，我们支持账户间的款项转移，但不支持款项转出。</p>
        <p class="main-tip__item">三、账户使用须知</p>
        <p class="main-tip__item">开户人在使用东坤科技提供的广告账户时，需遵循以下条款:</p>
        <p class="main-tip__item"><span>1.</span>广告产品:投放的广告产品需满足{{ formType }}广告投放政策，若由于广告内容不符合政策规定导致账户被封，本公司不承担申诉及召回责任;</p>
        <p class="main-tip__item"><span>2.</span>投放规则:请仔细阅读{{ formType }}广告投放政策，若由于不遵守官方广告投放政策，或由于其他违反政策的行为导致账户被封，本公司不承担申诉及召回责任;</p>
        <p class="main-tip__item">
          <span>3.</span>若由于开户人在运营广告过程中违反{{ formType }}广告投放政策导致东坤科技名下Business Manager (商务管理平台)受到不可挽回的影响，开户人需向 Dongkun Tech Limited 支付1000美金罚金。
        </p>
        <p class="main-tip__item"><span>4.</span>广告账户一经创建不支持修改基本信息(如邮箱)，请在提交申请时确认基本信息。</p>
        <p class="main-tip__item other">以上条款自开户日起生效。</p>
        <p class="main-tip__item other">上述文本的最终解释权归深圳市东坤信息科技有限公司所有。</p>
        <div class="main-tip__agree">
          <el-checkbox v-model="agreement">我已阅读并同意以上协议</el-checkbox>
        </div>
      </div>
      <div class="main_footer">
        <com-btn @click.native="handleSubmit">{{ $t('apply_ad_account.btn_submit') }}</com-btn>
        <p>提交即授权该表单收集您的填写信息，查看<span class="text-primary" @click="policyShow = true">《隐私协议》</span></p>
      </div>
    </section>
    <prat-agreement :show="policyShow" @close="closePolicy" />
  </div>
</template>
<script>
import WORK from '@/api/workorder'
import PratAgreement from '@/components/part/PratAgreement'
export default {
  name: 'AdAccountView',
  components: {
    PratAgreement
  },
  data () {
    const accTypeOption = ['Tiktok海外户', 'Tiktok国内户', '其他']
    const accConutOption = [1, 2, 3, 4, 5, '其他']
    const operationModelOption = ['精品垂类', '爆品铺货', '品牌出海']
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
      accTypeOption,
      accConutOption,
      operationModelOption,
      categoryOption,
      policyShow: false,
      activeName: 'tiktok',
      formType: 'TikTok',
      tiktokForm: {
        accType: '', // 申请账户类型:
        accCount: '', // 开户数量：
        companyName: '', // 公司名称：
        companyCode: '', // 营业执照代码：
        imageUrl: '', // 营业执照图片：
        link: '', // 推广链接：
        Platform: '', // TIKTOK的商务管理平台
        email: '', // 邮箱：
        timeZone: '', // 账户时区UTC：
        name: '', // 姓名：
        wechat: '', // 联系人微信名
        contact: '', // 联系电话：
        areaCode: '+86', // 区号
        job: '', // 职务：
        companyScale: '', // 公司规模：
        hasFactory: '', // 是否有工厂：
        operationModel: '', // 运营模式：
        categoryLevel1: '', // 品类-一级类目
        categoryLevel2: '', // 品类-二级类目
        amount: '', // 当月消耗预算（美金）
        where: '', // 从何处获知东坤科技广告开户？
        whereRemark: '', // 其他-其他途径补充
        recommend: ''// 推荐人（选填）
      },
      facebookForm: {
        accType: '', // 开户类型：
        accCount: '', // 开户数量：
        companyName: '', // 公司名称：
        companyCode: '', // 营业执照编号：
        imageUrl: '', // 营业执照附件：
        Platform: '', // 现经营平台：
        email: '', // 邮箱：
        address: '', // 地址：
        facebookIndexName: '', // Facebook主页名：
        facebookIndexLink: '', // Facebook主页链接：
        ScoreGreaterThan2: '', // Facebook主页评分是否大于2分：
        officialLink: '', // 店铺/官网链接
        links: {
          indexName_1: '', // facebook主页名
          indexName_2: '',
          indexName_3: '',
          indexName_4: '',
          link_1: '', // // facebook主页链接
          link_2: '',
          link_3: '',
          link_4: '',
          domain_1: '', // 主页关联的域名
          domain_2: '',
          domain_3: '',
          domain_4: ''
        },
        service: '', // 主营业务（一级类目）
        BusinessManagerID: '', // Business Manager ID
        facebookImageUrl: '', // Facebook主页评分截图：
        timeZone: '', // 时区
        name: '', // 姓名：
        wechat: '', // 联系人微信名
        contact: '', // 联系电话：
        areaCode: '+86', // 区号
        job: '', // 职务：
        companyScale: '', // 公司规模：
        hasFactory: '', // 是否有工厂：
        operationModel: '', // 运营模式：
        categoryLevel1: '', // 品类-一级类目
        categoryLevel2: '', // 品类-二级类目
        amount: '', // 当月消耗预算（美金）
        where: '', // 从何处获知东坤科技广告开户？
        whereRemark: '', // 其他-其他途径补充
        recommend: '' // 推荐人（选填）
      },
      rulesTT: {
        accType: [{ required: true, message: '请选择申请账户类型', trigger: 'change' }],
        accCount: [{ required: true, message: '请选择开户数量', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职务', trigger: 'blur' }],
        contact: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('valid.email_required'), trigger: 'blur' },
          { type: 'email', message: this.$t('valid.email_type_error'), trigger: ['blur', 'change'] }
        ],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        companyCode: [{ required: true, message: '请输入营业执照代码', trigger: 'blur' }],
        link: [{ required: true, message: '请输入推广链接', trigger: 'blur' }],
        Platform: [{ required: true, message: '请输入平台', trigger: 'blur' }],
        timeZone: [{ required: true, message: '请输入账户时区', trigger: 'blur' }],
        wechat: [{ required: true, message: '请输入联系人微信名（或微信号）', trigger: 'blur' }],
        companyScale: [{ required: true, message: '请输入公司规模', trigger: 'blur' }],
        hasFactory: [{ required: true, message: '请选择是否有工厂', trigger: 'change' }],
        operationModel: [{ required: true, message: '请选择运营模式', trigger: 'change' }],
        categoryLevel1: [{ required: true, message: '请选择品类-一级类目', trigger: 'change' }],
        categoryLevel2: [{ required: true, message: '请选择品类-二级类目', trigger: 'change' }],
        amount: [{ required: true, message: '请输入当月消耗预算（美金）', trigger: 'blur' }],
        where: [
          { required: true, message: '请选择途径', trigger: 'change' }
          // { validator: validateOther, trigger: 'change' }
        ]
      },
      rulesFB: {
        accType: [{ required: true, message: '请选择申请账户类型', trigger: 'change' }],
        accCount: [{ required: true, message: '请选择开户数量', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职务', trigger: 'blur' }],
        contact: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('valid.email_required'), trigger: 'blur' },
          { type: 'email', message: this.$t('valid.email_type_error'), trigger: ['blur', 'change'] }
        ],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        address: [{ required: true, message: '请选择地址', trigger: 'blur' }],
        Platform: [{ required: true, message: '请输入平台', trigger: 'blur' }],
        facebookIndexName: [{ required: true, message: '请输入Facebook主页名', trigger: 'blur' }],
        facebookIndexLink: [{ required: true, message: '请输入Facebook主页链接', trigger: 'blur' }],
        ScoreGreaterThan2: [{ required: true, message: '请选择', trigger: 'change' }],
        officialLink: [{ required: true, message: '请输入店铺/官网链接', trigger: 'blur' }],
        companyScale: [{ required: true, message: '请输入公司规模', trigger: 'blur' }],
        hasFactory: [{ required: true, message: '请选择是否有工厂', trigger: 'change' }],
        operationModel: [{ required: true, message: '请选择运营模式', trigger: 'change' }],
        categoryLevel1: [{ required: true, message: '请选择品类-一级类目', trigger: 'change' }],
        categoryLevel2: [{ required: true, message: '请选择品类-二级类目', trigger: 'blur' }],
        service: [{ required: true, message: '请输入主营业务（一级类目）', trigger: 'change' }],
        timeZone: [{ required: true, message: '请输入时区', trigger: 'blur' }],
        BusinessManagerID: [{ required: true, message: '请输入Business Manager ID', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入当月消耗预算（美金）', trigger: 'blur' }],
        wechat: [{ required: true, message: '请输入联系人微信名（或微信号）', trigger: 'blur' }],
        companyCode: [{ required: true, message: '请输入营业执照代码', trigger: 'blur' }],
        where: [
          { required: true, message: '请选择途径', trigger: 'change' }
        ]
        // whereRemark: [{validator: validateOther}]
      },
      agreement: false
    }
  },
  computed: {},
  watch: {
    activeName (newVlaue) {
      if (newVlaue === 'tiktok') {
        this.formType = 'TikTok'
      } else {
        this.formType = 'Facebook'
      }
      this.agreement = false
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleNav (type) {
      this.$refs[`${this.activeName}Form`].resetFields()
      this.activeName = type
    },
    // 选择地址
    handleChange (value) {
      // console.log(value)
    },
    handleSubmit () {
      if (!this.agreement) {
        this.$message({
          type: 'warning',
          message: this.$t('apply_ad_account.message.need_agreement'),
          duration: 2000
        })
      } else {
        const keyName = this.activeName === 'tiktok' ? 'tiktokForm' : 'facebookForm'
        this.$refs[keyName].validate(async (valid) => {
          if (valid) {
            await WORK.New({
              type: this.activeName === 'tiktok' ? 'TT_AD_ACCOUNT_APPLY' : 'FB_AD_ACCOUNT_APPLY',
              areaCode: this[keyName].areaCode,
              phone: this[keyName].contact,
              nick: this[keyName].name,
              ext: this[keyName]
            }).then(res => {
              this.$message({
                type: 'success',
                message: this.$t('apply_ad_account.message.submit_success'),
                duration: 1500
              })
              this.$refs[keyName].resetFields()
              this.agreement = false
            })
          }
        })
      }
    },
    // 关闭隐私政策
    closePolicy () {
      this.policyShow = false
    }
  }
}
</script>
<style  lang="less" scoped>
.owner {
  width: 80%;
  max-width: @layout-front-max-width;
  margin: 0 auto;
  .r-padding(67, 0);
  // padding: 67px 0;
  background: -webkit-linear-gradient(@bg-color, #fff);
  background: -webkit-gradient(@bg-color, #fff);
  background: -moz-linear-gradient(@bg-color, #fff);
  background: -o-linear-gradient(@bg-color, #fff);
  background: linear-gradient(@bg-color, #fff);
  header {
    display: flex;
    flex-flow: column;
    align-items: center;
    .qr-code {
      .r-margin-bottom(50);
      // margin-bottom: 50px;
      display: flex;
      flex-flow: column;
      align-items: center;
      .img {
        .r-width-height(126);
        // @imghw: 126px;
        // height: @imghw;
        // width: @imghw;
        .r-border(6, solid, @color-primary);
        // border: 6px solid @color-primary;
        .r-border-radius(6);
        // border-radius: 6px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      span {
        .r-margin(16);
        // margin: 16px;
        .r-font-size(17);
        // font-size: 17px;
      }
    }
    .nav {
      width: 100%;
      border-bottom: 1px solid @color-light-gray;
      display: flex;
      justify-content: center;
      &__wrap {
        // width: 20%;
        .p2r(min-width, 300);
        // min-width: 300px;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        flex: row nowrap;
        .btn-nav {
          .r-font-size(24);
          // font-size: 24px;
          .r-padding(21);
          // padding: 21px;
          box-sizing: border-box;
          .r-border-bottom(6, solid, transparent);
          // border-bottom: 6px solid transparent;
          cursor: pointer;
          transition: all ease-in-out 0.3s;
          &.active {
            color: @color-primary;
            .r-border-bottom(6, solid,  @color-primary);
            // border-bottom: 6px solid @color-primary;
          }
          &:first-child {
            .r-margin-right(116);
            // margin-right: 116px;
          }
        }
      }
    }
  }

  .main {
    width: 80%;
    margin: 0 auto;
    // .r-padding-top(65);
    padding-top: 65px;
    &-tip {
      // .r-padding-bottom(50);
      padding-bottom: 50px;
      &__title {
        // .r-font-size(20);
        font-size: 20px;
        font-weight: bold;
        // .r-margin-bottom(20);
        margin-bottom: 20px;
      }
      &__item {
        // .r-font-size(18);
        font-size: 18px;
        // .r-line-height(40);
        line-height: 40px;
        display: flex;
        flex-flow: row nowrap;
        span {
          display: inline-block;
          // .r-padding-right(5);
          padding-right: 5px;
        }
        &.other {
          // .r-margin-top(20);
          margin-top: 20px;
        }
      }
      &__agree {
        .r-margin-top(24);
        // margin-top: 24px;
        & /deep/ .el-checkbox__inner {
          // .r-width-height(20);
          @hw: 20px;
          width: @hw;
          height: @hw;
          &::after {
            // .p2r(left, 6);
            // .p2r(top, 6);
            left: 6px;
            top: 3px;
          }
        }
      }
    }
    &_form {
      width: 60%;
      // .r-margin-bottom(43);
      margin-bottom: 43px;
      margin-left: 10%;
      // margin: 0 auto;
    }
    &_footer {
      text-align: center;
      p {
        // .r-margin-top(24);
        margin-top: 24px;
        color: @color-gray;
      }
    }
  }
}

// 上传模块样式调整
.company-code-uploader /deep/ .el-upload {
  border: 1px dashed @color-gray;
  .r-border-radius(6);
  // border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.company-code-uploader .el-upload:hover {
  border-color: #409eff;
}
.company-code-uploader-icon {
  .r-font-size(28);
  // font-size: 28px;
  color: #8c939d;
  .r-width-height(140, 92);
  // width: 140px;
  // height: 92px;
  .r-line-height(92);
  // line-height: 92px;
  text-align: center;
}
.img {
  .r-width-height(140, 92);
  // width: 140px;
  // height: 92px;
  display: block;
}

// 表单样式调整
.main {
  // .r-font-size(14);
  & /deep/ .el-select {
    font-size: inherit;
    width: 100%;
    // .p2r(min-width, 100);
    min-width: 100px;
  }
  & /deep/ .el-radio-group {
    // .r-margin-bottom(10);
    margin-bottom: 10px;
  }
  & /deep/ .el-radio__label {
    // .r-font-size(18);
    font-size: 18px;
  }
  & /deep/ .el-checkbox {
    display: flex;
    align-items: center;
    .el-checkbox__label {
      // .r-font-size(22);
      font-size: 22px;
      // .r-height(22);
      height: 22px;
    }
  }
  & .el-form-item-error-fix /deep/ .el-form-item--tip {
    // .r-font-size(12);
    // .r-line-h-height(20);
    // white-space: nowrap;
  }
  & .el-form-item-error-fix /deep/ .el-form-item__error {
    // .r-font-size(12);
    top: 60%;
    left: auto;
    right: 0;
  }

  /deep/ .el-form-item__label {
    // .r-font-size(14);
  }

  // 输入框
  /deep/ .el-input {
    .el-input__inner {
      // .r-font-size(14);
      // .r-line-h-height(40);
    }
  }
}

.text-primary {
  cursor: pointer;
}

.facebook-table {
  .r-font-size(14);
  width: 100%;
  border-collapse: collapse;
  th {
    border: 1px solid @color-table-thead;
    background: @color-table-thead;
  }
  td {
    text-align: center;
    border: 1px solid @color-table-thead;
    .p2r(min-width, 50);
    // min-width: 50px;
    background: #fff;
    // padding: 0 5px;
    input {
      border: 0;
      outline-style: none;
      .r-font-size(20);
      // font-size: 20px;
      .r-width(100);
      // width: 100px;
    }
  }
}

.main-tip {
  .r-font-size(14);
}
</style>
