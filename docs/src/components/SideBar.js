import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import logo from 'assets/images/see-er.png';

export default class SideBar extends Component {
  static propTypes = {
    modules: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="page__side-bar">
        <header className="header">
          <h1 className="title">React Portland UI</h1>
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
              {module}
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
