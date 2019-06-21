import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress, limit } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / limit) * this.circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="lightgreen"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={this.circumference + " " + this.circumference}
          style={{ strokeDashoffset }}
          r={this.normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text fontSize="25" textAnchor="middle" x={radius} y={radius}>
          {" "}
          {progress}/{limit}{" "}
        </text>
      </svg>
    );
  }
}

class LoaderAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 10,
      loLimit: 0,
      upLimit: 100
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleMin = this.handleMin.bind(this);
    this.handleMax = this.handleMax.bind(this);
  }

  handleInput(ev) {
    this.setState({
      value: ev.target.value
    });
  }

  handleMin(ev) {
    this.setState({
      loLimit: ev.target.value
    });
  }

  handleMax(ev) {
    this.setState({
      upLimit: ev.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="slidecontainer">
          <input
            onChange={this.handleInput}
            type="range"
            min={this.state.loLimit}
            max={this.state.upLimit}
            value={this.state.value}
            className="slider"
          />
          <input type="number" onChange={this.handleMin} placeholder="min" />
          <input type="number" onChange={this.handleMax} placeholder="max" />
        </div>
        <ProgressRing
          radius={150}
          stroke={20}
          limit={this.state.upLimit}
          progress={this.state.value}
        />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<LoaderAnimation />, rootElement);
