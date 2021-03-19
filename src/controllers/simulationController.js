class SimulationController{
    constructor(){
        this.particles = [];
        this.springs = [];
        this.gravity = 1;
    }
    setup(){
        for(var i=0; i<3;i++){
            this.particles[i] = new Particle(400, 0 + 100*i, 1, true);
            if(i != 0){
                this.springs[i-1] = new Spring(0.01, 100, this.particles[i-1], this.particles[i]);
            }else{
                this.particles[i].movable = false;
            }
        }
    }
    displayElements(){
        for(let spring of this.springs)
            spring.display();

        for(let particle of this.particles)
            particle.display();
    }
    applyForcesMovableElements(){
        let lastSpringForce;
        let springForce;
        let weight;
        let totalSpringForce;
        for(var i = 0; i < this.springs.length; i++){
            totalSpringForce = 0;
            lastSpringForce = springForce;
            springForce = this.springs[i].update();
            if(i == 0){
                weight = createVector(0, this.gravity * this.particles[i].systemMass);
                this.particles[i].applyForce(p5.Vector.add(springForce, weight));   
            }else{
                lastSpringForce.mult(-1);
                totalSpringForce = p5.Vector.add(springForce, lastSpringForce);
                weight = createVector(0, this.gravity * this.particles[i].systemMass);
                this.particles[i].applyForce(p5.Vector.add(totalSpringForce, weight));
                if(i == this.springs.length-1){
                    springForce.mult(-1);
                    weight = createVector(0, this.gravity * this.particles[i+1].systemMass);
                    this.particles[i+1].applyForce(p5.Vector.add(springForce, weight));
                }
            }
        }
    }
    updateElements(){
        for(let particle of this.particles)
            particle.update();
    }
    searchParticle(x, y){
        let distance;
        for(let i = 0; i < this.particles.length; i++){
            distance = p5.Vector.sub(this.particles[i].position, createVector(x, y));
            if(distance.mag() <= 60){
                return this.particles[i];
            }
        }
        return null;
    }
}