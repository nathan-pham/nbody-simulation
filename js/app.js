import RandomGenerator from "./classes/math/RandomGenerator"
import Vector from "./classes/math/Vector"
import Sketch from "./classes/Sketch"
import Planet from "./classes/Planet"

const sketch = new Sketch({ canvas: document.getElementById("app") })
const generator = new RandomGenerator()

const population = 20

const generatePlanet = ({ x, y }={}) => {
    sketch.add(new Planet({ 
        radius: 2, 
        mass: 10,
        // mass: generator.integer(1, 10), 
        pos: (x && y) 
            ? new Vector(x, y) 
            : new Vector(
                generator.integer(0, sketch.dimensions.width), 
                generator.integer(0, sketch.dimensions.height)
            ) 
    }))
}

for(let i = 0; i < population; i++) {
    generatePlanet()
}

// document.body.addEventListener("click", (e) => {
//     generatePlanet(utils.mouse(sketch.canvas, e))
// })

sketch.render()
