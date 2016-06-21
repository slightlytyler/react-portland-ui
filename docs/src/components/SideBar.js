import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { kebabCase } from 'lodash';
import { Icon } from 'pui';
import { getPackagesByModule } from 'helpers';
import logo from 'assets/images/see-er.png';
import radio from 'assets/icons/radio.svg';

export default class SideBar extends Component {
  static propTypes = {
    modules: PropTypes.array.isRequired,
    packages: PropTypes.array.isRequired,
  };

  renderItemDropdownElement = (pkg, module) => (
    <Link
      key={pkg.name}
      to={`/${module}/${kebabCase(pkg.name)}`}
      className="element"
      activeClassName="active"
    >
      {pkg.name}
    </Link>
  );

  renderItemDropdown = module => (
    <section className="dropdown">
      {getPackagesByModule(this.props.packages, module).map(pkg => (
        this.renderItemDropdownElement(pkg, module)
      ))}
    </section>
  );

  renderItem = module => (
    <section key={module} className="item">
      <Link
        to={`/${module}`}
        className="body"
        activeClassName="active"
      >
        <Icon className="icon" path={radio} />
        {module}
      </Link>
      {this.renderItemDropdown(module)}
    </section>
  );

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
          {this.props.modules.map(this.renderItem)}
        </section>
      </div>
    );
  }
}
