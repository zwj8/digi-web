<template>
    <div>
        <div class="catuns">
            <img :src="`${OSS_PREFIX}default/footer_right_bottom.png`">
            <div class="catuns-all">
                <div class="catuns-bigtitle">
                    <h2 class="item-footer_en">Join DigiAds and Start a New TikTok Marketing and eCommerce Journey!
                    </h2>
                </div>
                <div class="title-btn">
                    <p class="item-footer_ch">Free 7-Day Trial. No Commitment. No Credit Card Required.
                    </p>
                    <div class="catuns-btn">
                        <div class="bgc-img ">
                            <!-- 已经登陆点击跳到广告搜索 -->
                            <com-btn v-if="isLogined" class="btn-1" type="bg-primary"
                                @click.native="$router.push({ name: 'usAd', })">USADLIST</com-btn>
                            <!-- 没登录跳登录页面 -->
                            <com-btn v-else class="btn-1" type="bg-primary" @click.native="toLogin">SIGN UP
                                FREE</com-btn>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: '',
    data() {
        return {

        }
    },
    created() {
    },
    computed: {
        //用户是否是登录状态
        ...mapGetters('global/auth', ['isLogined'])
    },
    methods: {
        ...mapActions('global/account', ['login']),
        toLogin() {
            this.$loading(),
                this.login()
        }
    }
}
</script>
<style lang='less'  scoped>
.catuns {
    overflow: hidden;
    .r-padding-top (80);
    // padding-top: 80px;
    position: relative;
    /* 水平镜像翻转 */
    // align-items: center;
    background-color: #F6F7FF;
    text-align: start;
    // .r-padding-right (90);
    // padding-left: 90px;
    .r-height(280);
    overflow: hidden;

    p {
        // .r-width (900);
        // width: 1230px;
        .r-height (39);
        // height: 39px;
        margin-top: 30px;
        color: #303030;
        .r-font-size(30);
        // font-size: 32px;
        font-family: Microsoft YaHei;
        font-weight: 550;
    }

    & img {
        position: absolute;

        .right (-20);
        // right: -1%;
        .bottom(-30);
        // bottom: -8%;
        transform: rotateY(180deg);
    }

    // height: 350px;
    .catuns-all {
        margin: 0 auto;
        .r-width (1500);
        .r-height (75);

        .catuns-bigtitle {

            h2 {
                .r-font-size(34);

                // font-size: 36px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #1436F5;
                // .r-line-height (43) // line-height: 43px;
            }
        }

        .title-btn {
            .r-width (1315);
            // width: 1315px;
            display: flex;
            justify-content: space-between;

            p {
                font-weight: 500;
            }

            .catuns-btn {

                .bgc-img {
                    .r-margin-top(40);
                    .r-margin-left(80);
                    .r-width (330);
                    // width: 330px;
                    .r-height (100);
                    background-image: radial-gradient(#ceff00 0%, #ceff00 5%, #f6f7ff 70%);

                    .btn-1 {
                        user-select: none;
                        cursor: pointer;
                        // border-color: #fff;
                        // color: #fff;
                        .r-font-size(25);
                        .p2r(width, 321);
                        .r-height(62);
                        // height: 62px;
                        .r-line-height(45);
                        // line-height: 62px;
                        // background: #1436F5;
                        // border-radius: 6px;
                        .r-border-radius(6);

                        // &:hover {
                        //   background-color: #4762fd;
                        // }
                    }
                }
            }
        }

    }



}
</style>