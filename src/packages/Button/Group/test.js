import React from 'react';
import { render, shallow } from 'enzyme';
import ButtonGroup from './index';
import Button from '../Base';

describe('<ButtonGroup />', () => {
  it('renders', () => {
    const wrapper = render(<ButtonGroup><Button /></ButtonGroup>);
    wrapper.should.be.present();
  });

  it('renders a collection of Buttons', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button />
        <Button />
        <Button />
      </ButtonGroup>
    );
    wrapper.should.have.exactly(3).descendants(Button);
  });

  it('passes through props to Button', () => {
    const passThroughProps = {
      background: 'red',
      color: 'green',
      big: true,
      ghost: true,
      rounded: true,
      thin: true,
    };
    const wrapper = shallow(
      <ButtonGroup {...passThroughProps}>
        <Button />
      </ButtonGroup>
    );
    const button = wrapper.find(Button);
    Object.keys(passThroughProps).forEach(key => (
      button.should.have.prop(key, passThroughProps[key])
    ));
  });
});
