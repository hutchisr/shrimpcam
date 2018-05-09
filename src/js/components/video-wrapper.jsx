import React from 'react';

class VideoWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { component: null };
  }
  componentDidMount() {
    const { player } = this.props;
    this.setPlayer(player);
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props;
    if (player !== prevProps.player)
      this.setPlayer(player);
  }

  async setPlayer(player) {
    let Component;

    if (player === 'hls') {
      ({ default: Component } = await import(/* webpackChunkName: "hls" */ './hls'));
    } else if (player === 'dash') {
      ({ default: Component } = await import(/* webpackChunkName: "dash" */ './dash'));
    }

    this.setState({ Component });
  }

  render() {
    const { Component } = this.state;
    return Component ? <Component {...this.props} /> : null;
  }
}

export default VideoWrapper;
