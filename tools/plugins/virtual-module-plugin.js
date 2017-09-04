/**
 * Created by Wu Jian Ping on 2017/3/20.
 * Most source code of this file is from https://github.com/rmarscher/virtual-module-webpack-plugin/blob/master/index.js
 * Thanks rmarscher
 */

import VirtualStats from '../libs/virtual-stats'

export default class VirtualModulePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const moduleName = this.options.moduleName
    let modulePath = this.options.path
    let contents
    if (typeof this.options.contents === 'string') {
      contents = this.options.contents
    } else if (typeof this.options.contents === 'object') {
      contents = JSON.stringify(this.options.contents)
    } else if (typeof this.options.contents === 'function') {
      contents = this.options.contents()
    } else {
      throw new Error('contents in options must be "string", "object" or "function"')
    }
    const stats = VirtualStats.create(contents)

    function resolverPlugin(request, callback) {
      const fs = this.fileSystem
      if (typeof request === 'string') {
        request = callback
        callback = null
      }

      if (!modulePath) {
        modulePath = this.join(compiler.context, moduleName)
      }
      if (!fs._readFileStorage.data.has(modulePath)) {
        fs._statStorage.data.set(modulePath, [null, stats])
        fs._readFileStorage.data.set(modulePath, [null, contents])
      }
      if (callback) {
        callback()
      }
    }

    if (!compiler.resolvers.normal) {
      compiler.plugin('after-resolvers', () => {
        compiler.resolvers.normal.plugin('resolve', resolverPlugin)
      })
    }
  }
}
