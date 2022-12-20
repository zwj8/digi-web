<template>
  <section class="item-footer">
    <p class="item-footer_en">{{ $t('about.text_bottom_title') }}</p>
    <p class="item-footer_ch">{{ $t('about.text_bottom_sub_title') }}</p>
    <div class="item-footer_btn">
      <com-btn size="big" @click.native="$router.push({ name: 'adList'})">{{ $t('about.btn_free') }}</com-btn>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PartJoinNow',
  props: {},
  components: {},
  filters: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style  lang="less" scoped>
  // 底部展示
.item-footer {
  width: 100%;
  .r-height(446);
  background: @bg-color;
  background-image: url('@{oss_prefix}default/footer_right_bottom.png');
  @rem_w: (370 / @remPx);
  @rem_h: (400 / @remPx);
  background-size: ~'@{rem_w}rem' ~'@{rem_h}rem';
  background-repeat: no-repeat;
  background-position: left bottom;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .r-border-bottom(16, solid, @color-primary);
  &_en {
    .r-font-size(48);
    font-weight: bold;
    color: @color-primary;
    .r-margin-bottom(30);
  }
  &_ch {
    .r-margin-bottom(50);
    .r-font-size(46);
  }
}
</style>
