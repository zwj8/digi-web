<template>
  <div class="management-wrap">
    <el-table :data="dataList" :empty-text="$t('distr_pay.table.no_data')">
      <el-table-column :label="$t('distr_pay.table.label_withdraw')" prop="onWithdrawAmount.displayWithCur"></el-table-column>
      <el-table-column :label="$t('distr_pay.table.label_apply_date')">
        <template slot-scope="scope">
          <span>{{scope.row.applyAt | datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('distr_pay.table.label_verify')">
        <template slot-scope="scope">
          <span>{{scope.row.approvalAt | datetime | placeholder  }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('distr_pay.table.label_pay')">
        <template slot-scope="scope">
          <span>{{scope.row.paidAt | datetime | placeholder }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('distr_pay.table.label_state')" prop="stateLabel"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import DISTR from '@/api/distr'
export default {
  name: 'LogView',
  components: {},
  data () {
    return {
      dataList: [],
      page: 1,
      pageSize: 100
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
  },
  mounted () {},
  methods: {
    getList () {
      DISTR.GetWithdrawList({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.dataList = res.data
        this.page = res.page
        this.pageSize = res.pageSize
      })
    }
  }
}
</script>
<style  lang="less" scoped>
</style>
