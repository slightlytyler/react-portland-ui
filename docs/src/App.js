import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        {__DOC_DATA__.map(component => (
          <div key={component.config.name}>{component.config.code}</div>
        ))}
      </div>
    );
  }
}
