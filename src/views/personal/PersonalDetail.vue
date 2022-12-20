<template>
  <div class="user">
    <!-- 用户信息 -->
    <div class="user-info">
      <part-avatar disabled :hw="80" />
      <div class="user-info__account">
        <span>{{ $t('personal.label_account_id') }}：{{ uid }}</span>
        <span v-if="isVip"
          >{{ $t('personal.label_Expire_date') }}：{{
            userComboExpireAt | dateFilter
          }}</span
        >
        <span v-else>{{ $t('personal.label_free') }}</span>
      </div>
    </div>
    <!-- 用户导航 -->
    <div class="user-nav">
      <div class="user-nav__wrap">
        <div
          class="btn-nav"
          :class="{ active: activeName === 'acc' }"
          @click="handleNav('acc')"
        >
          {{ $t('personal.nav_account') }}
        </div>
        <div
          class="btn-nav"
          :class="{ active: activeName === 'ord' }"
          @click="handleNav('ord')"
        >
          {{ $t('personal.nav_order') }}
        </div>
      </div>
    </div>
    <!-- 我的账号 -->
    <template v-if="activeName === 'acc'">
      <div class="user-account">
        <div class="info-wrap">
          <h3 class="acc-title">{{ $t('personal.account.title') }}</h3>
          <el-form :model="form" label-width="100px">
            <el-form-item :label="$t('personal.account.label_company_name')">
              <el-input
                v-model="form.company"
                :placeholder="
                  $t('personal.account.placeholder_label_company_name')
                "
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('personal.account.label_email')">
              <el-input
                v-model="form.email"
                :disabled="true"
                :placeholder="$t('personal.account.placeholder_label_email')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('personal.account.label_username')">
              <el-input
                v-model="form.username"
                :placeholder="$t('personal.account.placeholder_label_username')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('personal.account.label_nick')">
              <el-input
                v-model="form.nick"
                :placeholder="$t('personal.account.placeholder_nick')"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('personal.account.label_phone')"
              class="phone-select-fix"
            >
              <el-input
                v-model="form.phone"
                :placeholder="$t('personal.account.placeholder_label_phone')"
                :disabled="true"
              >
                <el-select
                  slot="prepend"
                  v-model="areaCode"
                  :disabled="true"
                  class="phone-code-select"
                >
                  <el-option label="+86" value="+86"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('personal.account.label_anncout_password')">
              ***********
              <span class="change-password" @click="resetPW({ email })">{{
                $t('personal.account.btn_change_secret')
              }}</span>
            </el-form-item>
          </el-form>
          <com-btn @click.native="updateUserInfo">{{
            $t('personal.account.btn_save')
          }}</com-btn>
        </div>
      </div>
      <!-- 登陆情况 -->
      <!-- <div class="user-login">
        <div class="info-wrap">
          <h3 class="acc-title">{{ $t('personal.account.label_login') }}</h3>
          <h4 class="acc-sub">{{ $t('personal.account.text_max_pc_01') }}{{ userPackage.deviceLimit || 0 }}{{ $t('personal.account.text_max_pc_02') }}</h4>
          <table class="login-status" rules="none">
            <thead>
              <th>设备ID</th>
              <th>设备信息</th>
              <th>设备登陆IP</th>
              <th>登陆时间</th>
              <th>是否当前设备</th>
              <th>解绑</th>
            </thead>
            <tbody>
              <template v-if="form.deviceList && form.deviceList.length > 0">
                <tr v-for="(dec, index) in form.deviceList" :key="index">
                  <td v-text="dec.id"></td>
                  <td v-text="dec.md5"></td>
                  <td v-text="dec.ip"></td>
                  <td v-text="dec.updatedAt"></td>
                  <td></td>
                  <td><span class="btn-primary">解绑</span></td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="6">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->
      <!-- 套餐信息 -->
      <div class="user-order">
        <div class="info-wrap">
          <h3 class="acc-title">
            {{ $t('personal.account.label_combo_title') }}
          </h3>
          <h4 class="acc-sub">
            {{ $t('personal.account.label_combo_sub_title') }}
          </h4>
          <table class="login-status" rules="none">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <thead>
              <th>{{ $t('personal.account.label_project') }}</th>
              <th>{{ $t('personal.account.label_data') }}</th>
            </thead>
            <tbody>
              <tr>
                <td>{{ $t('personal.account.label_available_title') }}</td>
                <td>
                  {{ userPackage.from | dateFilter }}
                  <span>{{ $t('chore.to') }}</span>
                  {{ userPackage.to | dateFilter }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('personal.account.label_device_limit') }}</td>
                <td>{{ userPackage.deviceLimit || 0 }}</td>
              </tr>
              <tr>
                <td>{{ $t('personal.account.label_ad_search_limit') }}</td>
                <td>
                  {{ userPackage.ttSearchUsed || 0 }} /
                  {{ userPackage.ttSearchLimit || 0 }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('personal.account.label_ad_detail_limit') }}</td>
                <td>
                  {{ userPackage.adDetailUsed || 0 }} /
                  {{ userPackage.adDetailLimit || 0 }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('personal.account.label_adver_search_limit') }}</td>
                <td>
                  {{ userPackage.adverSearchUsed || 0 }} /
                  {{ userPackage.adverSearchLimit || 0 }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('personal.account.label_adver_detail_limit') }}</td>
                <td>
                  {{ userPackage.adverDetailUsed || 0 }} /
                  {{ userPackage.adverDetailLimit || 0 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="user-footer">
        <p>
          {{ $t('personal.account.text_more_limit') }}
          <a
            class="level-up"
            href="javascript: void(0);"
            @click="gotoPricing"
            >{{ $t('personal.account.btn_level_up') }}</a
          >
        </p>
      </div>
    </template>
    <!-- 订单情况 -->
    <template v-else>
      <div class="user-order">
        <div class="info-wrap">
          <h3 class="acc-title">{{ $t('personal.order.title') }}</h3>
          <table class="login-status" rules="none">
            <thead>
              <th>{{ $t('personal.order.label_order_id') }}</th>
              <th>{{ $t('personal.order.label_combo') }}</th>
              <th>{{ $t('personal.order.label_paid_date') }}</th>
              <th>{{ $t('personal.order.label_order_state') }}</th>
              <th>{{ $t('personal.order.label_paid_type') }}</th>
              <th>{{ $t('personal.order.label_action') }}</th>
            </thead>
            <tbody>
              <template v-if="userOrder && userOrder.length > 0">
                <tr v-for="(ord, index) in userOrder" :key="index">
                  <td v-text="ord.sn"></td>
                  <td v-text="ord.itemName"></td>
                  <td>{{ ord.paidAt | dateFilter(true) }}</td>
                  <td>{{ ord.state | orderStateFilter }}</td>
                  <td>{{ ord.paymentChannel | paymentTypeFilter }}</td>
                  <td>
                    <template v-if="ord.state === payStatus.created">
                      <com-btn
                        type="bg-primary"
                        size="mini"
                        @click.native="continuePayment(ord)"
                      >
                        {{ $t('personal.btn.continue_pay') }}
                      </com-btn>
                      <com-btn size="mini">{{
                        $t('personal.btn.cancel_order')
                      }}</com-btn>
                    </template>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="6">{{ $t('personal.order.no_data') }}</td>
              </tr>
            </tbody>
          </table>
          <!-- 仅当订单总条数超过20条时，才显示分页 -->
          <div v-if="pagination.total > 20" class="pagination-area">
            <el-pagination
              :page-sizes="[20, 40, 60, 80, 100]"
              :current-page.sync="pagination.page"
              background
              :page-size="pagination.pageSize"
              layout="sizes, prev, pager, next"
              :total="pagination.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import USER from '@/api/user'
import COMBO from '@/api/combo'
import { PAY_STATE } from '@/constants'
import { PAYMENT_TYPE } from '@/constants/config'
import { mapGetters, mapActions } from 'vuex'
import PartAvatar from '@/components/part/PartAvatar'
export default {
  name: 'PersonalDetail',
  components: {
    PartAvatar
  },
  filters: {},
  data () {
    return {
      activeName: 'acc',
      form: {},
      areaCode: '+86',
      userPackage: {}, // 用户套餐
      userOrder: [], // 用户订单，
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters('global/user', ['uid', 'email', 'isVip', 'userComboExpireAt']),
    ...mapGetters('global/cashier', ['show']),
    // 支付方式
    paymentTypeMap () {
      return PAYMENT_TYPE
    },
    // 支付状态
    payStatus () {
      return PAY_STATE
    }
  },
  watch: {
    // 监控收银台弹窗状态
    show (newStatus) {
      // 如果状态为false，则刷新一次订单情况列表
      if (!newStatus) {
        this.getOrder()
      }
    }
  },
  created () {
    // 根据 URL 的 tab 判断默认进入哪个标签页
    const tabName = this.$route.query?.tab
    let queryValue = tabName
    switch (tabName) {
      case 'account':
        this.activeName = 'acc'
        // 获取套餐情况
        this.getPackage()
        break
      case 'order':
        this.activeName = 'ord'
        // 获取套餐情况
        this.getOrder()
        break
      default:
        // 如果没有带tab，则默认为account
        this.activeName = 'acc'
        queryValue = 'account'
        // 获取套餐情况
        this.getPackage()
        break
    }
    this.$router.push({
      name: 'personalDetail',
      query: {
        tab: queryValue
      }
    })
  },
  mounted () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    ...mapActions('global/account', ['resetPW']),
    handleNav (tab) {
      // acc ord
      this.activeName = tab
      let queryValue = ''
      if (tab === 'ord') {
        queryValue = 'order'
        this.getOrder()
      } else {
        queryValue = 'account'
        this.getPackage()
      }
      this.$router.push({
        name: 'personalDetail',
        query: {
          tab: queryValue
        }
      })
    },
    getUserInfo () {
      USER.GetInfo().then(res => {
        this.form = { ...res }
        // 设置用户信息
        this.$store.dispatch('global/user/set', res)
      })
    },
    // 获取用户套餐情况
    getPackage () {
      USER.GetPackage().then((res) => {
        this.userPackage = res || {}
      })
    },
    // 获取用户订单
    getOrder () {
      const postData = { ...this.pagination }
      delete postData.total // 删除无用项
      USER.GetOrder(postData).then((res) => {
        this.userOrder = res.data || []
        // 设置分页参数
        for (const keyName of ['page', 'pageSize', 'total']) {
          this.pagination[keyName] = res[keyName]
        }
      })
    },
    // 用户数据更新
    updateUserInfo () {
      USER.UpdateInfo({
        uid: this.form.uid,
        nick: this.form.nick,
        company: this.form.company,
        username: this.form.username,
        phone: this.form.phone
      }).then((res) => {
        this.form = { ...res }
        this.$store.dispatch('global/user/set', res)
        this.$message.success(this.$t('personal.account.msg_save_success'))
      })
    },
    // 跳转到套餐页面
    gotoPricing () {
      this.$router.push({ name: 'comboList' })
    },
    /**
     * @description: 继续支付
     * @param {*} orderItem 订单数据
     */
    continuePayment (orderItem) {
      this.loading = this.$loading()
      COMBO.Cashier(orderItem.sn).then(res => {
        // 设置收银台数据
        this.$store.dispatch(
          'global/cashier/setSource',
          {
            data: res,
            itemId: res.itemId,
            couponCode: res.coupon?.code
          }
        )
        // 打开收银台
        this.$store.dispatch(
          'global/cashier/set',
          {
            status: true,
            type: res.paymentChannel
          }
        )
        this.loading.close()
      }).catch(() => {
        this.loading.close()
      })
    },
    /**
     * @description: 关闭订单
     * @param {*} codeSn sn码
     * @return {*}
     */
    closeOrder (codeSn) {
      this.loading = this.$loading()
      COMBO.CloseOrder(codeSn).then(res => {
        this.$message({
          type: 'success',
          message: this.$t('personal.msg.close_order')
        })
        this.loading.close()
      }).catch(() => {
        this.loading.close()
      })
    },
    /**
     * @description: 更改每页显示数量
     * @param {*} pageSize
     */
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getOrder()
    },
    /**
     * @description: 更改页码
     * @param {*} page
     * @return {*}
     */
    handleCurrentChange (page) {
      this.pagination.page = page
      this.getOrder()
    }
  }
}
</script>
<style  lang="less" scoped>
.user {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  .r-padding-bottom(40);
  max-width: @layout-front-max-width;

  &-info {
    .r-width(500);
    // @w: 500px;
    // width: @w;
    // .r-border(1, solid, red);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .r-padding(30, 0);

    &__account {
      display: flex;
      flex-flow: column;
      align-items: center;
      span {
        .r-margin-top(10);
      }
      span:last-child {
        color: @color-gray;
      }
    }
  }
  &-nav {
    width: 100%;
    // .r-border(1, solid, orange);
    .r-border-bottom(1, solid, @color-light-gray);
    display: flex;
    justify-content: center;
    &__wrap {
      width: 20%;
      .r-min-width(300);
      // .r-border(1, solid, red);
      display: flex;
      justify-content: space-between;
      flex: row nowrap;
      .btn-nav {
        .r-font-size(24);
        .r-padding(21);
        box-sizing: border-box;
        .r-border-bottom(6, solid, transparent);
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        &.active {
          color: @color-primary;
          .r-border-bottom(6, solid, @color-primary);
        }
      }
    }
  }

  &-login,
  &-order,
  &-account {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .r-border-bottom(1, solid, @color-light-gray);
    .r-padding-bottom(20);

    .info-wrap {
      width: 25%;
      .r-min-width(350);
      // .r-border(1, solid, red);
      display: flex;
      flex-flow: column;
      align-items: center;
      & /deep/ .el-form {
        width: 100%;
      }
      .btn-fix {
        .r-font-size(18);
      }
      .acc-title {
        text-align: center;
        .r-padding-top(30);
        .r-padding-bottom(30);
        // padding: 30px 0 20px 0;
      }
      .acc-sub {
        text-align: center;
        .r-padding-bottom(20);
        color: @color-gray;
      }
      .change-password {
        color: @color-primary;
        cursor: pointer;
      }
    }
  }

  &-login,
  &-order {
    .r-border-bottom(1, solid, @color-light-gray);
    .info-wrap {
      width: 100%;
      .login-status {
        .r-margin-bottom(20);
        width: 100%;
        border: 0;
        thead {
          background: @color-table-thead;
          .r-height(60);
          .r-line-height(60);
          text-align: center;
        }
        th,
        td {
          border: 0;
          text-align: center;
        }
        td {
          .r-padding(20, 0);
        }
        tr:not(:first-child) {
          td {
            .r-border-top(1, solid, @color-table-thead);
          }
        }
      }
    }
  }

  &-footer {
    p {
      .r-line-height(90);
      .level-up {
        color: @color-primary;
        cursor: pointer;
      }
    }
  }
  &-func {
    box-sizing: border-box;
    .r-padding(40);
    width: 100%;
    .title {
      text-align: left;
      .r-padding-bottom(30);
    }
    .item-list {
      p {
        .r-line-height(40);
      }
      .result {
        color: @color-gray;
      }
    }
  }
}
.btn-primary {
  cursor: pointer;
  color: @color-primary;
}

.phone-code-select {
  .r-width(100);
}
</style>
