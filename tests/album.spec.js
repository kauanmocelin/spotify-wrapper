import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import SpotifyWrapper from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Album', () => {
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
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist
    })

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist
    })

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist
    })
  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum()
      expect(fetchedStub).to.have.been.calledOnce
    })
    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('1rQZbncicoXyB64DqoH7OY')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/1rQZbncicoXyB64DqoH7OY')

      const album2 = spotify.album.getAlbum('1rQZbncicoXyB64DqoH7Ok')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/1rQZbncicoXyB64DqoH7Ok')
    })

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const album = spotify.album.getAlbum('1rQZbncicoXyB64DqoH7OY')
      expect(album.resolveValue).to.be.eql({ album: 'name' })
    })
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['2S76j04OhiV0sadshHbOou', '0uxj74YmBtR0cmnHGxIYmh'])
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums?ids=2S76j04OhiV0sadshHbOou,0uxj74YmBtR0cmnHGxIYmh'
      )
    })

    it('should return correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const albums = spotify.album.getAlbums(['2S76j04OhiV0sadshHbOou', '0uxj74YmBtR0cmnHGxIYmh'])
      expect(albums.resolveValue).to.be.eql({ album: 'name' })
    })
  })

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getTracks()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.album.getTracks('2S76j04OhiV0sadshHbOou')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/2S76j04OhiV0sadshHbOou/tracks')
    })

    it('should return correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const tracks = spotify.album.getTracks('2S76j04OhiV0sadshHbOou')
      expect(tracks.resolveValue).to.be.eql({ album: 'name' })
    })
  })
})
