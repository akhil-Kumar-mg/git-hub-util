import axios from "axios";

const baseURL = "https://api.github.com";

/*
    Fetch the issue metadata of a repo. The total count in this is the combination of open pr and open issues
 */
const getIssueMetaData = (owner, repoName) => {
  let url = `/repos/${owner}/${repoName}`;
  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};

/*
  Fetch the pull request metadata
  */
const getPullRequestMetaData = (owner, repoName) => {
  let url = `search/issues?q=repo:${owner}/${repoName}+is:pr+is:open`;
  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};
/*
  Sometimes to match the issue count seen in the ui we need to use this
  Yet to figure out the reason
  */
const getIssueCountMethod1 = (owner, repoName) => {
  return [
    getIssueMetaData(owner, repoName),
    getPullRequestMetaData(owner, repoName)
  ];
};
/*
 Ideal way of fetching the open issue count
 */
const getIssueCountMethod2 = (owner, repoName) => {
  let url = `search/issues?q=repo:${owner}/${repoName}+is:issue+is:open`;
  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};

/*
  Fetch the issues created in a time perid
  */
const getOpenIssueCountByTimeRange = (owner, repoName, from, to) => {
  let url;
  if (to) {
    url = `search/issues?q=repo:${owner}/${repoName}+is:issue+is:open+created:${from}..${to}`;
  } else {
    url = `search/issues?q=repo:${owner}/${repoName}+is:issue+is:open+created:<${from}`;
  }

  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};

export default {
  getIssueCountMethod1,
  getIssueCountMethod2,
  getOpenIssueCountByTimeRange
};
