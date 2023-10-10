export default class Animation {
    app;
    request;
    constructor(app) {
        this.app = app;
        app.animation = this;
        return this;
    }

    start(firstState) {
        this.loop()
        this.app.setState(firstState)
    }

    loop = () => {
        this.app.gui.camera.loop(()=>{
            this.app.looper.forEach(({update}) => update?.(this.request))
            this.request = requestAnimationFrame(this.loop);
        });
    }
}