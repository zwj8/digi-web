<template>
  <div class="filter">
    <div class="filter-title">
      <span>{{ $t('components.search.label_type') }}</span>
    </div>
    <div class="filter-option filter-option--checkbox">
      <span
        v-for="clazz in clazzOptions"
        :key="clazz.value"
        class="filter-option__item"
        :class="{ active: activeClazz === clazz.value }"
        @click="handleClazzActive(clazz.value)"
      >
        {{ clazz[`${currentLanguage}Label`] }}
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getClazz } from '@/libs/util.search'

export default {
  name: 'FilterClazz',
  props: {
    initialData: { type: [String, Object], default: '' },
    updateData: { type: [String, Object], default: '' }
  },
  data () {
    return {
      clazzOptions: [],
      activeClazz: ''
    }
  },
  computed: {
    ...mapGetters('global/user', ['currentLanguage'])
  },
  watch: {
    updateData (val) {
      this.activeClazz = val || ''
    }
  },
  created () {
    // 设置默认值
    this.initial()
  },
  mounted () {
    getClazz(this)
  },
  methods: {
    // 选择
    handleClazzActive (code) {
      // 选项相同则不往下执行
      if (code === this.activeClazz) return false
      this.activeClazz = code
      const params = {
        clazz: this.activeClazz
      }
      this.$emit('handle', params)
    },
    // 重置
    reset () {
      this.activeClazz = ''
    },
    // 设置默认值
    initial () {
      this.activeClazz = this.initialData || ''
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';
</style>
