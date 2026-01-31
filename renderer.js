import SETTINGS from "./settings.js";
import Vector3 from "./vector3.js";


let width = window.innerWidth;
let height = window.innerHeight;
const ctx = canvas.getContext('2d');

//############## HTML ELEMENTS #################
let leftUI = document.getElementById("leftUI");
let rightUI = document.getElementById("rightUI");
let cameraPosText = document.getElementById("cameraPos");
//############## HTML ELEMENTS #################

let linePositions = [
    {
        p1: new Vector3(-SETTINGS.LINE_LENGTH, 0, 0),
        p2: new Vector3(SETTINGS.LINE_LENGTH, 0, 0)
    },
    {
        p1: new Vector3(0, -SETTINGS.LINE_LENGTH, 0),
        p2: new Vector3(0, SETTINGS.LINE_LENGTH, 0)
    },
    {
        p1: new Vector3(0, 0, SETTINGS.LINE_LENGTH),
        p2: new Vector3(0, 0, 0)
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


//################ START AND UPDATE functions ################


function start(){
    setupKeys();
    resizeCanvas();
    clear();
}
start();

function update(){
    resizeCanvas();
    clear();
    if (debugLines)
        displayLines();
    updateCameraPosText();

    point(toScreen(project(new Vector3(30, 30, 30))), 20, 'red');

    movement();
}

setInterval(() => {
    update();   
}, 1000 / SETTINGS.FPS);

//################ START AND UPDATE functions ################

let cameraPosition = new Vector3(0, 10, -70);

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
    ctx.strokeStyle = SETTINGS.LINE_COLOR;
    ctx.stroke();
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.height = height;
    canvas.width = width;
}

function clear(){
    ctx.fillStyle = SETTINGS.BACKGROUND;
    ctx.fillRect(0, 0, width, height);
}

function point({x, y, depth}, radius, color) {
    const referenceDistance = 50;
    const scale = referenceDistance / depth;

    const apparentRadius = radius * scale;

    if (apparentRadius < 0.1) return;

    ctx.beginPath();
    ctx.arc(x, y, apparentRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function toScreen(p) {
    const x = p?.x ?? 100000;
    const y = p?.y ?? 100000;
    const depth = p?.depth ?? 100000;
    return {
        x: (x + 1) / 2 * width,
        y: (1 - (y + 1) / 2) * height,
        depth:  depth
    }
}

function project(p){
    const depth = p.z - cameraPosition.z;

    if (depth <= 0.1) {
        return null; 
    }

    const aspectRatio = width / height;

    return {
        x: (p.x - cameraPosition.x) / depth / aspectRatio, 
        y: (p.y - cameraPosition.y) / depth,
        depth: depth
    }
}

function movement(){
    if (isPressed("KeyD")) {
        cameraPosition.x += SETTINGS.CAMERA_SPEED;
    }
    if (isPressed("KeyA")) {
        cameraPosition.x -= SETTINGS.CAMERA_SPEED;
    }

    if (isPressed("KeyW")) {
        cameraPosition.z += SETTINGS.CAMERA_SPEED;
    }
    if (isPressed("KeyS")) {
        cameraPosition.z -= SETTINGS.CAMERA_SPEED;
    }
    if (isPressed("Space")) {
        cameraPosition.y += SETTINGS.CAMERA_SPEED;
    }
    if (isPressed("ShiftLeft")) {
        cameraPosition.y -= SETTINGS.CAMERA_SPEED;
    }
}



//####################### FUNCTIONAL KEYS HANDLES ##########################

let UIopen = false;
let debugLines = true;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == "81"){  // Q
        if(!UIopen){
            leftUI.style.left = "0px";
            rightUI.style.right = "0px";
            UIopen = true;
        } else {
            leftUI.style.left = "-20vw";
            rightUI.style.right = "-20vw";
            UIopen = false;
        }     
    }else if (event.keyCode == "76"){  // L
        if(!debugLines) debugLines = true;
        else debugLines = false;
    }
});




function updateCameraPosText(){
    cameraPosText.innerHTML = "Position: X:" + cameraPosition.x + " Y:" + cameraPosition.y + " Z:" + cameraPosition.z;
}