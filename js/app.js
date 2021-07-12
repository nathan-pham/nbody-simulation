import RandomGenerator from "./classes/math/RandomGenerator"
import Vector from "./classes/math/Vector"
import Sketch from "./classes/Sketch"
import Planet from "./classes/Planet"

const sketch = new Sketch({ canvas: document.getElementById("app") })

const generator = new RandomGenerator()
const population = 200

for(let i = 0; i < population; i++) {
    sketch.add(new Planet({ 
        radius: 7, 
        mass: 5,
        // mass: generator.integer(1, 10), 
        pos: new Vector(
            generator.integer(0, sketch.dimensions.width), 
            generator.integer(0, sketch.dimensions.height)
        ) 
    }))
}

sketch.render()

console.log(sketch.objects[0])