<template>
  <div class="management-wrap">
    <div v-cloak class="header">
      <span>{{ $t('distr_pay.label_total_amount') }}：{{ currPayment.totalAmount | dgMoney('symbol') }}</span>
      <span>{{ $t('distr_pay.label_withdraw') }}：{{ currPayment.withdrawAmount | dgMoney('symbol') }}</span>
      <span>{{ $t('distr_pay.label_applied') }}：{{ currPayment.onWithdrawAmount | dgMoney('symbol') }}</span>
      <span>{{ $t('distr_pay.label_surplus') }}：{{ currPayment.balanceAmount | dgMoney('symbol') }}</span>
      <com-btn @click.native="handleGetM">{{ $t('distr_pay.btn.withdraw') }}</com-btn>
    </div>
    <el-table :data="dataList">
      <el-table-column label="流水号" prop="sn" min-width="200px"></el-table-column>
      <el-table-column label="类型" prop="typeLabel" min-width="160px"></el-table-column>
      <el-table-column label="Title" prop="title" min-width="180px"></el-table-column>
      <el-table-column label="币种" prop="cur"></el-table-column>
      <el-table-column :label="$t('distr_pay.table.label_comm')">
        <template slot-scope="scope">
          <span>{{ scope.row.amount | dgMoney('symbol') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可提现？" prop="withdrawStateLabel">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.withdrawStateLabel === '可提现'" size="mini" type="success">{{ scope.row.withdrawStateLabel }}</el-tag>
          <el-tag v-else size="mini" type="info">{{ scope.row.withdrawStateLabel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="进账时间" min-width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt| datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <part-pay-account :show="partPayAccShow" @close="close" />
  </div>
</template>
<script>
import DISTR from '@/api/distr'
import PartPayAccount from '@/components/part/PartPayAccount'
export default {
  name: 'CommissionView',
  components: {
    PartPayAccount
  },
  filters: {
    paymentList (v) {
      if (v) {
        return v.displayWithCur
      }
      return '--'
    }
  },
  data () {
    return {
      dataList: [],
      currPayment: {},
      partPayAccShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCurrentComm()
    this.getComm()
  },
  mounted () {},
  methods: {
    /**
     * @description: 关闭弹窗
     * @return {*}
     */
    close () {
      this.partPayAccShow = false
    },
    /**
     * @description: 获取分销商自己的佣金
     * @return {*}
     */
    getCurrentComm () {
      DISTR.GetCurrentComm().then(res => {
        this.currPayment = res
      })
    },
    /**
     * @description: 获取佣金列表
     * @return {*}
     */
    getComm () {
      DISTR.GetCommTransaction().then(res => {
        this.dataList = res
      })
    },
    // 提现
    handleGetM () {
      let id = ''
      if (this.currPayment && this.currPayment.duid) {
        id = this.currPayment.duid
      }
      DISTR.ApplyWithdraw({ duid: id }).then(res => {
        this.$message({
          type: 'success',
          message: this.$t('distr_pay.msg.apply_success'),
          duration: 1500
        })
        this.$router.push({ name: 'log' })
      }).catch(e => {
        // 提现时，没有填写收款账号
        if (e.errorCode === 105010) {
          this.partPayAccShow = true
        }
      })
    }
  }
}
</script>
<style  lang="less" scoped>
.header {
  .r-height(60);
  // height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .r-padding(0, 30);
}
.el-table {
  /deep/ .handle {
    span {
      .pointer;
      &.text-primary {
        color: @color-primary;
      }
      &:not(:last-child) {
        .r-margin-right(10)
      }
    }
  }
}
</style>
