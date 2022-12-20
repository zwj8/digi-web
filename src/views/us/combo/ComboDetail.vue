<template>
  <section>
    <!-- 套餐详情 -->
    <div class="comboDetailBox">
      <div v-if="popular" class="popularBox">
        <div class="popularText">Most popular</div>
      </div>
      <div class="comboTitle">Basic</div>
      <div>
        <span class="comboNumber">$89</span>
        <span class="comboTime">/month</span>
      </div>
      <div class="comboOther">or $80/month billed annually</div>
      <div class="comboInfo">
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">For 1 user</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Dashboard access</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Daily 200 Ads View</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Daily 50 posts details</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Daily 200 advertisers</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Daily 50 advertisers details</div>
        </div>
        <div class="infoItem">
          <i class="el-icon-check"></i>
          <div class="infoTitle">Downloadable data</div>
        </div>
      </div>
      <com-btn type="primary" class="clickToBuy" fontSize="25">CLICK TO BUY</com-btn>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ComboDetail',
  mixins: [],
  components: {},
  filters: {},
  props: {
    // big basic mini
    popular: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style lang="less" scoped>
.comboDetailBox {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .r-width(460);
  .r-height(683);
  .r-border(1, solid, @color-light-gray);
  .r-border-radius(10);
  // .r-margin-right(67);
  //鼠标移入效果
  &:hover {
    .r-box-shadow(0, 4, 16, 0, rgba(0, 0, 0, 0.16));
  }
  .popularBox {
    position: absolute;
    top:-18px;
    .r-width(223);
    .r-height(36);
    background: #CEFF00;
    .r-border-radius(18);
    display: flex;
    justify-content: center;
    align-items: center;
    .popularText{
      .r-font-size(18);
      font-family: PingFang SC;
      font-weight: 400;
      color: #1436F5;
    }
  }
  .comboTitle {
    .r-font-size(30);
    font-family: PingFang SC;
    font-weight: 600;
    color: #282828;
    .r-margin-top(30);
    .r-margin-bottom(10)
  }
  .comboNumber{
    .r-font-size(36);
    font-family: PingFangSC-Semibold;
  }
  .comboTime{
    .r-font-size(24);
    font-family: PingFangSC-Regular;
  }
  .comboOther{
    .r-font-size(20);
    font-family: PingFangSC-Regular;
  }
  .comboInfo{
    .r-margin-top(35);
    .r-padding-left(35);
    .infoItem {
        display: flex;
        align-items: center;
        .r-margin-bottom(35);
        /deep/ i {
          .r-font-size(20);
          color:#1436F5
        }

        .infoTitle {
          .r-margin-left(27);
          .r-font-size(20);
          .r-line-height(20);
          font-family: PingFang SC;
          font-weight: 400;
          color: #282828;
        }
      }

  }
  .clickToBuy {
    .r-width(303);
    .r-height(65);
  }
}
</style>
