# React Portland UI

A component & pattern library based on the Portland UI Kit.

#### [Docs](http://react-portland-ui.surge.sh/)

## If you're reading this you're here too soon!

Star the repo and come back later. Maybe it will be finished :grin:

## Instillation

```
npm install --save react-portland-ui
```

There's two ways to include the styles; via the compiled `styles.css` or using the source stylus modules avaiable at `styles/index.styl`.

#### Using compiled styles

Best for simpler use cases without much customization.

From the root of your application:

```javascript
import 'react-portland-ui/styles.css'
```

#### Using stylus modules

For more advanced cases with custom styling needs. First, install [stylus-relative-loader](https://github.com/walmartlabs/stylus-relative-loader) and configure it to use the `resolve url` option.

From your stylus root:

```stylus
@import '~react-portland-ui/dist/stylus/index'
```

## Development

Clone the repo then

```
npm install
npm run dev
```

and navigate to `localhost:3000`.

## Documentation

```
npm run docs:dev
```

and navigate to `localhost:4000`.

Modules can be documented via their `documentation.md` file and comments inline with their `propTypes`.

#### Example

`modules/Button/index.js`

```javascript
import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * HTML type attribute
     */
    type: PropTypes.string,
    onClick: PropTypes.func,
    /**
     * If true button is ghost style
     */
    ghost: PropTypes.bool,
    /**
     * If true button expands to fill container
     */
    fluid: PropTypes.bool,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
  };

  render() {
    const classes = classnames(
      'pui--button',
      this.props.className,
      {
        ghost: this.props.ghost,
        fluid: this.props.fluid,
        big: this.props.big,
      }
    );

    if (this.context.reactFormalContext) {
      return (
        <FormalButton className={classes} type={this.props.type}>
          {this.props.children}
        </FormalButton>
      );
    }

    return (
      <button
        className={classes}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
```

`modules/Button/documentation.md`

```markdown
---
module: buttons
description: A button. Push it and it does stuff.
---

#### Basic button
<Example>
  <Button>Button</Button>
</Example>

#### Ghost button
<Example>
  <Button ghost>Button</Button>
</Example>

#### Big button
<Example>
  <Button big>Button</Button>
</Example>
```

The `name` attribute can be resolved from the markdown front matter or inferred from the component class name.
