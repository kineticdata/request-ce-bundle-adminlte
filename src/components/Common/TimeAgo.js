import React, { Component } from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as constants from '../../constants';

export class TimeAgo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatted: moment(props.timestamp).format(constants.TIME_FORMAT),
      timeAgo: moment(props.timestamp).fromNow(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), constants.TIME_AGO_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({ timeAgo: moment(this.props.timestamp).fromNow() });
  }

  render() {
    return (
      this.props.tooltip === false ? (
        <span>{this.state.timeAgo}</span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="timeAgo">{this.state.formatted}</Tooltip>}
        >
          <span>{this.state.timeAgo}</span>
        </OverlayTrigger>
      )
    );
  }
}
