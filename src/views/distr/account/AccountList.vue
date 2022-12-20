<template>
  <div class="management-wrap">
    <div class="header">
      <div class="header-self">
        <p><span class="text-md">{{ $t('distr_chart.text_title') }}：</span><span v-text="company" /></p>
        <p>
          <span class="text-md">{{ $t('distr_chart.label_link') }}：</span>
          <span v-text="link" />
          <span class="text-primary pointer" @click="copy($t('distr_chart.label_link'), link)"
            >{{ $t('copy.btn') }}</span
          >
        </p>
      </div>
      <com-btn @click.native="newLink">{{ $t('distr_chart.btn.new_partner') }}</com-btn>
    </div>

    <el-divider></el-divider>

    <el-table :data="dataList">
      <!-- 邀请链接ID -->
      <el-table-column :label="$t('distr_chart.table.label_duid')" prop="duid" min-width="160px"></el-table-column>
      <!-- 企业名称 -->
      <el-table-column :label="$t('distr_chart.table.label_company')" prop="company"></el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('distr_chart.table.label_status')" prop="stateLabel"></el-table-column>
      <!-- 邀请链接 -->
      <el-table-column :label="$t('distr_chart.table.label_link')" prop="link" min-width="300px"></el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('distr_chart.table.label_action')" width="200px">
        <template slot-scope="scope">
          <div class="handle">
            <span
              class="text-primary"
              @click="copy($t('distr_chart.label_link'), link)"
            >
            {{ $t('distr_chart.btn.copy_link') }}
            </span>
            <template v-if="scope.row.type === 'SECONDARY'">
              <span v-if="scope.row.stateLabel === '已激活'" @click="handleEdit(scope.row)">{{ $t('distr_chart.btn.edit') }}</span>
              <span @click="deleteAccount(scope.row.duid)">{{ $t('distr_chart.btn.delete_link') }}</span>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DISTR from '@/api/distr'
import com from '@/libs/util'
export default {
  name: 'AccountList',
  components: {},
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    ...mapGetters('global/distr', ['duid', 'company']),
    link () {
      return `${location.origin}?aid=${this.duid}`
    }
  },
  watch: {},
  created () {
    this.getList()
  },
  mounted () { },
  methods: {
    getList () {
      DISTR.GetSubList().then((res) => {
        res = res.map((v) => {
          v.link = `${location.origin}?aid=${v.duid}`
          return v
        })
        this.dataList = res
      })
    },
    /**
     * @description: 跳转到图表页面
     * @param {*} id 要显示的duid
     * @return {*}
     */
    goDetail (id) {
      this.$router.push({
        name: 'accountChart',
        query: {
          duid: id
        }
      })
    },
    /**
     * @description: 跳转编辑下属分销商信息
     * @param {*} obj
     * @return {*}
     */
    handleEdit (obj) {
      this.$router.push({
        name: 'accountDetail',
        query: {
          duid: obj.duid
        }
      })
    },
    /**
     * @description: 跳转新建分销商
     * @return {*}
     */
    newLink () {
      this.$router.push({
        name: 'accountDetail',
        query: {
          isNew: true
        }
      })
    },
    /**
     * @description: 删除分销商
     * @param {*} id 要删除的ID
     * @return {*}
     */
    deleteAccount (id) {
      this.$confirm(
        // 确认删除该合作伙伴？
        this.$t('distr_chart.confirm.text_tip'),
        // 提示
        this.$t('distr_chart.confirm.text_title'),
        {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          confirmButtonText: this.$t('distr_chart.confirm.btn_confitm'),
          cancelButtonText: this.$t('distr_chart.confirm.btn_close'),
          type: 'warning'
        })
        .then(() => {
          DISTR.DelAccount(id)
            .then((res) => {
              this.$message({
                type: 'success',
                message: this.$t('distr_chart.msg.del_success'),
                duration: 1500
              })
              this.getList()
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: e,
                duration: 1500
              })
            })
        })
        .catch(() => { })
    },
    /**
     * @description: 复制
     * @param {*} title 要复制的label
     * @param {*} content 要复制的内容
     * @return {*}
     */
    copy (title, content) {
      com.copyToClipboard(title, content, this.$t('copy.success'), this.$t('copy.failed'))
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  .r-height(60);
  // height: 60px;
  .r-margin-bottom(10);
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  p {
    .r-font-size(14);
    .r-line-height(25);
    .pointer {
      .r-margin-left(10);
    }
  }
}
.el-table {
  /deep/ .handle {
    span {
      .pointer;
      &.text-primary {
        color: @color-primary;
      }
      &:not(:last-child) {
        .r-margin-right(10);
      }
    }
  }
}
</style>
