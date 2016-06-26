/* eslint-disable max-len */

import React, { Component } from 'react';
import { Button } from 'pui';
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
            <Button color="aqua" rounded thin>Rounded</Button>
            <Button color="#4C5BB4" icon={facebook} iconJustify="center" rounded thin>Share</Button>
            <Button color="green" dropdown={this.dropdownOptions} rounded thin>Dropdown</Button>
            <Button color="red" dropdown={this.dropdownOptions} dropdownDivider rounded thin>Dropdown</Button>
          </div>
          <div className="row">
            <Button thin ghost>Squared</Button>
            <Button rounded thin ghost>Rounded</Button>
            <Button icon={facebook} iconJustify="center" rounded thin ghost>Share</Button>
            <Button dropdown={this.dropdownOptions} rounded thin ghost>Dropdown</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider rounded thin ghost>Dropdown</Button>
          </div>
          <div className="row">
            <div className="pui--button__group rounded">
              <Button thin>First</Button>
              <Button thin>Second</Button>
              <Button thin>Third</Button>
            </div>
            <div className="pui--button__group rounded ghost">
              <Button thin>First</Button>
              <Button thin>Second</Button>
              <Button thin>Third</Button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="row">
            <Button>Squared</Button>
            <Button color="aqua" rounded>Rounded</Button>
            <Button color="dark-blue" icon={checkmark} iconSide="left" iconBackgroundColor="rgba(255, 255, 255, 0.2)" rounded>Checkbox</Button>
            <Button color="green" dropdown={this.dropdownOptions} rounded>Dropdown</Button>
            <Button color="red" dropdown={this.dropdownOptions} dropdownDivider rounded>Dropdown</Button>
          </div>
          <div className="row">
            <Button ghost>Squared</Button>
            <Button rounded ghost>Rounded</Button>
            <Button icon={checkmark} iconSide="left" iconColor="white" iconBackgroundColor="green" ghost rounded>Checkbox</Button>
            <Button dropdown={this.dropdownOptions} rounded ghost>Dropdown</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider rounded ghost>Dropdown</Button>
          </div>
          <div className="row">
            <div className="pui--button__group rounded">
              <Button>First</Button>
              <Button>Second</Button>
              <Button>Third</Button>
            </div>
            <div className="pui--button__group rounded ghost">
              <Button>First</Button>
              <Button>Second</Button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="row">
            <Button big>Squared</Button>
            <Button color="aqua" big rounded>Rounded</Button>
            <Button color="red" dropdown={this.dropdownOptions} dropdownDivider big rounded>Dropdown</Button>
          </div>
          <div className="row">
            <Button big ghost>Squared</Button>
            <Button big ghost rounded>Rounded</Button>
            <Button dropdown={this.dropdownOptions} dropdownDivider big ghost rounded>Dropdown</Button>
          </div>
        </div>
        <div className="panel">
          <div className="row">
            <Button fluid>Squared</Button>
          </div>
          <div className="row">
            <Button fluid ghost>Squared</Button>
          </div>
        </div>
      </div>
    );
  }
}
