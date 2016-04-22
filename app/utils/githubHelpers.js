var axios = require('axios')

var id = 'client-id'
var sec = 'secret-id'
var param = '?client_id' + id + '&client_secret=' + sec

function getUserInfo (username) {
  // Use Axios to retrieve data form Github
  // returns a promise
  return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

function getTotalStars (repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayersData (player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars,
  ]
}

var helpers = {
  getPlayersInfo: function (players) {
    // axios.all takes an array of promises and when they resolve
    // returns a promise containing all of the data from the array of promises
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    })).then(function (info) {
      return info.map(function (user) {
        // this is still a promise
        return user.data
      })
    }).catch(function (err) {
      // best practice to add this at the end of your promise chains
      console.warn('Error in getPlayersInfo: ', err)
    })
  },
  battle: function (players) {
    var playerOneData = getPlayersData(players[0])
    var playerTwoData = getPlayersData(players[1])

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {
        console.warn('Error in battle: ', err)
      })
  }
}

module.exports = helpers
