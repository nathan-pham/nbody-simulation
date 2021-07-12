const gravitationalConstant = 0.1

export default class Utils {
    distance(vec1, vec2) {
        return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2))
    }

    force(object1, object2) {
        const r = this.distance(object1.pos, object2.pos)
        const F = (gravitationalConstant * (object1.mass * object2.mass) / Math.pow(r, 2))
        // F = m * a
        return F
    }

    constrain(n, min, max) {
        if(n < min) { n = min }
        if(n > max) { n = max }
        return n
    }

    mouse(canvas, e) {
        const rect = canvas.getBoundingClientRect()

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }
}