/**
 * @module footer
 */

import React from 'react';

export default class Footer extends React.Component {

  /**
   *
   * @param {MouseEvent} ev
   */
  handlePlayerClick(ev) {
    ev.preventDefault();
    this.props.setPlayer(this.props.video.player === 'hls' ? 'dash' : 'hls');
  }

  render() {
    // return <div className="container mt-5 pb-5">
    //   <div className="card">
    //     <h6 className="card-header">Options</h6>
    //     <div className="card-body">
    //       <a onClick={this.handlePlayerClick.bind(this)} className={`btn btn-sm ${this.props.video.player === 'dash' ? 'btn-outline-success' : 'btn-outline-warning'}`} href="#">
    //         Use {this.props.video.player === 'dash' ? 'HLS Player' : 'MPEG-DASH Player (Experimental)'}
    //       </a>
    //     </div>
    //   </div>
    // </div>;
    return null;
  }
}
