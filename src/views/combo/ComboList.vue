<template>
  <section>
    <h2 class="title">{{ $t('combo.title') }}</h2>
    <p class="intro">{{ $t('combo.sub_title') }}</p>
    <div class="tabs">
      <div class="tab-content">
        <div class="tab-content-item">
          <div class="tab-content-item-wrap">
            <div class="price-info"></div>
            <ul>
              <li>{{ $t('combo.label_device') }}</li>
              <li>{{ $t('combo.label_ad_limit') }}</li>
              <li>{{ $t('combo.label_ad_detail_limit') }}</li>
              <li>{{ $t('combo.label_adver_limit') }}</li>
              <li>{{ $t('combo.label_adver_detail_limit') }}</li>
            </ul>
          </div>
        </div>
        <template v-for="item in comboList">
          <div
            :key="item.label"
            :class="{ active: item.label === active }"
            class="tab-content-item"
            @mouseover="selectPricing(item)"
          >
            <div class="tab-content-item-wrap">
              <div class="price-info">
                <p class="price-title">{{ item.label }}</p>
                <!-- 如果等于联系咨询，则使用有操作事件的元素 -->
                <p
                  v-if="
                    item.price.displayWithCur ===
                    $t('combo.text_contact_consult')
                  "
                  class="price-text"
                  :class="{ contact: item.otherClass }"
                  @click="handleContactUs"
                >
                  <span>{{ item.price.displayWithCur }}</span>
                </p>
                <div v-else class="price-text">
                  <!-- 如果有新客折扣，则优先显示新客折扣 -->
                  <div v-if="item.promotionTitle && item.promotionPrice" class="price-text__promo">
                    <span class="promo">{{ item.promotionPrice.displayWithCur }}</span>
                    <span class="through">{{ item.price.displayWithCur }}</span>
                    <span class="promo-tag">{{ item.promotionTitle }}</span>
                  </div>
                  <span v-else class="basic">{{ item.price.displayWithCur }}</span>
                </div>
              </div>
              <ul>
                <li>{{ item.deviceLimit }}</li>
                <li>{{ item.ttSearchLimit }}</li>
                <li>{{ item.detailDayLimit }}</li>
                <li>{{ item.adverSearchLimit }}</li>
                <li>{{ item.adverDetailLimit }}</li>
              </ul>
            </div>
            <button
              v-if="item.btnText === $t('combo.btn.contact')"
              class="pay-btn"
              @click="handleContactUs"
            >
              {{ item.btnText }}
            </button>
            <button
              v-else-if="
                item.btnText === $t('combo.btn.free_use') && userComboId + '' === 'null'
              "
              class="pay-btn"
              @click="$router.push({ name: 'adList' })"
            >
              {{ item.btnText }}
            </button>
            <button
              v-else-if="item.btnText !== $t('combo.btn.free_use')"
              class="pay-btn"
              @click="checkout(item.key)"
            >
              {{ item.key === userComboId ? $t('combo.btn.renewal') : item.btnText }}
            </button>
            <div v-else class="btn-placeholder"></div>
            <div
              class="current-version"
              :class="{
                'current-version-active':
                  item.key === userComboId ||
                  (item.key === 4 && userComboId >= 4)
              }"
            >
              {{ $t('combo.text_current_version') }}
            </div>
          </div>
        </template>
      </div>
      <div class="tab-common-problem">
        <h4 class="question-title">{{ $t('combo.text_question') }}</h4>
        <div class="problem-wrap">
          <template v-for="(qa, index) in questionList">
            <div :key="index" class="pro-item">
              <p class="q" v-text="qa.question"></p>
              <p class="a" v-text="qa.answer"></p>
            </div>
          </template>
          <div class="pro-item">
            <p class="q">{{ $t('combo.text_other_queation') }}</p>
            <p class="a">
              {{ $t('combo.text_contact') }}
              <a href="javascript:void(0);" @click="handleContactUs">{{ $t('combo.text_contact_us') }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <part-contact-us :show="contactShow" @close="handleClose" />
  </section>
</template>
<script>
// import com from '@/libs/util'
import COMBO from '@/api/combo'
import PartContactUs from '@/components/part/PartContactUs'
import { mapGetters } from 'vuex'
export default {
  name: 'ComboList',
  components: {
    PartContactUs
  },
  filters: {
    isCurrentCombo (value) {
      return value === this.userComboId
    }
  },
  data () {
    return {
      questionList: [
        {
          question: this.$t('combo.question.question_01'),
          answer: this.$t('combo.question.answer_01')
        },
        {
          question: this.$t('combo.question.question_02'),
          answer: this.$t('combo.question.answer_02')
        },
        {
          question: this.$t('combo.question.question_03'),
          answer: this.$t('combo.question.answer_03')
        },
        {
          question: this.$t('combo.question.question_04'),
          answer: this.$t('combo.question.answer_04')
        }
      ],
      freeOrder: {
        key: null,
        label: this.$t('combo.type.free'),
        deviceLimit: '1',
        ttSearchLimit: '3',
        detailDayLimit: '10',
        adverSearchLimit: '3',
        adverDetailLimit: '10',
        price: {
          displayWithCur: '¥ 0'
        },
        btnText: this.$t('combo.btn.free_use')
      },
      active: this.$t('combo.type.month'),
      contactShow: false,
      comboList: []
    }
  },
  computed: {
    // 用户套餐ID
    ...mapGetters('global/user', ['userComboId'])
  },
  watch: {},
  created () {
    this.getComboList()
  },
  mounted () { },
  methods: {
    /**
     * @description: 获取套餐列表
     */
    getComboList () {
      COMBO.GetPricingList().then(res => {
        this.comboList = res.map(v => {
          v.btnText = this.$t('combo.btn.buy')
          return v
        })
        this.comboList.unshift(this.freeOrder)
        this.comboList.push({
          key: 4,
          label: this.$t('combo.type.customize'),
          detailDayLimit: this.$t('combo.text_customize'),
          deviceLimit: this.$t('combo.text_customize'),
          adverSearchLimit: this.$t('combo.text_customize'),
          adverDetailLimit: this.$t('combo.text_customize'),
          ttSearchLimit: this.$t('combo.text_customize'),
          price: {
            displayWithCur: this.$t('combo.text_contact_consult')
          },
          btnText: this.$t('combo.btn.contact'),
          otherClass: true
        })
      })
    },
    /**
     * @description: 选择套餐
     * @param {*} item
     * @return {*}
     */
    selectPricing (item) {
      this.active = item.label
    },
    /**
     * @description: 关闭联系我们弹窗
     */
    handleClose () {
      this.contactShow = false
    },
    /**
     * @description: 打开联系我们弹窗
     */
    handleContactUs () {
      this.contactShow = true
    },
    /**
     * @description: checkout
     * @param {*} key
     * @return {*}
     */
    checkout (key) {
      this.$router.push({
        name: 'checkout',
        query: {
          itemId: key
        }
      })
      // COMBO.Checkout({ type: 'VIP', itemId: key }).then(res => {
      //   this.$router.push({
      //     name: 'checkout',
      //     params: res
      //   })
      // })
    }
  }
}
</script>
<style  lang="less" scoped>
.title {
  .r-font-size(46);
  .r-padding-top(50);
  .r-margin-bottom(24);
  text-align: center;
}
.intro {
  .r-margin-bottom(40);
  .r-font-size(22);
  color: #a2a2a2;
  text-align: center;
}

.tabs {
  .tab-content {
    .r-width(1531);
    background: -webkit-linear-gradient(@bg-color, #fff);
    background: -webkit-gradient(@bg-color, #fff);
    background: -moz-linear-gradient(@bg-color, #fff);
    background: -o-linear-gradient(@bg-color, #fff);
    background: linear-gradient(@bg-color, #fff);
    .r-border-top(2, solid, @color-gray);
    display: flex;
    margin: 0 auto;
    .r-padding(40, 60);
    .r-height(550);
    // height: 550px;
    .r-border-bottom(2, solid, @color-gray);
    .tab-content-item {
      position: relative;
      flex: 1;
      text-align: center;
      transition: background ease-in 0.5s;
      .r-padding-bottom(30);
      &.active {
        .tab-content-item-wrap {
          background: #ffffff;
          .r-box-shadow(0, 0, 20, 0, rgba(0, 0, 0, 0.1));
          // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
          .r-border-radius(6);
          .price-info {
            .r-border-bottom(1, solid, @color-light-green);
            .price-title {
              background: @color-light-green;
            }
            .price-text {
              .promo-tag {
                display: block;
              }
            }
          }
          li {
            .r-border(1, solid, #fff);
          }
        }
        .pay-btn {
          display: inline-block;
        }
        .current-version {
          .r-margin-top(10);
          .r-margin-bottom(-24);
          .r-font-size(14);
        }
      }
      &-wrap {
        padding: 3px;
        .r-padding-bottom(15);
        transition: all ease-in-out 0.3s;
        .price-info {
          .r-height(120);
          // height: 120px;
          text-align: center;
          .r-border-bottom(1, solid, #e9ebf1);
          .price-title {
            .p2r(border-top-left-radius, 6);
            .p2r(border-top-right-radius, 6);
            // border-top-left-radius: 6px;
            // border-top-right-radius: 6px;
            .r-font-size(22);
            .r-line-h-height(50);
            // height: 50px;
            // line-height: 50px;
            font-weight: 500;
          }
          .price-text {
            .r-height(70);
            // height: 70px;
            display: flex;
            flex-flow: column;
            justify-content: center;
            font-weight: 600;
            position: relative;
            &__promo {
              display: flex;
              flex-flow: column;
              justify-content: center;
              .promo {
                .r-height(24);
                // height: 24px;
                .r-font-size(24);
                .r-margin-bottom(5);
                color: @color-primary;
              }
              .through {
                .r-height(14);
                // height: 14px;
                .r-font-size(14);
                color: @color-font-basic;
                text-decoration: line-through;
              }
            }
            .basic {
              .r-font-size(24);
              font-weight: 600;
            }
            .promo-tag {
              position: absolute;
              .p2r(top, -10);
              .p2r(right, -10);
              // top: -10px;
              // right: -30px;
              .r-font-size(14);
              font-weight: 400;
              display: none;
              .r-border(1, solid, @color-primary);
              .r-border-radius(14);
              .r-padding(0, 10);
              color: @color-primary;
              background: @color-light-primary;
            }
          }
          .contact {
            .r-font-size(20);
            font-weight: 600;
            color: @color-primary;
            cursor: pointer;
          }
        }
        li {
          .r-line-h-height(60);
          // height: 60px;
          // line-height: 60px;
          text-align: center;
          .r-font-size(18);
          color: #666;
          .r-border-bottom(1, solid, #e9ebf1);
        }
      }
      .pay-btn {
        display: none;
        .r-padding(10, 15);
        background: transparent;
        .r-border(1, solid, #000);
        .r-margin-top(20);
        .r-border-radius(5);
        color: #000;
        .r-font-size(18);
        transition: all ease-in-out 0.2s;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #000;
        }
      }
      .current-version {
        display: none;
        .r-margin-top(45);
        .r-font-size(18);
        color: @color-gray;
      }
      .btn-placeholder {
        .r-width-height(10, 18);
        // width: 10px;
        // height: 18px;
      }
      .current-version-active {
        display: block;
      }
    }
  }
  .tab-common-problem {
    .r-width(1312);
    // width: 1312px;
    background-image: linear-gradient(#fdfdff, #fff);
    margin: 0 auto;
    .r-margin-bottom(69);
    .question-title {
      .r-margin-top(36);
      .r-margin-bottom(52);
      .r-font-size(24);
      text-align: center;
    }
    .problem-wrap {
      .pro-item {
        .r-margin-bottom(15);
        p {
          .r-line-height(25);
          // line-height: 25px;
        }
        .q {
          font-weight: bold;
        }
        .a {
          color: @color-gray;
          a {
            color: @color-primary;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
