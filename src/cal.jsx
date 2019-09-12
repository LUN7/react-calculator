import React, { Component } from "react";

const symbols1 = ["7", "8", "9", "DEL", "AC"];
const symbols2 = ["4", "5", "6", "×", "÷"];
const symbols3 = ["1", "2", "3", "+", "-"];
const symbols4 = ["0", ".", "EXP", "ANS", "EXE"];
const symobls = [symbols1, symbols2, symbols3, symbols4];

class Cal extends Component {
  state = {
    upperDisplay: "upper",
    lowerDisplay: "lower"
  };

  render() {
    return (
      <div>
        <div>{this.state.upperDisplay}</div>
        <div>{this.state.lowerDisplay}</div>
        <div>
          {symobls.map(symbol => (
            <this.CalBtnArr symbolArr={symbol} />
          ))}
        </div>
        <button onClick={this.test}>test</button>
      </div>
    );
  }
  MatchSymbol(str) {
    console.log(str);
    console.log(str.join().charCodeAt(0));
    let strCode = str.join().charCodeAt(0);
    if (strCode > 47 && strCode < 58) {
      this.isNum(str);
    } else if (strCode < 70 && strCode > 60) {
      this.isCommand(str);
    } else {
      this.isOp(str);
    }
  }

  isOp = op => {
    console.log(op);
    this.updateUpper(op);
  };

  isCommand = command => {
    console.log(command);
    this.updateUpper();
  };

  isNum = num => {
    console.log(num);
    this.updateLower(num);
  };

  updateUpper = input => {
    console.log("update upper");
  };

  updateLower = newElement => {
    //console.log(newElement);
    this.setState({ lowerDisplay: this.state.lowerDisplay + newElement });
    //console.log('this.state.lowerDisplay');
  };

  CalBtnArr = ({ symbolArr }) => (
    <tr>
      {symbolArr.map(SymbolArr => (
        <this.CalBtn symbol={SymbolArr} />
      ))}
    </tr>
  );

  CalBtn = ({ symbol }) => {
    console.log(symbol);
    return (
      <td key={symbol}>
        <button onClick={() => this.MatchSymbol([symbol])}>{symbol}</button>
      </td>
    );
  };
}

export default Cal;
