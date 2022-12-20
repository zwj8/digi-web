<template>
  <div class="part-aliplayer" :id="playerId"></div>
</template>
<script>
export default {
  name: 'PartAliplayer',
  mixins: [],
  components: {},
  filters: {},
  props: {
    source: { type: String, default: '' },
    vid: { type: String, default: '' },
    playauth: { type: String, default: '' },
    autoplay: { type: Boolean, default: false },
    aliplayerSdkPath: { type: String, default: 'https://g.alicdn.com/de/prismplayer/2.12.1/aliplayer-h5-min.js' },
    cover: { type: String, default: '' },
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' }
  },
  data () {
    return {
      playerId: `part_aliplayer_${Math.random().toString(36).substr(2)}`,
      scriptTagStatus: 0,
      isReload: false,
      instance: null
    }
  },
  computed: {},
  watch: {
    vid () {
      this.initAliplayer()
    }
  },
  created () {
    if (window.Aliplayer !== undefined) {
      // 如果全局对象存在，则说明标签代码已经初始化，直接加载播放器
      this.scriptTagStatus = 2
      this.initAliplayer()
    } else {
      // 全局对象不存在，加载标签代码
      this.insertScriptTag()
    }
  },
  mounted () {
    if (window.Aliplayer !== undefined) {
      // 如果全局对象存在，则说明标签代码已经初始化，直接加载播放器
      this.scriptTagStatus = 2
      this.initAliplayer()
    } else {
      // 全局对象不存在，加载标签代码
      this.insertScriptTag()
    }
  },
  methods: {
    /**
     * @description: 在页面中插入 aliplayer 组件的标签
     * @return {*}
     */
    insertScriptTag () {
      let playerScriptTag = document.getElementById('playerScriptTag')
      // 如果标签不存在,则插入相关标签
      // script 标签
      if (playerScriptTag === null) {
        playerScriptTag = document.createElement('script')
        playerScriptTag.type = 'text/javascript'
        playerScriptTag.src = this.aliplayerSdkPath
        playerScriptTag.id = 'playerScriptTag'
        const s = document.getElementsByTagName('head')[0]
        s.appendChild(playerScriptTag)
      }

      if (playerScriptTag.loaded) {
        this.scriptTagStatus++
        this.initAliplayer()
      } else {
        playerScriptTag.addEventListener('load', () => {
          this.scriptTagStatus++
          playerScriptTag.loaded = true
          this.initAliplayer()
        })
      }
    },
    /**
     * @description: 初始化 aliplayer 组件
     * @return {*}
     */
    initAliplayer () {
      // scriptTagStatus 为 2 时, 说明已经完成加载
      if (
        this.scriptTagStatus === 2 &&
        (this.instance === null || this.reloadPlayer)
      ) {
        // 如果实例为空, 则销毁当前播放视频
        // 捕捉一下异常报错，这里报错，但并不影响使用
        try {
          this.instance?.dispose()
        } catch (e) {}

        document.querySelector(`#${this.playerId}`).innerHTML = ''

        this.$nextTick(() => {
          this.instance = window.Aliplayer({
            id: this.playerId,
            vid: this.vid,
            playauth: this.playauth,
            autoplay: this.autoplay,
            cover: this.cover,
            width: this.width,
            height: this.height
          })

          this.instance?.on('ready', () => {
            this.$emit('ready', this.instance)
          })
          this.instance?.on('play', () => {
            this.$emit('play', this.instance)
          })
          this.instance?.on('pause', () => {
            this.$emit('pause', this.instance)
          })
        })
      }
    },
    play () {
      this.instance.play()
    },
    pause () {
      this.instance.pause()
    },
    reloadPlayer () {
      this.initAliplayer()
    }
  }
}
</script>
<style lang="less" scoped>
  @import url(https://g.alicdn.com/de/prismplayer/2.12.1/skins/default/aliplayer-min.css);
</style>
