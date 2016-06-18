import React, { Component, PropTypes } from 'react';

export default class PropTypesDocumentation extends Component {
  static propTypes = {
    propTypes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="documentation__prop-types">propTypes</div>
    );
  }
}
