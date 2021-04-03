import anyTest, { TestInterface } from 'ava'
import proxy from '../src'
import * as url from 'url'
import { Context } from 'keq'
import * as sinon from 'sinon'


const test = anyTest as TestInterface<{ ctx: Context }>


test.beforeEach(t => {
  t.context.ctx = {
    url: {
      ...url.parse('http://example.com/api/api_path', true),
      params: {}
    }
  } as Context
})

test('Proxy Host', async t => {
  const next = sinon.fake()

  await proxy('example.com', 'expect.com')(t.context.ctx, next)

  t.true(next.calledOnce)
  t.is(t.context.ctx.url.href, 'http://expect.com/api/api_path')
})

test('Proxy Regexp Replace', async t => {
  const next = sinon.fake()

  await proxy.replace(/^http:\/\/example.com\/api/, 'https://expect.com')(t.context.ctx, next)


  t.true(next.calledOnce)
  t.is(t.context.ctx.url.href, 'https://expect.com/api_path')
})
