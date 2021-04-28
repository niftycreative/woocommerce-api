import axios from 'axios'
import createHMac from 'create-hmac'
import OAuth from 'oauth-1.0a'
import UrlParse from 'url-parse'

class WooCommerceRestApi {
  constructor(options) {
    if (!(this instanceof WooCommerceRestApi)) {
      return new WooCommerceRestApi(options);
    }

    options = options || {}
    if (!options.url) throw new OptionsException("url is required")
    if (!options.consumerKey) throw new OptionsException("consumerKey is required")
    if (!options.consumerSecret) throw new OptionsException("consumerSecret is required")
    this.setDefaults(options)
  }

  setDefaults(options) {
    this.url = options.url
    this.wpApiPrefix = options.wpApiPrefix || 'wp-json'
    this.version = options.version || 'wc/v3'
    this.secure = options.secure || true
    this.consumerKey = options.consumerKey
    this.consumerSecret = options.consumerSecret
    this.port = options.port || ''
    this.timeout = options.timeout
  }

  getUrl(endpoint, params) {
    const api = `${this.wpApiPrefix}/`
    let url = this.url.slice(-1) === '/'
      ? this.url + api + `${this.version}/` + endpoint
      : `${this.url}/` + api + `${this.version}/` + endpoint
    
    // Add port if required
    if (this.port !== '') {
      const hostname = new UrlParse(url).hostname
      url = url.replace(hostname, hostname + ":" + this.port)
    }

    return url
  }
}

export default WooCommerceRestApi
