import RandomGenerator from "./math/RandomGenerator"
import Vector from "./math/Vector"
import Utils from "./math/Utils"

const generator = new RandomGenerator()
const utils = new Utils()
const max = 1

export default class Planet {
    vel = new Vector(generator.float(-1, 1), generator.float(-1, 1))
    acc = new Vector(0, 0)

    constructor({ radius=5, mass=5, pos }) {
        this.radius = radius
        this.mass = mass
        this.pos = pos
    }

    update(objects) {
        for(const object of objects) {
            if(object !== this) {
                const direction = new Vector(object.pos.x - this.pos.x, object.pos.y - this.pos.y)
                const F = utils.force(object, this)
    
                direction.setMag(F)
    
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

    core({ ctx, objects }) {
        this.update(objects)
        this.render(ctx)
    }
}