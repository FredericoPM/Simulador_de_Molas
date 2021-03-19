let simulationController = new SimulationController();
let attachedToMouse;
let currentWidth;
let currentHeight;
let menu;
let gratyInput;
let massInput;
let particleData;
let movableParticle;
let isPaused = false;
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
function canvasPressed(){
    attachedToMouse = simulationController.searchParticle(mouseX, mouseY);
    if(attachedToMouse != null){
        particleData.style("display", "block");
        massInput.value(attachedToMouse.mass);
        movableParticle.checked(attachedToMouse.movable);
    }else{
        particleData.style("display", "none");
    }
}
function setup() {
    currentWidth = windowWidth;
    currentHeight = windowHeight;

    gratyInput = select("#gravityForce");
    gratyInput.value(simulationController.gravity);
    gratyInput.changed(() => simulationController.gravity = gratyInput.value());

    particleData = select("#particleData");
    particleData.style("display", "none");
    massInput = select("#particleMass");
    massInput.changed(() => {
        if(attachedToMouse != null)
            attachedToMouse.mass = massInput.value();
    });
    movableParticle = select("#movable");
    movableParticle.changed(() => {
        if(attachedToMouse){
            attachedToMouse.movable = movableParticle.checked();
            attachedToMouse.velocity.set(0,0);
        }
    })

    setMenu();

    let canvas = createCanvas(windowWidth*0.8, windowHeight);
    canvas.mousePressed(canvasPressed);
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
    if(!isPaused){
        simulationController.displayElements();
        simulationController.applyForcesMovableElements();
        simulationController.updateElements();
        if(mouseIsPressed && attachedToMouse && mouseX <= windowWidth*0.8){
            attachedToMouse.velocity.set(0,0);
            attachedToMouse.position.set(mouseX, mouseY);
        }
    }
}