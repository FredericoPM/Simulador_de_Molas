let simulationController = new SimulationController();
let attachedToMouse;
let currentWidth;
let currentHeight;
let menu;
let input;
function setMenu(){
    menu = select("#menu");
    menu.style("background-color", color(200));
    menu.style('width', windowWidth*0.2);
    menu.style('height', windowHeight);
}
function updateMenuSize(width, height){
    menu.style('width', width*0.2);
    menu.style('height', height);
}
function updateCanvasSize(width, height){
    resizeCanvas(width*0.8, height);
}
function mousePressed(){
    attachedToMouse = simulationController.searchParticle(mouseX, mouseY);
}
function setup() {
    currentWidth = windowWidth;
    currentHeight = windowHeight;
    input = select("#gravityForce");
    input.value(simulationController.gravity);
    input.changed(() => simulationController.gravity = input.value());
    setMenu();
    let canvas = createCanvas(windowWidth*0.8, windowHeight);
    simulationController.setup();
}
function draw() {
    if(currentWidth != windowWidth || currentHeight != windowHeight){
        currentWidth = windowWidth;
        currentHeight = windowHeight;
        updateCanvasSize(windowWidth, windowHeight);
        updateMenuSize(windowWidth, windowHeight);
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