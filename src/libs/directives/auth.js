/* eslint-disable no-undef */
import perm from '@/libs/auth.permission'

/**
 * auth指令
 * eg. v-auth \ v-auth.some \ v-auth.every
 */
export default {
  inserted: (el, binding) => {
    let { value, modifiers } = binding
    if (value === null || typeof value === 'undefined') {
      return
    }

    if (!(typeof value === 'string' || value instanceof Array) || !value) {
      el.parentNode.removeChild(el)
      return console.error('param of v-auth need to be a string or array.')
    }
    if (typeof value === 'string') {
      value = [value]
    }

    if (
      (modifiers.every && value.some(v => !perm.hasPermission(v))) || (!modifiers.every && value.every(v => !perm.hasPermission(v)))
    ) {
      el.parentNode.removeChild(el)
    }
  }
}
