<template>
  <div class="account-detail">
    <header v-if="isShow && !isSecondary">
      <el-select v-model="accountSelect" class="custom-default-select" @change="handleSelected">
        <el-option v-for="item in accountList" :key="item.duid" :label="item.company" :value="item.duid"></el-option>
      </el-select>
    </header>
    <section v-if="isShow">
      <div class="duid-show">
        <span class="duid-show__label">DUID:</span>
        <span class="duid-show__content">{{ detailData.duid }}</span>
      </div>
      <!-- 邀请链接 -->
      <h1>{{ $t('distr_chart.label_link') }}</h1>
      <p>{{ $t('distr_chart.text_link') }}</p>
      <div class="disabled-input">
        <span class="input" v-text="shareLink" />
        <span class="text-primary pointer" @click="copy($t('distr_chart.label_link'), shareLink)">{{ $t('copy.btn') }}</span>
      </div>
      <div class="setting">
        <!-- <p class="tip">
          {{ $t('distr_chart.text_tip') }}
        </p> -->
        <com-btn v-if="detailData.type === 'SECONDARY' && !isSecondary" size="mini" @click.native="goSetting">{{ $t('distr_chart.btn.setting') }}</com-btn>
      </div>
    </section>
    <el-collapse v-model="collapseActive">
      <el-collapse-item name="1">
        <template slot="title"><h3>{{ $t('distr_chart.desc.title') }}</h3></template>
        <div class="policy-wrap">
          <h4>{{ $t('distr_chart.desc.sub_title_01') }}</h4>
          <p>{{ $t('distr_chart.desc.p_01') }}</p>
          <p>{{ $t('distr_chart.desc.p_02') }}</p>
          <p>{{ $t('distr_chart.desc.p_03') }}</p>
          <h4>{{ $t('distr_chart.desc.sub_title_02') }}</h4>
          <p v-html="p_04" />
          <p v-if="distrType === 'PRIMARY'" v-html="p_05" />
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 图表 -->
    <section v-if="isShow" class="echarts-wrap">
      <div class="echarts-title">
        <!-- 整体数据看板 -->
        <h4>{{ $t('distr_chart.chart.title') }}</h4>
        <span class="date-range" v-text="currentDateTip"></span>
      </div>
      <p class="echarts-tips" v-text="resetDateTip"></p>
      <div class="echarts-list">
        <div v-if="regiseterEchart" ref="echart-regiseter" class="echarts-list_item"></div>
        <div v-if="paidMonthEchart" ref="echart-paid" class="echarts-list_item"></div>
        <div v-if="commissionEchart" ref="echart-commission" class="echarts-list_item"></div>
      </div>
    </section>
    <section v-if="!isShow" class="review-wrap">
      <h1 class="title">{{ $t('distr_chart.verify.title') }}</h1>
      <span class="tip">{{ $t('distr_chart.verify.tip_01') }}</span>
      <span class="tip">{{ $t('distr_chart.verify.tip_02') }}</span>
      <p class="line"></p>
      <div class="qr-code">
        <el-image :src="`${OSS_PREFIX}default/qr_code.png`" alt="QR Code"></el-image>
        <span class="desc">{{ $t('distr_chart.verify.customer_serivce') }}</span>
      </div>
      <p class="email">email: support@superdigiads.com</p>
    </section>
  </div>
