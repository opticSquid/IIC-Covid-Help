import { WaveTopBottomLoading } from "react-loadingg";
import React, { Component } from "react";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <div>
          <WaveTopBottomLoading size="large" />
        </div>
        <div>
          <h1>Please wait....</h1>
        </div>
      </div>
    );
  }
}

export default Loading;
