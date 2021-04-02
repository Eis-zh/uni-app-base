let filePath = ''
let Timestamp = ''
//编译环境判断，可以根据不同环境来做相应的配置
if (process.env.UNI_PLATFORM === 'h5') {
  filePath = 'static/js/'
  Timestamp = '.' + new Date().getTime();

}

module.exports = {
  configureWebpack: { // webpack 配置 解决js缓存的问题，目前只适配H5端打包
    output: { // 输出重构  打包编译后的 文件目录 文件名称 【模块名称.时间戳】
      filename: `${filePath}[name]${Timestamp}.js`,
      chunkFilename: `${filePath}[name]${Timestamp}.js`
    },
  },
}
