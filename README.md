# GitHub Util

#### This application has been written using ReactJS and bootstrapped by [Create React App](https://github.com/facebook/create-react-app).

### Solution

The requirement is to find the open issue count with or without date filters.
I have used the Git API's to acheive this.
Query structure is as follows
* To find open issues 
	* https://api.github.com/search/issues?q=repo:{ownerName}/{RepoName}+is:issue+is:open
	</br> There is one more way to find open issue count as per the doc
	*	Total issue count from the metadata ( total count in the response contains the total open issues plus the open pr as per the docs) - total open pr count </br>
	For some repos this gives the value seen the UI, Hence i used this method as well
	https://api.github.com/repos/{ownerName}/{repoName}  -- https://api.github.com/search/issues?q=repo:{ownerName}/{repoName}+is:pr+is:open
	</br>
	Sometime i have encountered a mismatch in the result using the above two method. I'm yet to find the reason
*	To find open issues with date constraints:
	*	Eg: https://api.github.com/search/issues?q=repo:{ownerName}/{repoName}+is:issue+is:open+created:2019-08-21T21:16:08Z..2019-08-27T21:16:08Z
	
### Observation
Without authentication the requests might get forbidden response due to api-rate limitation for a public user
If we authenticate our application the request rate can be increased.

### Improvement 
i'm using the Git Api's hence the improvement is limited from the code perspective
If the complexity increases for this application in the future, i'll introduce redux to manage the state of the application.

#### Application is hosted on AWS
URL:
gitHublink: 
