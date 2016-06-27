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
