export default class Sketch {
    constructor({ canvas }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")

        this.objects = []
        
        this.resize()
        window.addEventListener("resize", this.resize.bind(this))
    }

    get dimensions() {
        return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight }
    }

    resize() {
        Object.assign(this.canvas, this.dimensions)
        Object.assign(this.canvas.style, Object.keys(this.dimensions).reduce((acc, cur) => ({  
            ...acc,
            [cur]: this.dimensions[cur] + "px"
        }), {}))
    }

    add(...objects) {
        for(const object of objects) {
            this.objects.push(object)
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
        for(const object of this.objects) {
            object?.core(this)
        }

        window.requestAnimationFrame(this.render.bind(this))
    }
}