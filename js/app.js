import RandomGenerator from "./classes/math/RandomGenerator"
import Vector from "./classes/math/Vector"
import Sketch from "./classes/Sketch"
import Planet from "./classes/Planet"

const sketch = new Sketch({ canvas: document.getElementById("app") })

const generator = new RandomGenerator()
const { dimensions } = sketch
const population = 100

for(let i = 0; i < population.length; i++) {
    sketch.add(new Planet({ 
        radius: 10, 
        mass: generator.integer(1, 10), 
        pos: new Vector(generator.integer(0, dimensions.width), generator.integer(0, dimensions.height)) 
    }))
}