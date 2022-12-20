import REPORT from '@/api/report'

/**
 * @description: TT广告行为上报
 * @param {*} id
 * @return {*}
 */
const ttadReport = id => {
  const params = {
    action: 'TT_AD_VIEW'
  }
  // 判断 id 是字符串还是数字
  if (typeof id === 'string') params.objectSn = id
  else if (typeof id === 'number') params.objectId = id

  // 上报
  REPORT.Behavior(params).catch(e => { console.log(e) })
}

export { ttadReport }
