import SpotifyWrapper from '../src/index'

global.fetch = require('node-fetch')

const spotify = new SpotifyWrapper({
  token:
    'BQCADGM0qvy_08Cw9cR7XjYSqncJEJAlxDAn6K7umOZf1ondwGGGy1hPBZjyvcKQ9a8tPkwydL6k1vLEQDOJIWgTWnlSDPc2MsYF2CxzN8ZmlgUz3egcaEKVtl3zy9dTwnqXJhQPhzx7s4VmGMhYWzgkmyh-'
})

const albums = spotify.search.albums('Incubus')

albums.then((data) => {
  data.albums.items.map((item) => {
    console.log(item.name)
  })
})
