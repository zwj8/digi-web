<template>
  <section v-loading="loading">
    <h1 class="h1">{{ $t('class.class_menu') }}</h1>
    <div class="content-wrapper">
      <div class="content-info">
        <!-- 标题 -->
        <span class="content-info__title">{{ courseInfo.subject }}</span>
        <!-- 课程类型 -->
        <div class="content-info__type">
          <span class="content-info__type_label">{{ $t('class.tiktok_primer.label.novice_stage') }}</span>
          <span class="content-info__type_num">{{ courseInfo.durationLabel }}</span>
        </div>
        <div class="content-info__btn">
          <com-btn v-if="isBought" type="primary" @click="handleLook">{{ $t('class.btn.look') }}</com-btn>
          <com-btn v-else type="primary" @click="handleBuy">{{ $t('class.btn.now_buy') }}</com-btn>
          <com-btn type="black" @click="handleContact">{{ $t('class.btn.contact') }}</com-btn>
        </div>
        <!-- 价格 -->
        <div v-show="!isBought" class="content-info__price">
          <span class="price-title">{{ priceLable }}</span>
          <div class="price-content">
            <div class="show">
              <span>{{ showPrice }}</span>
            </div>
            <!-- 如果没有折扣，不显示划线价 -->
            <div v-show="isDiscount" class="del-line">
              <span>{{`¥ 1099`}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-img">
        <el-image :src="courseInfo.coverUrl"></el-image>
      </div>
    </div>
    <!-- 分隔线 -->
    <el-divider />
    <div class="desc">
      <p>{{ courseInfo.desc }}</p>
    </div>

    <!-- 联系客服 -->
    <part-contact-us :show="contactVisible" @close="contactVisible=false" />

    <!-- 支付弹窗 -->
    <part-payment :visibility="paymentVisible" :courseId="courseInfo.id" @close="paymentClose" />

  </section>
</template>
<script>
import COMBO from '@/api/combo'
import COURSE from '@/api/course'
import { COURSE_ID } from '@/constants'
import PartContactUs from '@/components/part/PartContactUs'
import PartPayment from './part/PartPayment'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'CourseIndex',
  mixins: [],
  components: {
    PartContactUs,
    PartPayment
  },
  filters: {},
  props: {},
  data () {
    return {
      loading: false,
      contactVisible: false, // 联系客服
      paymentVisible: false, // 支付窗口
      payVisible: false, // 是否购买课程
      courseInfo: {}, // 课程信息
      checkoutInfo: {}, // checkout 信息
      isDiscount: false
    }
  },
  computed: {
    /**
     * @description: 是否已购买课程
     * @return {*}
     */
    ...mapGetters('global/course', ['courseIndex', 'currentCourse', 'isBought']),
    /**
     * @description: 显示价格
     * @return {*}
     */
    showPrice () {
      return this.isDiscount ? '¥ 899' : '¥ 1099'
    },
    /**
     * @description: 价格文案
     * @return {*}
     */
    priceLable () {
      return this.isDiscount
        ? this.$t('class.tiktok_primer.label.discount')
        : this.$t('class.tiktok_primer.label.all_course')
    }
  },
  watch: {},
  created () {
    this.getInfo()
    this.getCourseBuyInfo()
  },
  mounted () {},
  methods: {
    /**
     * @description: 获取课程信息
     * @param {*} id
     * @return {*}
     */
    getInfo () {
      this.loading = true
      COURSE.getInfo(COURSE_ID).then(res => {
        this.courseInfo = res
        this.courseInfo.durationLabel = `${parseInt(res?.duration / 60) || 0} ${this.$t('class.tiktok_primer.label.duration')}`
        store.commit('global/course/setIsBought', res.bought)
        store.commit('global/course/setCurrentCourse')
      }).catch(e => { console.log(e) }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @description: 查看课程
     * @return {*}
     */
    handleLook () {
      this.$router.push({
        name: 'courseVideo',
        query: {
          sn: this.currentCourse.sn
        }
      })
    },
    /**
     * @description: 购买课程
     * @return {*}
     */
    handleBuy () {
      // 询问是否要购买课程
      this.$confirm(
        this.$t('class.tips.not_buy'),
        this.$t('class.tips.buy_course'),
        {
          confirmButtonText: this.$t('class.btn.buy'),
          cancelButtonText: this.$t('class.btn.no_buy')
        }
      ).then(() => {
        this.paymentVisible = true
      }).catch(() => {})
    },
    /**
     * @description: 联系客服
     * @return {*}
     */
    handleContact () {
      this.contactVisible = true
    },
    /**
     * @description: 支付弹窗关闭
     * @return {*}
     */
    paymentClose () {
      this.paymentVisible = false
    },
    /**
     * @description: 获取课程购买信息（用于查询课程是否还有优惠
     * @return {*}
     */
    getCourseBuyInfo () {
      COMBO.Checkout({
        type: 'COURSE',
        itemId: COURSE_ID
      }).then(res => {
        // 当限时优惠的标签不为 null，则判断为还有优惠
        if (res?.priceInfo?.promotionTips) this.isDiscount = true
      }).catch(e => {})
    }
  }
}
</script>
<style  lang="less" scoped>
.h1 {
  .r-margin-bottom(50);
}
.content {
  &-wrapper {
    .r-min-width(1280);
    .r-margin-bottom(50);
  }
  &-info,
  &-img {
    display: inline-block;
  }

  // info
  &-info {
    vertical-align: top;
    .r-padding(0, 40);
    .r-padding-right(80);
    // 标题
    &__title {
      display: block;
      .r-font-size(50);
      font-weight: bold;
      color: @color-primary;
      .r-margin-bottom(20);
    }
    // 标签
    &__label {
      display: inline-block;
      .r-padding(5, 10);
      background-color: @color-light-primary;
      color: @color-primary;
      .r-border-radius(3);
      .r-margin-bottom(40);
    }

    // 课程类型
    &__type {
      .r-margin-bottom(45);
      color: @color-font-secondary;
      &_label {
        display: inline-block;
        .r-padding-right(10);
        .r-margin-right(10);
        .r-border-right(1, solid, @color-light-gray);
      }
    }

    // 按钮
    &__btn {
      :first-child {
        .r-margin-right(25);
      }
    }

    // 价格
    &__price {
      .r-padding-top(20);
      // 价格标题
      .price-title {
        display: block;
        .r-font-size(16);
        .r-margin-bottom(5);
      }
      .price-content {
        vertical-align: bottom;
        .show {
          color: @color-primary;
          .r-font-size(25);
          font-weight: bold;
          .r-margin-right(10);
        }
        .del-line {
          color: @color-font-secondary;
          .r-font-size(16);
          Text-decoration: line-through;
        }
        .show,
        .del-line {
          display: inline-block;
        }
      }
    }
  }

  // 图片
  &-img {
    .r-box-shadow;
    .r-width(600);
    .r-height(360);
    // .r-width(725);
    // .r-height(434);
  }
}

.desc {
  .r-padding(0, 40);
}
</style>
