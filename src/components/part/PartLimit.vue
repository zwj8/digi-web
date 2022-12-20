<template>
  <div v-if="isLimit" class="contact-bg">
    <!-- <div class="contact-wrap">
      <div class="close">
        <i class="el-icon-error" @click="close"></i>
      </div>
      <h2 class="title"><i class="el-icon-lock"></i>{{ $t('components.limit.title') }}</h2>
      <div class="desc">
        <p>{{ $t('components.limit.text_auth_01') }}</p>
        <p>{{ $t('components.limit.text_auth_02') }}</p>
      </div>
      <div class="btn">
        <com-btn type="bg-primary" @click.native="goto">{{ $t('components.limit.btn_level_up') }}</com-btn>
        <com-btn @click.native="close">{{ $t('components.limit.btn_continue') }}</com-btn>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PartLimit',
  props: {},
  components: {},
  filters: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('global/auth', ['isLimit'])
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    ...mapActions('global/auth', ['setLimit']),
    close() {
      this.setLimit(false)
    },
    goto() {
      this.setLimit(false)
      this.$router.push({ name: 'comboList' })
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
    .r-width-height(521, 350);
    // width: 521px;
    // height: 350px;
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
      .r-font-size(26);

      // font-size: 26px;
      i {
        color: @color-light-green;
        .r-margin-right(20);
        // margin-right: 20px;
      }

      .r-margin-bottom(30);
      // margin-bottom: 30px;
    }

    .desc {
      .r-font-size(18);
      // font-size: 18px;
      color: @color-gray;

      p {
        .r-line-height(40);
        // line-height: 40px;
      }

      .r-margin-bottom(30);
      // margin-bottom: 30px;
    }

    .btn {
      .btn-primary:first-child {
        color: @color-primary;
        border: 3px solid @color-primary;
        .r-margin-right(40);
        // margin-right: 40px;
      }
    }
  }
}
</style>
