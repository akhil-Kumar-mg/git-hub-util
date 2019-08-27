import axios from "axios";

const baseURL = "https://api.github.com";

/*
    This list includes both the open issues and the open pr
 */
const getIssueMetaData = (owner, repoName) => {
  let url = `/repos/${owner}/${repoName}`;
  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};

const getPullRequestMetaData = (owner, repoName) => {
  let url = `search/issues?q=repo:${owner}/${repoName}+is:pr+is:open`;
  return axios({
    method: "GET",
    url: url,
    baseURL: baseURL
  });
};

const getIssueCount = (
  owner,
  repoName,
  onSuccessCallBack,
  onFailureCallBack
) => {
  Promise.all([
    getIssueMetaData(owner, repoName),
    getPullRequestMetaData(owner, repoName)
  ])
    .then(responses => {
      const response = {
        issueData: responses[0].data,
        pullRequestData: responses[1].data
      };
      onSuccessCallBack(response);
    })
    .catch(error => {
      onFailureCallBack(error);
    });
};

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
  getIssueCount,
  getOpenIssueCountByTimeRange
};
