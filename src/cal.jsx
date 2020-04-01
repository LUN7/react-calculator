import React, { Component } from "react";
import "./cal.css";
import { evaluate } from "mathjs";
const symbols1 = ["7", "8", "9", "DEL", "AC"];
const symbols2 = ["4", "5", "6", "*", "/"];
const symbols3 = ["1", "2", "3", "+", "-"];
const symbols4 = ["0", ".", "EXP", "ANS", "EXE"];
const symbols = [symbols1, symbols2, symbols3, symbols4];

class Cal extends Component {
  state = {
    display: "",
    input: "",
    output: ""
  };

  render() {
    return (
      <div>
        <div id="cal">
          <form>
            <input type="text" id="fname" value={this.state.display} />
          </form>
          <table>
            <tbody>
              {symbols.map(symbol => (
                <this.CalBtnArr symbolArr={symbol} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  keyPressed = symbol => {
    let displayValue = "";
    symbol = symbol.toString();
    console.log("key pressed: ", symbol);
    if (symbol === "EXE") {
      displayValue = this.execute();
    } else if (symbol === "DEL") {
      displayValue = this.delete();
    } else if (symbol === "AC") {
      displayValue = this.clear();
    } else if (symbol === "EXP") {
      return;
    } else if (symbol === "ANS") {
      displayValue = this.pushInput("(" + this.state.output + ")");
    } else if (!isNaN(symbol) || symbol === ".") {
      displayValue = this.pushInput(symbol);
    } else {
      if (this.state.input === "" && this.state.output !== "") {
        displayValue = this.pushInput("(" + this.state.output + ")" + symbol);
      } else {
        displayValue = this.pushInput(symbol);
      }
    }

    this.updateDisplay(displayValue);
  };

  pushInput = input => {
    input = this.state.input + input;
    this.setState({
      input: input
    });
    return input;
  };

  clear = () => {
    this.setState({
      input: "",
      output: ""
    });
    return "";
  };

  delete = () => {
    console.log("delete list item");
    let input = this.state.input.slice(0, -1);
    this.setState({
      input: input
    });
    return input;
  };

  execute = () => {
    let result = "";
    try {
      result = evaluate(this.state.input);
    } catch (error) {
      console.log("invalid input");
      this.setState({
        input: "",
        output: ""
      });
      return "ERROR";
    }
    this.setState({
      input: "",
      output: result
    });
    return result;
  };

  updateDisplay = value => {
    this.setState({
      display: value
    });
  };

  CalBtnArr = ({ symbolArr }) => (
    <tr>
      {symbolArr.map(SymbolArr => (
        <this.CalBtn symbol={SymbolArr} />
      ))}
    </tr>
  );

  CalBtn = ({ symbol }) => {
    return (
      <td key={symbol}>
        <button onClick={() => this.keyPressed([symbol])}>{symbol}</button>
      </td>
    );
  };
}

export default Cal;
