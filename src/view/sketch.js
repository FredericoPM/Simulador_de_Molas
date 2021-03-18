let simulationController = new SimulationController();
let attachedToMouse;
let startWidth;
let startHeight;
function setup() {
    startWidth = windowWidth;
    startHeight = windowHeight;
    let canvas = createCanvas(windowWidth, windowHeight);
    simulationController.setup();
}
function mousePressed(){
    if(!attachedToMouse)
        attachedToMouse = simulationController.searchParticle(mouseX, mouseY);
}
function mouseReleased(){
    attachedToMouse = null;
}
function draw() {
    if(startWidth != windowWidth || startHeight != windowHeight){
        resizeCanvas(windowWidth, windowHeight);
    }
    clear();
    simulationController.displayElements();
    simulationController.applyForcesMovableElements();
    simulationController.updateElements();
    if(mouseIsPressed && attachedToMouse){
        attachedToMouse.velocity.set(0,0);
        attachedToMouse.position.set(mouseX, mouseY);
    }
}