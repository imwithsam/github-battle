var axios = require('axios')

var id = 'client-id'
var sec = 'secret-id'
var param = '?client_id' + id + '&client_secret=' + sec

function getUserInfo (username) {
  // Use Axios to retrieve data form Github
  // returns a promise
  return axios.get('https://api.github.com/users/' + username + param)
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
      console.warn('Error in getPlayersInfo', err)
    })
  }
}

module.exports = helpers
