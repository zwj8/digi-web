<template>
  <div class="se-tag-wrap">
    <div class="se-tag">
      <span class="se-tag__title">{{ title }}:</span>
      <span>{{ content }}</span>
      <i class="se-tag__action el-icon-remove-outline" @click.stop="handleDel"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectTag',
  mixins: [],
  components: {},
  filters: {},
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    flag: { type: Object, default: () => {} }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 删除标签
     * @return {*}
     */
    handleDel () {
      this.$emit('delete', this.flag)
    }
  }
}
</script>
<style lang="less" scoped>
.se-tag {
  &-wrap {
    .r-margin-right(5);
    .r-margin-bottom(5);
  }

  .r-padding(5);
  .r-border-radius(5);
  background: @color-light-primary;
  color: @color-primary;
  font-weight: 400;

  &__title {
    margin-right: 10px;
  }

  &__action {
    margin-left: 8px;
    .pointer;
  }
}
</style>
