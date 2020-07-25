import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import SpotifyWrapper from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Search', () => {
  let spotify
  let fetchedStub
  let promise

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    })
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exists the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist
    })
    it('should exists the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist
    })
    it('should exists the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist
    })
    it('should exists the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist
    })
  })

  describe('Artist Search', () => {
    it('should call fetch function', () => {
      const artist = spotify.search.artists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call feych with the correct url', () => {
      const artist = spotify.search.artists('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artist2 = spotify.search.artists('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')
    })
  })

  describe('Album Search', () => {
    it('should call fetch function', () => {
      const album = spotify.search.albums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call feych with the correct url', () => {
      const album = spotify.search.albums('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const album2 = spotify.search.albums('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
    })
  })

  describe('Tracks Search', () => {
    it('should call fetch function', () => {
      const track = spotify.search.tracks('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call feych with the correct url', () => {
      const track = spotify.search.tracks('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const track2 = spotify.search.tracks('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')
    })
  })

  describe('Playlists Search', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playlists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call feych with the correct url', () => {
      const playlist = spotify.search.playlists('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const playlist2 = spotify.search.playlists('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')
    })
  })
})
