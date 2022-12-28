/**
 * Modules exported from this file can be used by users
 */

import { Middleware } from 'keq'
import { URL } from 'whatwg-url'


export type KeqProxyReplacer = (substring: string, ...args: any[]) => string
interface KeqProxy {
  (from: Host, to: Host): Middleware

  replace(searchValue: RegExp | string, replaceValue: string | KeqProxyReplacer): Middleware
  module(moduleName: string, url: string): Middleware
}

type Host = Readonly<string>


const proxy: KeqProxy = function(from, to) {
  return async(ctx, next) => {
    if (ctx.url.host === from) ctx.url.host = to
    await next()
  }
}


proxy.replace = function(regexp, replaceValue) {
  return async(ctx, next) => {
    const href = ctx.url.href
    ctx.url.href = href.replace(regexp, replaceValue as any)

    await next()
  }
}

proxy.module = function(moduleName: string , uri: string) {
  if (typeof uri !== 'string') {
    throw new TypeError(`the arguments should be a string, but get ${typeof uri}`)
  }

  return async(ctx, next) => {
    if (ctx.options.module?.name === moduleName) {
      const pathname: string = ctx.options.module.pathname.replace(/^\/+/, '')

      if (uri[0] === '/') {
        const url = uri[uri.length - 1] === '/' ? uri.replace(/\/$/g, '') : uri

        ctx.url.pathname = `${url}/${pathname}`
      } else {
        const url = new URL(uri)

        ctx.url.protocol = url.protocol
        ctx.url.host = url.host
        ctx.url.username = url.username
        ctx.url.password = url.password

        ctx.url.pathname = `${url.pathname.replace(/\/$/g, '')}/${pathname}`
      }
    }

    await next()
  }
}

export default proxy
