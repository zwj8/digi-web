<template>
  <!-- 选择套餐 -->
  <div class="combo-contatiner">
    <div class="combo-introduction">
      <div class="combo-tittle">Free 7-day trial.</div>
      <div class="combo-tittle2">No hidden fees. No credit card required.</div>
      <div class="nav">
        <div class="btn-nav" :class="{ active: activeName === 'month' }" @click="handleNav('month')">
          Monthly payment
        </div>
        <div class="btn-nav" :class="{ active: activeName === 'year' }" @click="handleNav('year')">
          10% discount for annual payment
        </div>
      </div>
    </div>
    <div v-if="activeName === 'month'" class="combo-list-container">
      <ComboDetail></ComboDetail>
      <ComboDetail popular></ComboDetail>
      <ComboDetail></ComboDetail>
    </div>
    <div v-if="activeName === 'year'" class="combo-list-container">
      <ComboDetail></ComboDetail>
      <ComboDetail></ComboDetail>
      <!-- <ComboDetail></ComboDetail> -->
    </div>
    <el-dialog title="" center :visible.sync="dialogVisible" width="989" :before-close="handleClose"
      class="paymentInfomation">
      <div>
        <div class="orderTitle">Order Information</div>
        <div class="gray-line"></div>
        <div class="payInfo">
          <div class="infoItem contentMarginBottom">
            <div class="itemLabel">Recharge account：</div>
            <div class="itemValue">dingy@dongkuntech.cn</div>
          </div>
          <div class="infoItem contentMarginBottom">
            <div class="itemLabel">Selected package：</div>
            <div class="itemValue">Pro</div>
          </div>
          <div class="infoItem contentMarginBottom">
            <div class="itemLabel">Purchase duration：</div>
            <div class="itemValue">30 days</div>
          </div>
        </div>
        <div class="gray-line"></div>
        <div class="payInfo">
          <div class="infoItem">
            <div class="itemLabel">Payment method：</div>
            <div class="itemValue"></div>
          </div>
        </div>
        <div class="rightBox">
        <div class="dealInfo">
          <div class="dealItem">
            <div class="dealLabel">Discount：</div>
            <div :class="['detailValue', 'blue','miniSize']">- $ 49.95 US</div>
          </div>
          <div class="dealItem">
            <div class="dealLabel">Price:</div>
            <div :class="['detailValue', 'gray','miniSize']">$ 999 US</div>
          </div>
          <div class="dealItem">
            <div class="dealLabel">Paid in:</div>
            <div class="twoDetailValue">
                  <div :class="['detailValue', 'blue','bigSize']">¥$ 949 US</div>
                  <div :class="['detailValue', 'gray', 'textLine','miniSize']">¥$ 949 US</div>
            </div>
          </div>
        </div>
        </div>
        <div class="rightBox">
          <com-btn class="paymentBtn" type="bg-primary">Payment</com-btn>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ComboDetail from '@/views/us/combo/ComboDetail'
export default {
  name: 'ComboList',
  mixins: [],
  components: {
    ComboDetail
  },
  filters: {},
  props: {},
  data () {
    return {
      activeName: false,
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.handleNav('month')
  },
  methods: {
    handleNav (type) {
      if (type === this.activeName) return
      this.activeName = type
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.combo-contatiner {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .r-padding-top(40);
  .r-margin-bottom(67);

  .combo-introduction {
    display: flex;
    flex-direction: column;
    align-items: center;
    .r-margin-bottom(71);

    .combo-tittle {
      // width: 448px;
      // height: 68px;
      .r-font-size(36);
      font-family: PingFang SC;
      font-weight: 600;
      color: #282828;
      // line-height: 36px;
    }

    .combo-tittle2 {
      .r-font-size(24);
      .r-margin-bottom(25);
      font-family: PingFangSC-Regular;
      color: #AAAAB0;
    }

    .nav {
      // width: 20%;
      // .p2r(min-width, 300);
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      flex: row nowrap;
      .r-margin-bottom(20);

      // margin-bottom: 20px;
      .btn-nav {
        white-space: nowrap;
        .r-font-size(24);
        box-sizing: border-box;
        border-bottom: 6px solid transparent;
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        .r-margin-right(35);

        &.active {
          color: @color-primary;
          .r-border-bottom(2, solid, @color-primary);
          // border-bottom: 6px solid @color-primary;
        }
      }
    }
  }

  .combo-list-container {
    display: flex;
    justify-content: space-between;
    .r-width(1514);
  }
}

.paymentInfomation {
  .orderTitle {
    .r-width(205);
    margin-left: auto;
    margin-right: auto;
    .r-font-size(24);
    font-family: PingFang SC;
    font-weight: 600;
    color: #303030;
    .r-margin-bottom(31)
  }

  .gray-line {
    // .r-width(935);
    .r-height(1);
    margin-right: auto;
    margin-left: auto;
    border-bottom: 1px solid #D7D7D7;
  }

  .contentMarginBottom {
    .r-margin-bottom(33);
  }

  .infoItem {
    display: flex;
    align-items: center;

    // justify-content: center;
    .itemLabel {
      .r-width(210);
      .r-font-size(22);
      font-family: Glow Sans SC;
      font-weight: normal;
      color: #303030;
      .r-margin-right(49);
      text-align: right;
    }

    .itemValue {
      .r-font-size(18);
      font-family: Glow Sans SC;
      font-weight: normal;
      color: #303030;
    }
  }

  .payInfo {
    .r-margin-top(33);
    .r-margin-left(120)
  }

  .rightBox {
    display: flex;
    .dealInfo {
      .r-margin-top(67);
      .r-margin-bottom(28);
      margin-left: auto;
      .r-width(300);

      .dealItem {
        display: flex;
        justify-content: space-between;

        .blue {
          color: #1436F5
        }

        .gray {
          color: #303030
        }

        .textLine {
          text-decoration: line-through;
        }

        .bigSize {
          .r-font-size(20);
        }

        .miniSize {
          .r-font-size(16);
        }

        .dealLabel {
          .r-width(100);
          .r-font-size(16);
          font-family: Glow Sans SC;
          font-weight: normal;
          color: #303030;
        }

        .twoDetailValue {
          display: flex;
        }

        .detailValue {
          font-family: Glow Sans SC;
          font-weight: normal;
          // .r-font-size(16);
          // text-decoration: line-through;
          // color: #303030;
        }
      }
    }
  }
  .paymentBtn{
      margin-left: auto;
  }
}
</style>
