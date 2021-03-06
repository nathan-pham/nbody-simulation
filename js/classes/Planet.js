import RandomGenerator from "./math/RandomGenerator"
import Vector from "./math/Vector"
import Utils from "./math/Utils"

const generator = new RandomGenerator()
const utils = new Utils()
const max = 3

export default class Planet {
    vel = new Vector(generator.float(-1, 1), generator.float(-1, 1))
    acc = new Vector(0, 0)
    pos = new Vector(0, 0)

    constructor({ radius=2, mass=10, pos, vel }) {
        this.radius = radius
        this.mass = mass

        if(pos) {
            this.pos = pos
        }

        if(vel) {
            this.vel = vel
        }
    }

    boundary({ width, height }) {
        if(this.pos.x < -this.radius) { this.pos.x = width + this.radius }
        if(this.pos.x > width + this.radius) { this.pos.x = -this.radius }
        if(this.pos.y > height + this.radius) { this.pos.y = -this.radius }
        if(this.pos.y < -this.radius) { this.pos.y = height + this.radius }
    }

    update(objects) {
        for(const object of objects) {
            if(object !== this) {
                // calculate force
                const direction = new Vector(object.pos.x - this.pos.x, object.pos.y - this.pos.y)
                direction.setMag(utils.force(object, this))
                // direction.div(object.mass)
                direction.mult(this.mass / (this.mass + object.mass))

                // direction.div(this.mass)

                // F = m * acc
                // 
                this.acc.add(direction)
            }
        }

        this.vel.add(this.acc)
        this.vel.limit(max)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    render(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#000"
        ctx.fill()
    }

    core({ ctx, objects, dimensions }) {
        this.boundary(dimensions)
        this.update(objects)
        this.render(ctx)
    }
}