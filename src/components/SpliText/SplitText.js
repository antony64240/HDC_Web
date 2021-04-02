import React, { Component } from 'react';


class SplitText extends Component {
    render(){
      return(
        <span aria-label={this.props.copy} role={this.props.role} style={this.props.style} className={this.props.className}>
            {this.props.copy.split("").map(function(char, index){
              let style = {"animation-delay": (1 + index / 10) + "s"}
              return <span
                aria-hidden="true"
                key={index}
                style={style}>
                {char}
              </span>;
            })}
          </span>
      );
    }
  }

  export default SplitText


