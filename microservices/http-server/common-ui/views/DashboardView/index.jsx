import React from 'react';
import NavBar from '../../components/NavBar';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>This is the dashboard view.</div>
      </div>
    );
  }
}
