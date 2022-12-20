/* eslint-disable no-undef */
import auth from '@/libs/auth'

/**
 * auth指令
 * eg. v-locate
 */
export default {
  inserted: (el, binding) => {
    // let { value, modifiers } = binding

    if (auth.getLocate() !== 'CN') {
      el.parentNode.removeChild(el)
    }
  }
}
