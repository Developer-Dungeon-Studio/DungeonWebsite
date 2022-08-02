const axios = require("axios")
require("dotenv").config();

const getSpotify = async () => {
  let staff = ["805898988402376725", "347077478726238228", "526649097546104844", "852521383006961687", "799319682862809169"];
  let spotify = [];
  
  staff.forEach((id) => {
    let spotidata;
    axios({
      method: "get",
      url: `https://stealth.rest/discord/v1/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
  
    }).then(function (res) {
      let coverArt ='/assets/img/logo.webp'
      if (!res.data.spotify || res.data.spotify == undefined || res.data.spotify == null) {
      spotidata = {
        coverArt: '/assets/img/logo.webp',
        artists: [
          {
            name: 'himself'
          }
        ],
        trackName: "Busy Coding",
        trackId: 'none',
        album: {
          name: "the Dungeon"
        }
      };
      
      } else {
        spotidata = res.data.spotify;
        if ( spotidata.coverArt == undefined || spotidata.coverArt == null) {
          coverArt = '/assets/img/logo.webp';
        }
      }
  
      spotify.push({ 
        uid: id, 
        logo: coverArt,
        artist: spotidata.artists.map((artist) => { return artist.name }).join(", "),
        name: spotidata.trackName,
        id: spotidata.trackId,
        album: spotidata.album.name,
      });
    });
  })

  setTimeout(async () => {
    await axios({
      method: "POST",
      url: `https://developersdungeon.xyz/api/spotify?code=${process.env.APITOKENWEB}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        spotify,
      },
    }).then(function (res) {
      //console.log(res.data)
    });
  }, 15000);

  setTimeout(async () => {
    getSpotify();
  }, 5000)
}

getSpotify();