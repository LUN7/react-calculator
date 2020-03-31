import React, { Component } from "react";
import "./cal.css";
import { evaluate } from "mathjs";
const symbols1 = ["7", "8", "9", "DEL", "AC"];
const symbols2 = ["4", "5", "6", "*", "/"];
const symbols3 = ["1", "2", "3", "+", "-"];
const symbols4 = ["0", ".", "EXP", "ANS", "EXE"];
const symobls = [symbols1, symbols2, symbols3, symbols4];

class Cal extends Component {
  state = {
    input: "",
    output: ""
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td> {this.state.input} </td>
                  <td> {this.state.output} </td>
                </tr>
              </tbody>
            </table>
          </div>
          <table>
            <tbody>
              {symobls.map(symbol => (
                <this.CalBtnArr symbolArr={symbol} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  MatchSymbol(str) {
    if (this.state.input === "ERROR") {
      this.setState({
        input: ""
      });
    }
    console.log(str + " is clicked");
    console.log("the corresponding ASCII code is " + str.join().charCodeAt(0));
    let strCode = str.join().charCodeAt(0);
    if (strCode > 47 && strCode < 58) {
      this.updateInput(str);
    } else if (strCode === 46) {
      this.updateInput(str);
    } else if (strCode < 70 && strCode > 60) {
      this.isCommand(str);
    } else {
      console.log("enter op");
      this.updateInput(str);
    }
  }

  updateInput = input => {
    input = input.toString();
    if (this.state.input != "") {
      console.log(this.state.input);
      this.setState({
        input: this.state.input + input
      });
    } else {
      this.setState({
        input: input
      });
    }
  };

  isCommand = command => {
    console.log("command");
    command = command.toString();
    if (command === "EXE") {
      this.execute();
    } else if (command === "AC") {
      this.clear();
    } else if (command === "ANS") {
      if (this.state.output != "") {
        this.updateInput("*" + this.state.output);
      }
    } else if (command === "DEL") {
      var input = this.state.input.toString();
      console.log(typeof input);
      input = input.slice(0, -1);
      this.setState({
        input: input
      });
    } else {
      this.updateInput("e^");
    }
  };

  clear = () => {
    this.setState({
      input: "",
      output: ""
    });
  };

  execute = () => {
    if (this.state.input != "") {
      var input = this.state.input.toString();
      var output;
      try {
        this.setState({
          output: evaluate(input)
        });
      } catch (e) {
        this.setState({
          input: "ERROR"
        });
      }
    }
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
        <button onClick={() => this.MatchSymbol([symbol])}>{symbol}</button>
      </td>
    );
  };
}

export default Cal;
