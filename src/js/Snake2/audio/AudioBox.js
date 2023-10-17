import { actions, songs } from '../dir/game.js'

class AudioBox {
    actions = actions
    songs = songs
    sound = {
        actions: {},
        songs: {}
    }
    volume = 0.1
    constructor({ app }) {
        this.app = app
        this.init()
    }

    init = () => {
        this.playing = new Audio(this.songs.main)
        this.playing.addEventListener('ended', () => {
            this.playing.currentTime = 0
            this.playing.play()
        });
    }

    play(type, audio, volume = this.volume) {
        if (type && audio) {
            this.sound[type][audio] = this.sound[type][audio] ? this.sound[type][audio] : new Audio(this[type][audio])
            this.sound[type][audio].currentTime = 0
            this.sound[type][audio].volume = volume
            this.sound[type][audio].play()
        } else {
            this.playing.volume = volume
            this.playing.play()
        }
    }

    pause(type, audio) {
        if (type && audio) {
            new Audio(this[type][audio]).pause()
        } else {
            this.playing.pause()
        }
    }

    stop(type, audio) {
        if (type && audio) {
            new Audio(this[type][audio]).pause()
            new Audio(this[type][audio]).currentTime = 0
        } else {
            this.playing.pause()
            this.playing.currentTime = 0
        }

    }

    setPlaybackRate(type, audio, rate) {
        if (type && audio) {
            new Audio(this[type][audio]).playbackRate = rate
        } else {
            this.playing.playbackRate = rate
        }
    }
}

export default AudioBox