export default class Sketch {
    objects = []

    constructor({ canvas }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
    }

    render() {
        window.requestAnimationFrame(this.render())
    }
}