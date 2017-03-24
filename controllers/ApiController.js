/* EmptyRepo */
let EmptyRepo = require('../config/EmptyRepo')

/* API GitHub */
let github = require('../config/Github')

/* Memcached */
let mc = require('../config/Memcached')


module.exports = {
    get_index : function(req, res) {res.send("{}");},
 
    get_repo : function(req, res, repo) {
        /* JSON result */
        res.setHeader('Content-Type', 'application/json');

        /* Memcached function */
        var get_memcache = function(repo, call){
            mc.get(repo, function (err, value, key) {
                if (value != null) {
                    console.log(repo + ' IN CACHE')
                    call(repo, JSON.parse(value))
                } else {
                    console.log(repo + ' NOT IN CACHE')
                    call(repo, null)
                }
            });
        }

        /* GitHub function */
        var get_github = function(key, call){
            github.search.repos({
                q: key,
                per_page: 1
            }, function(github_err, github_res) {

                var result = {}
                try
                {
                    result.name = github_res.data.items[0].name
                    result.full_name = github_res.data.items[0].full_name
                    result.url = github_res.data.items[0].html_url
                    result.description = github_res.data.items[0].description
                    result.created_at = github_res.data.items[0].created_at
                    result.updated_at = github_res.data.items[0].updated_at
                    result.stars = github_res.data.items[0].stargazers_count
                    result.watchers = github_res.data.items[0].watchers_count
                    result.language = github_res.data.items[0].language
                    result.forks = github_res.data.items[0].forks_count
                    result.open_issues = github_res.data.items[0].open_issues_count
                    result.score = github_res.data.items[0].score
                    result.error = {}
                } catch (e) 
                {
                    result = EmptyRepo
                    result.error = e
                }

                call(result)
            })
        }

        /* --- */
        get_memcache(repo, function(repo, cached){
            if(cached != null){
                res.send(cached);
            } else {
                get_github(repo, function(result){
                    try{
                        console.log('PUSH ' + repo.toString() + ' TO CACHE')
                        mc.set(repo, JSON.stringify(result), function(err, val) {
                            res.send(result);
                        }, 600);
                    } catch(e) {
                        console.log(e)
                    }
                })
            }
        })
    }

}