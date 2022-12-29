<template>
    <div class="ChatStyle">
        <div class="chatHeader">
            <i class="el-icon-circle-close closeIocn" @click="close"></i>
        </div>
        <div class="chatBox"></div>
        <div class="chatFooter"></div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>
<style lang='less'  scoped>
.ChatStyle {

    position: fixed;
    bottom: 175px;
    right: 85px;
    .r-height(500);
    .r-width(450);
    .r-box-shadow(0, 0, 20, 0, rgba(0, 0, 0, 0.1));
    border-radius: 10px;
    background: #fff;

    .chatHeader {
        border-radius: 10px 10px 0 0;
        .r-width(450);
        .r-height(50);
        background: @color-primary;

        .closeIocn {
            float: right;
            font-size: 28px;
            margin-right: 15px;
            margin-top: 15px;
            cursor: pointer;
            color: #fff;
        }
    }

    .chatBox {
        .r-height(400);
        background: #fff;
    }

    .chatFooter {
        border-radius: 0 0 10px 10px;
        .r-width(450);
        .r-height(50);
        background: @color-primary;
    }
}
</style>