import proxy from '../src'
import * as sinon from 'sinon'
import { test } from './test.before-each'


test('Proxy Host', async t => {
  const next = sinon.fake()

  await proxy('example.com', 'expect.com')(t.context.ctx, next)

  t.true(next.calledOnce)
  t.is(t.context.ctx.url.href, 'http://expect.com/api/api_path?query=1')
})

test('Proxy Regexp Replace', async t => {
  const next = sinon.fake()

  await proxy.replace(/^http:\/\/example.com\/api/, 'https://expect.com')(t.context.ctx, next)


  t.true(next.calledOnce)
  t.is(t.context.ctx.url.href, 'https://expect.com/api_path?query=1')
})
