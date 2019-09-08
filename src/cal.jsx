import React, { Component } from "react";

const symbols1 = ["7", "8", "9", "DEL", "AC"];
const symbols2 = ["4", "5", "6", "×", "÷"];
const symbols3 = ["1", "2", "3", "+", "-"];
const symbols4 = ["0", ".", "EXP", "ANS", "EXE"];
const symobls = [symbols1, symbols2, symbols3, symbols4];

class Cal extends Component {
  state = {
    upperDisplay: "DisplayUpper",
    lowerDisplay: "DisplayLower"
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
      </div>
    );
  }
  MatchSymbol(a) {
    console.log(a);
  }

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
