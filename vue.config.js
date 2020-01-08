module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('sass')
      sassRule.uses.clear()
      sassRule.use('null-loader').loader('null-loader')
    }
  }
}
