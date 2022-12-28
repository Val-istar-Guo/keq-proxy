import anyTest, { TestFn } from 'ava'
import { Context } from 'keq'
import { KeqURL } from 'keq/lib/src/keq-url'


export const test = anyTest as TestFn<{
  ctx: Context
}>

test.beforeEach(t => {
  t.context.ctx = {
    url: new KeqURL('http://example.com/api/api_path?query=1'),
  } as Context
})
