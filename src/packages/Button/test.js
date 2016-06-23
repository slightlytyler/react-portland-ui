import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { render, shallow } from 'enzyme';
import Button from './index';
import { Button as FormalButton } from 'react-formal';

describe('<Button />', () => {
  it('renders', () => {
    const wrapper = render(<Button />);
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
