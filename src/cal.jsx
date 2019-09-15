import React, { Component } from "react";

const symbols1 = ["7", "8", "9", "DEL", "AC"];
const symbols2 = ["4", "5", "6", "×", "÷"];
const symbols3 = ["1", "2", "3", "+", "-"];
const symbols4 = ["0", ".", "EXP", "ANS", "EXE"];
const symobls = [symbols1, symbols2, symbols3, symbols4];

class Cal extends Component {
  state = {
    upperDisplay: "",
    lowerDisplay: ""
  };

  render() {
    const displayStyle = {
      height: "100px"
    };

    return (
      <div>
        <div class="jumbotron">
          <div class="col-8" style={displayStyle}>
            <h2> {this.state.upperDisplay}</h2>
            <h1> {this.state.lowerDisplay}</h1>
          </div>
          {symobls.map(symbol => (
            <this.CalBtnArr symbolArr={symbol} />
          ))}
        </div>
      </div>
    );
  }
  MatchSymbol(str) {
    console.log(str + " is clicked");
    console.log("the corresponding ASCII code is " + str.join().charCodeAt(0));
    let strCode = str.join().charCodeAt(0);
    if (strCode > 47 && strCode < 58) {
      this.isNum(str);
    } else if (strCode === 46) {
      this.isDot();
    } else if (strCode < 70 && strCode > 60) {
      this.isCommand(str);
    } else {
      console.log("enter op");
      this.isOp(str);
    }
  }

  isOp = op => {
    console.log("op is entered");
    let str = this.state.lowerDisplay;
    let prevStrCode = str.join().charCodeAt(str.length - 1);
    console.log(prevStrCode);
    if (
      prevStrCode === 43 ||
      prevStrCode === 45 ||
      prevStrCode === 215 ||
      prevStrCode === 247
    ) {
      this.updateLower(op);
      console.log("prev is op");
      return;
    } else {
      this.updateUpper();
      this.updateLower(op);
    }
  };

  isCommand = command => {};

  isDot = () => {
    let j = this.state.lowerDisplay.length;
    let hasDot = 0;

    //avoid successive dot input
    for (let i = 0; i < j; i++) {
      if (this.state.lowerDisplay[i] === ".") {
        hasDot = 1;
      }
    }

    if (hasDot === 1) {
      return; //exit when dot is already exit
    }
    this.updateLower(".");
  };

  isNum = num => {
    console.log(num);
    this.updateLower(num);
  };

  updateUpper = input => {
    console.log("update upper");
    this.setState({
      upperDisplay: this.state.upperDisplay + this.state.lowerDisplay,
      lowerDisplay: ""
    });
  };

  updateLower = newElement => {
    console.log("updatelower");
    this.setState({ lowerDisplay: this.state.lowerDisplay + newElement });
  };

  CalBtnArr = ({ symbolArr }) => (
    <tr class="col-8 row">
      {symbolArr.map(SymbolArr => (
        <this.CalBtn symbol={SymbolArr} />
      ))}
    </tr>
  );

  CalBtn = ({ symbol }) => {
    return (
      <td class="my-1 col-2 p-1" key={symbol}>
        <button
          class="btn btn-primary btn-block "
          onClick={() => this.MatchSymbol([symbol])}
        >
          {symbol}
        </button>
      </td>
    );
  };
}

export default Cal;
