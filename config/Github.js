/* API GitHub */
let GitHubApi = require("github");
let Github = new GitHubApi({
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "GitHubVersus-App"
    },
    Promise: require('bluebird'),
    followRedirects: false,
    timeout: 50000
});

module.exports = Github