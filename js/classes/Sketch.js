import RandomGenerator from "./math/RandomGenerator"
import Vector from "./math/Vector"
import Utils from "./math/Utils"
import Planet from "./Planet"

const utils = new Utils()

export default class Sketch {
    constructor({ canvas }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")

        this.mouse = { down: false, moving: false, first: {}, last: {} }
        this.objects = []
        
        this.resize()
        window.addEventListener("resize", this.resize.bind(this))

        this.canvas.addEventListener("mousedown", (e) => {
            const mouse = utils.mouse(this.canvas, e)

            Object.assign(this.mouse, {
                first: mouse,
                last: mouse,
                down: true
            })
        })

        this.canvas.addEventListener("mousemove", (e) => {
            if(this.mouse.down) {
                this.mouse.moving = true
                this.mouse.last = utils.mouse(this.canvas, e)
            }
        })

        this.canvas.addEventListener("mouseup", (e) => {
            this.mouse.down = false
            this.mouse.moving = false

            const last = utils.mouse(this.canvas, e)
            const { first } = this.mouse

            const direction = new Vector(last.x - first.x, last.y - first.y)
            direction.setMag(utils.distance(last, first))
            direction.div(20)

            this.objects.push(new Planet({
                pos: new Vector(first.x, first.y),
                vel: direction.mag() == 0 ? null : direction
            }))
        })
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

    update() {
        const scheduleForDeletion = []

        for(const object1 of this.objects) {
            for(const object2 of this.objects) {
                if(object1 !== object2 && 
                    !(scheduleForDeletion.includes(object1) || 
                      scheduleForDeletion.includes(object2))
                ) {
                    if(utils.distance(object1.pos, object2.pos) < Math.min(object1.radius, object2.radius) / 2) {
                        scheduleForDeletion.push(object1)

                        const clone = object1.acc.clone()
                        clone.add(object2.acc)

                        object2.radius = Math.max(object2.radius, object1.radius) + 0.5
                        object2.mass = (object1.mass) + (object2.mass)
                        object2.vel.mult(0)
                        object2.acc = clone
                    }
                }
            }
        }

        this.objects = this.objects.filter(object => !scheduleForDeletion.includes(object))
    }

    render() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
        for(const object of this.objects) { object?.core(this) }
        this.update()

        window.requestAnimationFrame(this.render.bind(this))

        if(this.mouse.moving) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.mouse.first.x, this.mouse.first.y)
            this.ctx.lineTo(this.mouse.last.x, this.mouse.last.y)
            this.ctx.stroke()
        }
    }
}