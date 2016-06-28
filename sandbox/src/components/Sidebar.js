import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SideBar extends Component {

  Item = ({ module }) => (
    <Link
      className="item"
      activeClassName="active"
      to={`/${module}`}
    >
      {module}
    </Link>
  );

  render() {
    const { Item } = this;

    return (
      <div className="page__side-bar">
        <header className="header">Modules</header>
        <section className="list">
          <Item module="buttons" />
          <Item module="forms" />
        </section>
      </div>
    );
  }
}
