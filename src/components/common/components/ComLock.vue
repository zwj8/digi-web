<template>
  <div>
    <div
      v-if="lock && !avatar"
      class="lock-placeholder"
      :style="`height:${height};width:${width};margin:${margin};`"
    />
    <div
      v-else-if="lock && avatar"
      class="lock-avatar"
      :class="{ 'avatar-circular': circular }"
      :style="`height:${avatarSize};width:${avatarSize}`">
      <i class="el-icon-lock" :style="`font-size:${fontSize}`"></i>
    </div>
    <slot v-else />
  </div>
</template>
<script>
export default {
  name: 'ComLock',
  props: {
    // 是否lock
    lock: { type: Boolean, default: false },
    // 是否头像
    avatar: { type: Boolean, default: false },
    avatarSize: { type: String, default: 'auto' },
    // 是否圆形头像 - 仅在 avatar 为 true 时有效
    circular: { type: Boolean, default: false },
    // 高度
    height: { type: String, default: 'auto' },
    // 宽度
    width: { type: String, default: 'auto' },
    // margin
    margin: { type: String, default: '0' }
  },
  components: {},
  filters: {},
  data () {
    return {}
  },
  computed: {
    // 图标大小
    fontSize () {
      const avatarHW = +this.avatarSize.replace(/.*?(\d+).*/g, '$1')
      if (avatarHW) {
        return `${avatarHW / 2}px`
      }
      return 'auto'
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style  lang="less" scoped>
// 占位条
.lock-placeholder {
  background: @color-shadow;
  .r-border-radius(5);
  // border-radius: 5px;
}

// lock 头像
.lock-avatar {
  background: @color-light-primary;
  color: @color-primary;
  .flex-cc;
  // 圆形头像
  &.avatar-circular {
    border-radius: 50%;
  }
}
</style>
