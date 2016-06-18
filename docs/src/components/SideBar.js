import React, { Component } from 'react';
import { modules } from 'constants';
import logo from 'assets/images/see-er.png';

export default class SideBar extends Component {
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
        <ul className="list">
          {modules.map(module => (
            <li key={module} className="item">{module}</li>
          ))}
        </ul>
      </div>
    );
  }
}
