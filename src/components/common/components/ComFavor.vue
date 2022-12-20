<template>
  <div v-if="isShow" class="group-bg">
    <div class="group-wrap">
      <i class="el-icon-circle-close" @click="close"></i>
      <h3 class="title">{{ $t('components.favor.label_select_group') }}</h3>
      <div class="group-list">
        <span
          v-for="item in dataList"
          :key="item.id"
          :class="{ active: currentSelect === item.name }"
          class="item-tab"
          @click="selectThis(item)"
        >
          {{ item.name }}
          <i
            v-show="deleteShow && +item.id !== 0"
            class="el-icon-circle-close"
            @click.stop="deleteGroupById(item.id)"
          ></i>
        </span>
        <span v-if="newGroupInputShow" class="item-tab edit">
          <input
            ref="addInput"
            v-model="newGroupName"
            :placeholder="$t('components.favor.placeholder_group')"
            type="text"
            @keyup.enter="addGroupApi"
          />
          <i class="el-icon-circle-close" @click="deleteNewInput"></i>
        </span>
      </div>
      <div class="group-footer">
        <div>
          <span :class="{ newing: newGroupInputShow }" @click="addGroup">{{
            newGroupInputShow
              ? $t('components.favor.btn_new_group_done')
              : $t('components.favor.btn_new_group')
          }}</span>
          <span :class="{ newing: deleteShow }" @click="deleteGroup">{{
            deleteShow
              ? $t('components.favor.btn_del_group_done')
              : $t('components.favor.btn_del_group')
          }}</span>
        </div>
        <com-btn type="bg-primary" @click.native="handleFavor">{{
          $t('components.favor.btn_collect')
        }}</com-btn>
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/libs/util'
import FAVOR from '@/api/favor'
import { FAVOR_TYPE } from '@/constants'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'ComFavor',
  props: {},
  data () {
    return {
      dataList: [],
      currentSelect: null,
      deleteShow: false,
      newGroupInputShow: false,
      newGroupName: ''
    }
  },
  computed: {
    ...mapGetters(
      'global/favor',
      [
        'isShow',
        'favorType',
        'favorData',
        'favorIndex',
        'actionType',
        'defaultGroupId'
      ]
    )
  },
  watch: {
    isShow (newValue) {
      if (!newValue) {
        this.deleteShow = false
        this.newGroupInputShow = false
        this.newGroupName = ''
      } else {
        this.getGroupList()
      }
    }
  },
  mounted () { },
  methods: {
    ...mapActions('global/favor', ['closeFavor']),
    // 获取分组列表
    getGroupList () {
      FAVOR.GetGroup(this.favorType).then(res => {
        this.dataList = []
        if (res) {
          this.dataList = res
          // 获取默认分组名
          this.currentSelect = this.defaultGroupName()
          // 如果有新建名则使用新建名
          if (this.newGroupName !== '') this.currentSelect = this.newGroupName
        }
        this.newGroupName = ''
      })
    },
    defaultGroupName () {
      let hit = null
      if (this.defaultGroupId !== null) {
        hit = this.dataList.find(v => this.defaultGroupId === v.id)
        if (!hit?.name) hit = this.dataList.find(v => v.id === 0)
      } else {
        hit = this.dataList.find(v => v.id === 0)
      }
      return hit?.name || 'ALL'
    },
    close () {
      this.closeFavor()
      this.currentSelect = null
    },
    // 输出新建输入框
    deleteNewInput () {
      this.newGroupInputShow = false
      this.newGroupName = ''
    },
    addGroup () {
      this.deleteShow = false
      this.newGroupInputShow = !this.newGroupInputShow
      setTimeout(() => {
        this.$refs.addInput.focus()
      }, 100)
    },
    deleteGroup () {
      this.newGroupInputShow = false
      this.deleteShow = !this.deleteShow
    },
    // 选择一个标签
    selectThis (item) {
      this.currentSelect = item.name
    },
    // 删除分组
    deleteGroupById (id) {
      FAVOR.DelGroup(id).then(res => {
        this.dataList = this.dataList.filter(v => v.id !== id)
        this.$message({
          type: 'success',
          message: this.$t('components.favor.msg_del_success'),
          duration: 500
        })
      })
    },
    // 添加分组
    addGroupApi () {
      FAVOR.AddGroup({
        name: this.newGroupName,
        type: this.favorType
      }).then(res => {
        this.newGroupInputShow = false
        this.getGroupList(this.favorType)
      })
    },
    // 收藏视频
    handleFavor () {
      const gid = this.dataList.filter(v => v.name === this.currentSelect)[0].id
      FAVOR[this.favorType === FAVOR_TYPE.AD ? 'AddVideo' : 'AddAdver']({
        objectId: this.favorData.id,
        groupId: gid
      }).then(res => {
        this.$message({
          type: 'success',
          message: this.$t('components.favor.msg_add_success'),
          duration: 500
        })
        this.currentSelect = 'ALL'
        // 收藏之后通知列表更改收藏状态
        const cloneData = util.cloneObject(this.favorData)
        // 更改分组和新增收藏，收藏状态都为true
        cloneData.favor = true
        cloneData.favorGroup = gid
        this.$emit('callback', { data: cloneData, index: this.favorIndex, type: this.favorType })
        // 收藏成功关闭收藏组件
        this.closeFavor()
        // 重置默认选择
        this.currentSelect = null
      })
    }
  }
}
</script>
<style lang="less" scoped>
.group-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .group-wrap {
    .r-width(651);
    // width: 651px;
    .p2r(min-height, 431);
    // min-height: 431px;
    background: #fff;
    .r-border-radius(6);
    // border-radius: 6px;
    display: flex;
    flex-flow: column;
    .r-padding(14);
    // padding: 14px;
    position: relative;
    .el-icon-circle-close {
      .r-font-size(28);
      // font-size: 28px;
      color: @color-primary;
      position: absolute;
      .p2r(right, 10);
      .p2r(top, 10);
      // right: 10px;
      // top: 10px;
      cursor: pointer;
    }
    .title {
      .r-margin-top(33);
      // margin-top: 33px;
      .r-margin-bottom(30);
      // margin-bottom: 30px;
      text-align: center;
      .r-font-size(26);
      // font-size: 26px;
    }
    .group-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-content: flex-start;
      .r-width(582);
      // width: 582px;
      flex: 1;
      margin: 0 auto;
      .item-tab {
        .r-margin-right(10);
        // margin-right: 10px;
        .r-margin-bottom(10);
        // margin-bottom: 10px;
        display: inline-block;
        .r-font-size(20);
        // font-size: 20px;
        width: 30%;
        .r-padding(12, 0);
        // padding: 12px 0;
        text-align: center;
        box-sizing: border-box;
        .r-border(2, solid, @color-footer-bg);
        // border: 2px solid #303030;
        .r-border-radius(6);
        // border-radius: 6px;
        cursor: pointer;
        position: relative;
        .no-select;
        &.active {
          color: #fff;
          .r-border(2, solid, @color-primary);
          // border: 2px solid @color-primary;
          background: @color-primary;
        }
        i {
          color: @color-primary;
          position: absolute;
          .p2r(right, 10);
          // right: 10px;
        }
        &.edit {
          .r-padding(12, 15);
          // padding: 12px 15px;
          .r-border(2, solid, @color-primary);
          // border: 2px solid @color-primary;
          // 新建时输入框样式
          input {
            border: 0;
            .r-height(18);
            // height: 18px;
            .r-font-size(16);
            // font-size: 16px;
            .r-width(150);
            // width: 150px;
            outline-style: none;
          }
        }
        .el-icon-circle-close {
          .r-font-size(20);
          // font-size: 20px;
          position: absolute;
          .p2r-calc-reduce(top, 50%, 10);
          // top: calc(50% - 10px);
        }
      }
    }
    .group-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: row nowrap;
      align-items: center;
      cursor: pointer;
      span {
        .r-width(100);
        text-align: right;
        display: inline-block;
        .r-margin-left(10);
        // margin-left: 10px;
        cursor: pointer;
        &.newing {
          color: @color-primary;
        }
      }
    }
  }
}
</style>
