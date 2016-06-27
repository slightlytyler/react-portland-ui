/* eslint-disable max-len */

import React, { Component } from 'react';
import { Button, ButtonGroup } from 'pui';
import facebook from 'icons/facebook.svg';
import checkmark from 'icons/checkmark.svg';

export default class Buttons extends Component {
  dropdownOptions = [
    { value: 'Test' },
    { value: 'test2', label: 'test2' },
    'Test3',
    () => console.log('action from dropdown'), // eslint-disable-line no-console
  ];

  render() {
    return (
      <div className="module--buttons">
        <div className="panel">
          <div className="row">
            <Button thin>Squared</Button>
            <Button background="aqua-a" rounded thin>Rounded</Button>
            <Button background="#4C5BB4" icon={facebook} iconJustify="center" rounded thin>Share</Button>
            <Button background="green-a" dropdown={this.dropdownOptions} rounded thin>Dropdown</Button>
            <Button background="red-a" dropdown={this.dropdownOptions} dropdownDivider rounded thin>Dropdown</Button>
          </div>
          <div className="row">
            <Button thin ghost>Squared</Button>
            <Button rounded thin ghost>Rounded</Button>
            <Button icon={facebook} iconJustify="center" rounded thin ghost>Share</Button>
            <Button dropdown={this.dropdownOptions} rounded thin ghost>Dropdown</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider rounded thin ghost>Dropdown</Button>
          </div>
          <div className="row">
            <Button thin fluid>Fluid</Button>
          </div>
          <div className="row">
            <ButtonGroup background="dark-blue-a" rounded thin>
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </ButtonGroup>
            <ButtonGroup ghost rounded thin>
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="panel">
          <div className="row">
            <Button>Squared</Button>
            <Button background="aqua-a" rounded>Rounded</Button>
            <Button background="dark-blue-a" icon={checkmark} iconSide="left" iconBackground="rgba(255, 255, 255, 0.2)" rounded>Checkbox</Button>
            <Button background="green-a" dropdown={this.dropdownOptions} rounded>Dropdown</Button>
            <Button background="red-a" dropdown={this.dropdownOptions} dropdownDivider rounded>Dropdown</Button>
          </div>
          <div className="row">
            <Button ghost>Squared</Button>
            <Button rounded ghost>Rounded</Button>
            <Button icon={checkmark} iconSide="left" iconColor="white" iconBackground="green-a" ghost rounded>Checkbox</Button>
            <Button dropdown={this.dropdownOptions} rounded ghost>Dropdown</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider rounded ghost>Dropdown</Button>
          </div>
          <div className="row">
            <Button fluid>Fluid</Button>
          </div>
          <div className="row">
            <ButtonGroup background="dark-blue-a" rounded>
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </ButtonGroup>
            <ButtonGroup rounded ghost>
              <Button>First</Button>
              <Button>Second</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="panel">
          <div className="row">
            <Button big>Squared</Button>
            <Button background="aqua-a" big rounded>Rounded</Button>
            <Button background="red-a" dropdown={this.dropdownOptions} dropdownDivider big rounded>With Dropdown</Button>
          </div>
          <div className="row">
            <Button big ghost>Squared</Button>
            <Button big ghost rounded>Rounded</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider big ghost rounded>With Dropdown</Button>
          </div>
          <div className="row">
            <Button big fluid>Fluid</Button>
          </div>
          <div className="row">
            <ButtonGroup background="dark-blue-a" big rounded>
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
