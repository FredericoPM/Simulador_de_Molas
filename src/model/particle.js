class Particle{
    constructor(x, y, mass, movable){
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0,0);
        this.position= createVector(x, y);
        this.mass = mass;
        this.movable = movable;
        this.conectedSprings = [];
    }
    get systemMass(){
        let totalMass = this.mass;
        for(let spring of this.conectedSprings){
            if(spring.a.position.y < this.position.y){
                totalMass += spring.a.systemMass;
            }else if(spring.b.position.y < this.position.y){
                totalMass += spring.b.systemMass;
            }
        }
        return totalMass;
    }
    applyForce(force){
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }
    update(){
        if(this.movable){
            this.velocity.mult(0.98);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }
    display(){
        stroke(200);
        strokeWeight(2);
        fill(127);
        circle(this.position.x, this.position.y, 60);
    }
}