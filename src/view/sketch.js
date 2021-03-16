let particles = [];
let ancor;
let springs = [];
let springForce;
let gravity = 1;
let weight;

function setup() {
    let canvas = createCanvas(800, 800);
    ancor = new Particle(400, 0, 1, false);
    for(var i=0; i<2;i++){
        particles[i] = new Particle(400, 200 + 100*i, 1, true);

        if(i != 0){
            springs[i] = new Spring(0.01, 100, particles[i-1], particles[i]);
        }else{
            springs[i] = new Spring(0.01, 100, ancor, particles[i]);
        }
    }
}
  
function draw() {
    background(255);
    for(let spring of springs)
        spring.display();

    ancor.display();

    for(let particle of particles)
        particle.display();

    let totalForce;
    for(var i = 0; i < springs.length; i++){
        springForce = springs[i].update();
        if(i == 0){
            springForce.mult(-1);
            weight = createVector(0, gravity * particles[i].systemMass);
            totalForce = p5.Vector.add(springForce, weight);
        }else{
            particles[i-1].applyForce(p5.Vector.add(springForce, totalForce));
            springForce.mult(-1);
            weight = createVector(0, gravity * particles[i].systemMass);
            totalForce = p5.Vector.add(springForce, weight);
            if(i == springs.length-1)
                particles[i].applyForce(totalForce);
        }
    }
    ancor.update();
    for(let particle of particles)
        particle.update();

    if(mouseIsPressed){
        particles[particles.length-1].position.set(mouseX, mouseY);
        particles[particles.length-1].velocity.set(0,0);
    }
}