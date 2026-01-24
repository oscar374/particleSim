
//setup
const BACKGROUND = "#121212";
const PARTICLE_SIZE = 4; 
const LINE_COLOR = "lime";
const LINE_LENGTH = 90;
const FPS = 60;
const CAMERA_SPEED = 1;
//setup

let width = window.innerWidth;
let height = window.innerHeight;
const ctx = canvas.getContext('2d');

let linePositions = [
    {
        p1: {
            x: -LINE_LENGTH,
            y: 0, 
            z: 0
        },
        p2: {
            x: LINE_LENGTH, 
            y: 0,
            z: 0
        }
    },
    {
        p1: {
            x: 0,
            y: -LINE_LENGTH, 
            z: 0
        },
        p2: {
            x: 0, 
            y: LINE_LENGTH,
            z: 0
        }
    },
    {
        p1: {
            x: 0,
            y: 0, 
            z: LINE_LENGTH
        },
        p2: {
            x: 0, 
            y: 0,
            z: 0
        }
    }
]

// ############### INPUT HANDLING ###############

const keysPressed = {};

function setupKeys() {
    document.addEventListener('keydown', function(event) {
        keysPressed[event.code] = true;
    });

    document.addEventListener('keyup', function(event) {
        keysPressed[event.code] = false;
    });
}

function isPressed(code) {
    return !!keysPressed[code];
}

// ############### INPUT HANDLING ###############



let keyData = [];



//################ START AND UPDATE functions ################


function start(){
    setupKeys();
    resizeCanvas();
    clear();
}
start();

function update(){
    clear();
    displayLines();
    point(toScreen(project({x: 30, y: 30, z: 30})), "lime");

    movement();
}

//################ START AND UPDATE functions ################

let cameraPosition = {
    x: 0,
    y: 10, 
    z: -40
}

setInterval(() => {
    update();   
}, 1000 / FPS);

function displayLines(){
    linePositions.forEach(element => {
        const p1Projected = project(element.p1);
        const p2Projected = project(element.p2);

        if (p1Projected && p2Projected) {
            drawLine(
                toScreen(p1Projected),
                toScreen(p2Projected)
            );
        }
    });
}

function drawLine({x: x1, y: y1}, {x: x2, y: y2}){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = LINE_COLOR;
    ctx.stroke();
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.height = height;
    canvas.width = width;
}

function clear(){
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, width, height);
}

function point({x, y}, color){
    ctx.beginPath();
    ctx.arc(x - PARTICLE_SIZE / 2, y - PARTICLE_SIZE / 2, PARTICLE_SIZE , 40, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.stroke();
}

function toScreen(p) {
    return {
        x: (p.x + 1) / 2 * width,
        y: (1 - (p.y + 1) / 2) * height
    }
}

function project({x, y, z}){
    const depth = z - cameraPosition.z;

    if (depth <= 0.1) {
        return null; 
    }

    return {
        x: (x - cameraPosition.x) / (z - cameraPosition.z),
        y: (y - cameraPosition.y) / (z - cameraPosition.z) 
    }
}

function movement(){
    if (isPressed("KeyD")) {
        cameraPosition.x += CAMERA_SPEED;
    }
    if (isPressed("KeyA")) {
        cameraPosition.x -= CAMERA_SPEED;
    }

    if (isPressed("KeyW")) {
        cameraPosition.z += CAMERA_SPEED;
    }
    if (isPressed("KeyS")) {
        cameraPosition.z -= CAMERA_SPEED;
    }
    if (isPressed("Space")) {
        cameraPosition.y += CAMERA_SPEED;
    }
    if (isPressed("ShiftLeft")) {
        cameraPosition.y -= CAMERA_SPEED;
    }
}