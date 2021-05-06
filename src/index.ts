/**
 * Modules exported from this file can be used by users
 */

import { Middleware } from 'keq'
import * as url from 'url'


export type KeqProxyReplacer = (substring: string, ...args: any[]) => string
interface KeqProxy {
  (from: Host, to: Host): Middleware

  replace(searchValue: RegExp | string, replaceValue: string | KeqProxyReplacer): Middleware
  // replace(searchValue: string, replaceValue: string): Middleware
  module(moduleName: string, url: string): Middleware
}

type Host = Readonly<string>


const proxy: KeqProxy = function(from, to) {
  return async(ctx, next) => {
    if (ctx.url.host === from) {
      ctx.url = {
        ...url.parse(url.format({ ...ctx.url, host: to }), true),
        params: ctx.url.params,
      }
      ctx.url.host = to
    }
    await next()
  }
}


proxy.replace = function(regexp, replaceValue) {
  return async(ctx, next) => {
    const href = url.format(ctx.url)
    ctx.url = {
      ...url.parse(href.replace(regexp, replaceValue as any), true),
      params: ctx.url.params,
    }

    await next()
  }
}

proxy.module = function(moduleName , uri) {
  return async(ctx, next) => {
    if (ctx.options.module === moduleName) {
      if (!ctx.module) throw new Error('Please set the module middleware first.')

      const pathname = ctx.module.pathname
      uri = `${uri.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`

      ctx.url = {
        ...url.parse(uri, true),
        params: ctx.url.params,
      }
    }

    await next()
  }
}

export default proxy
