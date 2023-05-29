const drone = document.querySelector('.drone');
const droneWrapper = document.querySelector('.drone-wrapper');
const propellers = document.querySelectorAll(".propeller");
const shadow = document.querySelector('.shadow');

const speed = 10;
const boundary = {
	top: 0,
	left: 0,
	bottom: window.innerHeight - drone.offsetHeight,
	right: window.innerWidth - drone.offsetWidth
};

const droneBoundary = {
  top: drone.offsetTop,
  left: drone.offsetLeft
}

let x = 0;
let y = 0;
let flag = '';

function handleKeyDown(event) {

	if (event.code === 'ArrowUp') {
    if(boundary.bottom + y > boundary.top) {
      y -= speed;
    }
	} else if (event.code === 'ArrowDown') {
    if(boundary.top == y) {
      return;
    }
    if(boundary.top + y < boundary.bottom) {
      y += speed;
    }
	} else if (event.code === 'ArrowLeft') {
    flag = 'l';
    if(y == 0) {
      droneWrapper.classList.remove("move-left");
      droneWrapper.classList.remove("move-right");
      return;
    }
    if(droneBoundary.left + x > boundary.left) {
      x -= speed;
    }
	} else if (event.code === 'ArrowRight') {
    flag = 'r';
    if(y == 0) {
      droneWrapper.classList.remove("move-left");
      droneWrapper.classList.remove("move-right");
      return;
    }
    if(droneBoundary.left + x < boundary.right) {
      x += speed;
    }
	}
	updatePosition();
}

function updatePosition() {
  if(y !== 0) {
    propellers.forEach(pro => {
      pro.classList.add("fly");
    })
    // Update the drone's position
    shadow.style.display = `none`;
    drone.style.transform = `translate(${x}px, ${y}px)`;
    droneWrapper.classList.add("fly-drone");

    if (flag === 'l') {
      droneWrapper.classList.remove("fly-drone");
      droneWrapper.classList.remove("move-right");
      droneWrapper.classList.add("move-left");
    }
    
    if (flag === 'r') {
      droneWrapper.classList.remove("fly-drone");
      droneWrapper.classList.remove("move-left");
      droneWrapper.classList.add("move-right");  
    }
  } else {
    propellers.forEach(pro => {
      pro.classList.remove("fly");
    })
    droneWrapper.classList.remove("move-left");
    droneWrapper.classList.remove("move-right");
    droneWrapper.classList.remove("fly-drone");
    shadow.style.display = `block`;
  }
  flag = '';
}

function handleKeyUp(event) {
  if (y !== 0) {
    droneWrapper.classList.add("fly-drone");
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
