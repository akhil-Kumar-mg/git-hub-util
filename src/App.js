import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";

import "./components/Table.css";
import "./App.css";

class App extends Component {
  state = {
    totalOpenIssueCountByMethod1: null,
    totalOpenIssueCountByMethod2: null,
    totalOpenIssuesInLast24hours: null,
    totalOpenIssuesWithIn7Days: null,
    issuesOlderThan7Days: null,
    errorTxt: "",
    validUrl: true
  };

  handleSubmit = response => {
    this.setState({
      totalOpenIssueCountByMethod1:
        response.issueInfo.totalOpenIssueCountByMethod1,
      totalOpenIssueCountByMethod2:
        response.issueInfo.totalOpenIssueCountByMethod2,
      totalOpenIssuesInLast24hours:
        response.issueInfo.totalOpenIssuesInLast24hours,
      totalOpenIssuesWithIn7Days: response.issueInfo.totalOpenIssuesWithIn7Days,
      issuesOlderThan7Days: response.issueInfo.totalOpenissuesOlderThan7Days,
      errorTxt: response.errorTxt,
      validUrl: response.validUrl
    });
  };
  /*
 Based on the type of error the error message is populated in the ui 
 */
  render() {
    let errorMessage;
    let message = "";
    if (this.state.errorTxt) {
      message = this.state.errorTxt;
    } else if (!this.state.validUrl) {
      message = "Invalid Url";
    }
    if (message) {
      errorMessage = (
        <div className="row">
          <div style={{ margin: "0px auto" }}>
            <div className="alert alert-warning">
              <strong>Warning!</strong> {message}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <SearchBar handleSubmit={this.handleSubmit} />
        <div className="row table_padding">
          <Table
            totalIssueCountByMethod1={this.state.totalOpenIssueCountByMethod1}
            totalIssueCountByMethod2={this.state.totalOpenIssueCountByMethod2}
            issuesWithIn24hours={this.state.totalOpenIssuesInLast24hours}
            issuesWithIn7Days={this.state.totalOpenIssuesWithIn7Days}
            issuesOlderThan7Days={this.state.issuesOlderThan7Days}
          />
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default App;
