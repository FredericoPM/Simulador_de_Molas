class Particle{
    constructor(x, y, mass, movable){
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0,0);
        this.position= createVector(x, y);
        this.strokeColor = color(200);
        this.fillColor = color(123);
        this.mass = mass;
        this.movable = movable;
        this.conectedSprings = [];
    }
    get systemMass(){
        let totalMass = this.movable ? this.mass : 0;
        for(let spring of this.conectedSprings){
            if(spring.a.position.y < this.position.y && spring.a.movable){
                totalMass += spring.a.systemMass;
            }else if(spring.b.position.y < this.position.y && spring.b.movable){
                totalMass += spring.b.systemMass;
            }
        }
        return totalMass;
    }
    applyForce(force){
        if(this.movable){
            let f = force.copy();
            f.div(this.mass);
            this.acceleration.add(f);
        }
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
        stroke(this.strokeColor);
        strokeWeight(2);
        fill(this.fillColor);
        circle(this.position.x, this.position.y, 60);
    }
}