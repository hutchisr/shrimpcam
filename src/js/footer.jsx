/**
 * @module footer
 */

import React from 'react';

export default class Footer extends React.Component {

  render() {
    return <div className="container mt-5 pb-5">
      <div className="card">
        <h6 className="card-header">Options</h6>
        <div className="card-body">
          <a onClick={this.props.togglePlayer} className={`btn btn-sm ${this.props.dash ? 'btn-outline-success' : 'btn-outline-warning'}`} href="#">
            Use {this.props.dash ? 'HLS Player' : 'MPEG-DASH Player (Experimental)'}
          </a>
        </div>
      </div>
    </div>;
  }
}