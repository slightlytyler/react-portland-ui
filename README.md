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

## Development

```
npm test
```

Packages can be tested via their `test.js` file.

Tools you'll need to be familiar with: [Enzyme](https://github.com/airbnb/enzyme) [Chai](http://chaijs.com/) [Chai Enzyme](https://github.com/producthunt/chai-enzyme) [Sinon](http://sinonjs.org/)

After starting the tests **don't** close the spawned chrome browser, just minimize it.

#### Example

```javascript
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import Button from './index';
import { Button as FormalButton } from 'react-formal';

`modules/Button/test.js`

describe('<Button />', () => {
  it('renders', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).to.be.present();
  });

  it('render children', () => {
    const wrapper = shallow(<Button>Test</Button>);
    expect(wrapper).to.have.text('Test');
  });

  it('renders a form button when in form context', () => {
    const context = { reactFormalContext: true };
    const wrapper = shallow(<Button />, { context });
    expect(wrapper.find(FormalButton)).to.have.length(1);
  });

  it('accepts a className', () => {
    const wrapper = shallow(<Button className="some-class" />);
    expect(wrapper).to.have.className('some-class');
  });

  it('accepts a type', () => {
    const wrapper = shallow(<Button type="submit" />);
    expect(wrapper).to.have.attr('type', 'submit');
  });

  it('accepts an onClick action', () => {
    const onClick = spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

  it('accepts a ghost prop', () => {
    const wrapper = shallow(<Button ghost />);
    expect(wrapper).to.have.className('ghost');
  });

  it('accepts a fluid prop', () => {
    const wrapper = shallow(<Button fluid />);
    expect(wrapper).to.have.className('fluid');
  });

  it('accepts a big prop', () => {
    const wrapper = shallow(<Button big />);
    expect(wrapper).to.have.className('big');
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
