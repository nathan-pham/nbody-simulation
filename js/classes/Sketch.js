export default class Sketch {
    objects = []

    constructor({ canvas }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")

        this.resize()
        window.addEventListener("resize", this.resize.bind(this))
    }

    get dimensions() {
        return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight }
    }

    resize() {
        Object.assign(canvas, this.dimensions)
        Object.assign(canvas.style, Object.keys(this.dimensions).reduce((acc, cur) => ({  
            ...acc,
            [cur]: this.dimensions[cur] + "px"
        }), {}))
    }

    render() {
        for(const object of this.objects) {
            object?.core(this)
        }

        window.requestAnimationFrame(this.render.bind(this))
    }
}