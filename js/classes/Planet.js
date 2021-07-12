import RandomGenerator from "./math/RandomGenerator"
import Vector from "./math/Vector"
import Utils from "./math/Utils"

const generator = new RandomGenerator()
const utils = new Utils()

export default class Planet {
    vel = new Vector(0, 0)
    acc = new Vector(0, 0)

    constructor({ radius, mass, pos }) {
        this.radius = radius
        this.mass = mass
        this.pos = pos
    }

    update(objects) {
        for(const object of objects) {
            const direction = new Vector(object.pos.x - this.pos.x, object.pos.y - this.pos.y)
            const F = utils.force(object, this)
            direction.setMag(F)

            this.acc.add(direction)
        }
        
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    render(ctx) {
        ctx.fillStyle = "#000"
        ctx.arc(this.pos.x, this.pos.y, this.radius, 2 * Math.PI);
        ctx.fill()
    }

    core({ ctx, objects }) {
        this.update(objects)
        this.render(ctx)
    }
}