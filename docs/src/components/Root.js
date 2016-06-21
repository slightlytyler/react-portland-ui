import React, { Component, PropTypes } from 'react';
import { getPackageByName, getPackagesByModule } from 'helpers';
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
      package: PropTypes.string,
    }),
  };

  getCurrentPackages = () => {
    const { packages } = this.props.route;
    const { module, package: pkg } = this.props.params;

    if (pkg) return [getPackageByName(packages, pkg)];
    if (module) return getPackagesByModule(packages, module);
    return packages;
  }

  render() {
    return (
      <div className="layout">
        <SideBar modules={this.props.route.modules} packages={this.props.route.packages} />
        <Content packages={this.getCurrentPackages()} />
      </div>
    );
  }
}
