import RandomGenerator from "./math/RandomGenerator"
import Vector from "./math/Vector"
import Utils from "./math/Utils"

const generator = new RandomGenerator()
const utils = new Utils()
const max = 1

export default class Planet {
    vel = new Vector(generator.float(-1, 1), generator.float(-1, 1))
    acc = new Vector(0, 0)

    constructor({ radius=5, mass=5, pos, vel }) {
        this.radius = radius
        this.mass = mass
        this.pos = pos

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
        const remove = []

        for(let i = 0; i < objects.length; i++) {
            const object = objects[i]

            if(object !== this) {
                // calculate force
                const direction = new Vector(object.pos.x - this.pos.x, object.pos.y - this.pos.y)
                const F = utils.force(object, this)
                direction.setMag(F)
                this.acc.add(direction)

                if(utils.distance(object.pos, this.pos) < 1) {
                    remove.push(object)

                    // Object.assign(this, {
                    //     radius: objects.radius + this.radius,
                    //     mass: objects.mass + this.mass,
                    //     pos: this.pos.clone()
                    // })
                }
            }
        }

        // objects = objects.filter((object) => !remove.includes(object))
        
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