import csvExportor from 'csv-exportor'

/* eslint-disable no-undef */
const io = {}

/**
 * 从 CSV 文件导入
 * @param {boolean} onlyDev 是否仅判断development环境
 */
io.importCsv = function () {

}

/**
 * 从 CSV 文件逐行导入
 * @param {boolean} onlyDev 是否仅判断development环境
 */
io.importCsvRows = function () {

}

/**
 * @description: 导出数据到CSV
 * @param {*} data 要导出的数据
 * @param {*} header csv每列的标题
 * @param {*} fileName 导出的文件名，如果为空，则取导出时的时间戳
 * @return {*}
 */
io.export2Csv = function (data, header, fileName) {
  if (!fileName) fileName = `${new Date().getTime()}`
  csvExportor.downloadCsv(data, { header }, fileName + '.csv')
}

/**
 * 导出 Excel
 */
io.export2Excel = function (header, data) {

}

export default io
