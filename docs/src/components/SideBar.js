import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'pui';
import logo from 'assets/images/see-er.png';
import radio from 'assets/icons/radio.svg';

export default class SideBar extends Component {
  static propTypes = {
    modules: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="page__side-bar">
        <header className="header">
          <h1 className="title">
            <Link to="/">React Portland UI</Link>
          </h1>
          <h3 className="by">
            <div className="label">built by</div>
            <div className="logo">
              <img className="image" alt="logo" src={logo} />
            </div>
          </h3>
        </header>
        <section className="search">
          <input className="input" placeholder="Search Components" />
        </section>
        <section className="list">
          {this.props.modules.map(module => (
            <Link
              key={module}
              to={`/${module}`}
              className="item"
              activeClassName="active"
            >
              <Icon className="icon" path={radio} /> {module}
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
