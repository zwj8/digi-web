/**
 * @description: 对支持多项搜索的输入文本进行分割，返回数组
 * @param {*} text 搜索文本
 * @return {*}
 */
export const searchTextFormat = text => {
  // 对中英文的逗号和分号进行数组分割
  let arr = text.split(/,|;|，|；/)
  // 去除数组每项左右空格
  arr = arr.map(v => (v.trim()))
  // 去除数组重复项
  arr = [...new Set(arr)]
  // 去除无效项
  arr = arr.filter(v => (v !== null && v !== '' && typeof v !== 'undefined'))
  return arr
}
/**
 * @description: 对多项需要分割的搜索项进行处理，并返回可用于接口传参的对象
 * @param {*} kwObj keywordObject 搜索关键字对象
 * @param {*} params 用于接口传参的对象
 * @param {*} append 追加在kwobj中 key后面的字段，这个需要在一开始就根据接口参数设定，比如接口参数 uidList，那么kwobj中的搜索关键字就写为 uid，append 就为 List
 * @return {*}
 */
export const searchFormat = (kwObj, params, append = 'List') => {
  Object.keys(kwObj).forEach(key => {
    if (kwObj[key] && typeof kwObj[key] === 'string') {
      params[`${key}${append}`] = searchTextFormat(kwObj[key])
    }
  })
  return params
}

/**
 * @description: 输入过滤 - 限字母和数字
 * @param {*} input
 * @return {*}
 */
export const formatNotNumberLetters = input => {
  input = input
    .replace('，', ',') // 中文逗号转为英文逗号
    .replace(';', ',') // 英文分号转为英文逗号
    .replace('；', ',') // 中文分号转为英文逗号
    .replace(/[^0-9a-z,]/gi, '') // 过滤非字母和数字
    .replace(/,+/gi, ',') // 过滤多个连续逗号
    .replace(/^,/, '') // 过滤开头逗号
  return input
}

/**
 * @description: 输入过滤 - 处理字符串
 * @param {*} input
 * @return {*}
 */
export const formatString = input => {
  input = input
    .replace('，', ',')
    .replace(' ', '')
    .replace('\t', '')
    .replace(/,+/gi, ',')
    .replace(/^,/, '')
  return input
}

/**
 * @description: 输入过滤 - 限数字
 * @param {*} input
 * @return {*}
 */
export const formatNotNumber = input => {
  input = input
    .replace('，', ',') // 中文逗号转为英文逗号
    .replace(';', ',') // 英文分号转为英文逗号
    .replace('；', ',') // 中文分号转为英文逗号
    .replace(/[^0-9,]/gi, '') // 过滤非数字和逗号
    .replace(/,+/gi, ',') // 过滤多个连续逗号
    .replace(/^,/, '') // 过滤开头逗号
  return input
}

/**
 * @description: search组件params参数格式化
 * @param {*} form 传给接口的参数对象
 * @return {*}
 */
export const postParams = form => {
  const postParam = {}
  for (const field in form) {
    if (!form[field] || (Array.isArray(form[field]) && !form[field].length)) {
      continue
    }
    // 处理查询参数
    switch (field) {
      // uidList orderSnList paymentSnList 为纯数字
      case 'uidList':
      case 'orderSnList':
      case 'paymentSnList':
        postParam[field] = formatNotNumber(form[field])
          .replace(/,$/gi, '')
          .split(',')
        break
      // duid 为字母数字混合
      case 'duidList':
        postParam[field] = formatNotNumberLetters(form[field])
          .replace(/,$/gi, '')
          .split(',')
        break
      case 'emailList':
        postParam[field] = form[field]
          .replace(' ', '')
          .replace('，', ',')
          .replace(';', ',')
          .replace('；', ',')
          .replace(/,$/gi, '')
          .split(',')
        break
      case 'createdAtRange':
        if (form[field].length === 2) {
          const key =
            field
              .replace(/Range$/gi, '')
              .charAt(0)
              .toLowerCase() +
            field.replace(/Range$/gi, '').slice(1)
          postParam[key + 'From'] =
            form[field][0].valueOf()
          postParam[key + 'To'] =
            form[field][1].valueOf()
        }
        break
      default:
        postParam[field] = form[field]
        break
    }
  }

  return postParam
}

/**
 * @description: 拿URL的参数回填到列表筛选项中
 * @param {*} queryParams query 参数
 * @param {Object} form 该页面需要的参数
 * @return {*}
 */
export const fillQueryParams = (queryParams, form) => {
  const queryForm = { ...form }
  for (const field in queryForm) {
    // 如果不存在这个项或者这个项的值为空，则跳过这个项
    if (!queryParams[field]) continue

    switch (field) {
      // 都为数组可统一处理
      case 'uidList':
      case 'duidList':
      case 'emailList':
      case 'orderSnList':
      case 'paymentSnList':
        queryForm[field] = queryParams[field].join(',')
        break
      // 提现状态为多选的select，可直接使用
      case 'stateList':
        queryForm[field] = Array.isArray(queryParams[field]) ? queryParams[field] : [queryParams[field]]
        break
      // 是否会员是单项select，值为boolean
      case 'isVip':
        queryForm[field] = !!queryParams[field]
        break
    }
  }
  // 时间范围字段和URL传参不同，需要另外处理
  if (
    queryForm.createdAtRange &&
    queryParams.createdAtFrom &&
    parseInt(queryParams.createdAtFrom) > 0 &&
    queryParams.createdAtTo &&
    parseInt(queryParams.createdAtTo) > 0
  ) {
    queryForm.createdAtRange = [
      parseInt(queryParams.createdAtFrom),
      parseInt(queryParams.createdAtTo)
    ]
  }
  // page 和 pageSize，这两项就算没有要求，如果query有这两个参数，则一并带上
  if (queryParams.page) queryForm.page = +queryParams.page
  if (queryParams.pageSize) queryForm.pageSize = +queryParams.pageSize
  // 审批状态和提现状态是同一个字段，如果不在搜索栏中，则在这里带上
  if (queryParams.stateList && !queryForm.stateList) queryForm.stateList = queryParams.stateList
  return queryForm
}
