require('dotenv').config()
const axios = require('axios')
let access_token = ""
let timeBeforeGetToken = 4846915

const oauthUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`


const callAPIauth = () => {
    axios.post(oauthUrl).then(res => {
        const data = res.data
        access_token =  data.access_token;
    }).catch(error => {console.error(error)})
}

const getToken = () => {
          callAPIauth()
          setInterval(() => {
                  callAPIauth()
              },timeBeforeGetToken)
}


const getGameRequest =  async (access_token,gameName) => {
    let viewers = 0
    try {
     const res = await  axios.get('https://api.twitch.tv/kraken/streams/?game='+gameName,{headers:{
            "Accept": "application/vnd.twitchtv.v5+json",
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + access_token
        }})
           viewers =  gameViewers(res.data.streams)
    }
    catch(error){
           viewers = 0
        }

    return new Promise(
        resolve => {
            setTimeout(()=>{
                resolve(viewers)
            },2000)
        }
    )
}

// Count viewers
const gameViewers = (data) => {
        let viewers = 0
        for (let x = 0; x < data.length; x++){
            viewers += parseInt(data[x].viewers)
        }
        return viewers
}


module.exports.getToken = getToken
module.exports.getGameRequest = getGameRequest
module.exports.access_token = access_token

