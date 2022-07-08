class Attribute {

  constructor (attributes) {
    const self = this
    if (Array.isArray(attributes)) {
      attributes.forEach(function (item) {
        let key = ''
        let value = null
        if (Array.isArray(item)) {
          key = item.shift()
          value = item.length === 1 ? item[0] : item
        }
        else if (typeof item === 'object') {
          key = item.key || ''
          value = item.value || null
        }
        self.setAttribute(key, value)
      })
    }
    else if (typeof attributes === 'object') {
      Object.keys(attributes).forEach(function (key) {
        self.setAttribute(key, attributes[key])
      })
    }
  }

  addClass(value) {
    const self = this
    const classes = this.hasAttribute('class') ? this.class.split(' ') : []
    if (Array.isArray(value)) {
      value.forEach(function (val) {
        self.addClass(val)
      })
    }
    else {
      const index = classes.indexOf(value)
      if (index === -1) {
        classes.push(value)
        this.setAttribute('class', classes)
      }
    }
    return this;
  }

  removeClass(value) {
    const classes = this.hasAttribute('class') ? this.class.split(' ') : []
    const index = classes.indexOf(value)
    if (index > -1) {
      classes.splice(index, 1)
      this.setAttribute('class', classes)
    }
    return this;
  }

  getClass() {
    return this.hasAttribute('class') ? this.class : '';
  }

  hasClass(value) {
    const classes = this.hasAttribute('class') ? this.class.split(' ') : []
    return Boolean(classes.indexOf(value) > -1);
  }

  setAttribute(key, value) {
    if (key) {
      this[key] = Array.isArray(value) ? value.join(' ') : value
    }
    return this;
  }

  hasAttribute(key) {
    return Boolean(typeof this[key] !== 'undefined' && this[key]);
  }

  removeAttribute(key) {
    if (typeof this[key] !== 'undefined') {
      delete this[key]
    }
    return this;
  }

  toString() {
    const self = this
    let result = []
    Object.keys(this).forEach(function (key) {
      result.push(key + '="' + self[key] + '"')
    })
    return result.length ? ' ' + result.join(' ') : '';
  }

  toArray() {
    const self = this
    let result = {}
    Object.keys(this).forEach(function (key) {
      result[key] = self[key] ? self[key].split(' ') : []
    })
    return result;
  }
}

exports.Attribute = Attribute;