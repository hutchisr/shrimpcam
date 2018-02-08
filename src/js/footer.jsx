/**
 * @module footer
 */

 import React from 'react';

 export default class Footer extends React.Component {

    render() {
        return <div className="container mt-5">
            <div className="card">
                <div className="card-header">Options</div>
                <div className="card-body">
                    <a onClick={this.props.togglePlayer} onFocus={e => e.target.blur()} className={`btn btn-sm ${this.props.dash ? 'btn-outline-success' : 'btn-outline-warning'}`} href="#">
                        Use {this.props.dash ? 'HLS Player' : 'MPEG-DASH Player (Experimental)'}
                    </a>
                </div>
            </div>
        </div>;
    }
 }