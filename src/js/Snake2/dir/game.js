import Collisions from './../core/Collisions.js'
import Controls from './../core/Controls.js'
import EventsMethods from './../core/EventsMethods.js'
import Screen from './../core/Screen.js'
import AudioBox from './../audio/AudioBox.js'

export const actions = {
    back: new Audio('src/js/Snake2/audio/back.wav'),
    left: new Audio('src/js/Snake2/audio/left.wav'),
    right: new Audio('src/js/Snake2/audio/right.wav'),
    forward: new Audio('src/js/Snake2/audio/forward.wav'),
    eat: new Audio('src/js/Snake2/audio/eat.wav'),
    die: new Audio('src/js/Snake2/audio/die.wav'),
    special: new Audio('src/js/Snake2/audio/special.wav')
}
export const songs = {
    main: new Audio('src/js/Snake2/audio/main.wav')
}

export {
    Collisions,
    Controls,
    EventsMethods,
    Screen,
    AudioBox
}