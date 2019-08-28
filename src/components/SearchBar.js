import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import GitHubService from "../service/GitHubService";
import DateUtil from "../util/DateUtil";

import "./SearchBar.css";

export default class SearchBar extends Component {
  state = {
    searchTerm: "",
    openIssueInfo: {
      totalOpenIssueCountByMethod1: null,
      totalOpenIssueCountByMethod2: null,
      totalOpenIssuesInLast24hours: null,
      totalOpenIssuesWithIn7Days: null,
      totalOpenissuesOlderThan7Days: null
    },
    validUrl: false,
    errorTxt: ""
  };

  searchUpdated = evt => {
    this.setState({ searchTerm: evt.target.value });
    evt.preventDefault();
  };

  /*
  Function validates the url and then call the github api to get the issue details
*/
  handleSubmit = evt => {
    this.validateUrl();
  };

  /*
    Once all the responses are received the issue details are passed back to parent
*/
  setIssueDetails = responses => {
    let issueCount = responses[0].data.open_issues_count;
    let pullRequestCount = responses[1].data.total_count;
    let totalOpenIssueCountByMethod1 = issueCount - pullRequestCount;
    this.setState({
      openIssueInfo: {
        totalOpenIssueCountByMethod1: totalOpenIssueCountByMethod1,
        totalOpenIssueCountByMethod2: responses[2].data.total_count,
        totalOpenIssuesInLast24hours: responses[3].data.total_count,
        totalOpenIssuesWithIn7Days: responses[4].data.total_count,
        totalOpenissuesOlderThan7Days: responses[5].data.total_count
      },
      errorTxt: "",
      validUrl: true
    });
    this.props.handleSubmit({
      issueInfo: this.state.openIssueInfo,
      errorTxt: this.state.errorTxt,
      validUrl: true
    });
  };
  /*
  Will fetch all type of issue count necessary to populate in the ui
*/
  getOpenIssueDetails = repoInfo => {
    const { owner, repo } = repoInfo;
    const promiseArr = GitHubService.getIssueCountMethod1(owner, repo);
    promiseArr.push(GitHubService.getIssueCountMethod2(owner, repo));
    promiseArr.push(
      GitHubService.getOpenIssueCountByTimeRange(
        owner,
        repo,
        DateUtil.getPriorDate(1),
        DateUtil.getCurrentDate()
      )
    );
    promiseArr.push(
      GitHubService.getOpenIssueCountByTimeRange(
        owner,
        repo,
        DateUtil.getPriorDate(7),
        DateUtil.getPriorDate(1)
      )
    );
    promiseArr.push(
      GitHubService.getOpenIssueCountByTimeRange(
        owner,
        repo,
        DateUtil.getPriorDate(7),
        null
      )
    );
    Promise.all(promiseArr)
      .then(responses => {
        this.setIssueDetails(responses);
      })
      .catch(error => {
        let errorTxtMsg;
        if (error.response.status == "403") {
          errorTxtMsg = "Api rate Limit Error, Try after few minutes";
        } else {
          errorTxtMsg = "Entered repo doesnot exists!";
        }
        this.setState({
          openIssueInfo: {
            totalOpenIssueCountByMethod1: null,
            totalOpenIssueCountByMethod2: null,
            totalOpenIssuesInLast24hours: null,
            totalOpenIssuesWithIn7Days: null,
            totalOpenissuesOlderThan7Days: null
          },
          errorTxt: errorTxtMsg
        });
        this.props.handleSubmit({
          issueInfo: this.state.openIssueInfo,
          errorTxt: this.state.errorTxt,
          validUrl: true
        });
      });
  };

  /*
   Validate the url by checking the domain name
   if domain name is found, the function will assume it is followed by the owner name and the repo name
   Once it is obtained the api call to git hub is made
  */
  validateUrl = () => {
    let url = this.state.searchTerm;
    let validUrl = false;
    if (url.includes("https://github.com/")) {
      let urlArr = url.split("/");
      if (urlArr.length >= 5) {
        validUrl = true;
        this.setState(
          {
            validUrl: true
          },
          this.getOpenIssueDetails({
            owner: urlArr[3],
            repo: urlArr[4]
          })
        );
      } else {
        validUrl = false;
      }
    } else {
      validUrl = false;
    }
    if (!validUrl) {
      this.setState({
        validUrl: false
      });
      this.props.handleSubmit({
        issueInfo: this.state.openIssueInfo,
        errorTxt: "",
        validUrl: false
      });
    }
  };

  render() {
    return (
      <div className="row search_bar_row">
        <div className="col-sm-8">
          <Input
            label="URL"
            placeholder="Paste the Git Repo link here.."
            onChange={this.searchUpdated}
            value={this.state.searchTerm}
            className="search_bar_col"
          />
        </div>
        <div className="col-sm-4">
          <Button primary onClick={this.handleSubmit}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}
