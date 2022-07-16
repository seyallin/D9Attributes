# D9Attributes
Node js library for drupal attribute object emulation.

# drupal-attribute

Node js library for [drupal attribute](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Template!Attribute.php/class/Attribute) object emulation.

Main idea is using this library in projects with twig templates for components organize, like [StoryBook](https://storybook.js.org/) or etc.

## Installation

```bash
npm install d9attributes

## How to use.
```

In my case, I combine the Storybook React and Storybook HTML versions(I know this method is not preferred, but I need this in my task).

First one - add to twig the function `createAttribute` and made fix for filter `without` in the file `.storybook/preview.js`:

```code
import Twig from 'twig';
const { Attribute } = require('d9attributes')

const createAttribute = (data) => new Attribute(data);

const without = function (element) {
  if (!element) {
    return []
  }

  const filteredElement = Object.assign(Object.create(Object.getPrototypeOf(element)), element)

  let args = Array.prototype.slice.call(arguments, 1)
  if (args[0]) {
    for (let name of Object.keys(filteredElement)) {
      if (args[0].includes(name)) {
        delete filteredElement[name]
      }
    }
  }
  return filteredElement
}

...

Twig.extendFunction('create_attribute', createAttribute);
Twig.extendFilter('without', without);
```

Second one - create the React component `Template`(`utils/template.js`) with code:

```code
import React from 'react'
import parse from 'html-react-parser'
import { Attribute } from 'd9attributes'

class Template extends React.Component {
  constructor (props) {
    super(props);
  }
  checkAttributes = (args) => {
    const attributes = ['attributes', 'title_attributes'];
    const items = ['items', 'below'];
    const self = this;
    if (typeof args !== 'object') {
      return args;
    }
    Object.keys(args).forEach((key) => {
      if (items.indexOf(key, key.toLowerCase()) !== -1 && args[key].length) {
        args[key].forEach((item) => self.checkAttributes(item))
      }
      else if (attributes.indexOf(key, key.toLowerCase()) !== -1) {
        args[key] = new Attribute(args[key]);
      }
    })
    if (typeof args.attributes === 'undefined') {
      args.attributes = new Attribute();
    }
  }
  render () {
    let args = this.props.data;
    this.checkAttributes(args);
    return parse(this.props.template(args));
  }
}

export default Template;
```

Third one - add the namespace for utils folder to the `main.js`(`.storybook/main.js`) file:
```code
module.exports = {
  
  ...
  
  "webpackFinal": async (config, { configType }) => {

    // Alias
    config.resolve.alias = {
      '@utils': path.resolve(__dirname, '..', 'utils'),
      
      ...
      
    }
    
    ...
    
  }
}
```

Firth one - use your `Template` component for your components in the `*.stories.js` files, for exapmle:

```code
// Import twig file.
import template from './template.twig'
// Import twig data.
import data from './block.yaml'
// Import own component.
import Template from '@utils/template'

...

const Html = args => <Template template={template} data={args}/>

export const BlockTemplate = Html.bind({})
BlockTemplate.args = data
...


```

Thank you for your attention :)
## License

Apache-2.0 © [Serhii Yallin]()