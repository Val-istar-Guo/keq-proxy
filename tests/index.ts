import anyTest, { TestInterface } from 'ava'
import proxy from '../src'
import { Context } from 'keq'
import * as sinon from 'sinon'
import { KeqURL } from 'keq/lib/src/keq-url'


const test = anyTest as TestInterface<{ ctx: Context }>


test.beforeEach(t => {
  t.context.ctx = {
    url: new KeqURL('http://example.com/api/api_path?query=1'),
  } as Context
})

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
