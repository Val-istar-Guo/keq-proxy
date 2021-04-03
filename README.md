# keq-proxy

[![version](https://img.shields.io/npm/v/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![downloads](https://img.shields.io/npm/dm/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![license](https://img.shields.io/npm/l/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![coveralls](https://img.shields.io/coveralls/github/Val-istar-Guo/keq-proxy.svg?style=flat-square)](https://coveralls.io/github/Val-istar-Guo/keq-proxy)



<!-- description -->
Change the request url, just like a proxy.
<!-- description -->

## Usage

<!-- usage -->
```javascript
import { request } from 'keq'
import proxy from 'keq-proxy'

// Host Proxy
request.use(proxy('example.com', 'expect.com'))

// OR
request.use(proxy(/http:\/\/example.com/, 'http://expect.com'))
```
<!-- usage -->

<!-- addition --><!-- addition -->

## Sponsor

Support code development on patron.

[![patron](https://c5.patreon.com/external/logo/become_a_patron_button@2x.png)](https://www.patreon.com/bePatron?u=22478507)

## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
