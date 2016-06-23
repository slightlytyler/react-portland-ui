import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import keycode from 'keycode';

export class Search extends Component {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  handleKeyDown = e => {
    if (keycode(e) === 'enter') {
      const { target } = e;

      if (target.value) {
        this.props.router.push({
          pathname: '/',
          query: { search: target.value },
        });
      } else {
        this.props.router.push('/');
      }

      target.value = '';
    }
  };

  render() {
    return (
      <input
        className="input"
        placeholder="Search Components"
        onKeyDown={this.handleKeyDown}
        autoFocus
      />
    );
  }
}

export default withRouter(Search);
