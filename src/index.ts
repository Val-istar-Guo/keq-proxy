/**
 * Modules exported from this file can be used by users
 */

import { Middleware } from 'keq'
import * as url from 'url'


export type KeqProxyReplacer = (substring: string, ...args: any[]) => string
interface KeqProxy {
  (from: Host, to: Host): Middleware

  replace(searchValue: RegExp | string, replaceValue: string | KeqProxyReplacer): Middleware
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
    if (typeof ctx.options.module === 'string' && ctx.options.module === moduleName) {
      if (!ctx.module) throw new Error('Please set the module middleware first.')
      const pathname = ctx.module.pathname

      ctx.url = {
        ...url.parse(`${uri.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`, true),
        query: ctx.url.query,
        params: ctx.url.params,
      }
    } else if (ctx.options.module?.name === moduleName) {
      const pathname = ctx.options.module.pathname

      ctx.url = {
        ...url.parse(`${uri.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`, true),
        query: ctx.url.query,
        params: ctx.url.params,
      }
    }

    await next()
  }
}

export default proxy
