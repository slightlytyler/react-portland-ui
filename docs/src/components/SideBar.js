import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { kebabCase, startCase } from 'lodash';
import { Icon } from 'pui';
import { getPackagesByModule } from 'helpers';
import Search from './Search';
import logo from 'images/see-er.png';
import radio from 'icons/radio.icon.svg';

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
      {startCase(pkg.name)}
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
        <Icon className="icon" svg={radio} />
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
          <Search />
        </section>
        <section className="list">
          {this.props.modules.map(this.renderItem)}
        </section>
      </div>
    );
  }
}
