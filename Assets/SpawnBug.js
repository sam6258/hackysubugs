#pragma strict

var pos = new Vector2(0, 0);
var rb : Rigidbody2D;
public var velocityLim = 2;
var xForce = 0;
var yForce = 0;

function Start () {
	pos = this.transform.position;
	//StartCoroutine("UpdatePos");
	rb = GetComponent(typeof(Rigidbody2D));
	setForce('both', -100, 100);
	rb.AddForce(new Vector2(xForce, yForce));
	StartCoroutine("addRandomForce");
}

function Update () {
	if(transform.position.x > 10) {
		setForce('x', -100, 5);
		setForce('y', -100, 100);
		rb.AddForce(new Vector2(xForce, yForce));
	} else if(transform.position.x < -10) {
		setForce('x', 5, 100);
		setForce('y', -100, 100);
		rb.AddForce(new Vector2(xForce, yForce));
	} 

	if(transform.position.y > 5) {
		setForce('x', -100, 100);
		setForce('y', -100, 5);
		rb.AddForce(new Vector2(xForce, yForce));
	} else if(transform.position.y < -5) {
		setForce('x', -100, 100);
		setForce('y', 5, 100);
		rb.AddForce(new Vector2(xForce, yForce));
	}
	if (rb.velocity.x > 0) {
		rb.velocity.x = velocityLim;
	} else {
		rb.velocity.x = -velocityLim;
	}

	if (rb.velocity.y > 0) {
		rb.velocity.y = velocityLim;
	} else {
		rb.velocity.y = -velocityLim;
	}

	//rb.velocity.x = Mathf.Clamp(rb.velocity.x, -velocityLim, velocityLim);
	//rb.velocity.y = Mathf.Clamp(rb.velocity.y, -velocityLim, velocityLim);
}

function setForce(direction, min : int, max : int) {
	if (direction == 'x') {
		xForce = Random.value * (max - min) + min;
	} else if (direction == 'y'){
		yForce = Random.value * (max - min) + min;
	}
	else {
		xForce = Random.value * (max - min) + min;
		yForce = Random.value * (max - min) + min;
	}
}

function addOrSubtract() {
	if (parseInt(getRandom(0, 2)) == 1) {
		return -100;	
	}
	else {
		return 100;
	}
}

function getRandom(min :float, max : float) {
	return Random.value * (max - min) + min;
}

function addRandomForce () {
	Debug.Log(getRandom(3,5));
	yield WaitForSeconds(getRandom(2,5));
	rb.AddForce(new Vector2(-xForce + addOrSubtract(), -yForce + addOrSubtract()));
	StartCoroutine("addRandomForce");
}

function UpdatePos () {
	yield WaitForSeconds(0.05);

	var min = -1;
	var max = 1;

	pos = this.transform.position;

	var x = Random.value * (max - min) + min;
	var y = Random.value * (max - min) + min;

	Debug.Log(Mathf.Clamp(y + pos.y, -5, 5));

	transform.position = Vector2(Mathf.Clamp(x + pos.x, -10, 10), Mathf.Clamp(y + pos.y, -5, 5));

	StartCoroutine("UpdatePos");
}

