<template>
  <section>
    <i v-if="!state" class="star-icon el-icon-star-off" @click="handleFavor" />
    <el-dropdown v-else @command="handleFavorAction">
      <i class="star-icon el-icon-star-on" />
      <el-dropdown-menu slot="dropdown">
        <!-- 更改分组 -->
        <el-dropdown-item command="change">{{
          $t('components.favor.brn_change_group')
        }}</el-dropdown-item>
        <!-- 取消收藏 -->
        <el-dropdown-item command="cancel">{{
          $t('components.favor.btn_cancel_favor')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>
<script>
import { FAVOR_TYPE } from '@/constants'
import { mapActions } from 'vuex'
import FAVOR from '@/api/favor'
import util from '@/libs/util'
export default {
  name: 'ComFavorBtn',
  props: {
    isLock: { type: Boolean, default: false },
    state: { type: Boolean, default: false },
    type: { type: String, default: FAVOR_TYPE.AD },
    data: { type: Object, default: null },
    index: { type: Number, default: null },
    groupId: { type: Number, default: 0 } // 预留字段，用于初始化已经处于收藏分组
  },
  components: {},
  filters: {},
  data () {
    return {}
  },
  computed: {
    apiName () {
      let name = null
      switch (this.type) {
        case FAVOR_TYPE.AD:
          name = 'AddVideo'
          break
        case FAVOR_TYPE.ADVER:
          name = 'AddAdver'
          break
      }
      return name
    }
  },
  watch: {},
  created () {
    // 初始化收藏状态
    this.componentState = this.state
  },
  mounted () { },
  methods: {
    ...mapActions('global/favor', ['openFavor', 'closeFavor']),
    ...mapActions('global/auth', ['setLimit']),
    // 检查是否lock，在用户操作时弹出付费弹窗
    checkLock () {
      if (this.isLock) {
        this.setLimit(true)
        return true
      }
      return false
    },
    // 视频收藏
    handleFavor () {
      if (this.checkLock()) return
      this.openFavor({
        type: this.type,
        data: this.data,
        index: this.index,
        action: 'FAVOR'
      })
    },
    /**
     * @description: 更改分组 & 取消收藏
     * @param {*} com
     * @return {*}
     */
    handleFavorAction (com) {
      switch (com) {
        case 'change':
          this.openFavor({
            type: this.type,
            data: this.data,
            index: this.index,
            action: 'EDIT'
          })
          break
        case 'cancel':
          FAVOR[this.apiName]({ objectId: this.data.id })
            .then(res => {
              this.$message({
                type: 'success',
                message: this.$t('components.favor.msg_cancel_success'),
                duration: 500
              })
              const cloneData = util.cloneObject(this.data)
              cloneData.favor = false
              cloneData.favorGroup = null
              this.$emit('callback', { data: cloneData, index: this.index, type: this.type })
            })
          break
      }
    }
  }
}
</script>
<style  lang="less" scoped>
.star-icon {
  .pointer;
  .r-font-size(30);
  color: @color-font-secondary;
}
</style>
