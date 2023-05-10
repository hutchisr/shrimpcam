import React from 'react';

export default class Overlay extends React.Component {

  render() {
    const {paused, canPlay} = this.props;
    const style = {
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: '10',
      textAlign: 'center',
      pointerEvents: 'none',
      backgroundColor: paused || !canPlay ? 'rgba(0,0,0,0.8)' : 'transparent',
      transition: 'background-color 0.25s',
    };
    const Loading = <div className="progress w-25 m-auto">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}></div>
    </div>;
    const Play = <div className="btn btn-primary m-auto"><h1 className="oi oi-media-play m-3" /></div>;

    return <div style={style} className="d-flex flex-column">
      {canPlay || Loading}
      {(paused && canPlay) && Play}
    </div>;
  }
}
