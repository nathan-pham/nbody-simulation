export default class Vector {
    constructor(x=0, y=0) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
    }

    sub(v) {
        this.x -= v.x
        this.y -= v.y
    }

    mult(s) {
        this.x *= s
        this.y *= s
    }

    div(s) {
        this.x /= s
        this.y /= s
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    setMag(m) {
        this.normalize()
        this.mult(m)
    }

    limit(type, s) {
        if(!s) {
            if(this.mag() > type) {
                this.setMag(type)
            }
        } else {
            if(Math.abs(this[type]) > s) {
                this[type] = s * Math.sign(this[type])
            }
        }
    }

    normalize() {
        let m = this.mag()
        if(m > 0) {
            this.div(m)
        }
    }

    clone() {
        return new Vector(this.x, this.y)
    }
}