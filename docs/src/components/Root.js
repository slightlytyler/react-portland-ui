import React, { Component, PropTypes } from 'react';
import { getPackageByName, getPackagesByModule } from 'helpers';
import { search } from 'utilities';
import SideBar from 'components/SideBar';
import Content from 'components/Content';

export default class Root extends Component {
  static propTypes = {
    route: PropTypes.shape({
      modules: PropTypes.array.isRequired,
      packages: PropTypes.array.isRequired,
    }),
    location: PropTypes.shape({
      query: PropTypes.shape({
        search: PropTypes.string,
      }),
    }),
    params: PropTypes.shape({
      module: PropTypes.string,
      package: PropTypes.string,
    }),
  };

  getQuery = () => this.props.location.query.search;

  getCurrentPackages = () => {
    const { packages } = this.props.route;
    const query = this.getQuery();

    if (query) {
      const results = search(query);
      return results.map(result => packages[result.ref]);
    }

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
