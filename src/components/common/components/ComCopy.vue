<template>
  <i
    class="el-icon-document-copy com-copy"
    @click="copy"
  ></i>
</template>
<script>
import com from '@/libs/util'
export default {
  name: 'ComCopy',
  mixins: [],
  components: {},
  filters: {},
  props: {
    label: { type: String, default: '' },
    content: { type: String, default: '' }
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
     * @description: 复制
     * @return {*}
     */
    copy () {
      com.copyToClipboard(this.label, this.content)
    }
  }
}
</script>
<style  lang="less" scoped>
.com-copy {
  padding-left: 10px;
}
</style>
