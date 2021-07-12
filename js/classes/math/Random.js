export default class RandomGenerator {
    integer(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }
}