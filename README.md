# keq-proxy

[![version](https://img.shields.io/npm/v/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![downloads](https://img.shields.io/npm/dm/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![license](https://img.shields.io/npm/l/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![dependencies](https://img.shields.io/librariesio/github/keq-request/keq-proxy.svg?style=flat-square)](https://www.npmjs.com/package/keq-proxy)
[![coveralls](https://img.shields.io/coveralls/github/keq-request/keq-proxy.svg?style=flat-square)](https://coveralls.io/github/keq-request/keq-proxy)



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


## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
