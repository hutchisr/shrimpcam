import React from 'react';

export default class Overlay extends React.Component {

  render() {
    const style = {
      display: 'block',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '10',
      textAlign: 'center',
      pointerEvents: 'none',
    };
    const Loading = <div className="progress w-25 m-auto">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}></div>
    </div>;
    const Play = <div className="btn btn-primary m-auto">Click to Play</div>;

    return <div style={style} className="w-100">
      {this.props.canPlay || Loading}
      {(this.props.paused && this.props.canPlay) && Play}
    </div>;
  }
}
