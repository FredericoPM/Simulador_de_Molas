class SimulationController{
    constructor(){
        this.particles = [];
        this.springs = [];
        this.ancor;
        this.gravity = 1;
    }
    setup(){
        this.ancor = new Particle(400, 0, 1, false);
        for(var i=0; i<2;i++){
            this.particles[i] = new Particle(400, 200 + 100*i, 1, true);
    
            if(i != 0){
                this.springs[i] = new Spring(0.01, 100, this.particles[i-1], this.particles[i]);
            }else{
                this.springs[i] = new Spring(0.01, 100, this.ancor, this.particles[i]);
            }
        }
    }
    displayElements(){
        for(let spring of this.springs)
            spring.display();
    
        this.ancor.display();
    
        for(let particle of this.particles)
            particle.display();
    }
    applyForcesMovableElements(){
        let springForce;
        let weight;
        let totalForce;
        for(var i = 0; i < this.springs.length; i++){
            springForce = this.springs[i].update();
            if(i == 0){
                springForce.mult(-1);
                weight = createVector(0, this.gravity * this.particles[i].systemMass);
                totalForce = p5.Vector.add(springForce, weight);
            }else{
                this.particles[i-1].applyForce(p5.Vector.add(springForce, totalForce));
                springForce.mult(-1);
                weight = createVector(0, this.gravity * this.particles[i].systemMass);
                totalForce = p5.Vector.add(springForce, weight);
                if(i == this.springs.length-1)
                    this.particles[i].applyForce(totalForce);
            }
        }
    }
    updateElements(){
        this.ancor.update();
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