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

// const EVENT_DRAW_DOWN = 'mousedown';
// const EVENT_DRAW_MOVE = 'mousemove';
// const EVENT_DRAW_UP = 'mouseup';

const EVENT_DRAW_DOWN = 'pointerdown';
const EVENT_DRAW_MOVE = 'pointermove';
const EVENT_DRAW_UP = 'pointerup';
const EVENT_DRAW_CANCEL = 'pointercancel';

const onDrawDown = (e) => {	
	console.log('onDrawDown e=', e);

	const svg = document.querySelector('#svg');
	const svgPoint = (elem, x, y) => {
		const p = svg.createSVGPoint();
		p.x = x;
		p.y = y;
		return p.matrixTransform(elem.getScreenCTM().inverse());
	};
	let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	const start = svgPoint(svg, e.clientX, e.clientY);

	const onDrawMove = (e) => {
		console.log('onDrawMove e=', e);

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
	const onDrawUp = (e) => {
		console.log('onDrawUp e=', e);

		document.removeEventListener(EVENT_DRAW_DOWN, onDrawDown);
		document.removeEventListener(EVENT_DRAW_MOVE, onDrawMove);
		document.removeEventListener(EVENT_DRAW_UP, onDrawUp);
		document.removeEventListener(EVENT_DRAW_CANCEL, onDrawCancel);

		svg.style.cursor = 'auto';
	};
	const onDrawCancel = (e) => {
		console.log('onDrawCancel e=', e);

		document.removeEventListener(EVENT_DRAW_DOWN, onDrawDown);
		document.removeEventListener(EVENT_DRAW_MOVE, onDrawMove);
		document.removeEventListener(EVENT_DRAW_UP, onDrawUp);
		document.removeEventListener(EVENT_DRAW_CANCEL, onDrawCancel);

		svg.style.cursor = 'auto';
	};

	document.addEventListener(EVENT_DRAW_MOVE, onDrawMove);
	document.addEventListener(EVENT_DRAW_UP, onDrawUp);
	document.addEventListener(EVENT_DRAW_CANCEL, onDrawCancel);
};

window.onload = () => {
	// document.addEventListener('touchstart', _touchstartEvent, {passive: false});
	// document.addEventListener('touchmove', _touchmoveEvent, false);
	// document.addEventListener('touchend', _touchendEvent, false);

	document.getElementById("home").addEventListener("click", (e) => {
    alert("click home");
  });

	document.getElementById("actionTest").addEventListener("click", (e) => {
		document.querySelector('#svg').style.cursor = 'crosshair';
		document.addEventListener(EVENT_DRAW_DOWN, onDrawDown);
  });
};
