import React, { Component, PropTypes } from 'react';
import { getPackagesForModule } from 'helpers';
import SideBar from 'components/SideBar';
import Content from 'components/Content';

export default class Root extends Component {
  static propTypes = {
    route: PropTypes.shape({
      modules: PropTypes.array.isRequired,
      packages: PropTypes.array.isRequired,
    }),
    params: PropTypes.shape({
      module: PropTypes.string,
    }),
  };

  getCurrentPackages = () => getPackagesForModule(
    this.props.route.packages,
    this.props.params.module
  );

  render() {
    return (
      <div className="layout">
        <SideBar modules={this.props.route.modules} currentModule={this.props.params.module} />
        <Content packages={this.getCurrentPackages()} />
      </div>
    );
  }
}
