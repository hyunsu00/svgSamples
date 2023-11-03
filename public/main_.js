const svg = document.querySelector('#svg');

const svgPoint = (elem, x, y) => {
  const p = svg.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
};
const drawRect = (e) => {
	const p = svgPoint(svg, e.clientX, e.clientY);
	const w = Math.abs(p.x - start.x);
	const h = Math.abs(p.y - start.y);
	if (p.x > start.x) {
		p.x = start.x;
	}

	if (p.y > start.y) {
		p.y = start.y;
	}

	rect.setAttributeNS(null, 'x', p.x);
	rect.setAttributeNS(null, 'y', p.y);
	rect.setAttributeNS(null, 'width', w);
	rect.setAttributeNS(null, 'height', h);
	svg.appendChild(rect);
};
const endDraw = (e) => {
	svg.removeEventListener('mousemove', drawRect);
	svg.removeEventListener('mouseup', endDraw);
};

// mouseEvent
let isMouseEvent = false;
let rect = null;
let start = null;
function _mousedownEvent(e) {
	console.log('_mousedownEvent e=', e);
	isMouseEvent = true;

	rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  start = svgPoint(svg, event.clientX, event.clientY);
}

function _mousemoveEvent(e) {
	if (isMouseEvent) {
		console.log('_mousemoveEvent e=', e);

		drawRect(e);
	}
}
function _mouseupEvent(e) {
	console.log('_mouseupEvent e=', e);
	isMouseEvent = false;

	endDraw(e);
}

// pointerEvent
let isPointEvent = false;
function _pointerdownEvent(e) {
	console.log('_pointerdownEvent e=', e);
	isPointEvent = true;

	rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  start = svgPoint(svg, e.clientX, e.clientY);
}
function _pointermoveEvent(e) {
	if (isPointEvent) {
		console.log('_pointermoveEvent e=', e);

		drawRect(e);
	}
}
function _pointerupEvent(e) {
	console.log('_pointerupEvent e=', e);
	isPointEvent = false;

	endDraw(e);
}
function _pointercancelEvent(e) {
	console.log('_pointercancelEvent e=', e);
}

// touchEvent
let isTouchEvent = false;
function _touchstartEvent(e) {
	console.log('_touchstartEvent e=', e);
	isTouchEvent = true;
}
function _touchmoveEvent(e) {
	if (isTouchEvent) {
		console.log('_touchmoveEvent e=', e);
	}
}
function _touchendEvent(e) {
	console.log('_touchendEvent e=', e);
	isTouchEvent = false;
}

window.onload = () => {
	// document.addEventListener('mousedown', _mousedownEvent);
	// document.addEventListener('mousemove', _mousemoveEvent);
	// document.addEventListener('mouseup', _mouseupEvent);
  
	document.addEventListener('pointerdown', _pointerdownEvent);
	document.addEventListener('pointermove', _pointermoveEvent);
	document.addEventListener('pointerup', _pointerupEvent);
	document.addEventListener('pointercancel', _pointercancelEvent);

	// document.addEventListener('touchstart', _touchstartEvent, {passive: false});
	// document.addEventListener('touchmove', _touchmoveEvent, false);
	// document.addEventListener('touchend', _touchendEvent, false);

	document.getElementById("home").addEventListener("click", (e) => {
    alert("click home");
  });

	document.getElementById("actionTest").addEventListener("click", (e) => {
		alert("click actionTest");
  });
};
