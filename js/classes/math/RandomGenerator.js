export default class RandomGenerator {
    integer(min, max) {
        return Math.floor(this.float(min, max))
    }

    float(min, max) {
        return Math.random() * (max - min) + min
    }
}