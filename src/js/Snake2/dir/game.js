import Collisions from './../core/Collisions.js'
import Controls from './../core/Controls.js'
import EventsMethods from './../core/EventsMethods.js'
import Screen from './../core/Screen.js'
import AudioBox from './../audio/AudioBox.js'

export const actions = {
    back: 'src/js/Snake2/audio/back.wav',
    left: 'src/js/Snake2/audio/left.wav',
    right: 'src/js/Snake2/audio/right.wav',
    forward: 'src/js/Snake2/audio/forward.wav',
    eat: 'src/js/Snake2/audio/eat.wav',
    die: 'src/js/Snake2/audio/die.wav',
    special: 'src/js/Snake2/audio/special.wav'
}
export const songs = {
    main: 'src/js/Snake2/audio/main.wav'
}

export {
    Collisions,
    Controls,
    EventsMethods,
    Screen,
    AudioBox
}