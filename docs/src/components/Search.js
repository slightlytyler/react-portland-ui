import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import keycode from 'keycode';
import { Input } from 'pui';
import searchIcon from 'icons/search.icon.svg';

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
      <Input
        className="input"
        placeholder="Search Components"
        onKeyDown={this.handleKeyDown}
        icon={searchIcon}
        fluid
        thin
        ghost
      />
    );
  }
}

export default withRouter(Search);