</template>
<script>
// import * as echarts from 'echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import DISTR from '@/api/distr'
import { replacePLH } from '@/libs/util.i18n'
import com from '@/libs/util'
import { mapGetters } from 'vuex'
const linkOrigin = location.origin
export default {
  name: 'AccountChart',
  components: {},
  data () {
    return {
      routeParamsDuid: null,
      accountSelect: '',
      accountList: [],
      detailData: {},
      collapseActive: '1',
      regiseterEchart: {}, // 月度注册用户数据统计
      paidMonthEchart: {}, // 月度付费用户数据统计
      commissionEchart: {} // 月度佣金数据统计
    }
  },
  computed: {
    p_04 () {
      let replaceArr = null
      if (this.distrType !== 'PRIMARY') {
        replaceArr = [this.$t('distr_chart.desc.scale')]
      } else {
        replaceArr = ['【<span style="font-weight: bold;">20%</span>】']
      }
      return replacePLH(this.$t('distr_chart.desc.p_04'), replaceArr)
    },
    p_05 () {
      const replaceArr = ['<span style="font-weight: bold;">3</span>']
      return replacePLH(this.$t('distr_chart.desc.p_05'), replaceArr)
    },
    ...mapGetters('global/user', ['distrState']),
    ...mapGetters('global/distr', ['isSecondary', 'distrType']),
    // 用户在未通过审核时可以进入详情页，但不显示具体内容，通过isShow来控制用户能看到什么内容
    isShow () {
      return !(+this.distrState < 2)
    },
    // 分享链接
    shareLink () {
      return `${linkOrigin}/share/${this.detailData.duid}`
    },
    // 当前周期tip
    currentDateTip () {
      const now = new Date()
      let month = now.getMonth() + 1
      month = month < 10 ? '0' + month : month
      return `${now.getFullYear()}-${month}-01 ~ ${this.$t('distr_chart.chart.up_to_now')} (UTC+${(0 - now.getTimezoneOffset() / 60)})`
    },
    // 剩余重置时间tip
    resetDateTip () {
      const now = new Date()
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      const surDay = lastDay - now.getDate() < 0 ? 0 : lastDay - now.getDate()
      const nextDate = (now => {
        let _y = now.getFullYear()
        let _m = now.getMonth() + 2
        if (_m > 12) {
          _m = _m - 12
          _y = _y + 1
        }
        _m = _m < 10 ? '0' + _m : _m
        const _d = '01'
        return `${_y}-${_m}-${_d} 00:00:00`
      })(now)
      // return `当前周期的数据将于${surDay}天后 (${nextDate} UTC+${(0 - now.getTimezoneOffset() / 60)}) 重置清零。`
      const utc = 0 - now.getTimezoneOffset() / 60
      const replaceArr = [surDay, nextDate, utc]
      return replacePLH(this.$t('distr_chart.chart.remaining_time'), replaceArr)
    }
  },
  watch: {},
  created () {},
  mounted () {
    if (this.$route.query.duid) {
      this.routeParamsDuid = this.$route.query.duid
    }
    if (this.isShow) {
      this.getSelectList()
    }
    this.echartInit()
  },
  methods: {
    echartInit () {
      echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        BarChart,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer
      ])
    },
    /**
     * @description: 获取下拉选项
     * @return {*}
     */
    getSelectList () {
      DISTR.GetSubListSimple().then(res => {
        if (res) {
          this.accountList = res
          if (this.routeParamsDuid) {
            this.detailData = this.accountList.filter(v => v.duid === this.routeParamsDuid)[0]
          } else if (res.length > 0) {
            this.detailData = res[0]
          }
          // 数据表echarts
          if (this.detailData.duid) this.getEchartsData(this.detailData.duid)
          this.accountSelect = this.detailData.duid
        }
      })
    },
    // 获取图表数据
    getEchartsData (duid) {
      DISTR.GetEchartsData(duid).then(res => {
        this.setEcharts(res)
      })
    },
    /**
     * @description: 下拉选择
     * @param {*} value 被选值
     * @return {*}
     */
    handleSelected (value) {
      this.detailData = this.accountList.filter(v => v.duid === value)[0]
      this.getEchartsData(this.detailData.duid)
      this.accountSelect = value
    },
    /**
     * @description: 设置账号信息
     * @return {*}
     */
    goSetting () {
      this.$router.push({
        name: 'accountDetail',
        query: {
          duid: this.detailData.duid
        }
      })
    },
    /**
     * @description: 复制
     * @param {*} title 要复制的label
     * @param {*} content 要复制的内容
     * @return {*}
     */
    copy (title, content) {
      com.copyToClipboard(title, content, this.$t('copy.success'), this.$t('copy.failed'))
    },
    setEcharts (data) {
      const regiseterE = echarts.init(this.$refs['echart-regiseter'])
      const paidE = echarts.init(this.$refs['echart-paid'])
      const commissionE = echarts.init(this.$refs['echart-commission'])

      // 月度注册人数
      const regiseterOption = this._echartsOption({
        title: this.$t('distr_chart.chart.register_month'),
        type: this.$t('distr_chart.chart.number'),
        data: data.registerMonthReport
      })
      // 月度付费人数
      const rpaidOption = this._echartsOption({
        title: this.$t('distr_chart.chart.paid_month'),
        type: this.$t('distr_chart.chart.number'),
        data: data.paidMonthReport
      })
      // 月度佣金
      const commissionOption = this._echartsOption({
        title: this.$t('distr_chart.chart.commission_month'),
        type: this.$t('distr_chart.chart.amount'),
        data: data.commissionMonthReport
      })

      regiseterE.setOption(regiseterOption)
      paidE.setOption(rpaidOption)
      commissionE.setOption(commissionOption)
    },
    // 处理图表数据
    _echartsOption (option) {
      const now = new Date()
      const dateList = (now => {
        let num = 1
        const arr = []
        while (num <= now.getDate()) {
          let tmp = num
          if (num < 10) {
            tmp = '0' + num
          }
          arr.push(tmp + '')
          num++
        }
        return arr
      })(now)
      const seriesList = dateList.map(v => {
        if (option.data.dailyMap && option.data.dailyMap[v]) {
          if (option.type === this.$t('distr_chart.chart.amount')) {
            const count = option.data.dailyMap[v] / 100
            return count.toFixed(2)
          }
          return option.data.dailyMap[v]
        }
        return 0
      })
      const echartOption = {
        title: {
          text: `${option.title}-${this.$t('distr_chart.chart.current_period_total')}`,
          textStyle: {
            color: '#bababa',
            fontSize: 14,
            fontWeight: 'normal',
            lineHeight: 30
          },
          subtext: option.data.monthTotalLabel,
          subtextStyle: {
            lineHeight: 40,
            fontSize: 40,
            fontWeight: 'bold'
          },
          left: 20
        },
        grid: {
          top: '30%'
        },
        tooltip: {},
        xAxis: {
          data: dateList,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {},
        series: [
          {
            name: option.type,
            type: 'bar',
            data: seriesList,
            barWidth: '5px'
          }
        ]
      }
      return echartOption
    }
  }
}
</script>
<style  lang="less" scoped>
.duid-show {
  margin-bottom: 20px;
  &__label,
  &__content {
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
  }
}
.account-detail {
  header {
    text-align: right;
  }
  section {
    h1 {
      .r-margin-bottom(15);
    }
    .disabled-input {
      .r-padding(10, 0);
      .input {
        display: inline-block;
        .r-padding(10, 30);
        background: @bg-color;
        color: @color-gray;
        .r-border(1, solid, @color-light-gray);
        .r-border-radius(3);
        .r-margin-right(20);
      }
    }
    .setting {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      .r-margin-bottom(30);
      .tip {
        .r-font-size(14);
        width: 50%;
        .p2r(min-width, 400);
        // min-width: 400px;
        .r-line-height(20);
        // line-height: 20px;
        .r-margin-right(30);
      }
    }
  }
  .policy-wrap {
    width: 80%;
  }

  .echarts-wrap {
    .echarts {
      &-title {
        .flex-sbc;
        .r-padding(20, 0);
        .date-range {
          .r-font-size(14);
        }
      }
      &-tips {
        .r-line-height(20);
        // line-height: 20px;
      }
      &-list {
        width: 80%;
        margin: 0 auto;
        .r-margin-top(30);
        .flex-fsc;
        flex-flow: row wrap;
        &_item {
          .r-height(450);
          // height: 450px;
          // .r-width(500);
          width: 45%;
          .r-margin-bottom(30);
          &:nth-child(even) {
            .r-margin-right(30);
          }
        }
      }
    }
  }

  .review-wrap {
    .r-padding-top(50);
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    h1.title {
      .r-font-size(30);
      color: @color-primary;
      .r-margin-bottom(20);
    }
    span.tip {
      display: block;
      .r-padding-bottom(5);
      .r-font-size(14);
    }
    .qr-code {
      display: flex;
      flex-flow: column;
      justify-content: center;
      .r-margin-bottom(36);
      img {
        .r-width-height(135);
        // height: 135px;
        // width: 135px;
      }
      .desc {
        .r-font-size(17);
        .r-margin-top(12);
        text-align: center;
      }
    }
    .line {
      .r-width-height(44, 8);
      // width: 44px;
      // height: 8px;
      background: #303030;
      .r-border-radius(4);
      margin: 0 auto;
      .r-margin-top(25);
      .r-margin-bottom(45);
      // margin: 25px auto 45px;
    }
    .email {
      .r-font-size(20);
      color: @color-primary;
    }
  }
}
</style>
