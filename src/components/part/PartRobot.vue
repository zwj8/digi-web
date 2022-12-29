<template>
    <div>
        <div class="RobotImg">
            <img :src="`${OSS_PREFIX}default/us_customer_service.png`" @click="open">
        </div>
        <Chat v-show="isShow" @close="close"></Chat>
    </div>
</template>
<script>
import Chat from '@/components/part/Chat.vue'
export default {
    components: { Chat },
    name: '',
    data() {
        return {
            isShow: false
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        open() {
            this.isShow = !this.isShow
        },
        close() {
            this.isShow = false
        }
    }
}
</script>
<style lang='less'  scoped>
.RobotImg {
    position: fixed;
    right: 20px;
    bottom: 100px;
    cursor: pointer;
}
</style>