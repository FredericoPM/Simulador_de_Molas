class Spring{
    constructor(k, restLenght, ancor, particle){
        this.k = k;
        this.restLength = restLenght;
        this.a = ancor;
        this.b = particle;
        this.a.conectedSprings[this.a.conectedSprings.lengh-1] = this;
        this.b.conectedSprings[this.b.conectedSprings.lengh-1] = this;
    }
    update(){
        let force = p5.Vector.sub(this.b.position, this.a.position);
        let x = force.mag() - this.restLength;
        force.normalize();
        force.mult(this.k * x);
        return force;
    }
    display(){
        strokeWeight(4);
        stroke(0);
        line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
    }
}