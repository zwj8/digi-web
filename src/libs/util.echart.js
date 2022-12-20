import dayjs from 'dayjs'
import _ from 'lodash'
import { VIP_TYPE } from '@/constants/config'
/**
 * @description: 处理接口返回数据给echart使用 - 柱状图 - 月度
 * @param {*} option
 * @return {*}
 */
export const formatEchartsOption = option => {
  const now = new Date()
  // x坐标
  const dateList = (now => {
    let num = 1
    const arr = []
    while (num <= now.getDate()) {
      let tmp = num
      if (num < 10) {
        tmp = '0' + num
      }
      arr.push(tmp + '')
      num++
    }
    return arr
  })(now)
  // 对应X坐标的数据
  const seriesList = dateList.map(v => {
    if (option.data.dailyMap && option.data.dailyMap[v]) {
      if (option.type === '金额') {
        const count = option.data.dailyMap[v] / 100
        return count.toFixed(2)
      }
      return option.data.dailyMap[v]
    }
    return 0
  })

  return _formatBarOption(dateList, seriesList, option)
}

/**
 * @description: 仪表盘用，近30天数据 - 柱状图
 * @param {*} option
 * @return {*}
 */
export const formatMonthBarEchartsOption = option => {
  // 最近30天日期 - X坐标
  const dateList = last30dates()

  // 对应X坐标的数据
  const seriesList = dateList.map(v => {
    if (option.data.dailyMap && option.data.dailyMap[v]) {
      if (option.type === '金额') {
        const count = option.data.dailyMap[v] / 100
        return count.toFixed(2)
      }
      return option.data.dailyMap[v]
    }
    return 0
  })

  return _formatBarOption(dateList, seriesList, option)
}

/**
 * @description: 处理柱状图图表参数
 * @param {*} dateList
 * @param {*} seriesList
 * @param {*} option
 * @return {*}
 */
function _formatBarOption (dateList, seriesList, option) {
  return {
    title: {
      text: `${option.title}-当前周期总计`,
      textStyle: {
        color: '#bababa',
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 30
      },
      subtext: option.data.monthTotalLabel,
      subtextStyle: {
        lineHeight: 40,
        fontSize: 40,
        fontWeight: 'bold'
      },
      left: 20
    },
    toolbox: {
      right: '80px',
      top: '20px',
      feature: {
        restore: {
          title: '刷新'
        }
      }
    },
    grid: {
      top: '30%'
    },
    tooltip: {},
    xAxis: {
      data: dateList,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {},
    series: [
      {
        name: option.type,
        type: 'bar',
        data: seriesList,
        barWidth: '5px'
      }
    ]
  }
}

/**
 * @description: 用户状态分布 - 饼图
 * @param {*} option
 * @return {*}
 */
export const formatMonthPieEchartsOption = option => {
  const seriesList = Object.keys(option.data).map(key => {
    return {
      name: VIP_TYPE.find(f => f.key === key)?.label,
      value: option.data[key]
    }
  })
  return _formatPieOption(seriesList, option)
}

/**
 * @description: 处理饼图数据
 * @param {*} seriesList
 * @param {*} option
 * @return {*}
 */
function _formatPieOption (seriesList, option) {
  return {
    title: {
      text: option.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    toolbox: {
      right: '80px',
      feature: {
        restore: {
          title: '刷新'
        }
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: seriesList,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

/**
 * @description: 返回最近30天日期
 * @param {*}
 * @return {*}
 */
function last30dates () {
  const endDayjs = dayjs()
  const endMonth = endDayjs.month() + 1
  const endMonthString = endMonth < 10 ? '0' + endMonth.toString() : endMonth.toString()
  const endDate = endDayjs.date()
  const startDayjs = dayjs().subtract(29, 'days')
  const startMonth = startDayjs.month() + 1
  const startMonthString = startMonth < 10 ? '0' + startMonth.toString() : startMonth.toString()
  const startDate = startDayjs.date()
  const dates = []
  if (endMonth === startMonth) {
    // 同一个月，直接改变天数
    _.each(_.range(startDate, endDate + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`${endMonthString}.${item}`)
    })
  } else if (endMonth === startMonth + 1 || startMonth - endMonth === 11) {
    // 上一个月和当前月
    // 上个月
    _.each(_.range(startDate, startDayjs.daysInMonth() + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`${startMonthString}.${item}`)
    })

    // 当前月
    _.each(_.range(1, endDate + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`${endMonthString}.${item}`)
    })
  } else if (endMonth === startMonth + 2) {
    // 上上个月、上个月和当前月，遇到 2 月时
    // 上上个月
    _.each(_.range(startDate, startDayjs.daysInMonth() + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`${startMonthString}.${item}`)
    })

    // 2 月
    _.each(_.range(1, startDayjs.add(1, 'months').daysInMonth() + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`02.${item}`)
    })

    // 当前月
    _.each(_.range(1, endDate + 1), (item) => {
      if (item < 10) {
        item = '0' + item.toString()
      }
      dates.push(`${endMonthString}.${item}`)
    })
  }

  return dates
}
