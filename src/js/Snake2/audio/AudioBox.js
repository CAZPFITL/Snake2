class AudioBox {
    actions = {}
    songs = {}
    constructor({ app }) {
        this.app = app
        this.init()
    }

    init = () => {
        this.actions = {
            back: new Audio('src/js/Snake2/audio/back.wav'),
            left: new Audio('src/js/Snake2/audio/left.wav'),
            right: new Audio('src/js/Snake2/audio/right.wav'),
            forward: new Audio('src/js/Snake2/audio/forward.wav'),
            eat: new Audio('src/js/Snake2/audio/eat.wav'),
            die: new Audio('src/js/Snake2/audio/die.wav'),
            special: new Audio('src/js/Snake2/audio/special.wav')
        }
        this.songs = {
            main: new Audio('src/js/Snake2/audio/main.wav')
        }

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