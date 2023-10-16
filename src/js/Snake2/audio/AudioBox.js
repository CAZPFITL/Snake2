import { actions, songs } from './../dir/game.js'

class AudioBox {
    actions = actions
    songs = songs
    constructor({ app }) {
        this.app = app
        this.init()
    }

    init = () => {
        this.playing = this.songs.main
        this.setVolume(false, false, '0.1')
        this.playing.addEventListener('ended', () => {
            this.playing.currentTime = 0
            this.playing.play()
        });
    }

    play(type, audio) {
        if (type && audio) {
            this[type][audio].play()
        } else {
            this.playing.play()
        }
    }

    pause(type, audio) {
        if (type && audio) {
            this[type][audio].pause()
        } else {
            this.playing.pause()
        }
    }

    stop(type, audio) {
        if (type && audio) {
            this[type][audio].pause()
            this[type][audio].currentTime = 0
        } else {
            this.playing.pause()
            this.playing.currentTime = 0
        }

    }

    setVolume(type, audio, volume) {
        if (type && audio) {
            this[type][audio].volume = volume
        } else {
            this.playing.volume = volume
        }
    }

    setPlaybackRate(type, audio, rate) {
        if (type && audio) {
            this[type][audio].playbackRate = rate
        } else {
            this.playing.playbackRate = rate
        }
    }
}

export default AudioBox