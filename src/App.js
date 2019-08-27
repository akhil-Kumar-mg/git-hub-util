import React, { Component } from "react";
import GitHubService from "./service/gitHubService";

import DateUtil from "./util/DateUtil";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class App extends Component {
  state = {
    totalOpenIssueCount: null,
    errorTxt: null,
    totalOpenIssuesInLast24hours: null,
    totalOpenIssuesWithIn7Days: null,
    totalOpenIssueBefore7Days: null
  };

  onSucess = response => {
    let issueCount = response.issueData.open_issues_count;
    let pullRequestCount = response.pullRequestData.total_count;
    let totalOpenIssueCount = issueCount - pullRequestCount;
    this.setState({
      totalOpenIssueCount: totalOpenIssueCount,
      errorTxt: null
    });
  };
  onError = error => {
    this.setState({
      totalOpenIssueCount: null,
      errorTxt: error.response.statusText
    });
  };
  // componentDidMount() {
  //   GitHubService.getIssueCount(
  //     "microsoft",
  //     "vscode",
  //     this.onSucess,
  //     this.onError
  //   );

  //   GitHubService.getOpenIssueCountByTimeRange(
  //     "microsoft",
  //     "vscode",
  //     DateUtil.getPriorDate(1),
  //     DateUtil.getCurrentDate(),
  //     response => {
  //       this.setState({
  //         totalOpenIssuesInLast24hours: response.data.total_count,
  //         totalOpenIssuesWithIn7Days: null,
  //         totalOpenIssueBefore7Days: null
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  //   GitHubService.getOpenIssueCountByTimeRange(
  //     "microsoft",
  //     "vscode",
  //     DateUtil.getPriorDate(1),
  //     DateUtil.getCurrentDate(),
  //     response => {
  //       this.setState({
  //         totalOpenIssuesInLast24hours: response.data.total_count
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  //   GitHubService.getOpenIssueCountByTimeRange(
  //     "microsoft",
  //     "vscode",
  //     DateUtil.getPriorDate(7),
  //     DateUtil.getPriorDate(1),
  //     response => {
  //       this.setState({
  //         totalOpenIssuesWithIn7Days: response.data.total_count
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  //   GitHubService.getOpenIssueCountByTimeRange(
  //     "microsoft",
  //     "vscode",
  //     DateUtil.getPriorDate(7),
  //     null,
  //     response => {
  //       this.setState({
  //         totalOpenIssueBefore7Days: response.data.total_count
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  render() {
    return (
      <div className="form-group">
        <div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        {this.state.totalOpenIssueCount}
        <br />
        {this.state.errorTxt}
        <br />
        {this.state.totalOpenIssuesInLast24hours}
        <br />
        {this.state.totalOpenIssuesWithIn7Days}
        <br />
        {this.state.totalOpenIssueBefore7Days}
      </div>
    );
  }
}

export default App;
