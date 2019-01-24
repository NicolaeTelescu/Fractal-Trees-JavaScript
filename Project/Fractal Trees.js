/* Draw Fractal Trees */

var angle;
var axiom = "F";
var sentence = axiom;
var drawing;
var len = 100; // who is len ? len is the length of the segment that you draw
var xNow, yNow;
var positions = [], positionNow = 0;
positions[0] = {
	x : 0,
	y : 0,
	angle : 0
}

// a -> b anytime, and I have some rules beyond :
// rule 1 : A->AB
// rule 2 : B->A

var rules = [];
rules[0] =  // this is an object. Be careful how you write this. It is a kind of structure from C
{
	a : "F",
	b : "FF+[+F-F-F]-[-F+F+F]"
}

function turtle()
{	
	// beginPath -> for reset the values and to know from where you start. You have the closePath that draw a line to start.
	
	
	// It's a little bit confusing that I have to go up with the line, that means that the y will decrease.
	xNow = positions[positionNow].x;
	yNow = positions[positionNow].y;
	angle = Math.PI / 2; // I will let 90 degrees because I want to draw up
	
	drawing.moveTo(xNow,yNow); // I'm starting from here
	drawing.lineWidth = 0.1;
	for (var i = 0 ; i < sentence.length ; i++)
	{
		var current = sentence[i];
		switch (current)
		{
			case "F" :
			{
				// I have to draw up, but with an angle. Here I will decrease the y coordinate, but I will increase the x coordinate
				drawing.lineTo(xNow + len * Math.cos(angle),yNow - len * Math.sin(angle)); 
				xNow += len * Math.cos(angle);
				yNow -= len * Math.sin(angle);
				break;
			}
			case "+" :
			{
				angle -= (Math.PI / 6);
				break;
			}
			case "-" :
			{
				angle += (Math.PI / 6);
				break;
			}
			case "[" :
			{
				positionNow++;
				positions[positionNow] =
				{
					x : xNow,
					y : yNow,
					angle : angle
				}
				break;
			}
			case "]" :
			{
				xNow = positions[positionNow].x;
				yNow = positions[positionNow].y;
				angle = positions[positionNow].angle;
				positionNow--;
				
				drawing.moveTo(xNow,yNow);
				// I forgot that if I change the variables, it doesn't change the position where is it now the cursor for drawing
				// and it can continue from where it was. I don't want that.
				break;
			}
		}
	}
	drawing.stroke(); // this creates magic !
}

function generate()
{
	len *= 0.5; // why do I do that ? Because I want to reduce the length of the segments after I put more and more lines
	
	var nextSentence = "";
	for (var i = 0 ; i < sentence.length ; i++)
	{
		// it is better to use a variable as current, than use sentence[i], so :
		var current = sentence[i];
		let used = 0;
		for (var j = 0 ; j < rules.length ; j++)
		{
			if (current == rules[j].a && used == 0)
			{
				nextSentence += rules[j].b;
				used = 1;
			}
		}
		if (used == 0)
			nextSentence += current;
	}
	sentence = nextSentence;
	
	// newParagraph(sentence); -> I don't want to put this on the page. I want just the drawing.
	turtle();
}

window.onload = function() {
	var canvas = createCanvas();
	drawing = canvas.getContext("2d");
	
	// drawTwoRectangles(drawing);
	// justDrawSomething();
	
	createAButton();
	// newParagraph(axiom); -> No, without paragraphs !
}

function justDrawSomething()
{
	drawing.beginPath();
	drawing.moveTo(xNow, yNow);
	drawing.lineTo(xNow, yNow - len);
	yNow = yNow - len;
	drawing.lineTo(xNow - 60, yNow - 80);
	drawing.strokeStyle = "red";
	drawing.stroke();
	
	drawing.beginPath();
	drawing.moveTo(xNow, yNow);
	drawing.lineTo(xNow, yNow - len);
	yNow = yNow - len;
	drawing.lineTo(xNow - 60, yNow - 80);
	drawing.stroke();
}

function createCanvas()
{
	var canvas = document.createElement("canvas");
	canvas.height = "400";
	canvas.width = "400";
	positions[0].x = canvas.width / 2;
	positions[0].y = canvas.height;
	var drawing = canvas.getContext("2d");
	
	drawing.fillStyle = "yellow";
	drawing.fillRect(0, 0, canvas.width, canvas.height);
	document.body.appendChild(canvas);
	return canvas;
}

function newParagraph(sentence)
{
	var newP = document.createElement("p");
	var newText = document.createTextNode(sentence);
	newP.appendChild(newText);
	document.body.appendChild(newP);
}

function drawTwoRectangles(drawing)
{
	drawing.beginPath();
	drawing.rect(20, 20, 150, 100);
	drawing.fillStyle = "red";
	drawing.fill();

	drawing.beginPath();
	drawing.rect(40, 40, 150, 100);
	drawing.fillStyle = "blue";
	drawing.fill();
}

function createAButton()
{
	var buttonTree = document.createElement("input");
	buttonTree.type = "button";
	buttonTree.style.display = "block";
	buttonTree.value = "Click me";
	buttonTree.onclick = function()
	{
		generate();
	}	
	document.body.appendChild(buttonTree);
}
