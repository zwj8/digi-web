<template>
  <div v-if="show" class="contact-bg">
    <div class="contact-wrap">
      <div class="close">
        <i class="el-icon-error" @click="close"></i>
      </div>
      <h2 class="title">{{ $t('components.contact_us.title') }}</h2>
      <div class="qr-code">
        <img :src="`${OSS_PREFIX}default/digiads-service.jpg`" alt="QR Code" />
        <span class="desc">{{ $t('components.contact_us.customer_serivce') }}</span>
      </div>
      <p class="email">email: support@digiads.com</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PartContactUs',
  props: {
    show: { type: Boolean, default: () => false }
  },
  components: {},
  filters: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style  lang="less" scoped>
.contact-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 4000;
  display: flex;
  justify-content: center;
  align-items: center;
  .contact-wrap {
    .r-width-height(521, 381);
    // height: 381px;
    // width: 521px;
    background: #fff;
    .r-border-radius(6);
    // border-radius: 6px;
    display: flex;
    flex-flow: column;
    align-items: center;
    .close {
      box-sizing: border-box;
      .r-padding(14);
      // padding: 14px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      i {
        .r-font-size(28);
        // font-size: 28px;
        cursor: pointer;
      }
    }
    .title {
      .r-margin-bottom(30);
      // margin-bottom: 30px;
    }
    .qr-code {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      .r-margin-bottom(36);
      // margin-bottom: 36px;
      img {
        .r-width-height(135);
        // height: 135px;
        // width: 135px;
      }
      .desc {
        .r-font-size(17);
        // font-size: 17px;
        .r-margin-top(12);
        // margin-top: 12px;
      }
    }
    .email {
      .r-font-size(20);
      // font-size: 20px;
      color: @color-primary;
    }
  }
}
</style>
