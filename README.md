# React Portland UI

[![Build Status](https://travis-ci.org/slightlytyler/react-portland-ui.svg?branch=master)](https://travis-ci.org/slightlytyler/react-portland-ui)

A component & pattern library based on the Portland UI Kit.

#### [Docs](http://react-portland-ui.surge.sh/)

## If you're reading this you're here too soon!

Star the repo and come back later. Maybe it will be finished :grin:

## Instillation

```
npm install --save react-portland-ui
```

There's two ways to include the styles; via the compiled `styles.css` or using the source stylus modules avaiable at `stylus/index.styl`.

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

To use the dev version in other project use [npm link](https://docs.npmjs.com/cli/link). For local development use the sandbox.

#### Sandbox

A sandbox environment is included under `sandbox`.

```
npm run sandbox:dev
```

and navigate to `localhost:5000`.

## Testing

```
npm test
```

Packages can be tested via their `test.js` file.

Tools you'll need to be familiar with: [karma](https://karma-runner.github.io/1.0/index.html), [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [sinon](http://sinonjs.org/), [enzyme](https://github.com/airbnb/enzyme), [sinon-chai](https://github.com/domenic/sinon-chai), [chai-enzyme](https://github.com/producthunt/chai-enzyme).

After starting the tests **don't** close the spawned chrome browser, just minimize it.

#### Example

`packages/Button/test.js`

```javascript
import React from 'react';
import { spy } from 'sinon';
import { render, shallow } from 'enzyme';
import Button from './index';
import { Button as FormalButton } from 'react-formal';

describe('<Button />', () => {
  it('renders', () => {
    const wrapper = render(<Button />);
    wrapper.should.be.present();
  });

  it('render children', () => {
    const wrapper = shallow(<Button>Test</Button>);
    wrapper.should.have.text('Test');
  });

  it('renders a form button when in form context', () => {
    const context = { reactFormalContext: true };
    const wrapper = shallow(<Button />, { context });
    wrapper.find(FormalButton).should.have.length(1);
  });

  it('accepts a className', () => {
    const wrapper = shallow(<Button className="some-class" />);
    wrapper.should.have.className('some-class');
  });

  it('accepts a type', () => {
    const wrapper = shallow(<Button type="submit" />);
    wrapper.should.have.attr('type', 'submit');
  });

  it('accepts an onClick action', () => {
    const onClick = spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    onClick.should.have.been.calledOnce;
  });

  it('accepts a ghost prop', () => {
    const wrapper = shallow(<Button ghost />);
    wrapper.should.have.className('ghost');
  });

  it('accepts a fluid prop', () => {
    const wrapper = shallow(<Button fluid />);
    wrapper.should.have.className('fluid');
  });

  it('accepts a big prop', () => {
    const wrapper = shallow(<Button big />);
    wrapper.should.have.className('big');
  });
});
```

## Documentation

```
npm run docs:dev
```

and navigate to `localhost:4000`.

Packages can be documented via their `documentation.md` file and comments inline with their `propTypes`.

#### Example

`packages/Button/index.js`

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

`packages/Button/documentation.md`

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
