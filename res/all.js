function resetAll()
{alert("RESET");
	localStorage.removeItem("timeToCount");
	localStorage.removeItem("timeToAnswer");
	localStorage.removeItem("level");
	for (var r = 0; r < ass.length; r++)
	{
	//	alert(ass[r].value + "_score");
	localStorage.removeItem(ass[r].value + "_score");
	}
	window.location.reload();
}

function levelChange(direct)
{
	var lev = Number(localStorage.getItem("level"));
	
	if (direct === 1) localStorage.setItem("level", lev+1);
	if (direct === 0)
	{
		var noteToFreese = ass[lev];
		let note = document.getElementById(noteToFreese.value);
		let glass = document.getElementById(noteToFreese.value + "_glass");
		
		note.setAttribute("class", noteToFreese.activeClass + "Frosen");
		note.status = "frosen";
		
		glass.setAttribute("class", noteToFreese.activeClass + "Glass");
		
		if (noteToFreese.activeClass === "white") glass.style.background = "lightgray";
		else glass.style.background = "silver";
		
		glass.innerHTML = "";
		
		localStorage.setItem("level", lev-1);
	}
	
	findLevel();
}

var notes;// = document.getElementById("c4");
var players;

function rand(min, max)
{
	return Math.round(Math.random(min, max) * (max-min) + min);
}


function setVar()
{
notes = document.getElementById("sounds").getElementsByTagName("source");
players = document.getElementById("players").getElementsByTagName("audio");
}

function coloring(keyID)
{
	var key = document.getElementById(keyID);
	var keyColor = key.style.background;
	var glassColor = document.getElementById(keyID + "_glass").style.background;
	
	let colorHolder = key.getElementsByClassName("colorHolder")[0];
		colorHolder.innerHTML = "<div class = \"color\"></div>";
		
	let color = colorHolder.getElementsByClassName("color")[0];
		color.style.background = glassColor;
	
	color.style.animation = "play 2s 1 ease-in-out backwards";
	return;
}

function inputValue(keyID)
{
	if(noteChoosen === undefined)
	{
		playSound(keyID);
	}
	
	else 
	{
		//clearTimeout(timeToAnswer);
		valuation(keyID);
	}
}

	
function playSound(keyID)
{
	var soundLink = document.getElementById(keyID + "_sound").getAttribute("src");
	
	for (var i = 0; i <= players.length; i++)
	{
		//if(players[i].ended) players[i].removeAttribute("src");
		
		if (i < players.length && players[i].ready > 0)
		{//alert();
			//players[i].played;
			players[i].src = soundLink;
			players[i].play();
			
			i += players.length;
			//alert();
		}
		
		else if (i === players.length)
		{//alert(document.getElementsByTagName('audio').length);
			var player = new Audio();
			player.ready = 1;
			player.src = soundLink;
			coloring(keyID);
			player.play();
		}
		//alert(document.getElementsByTagName('audio').length);
	}
}


function startGame()
{
	findLevel();
	
	if (start.innerHTML === "START")
	{
		start.innerHTML = "STOP";
		counting(0);
	}
	
	else
	{
		//bugHolder.innerHTML = "";
		count.innerHTML = "stopped";
		start.innerHTML = "START";
		document.getElementById("bugHolder").innerHTML = "";
		counting("break");
	}

	
	//alert(localStorage.getItem("level"));
}


var levelNumber;

var minScore = 10;
var minNote = "";
	
function findLevel()
{
	setTimeToCount();
	setTimeToAnswer();
	
	levelNumber = Number(localStorage.getItem("level"));
	
	if(levelNumber === 0)
	{
		levelNumber = 1;
		localStorage.setItem("level", levelNumber);
	}

	var score = 0;
	for (var l = 0; l <= levelNumber; l++)
	{
		var note = document.getElementById(ass[l].value);
		var noteStatus = note.getAttribute("status");
		
		if(noteStatus === "frosen")
		{
			note.setAttribute("status", "warm");
			note.setAttribute("class", ass[l].activeClass);
			note.setAttribute("onclick", "inputValue(this.id)");
			
			
		var glass = document.getElementById(ass[l].value + "_glass");
			glass.style.background = ass[l].color;
			

			var glassCount = Number(localStorage.getItem(ass[l].value + "_score"));
		
			if(glassCount === null)
			{
				glassCount = 0;
				localStorage.setItem(ass[l].value + "_score", glassCount);
			}
			
			if (glassCount < minScore)
			{
				minScore = glassCount;
				minNote = ass[l].value;
			}
			
			glass.innerHTML = glassCount;
			//alert(glass.style.backgroundColor);
			//alert(note.getAttribute("status"));
			findLevel();
		}
		
		else
		{
			var glassScore = Number(document.getElementById(ass[l].value + "_glass").innerHTML);
			//alert(glassScore);
			score += Number(glassScore);
			//alert(score);
		}
	}
		//alert(levelNumber+1);
	
	if (score/10 >= levelNumber+1)
	{
		levelNumber++;
		localStorage.setItem("level", levelNumber);
		minScore = glassCount;
		minNote = ass[levelNumber].value;
		//alert(minNote);
		//for (var l = 0; l < levelNumber; l++)
		//{
		//localStorage.removeItem(ass[l].value + "_score");
		//document.getElementById(ass[l].value + "_glass").innerHTML = 0;
		//}
		
		document.getElementById(ass[levelNumber].value + "_glass").innerHTML = 0
		//alert(levelNumber);
		findLevel();
	}
}

var timeToCount;

function setTimeToCount(num)
{
	if (num >= 0) localStorage.setItem("timeToCount", num);
	
	if(localStorage.getItem("timeToCount") !== null && Number(localStorage.getItem("timeToCount")) >= 0) timeToCount = Number(localStorage.getItem("timeToCount"));
	
	else timeToCount = 3;
	
	document.getElementById("countTimer").value = timeToCount;
	}

var click = document.getElementById("click");
	click.volume = 0.1;

	
function counting(counter)
{	
	if(counter === "break")
	{
		clearTimeout(timerCount);
	}
	
	else if (counter === undefined)
	{
		counter = 0;
		count.innerHTML = 3 - counter;
		timerCount = setTimeout(counting, timeToCount / 3 * 1000, counter);
	}
	
	else if (counter !== "undefined" && counter < 3)
	{
		count.innerHTML = 3 - counter;
		counter++;
		timerCount = setTimeout(counting, timeToCount / 3* 1000, counter);
	}
	
	else
	{
		count.innerHTML = "0";
		setTimeout(chooseNote, timeToCount / 3 * 1000);
	}
	click.play();	
}


var noteChoosenNum;
var noteChoosen;
var played = ["a", "b", "c"];

var timeToAnswer;

function setTimeToAnswer(num)
{
	if (num >= 1) localStorage.setItem("timeToAnswer", num);
	
	if(localStorage.getItem("timeToAnswer") !== null && Number(localStorage.getItem("timeToAnswer")) >= 1) timeToAnswer = Number(localStorage.getItem("timeToAnswer"));
	
	else timeToAnswer = 10;
	
	document.getElementById("answerTimer").value = timeToAnswer;
}

var fail = document.getElementById("fail");
fail.volume = 0.25;
			
function valuation(keyID)
{//alert(keyID);

	var glassCount = Number(localStorage.getItem(noteChoosen + "_score"));
	
	if (keyID === noteChoosen && glassCount < 10)
	{
			glassCount++;
			playSound(keyID);
	}

	else if (keyID !== noteChoosen)
	{
			if(glassCount > 0) glassCount--;
			fail.play();
			//alert(fail.volume);
	}
	
	document.getElementById("bugHolder").innerHTML = "";
	document.getElementById(noteChoosen + "_glass").innerHTML = glassCount;
	localStorage.setItem(noteChoosen + "_score", glassCount);
	noteChoosenNum = undefined;
	noteChoosen = undefined;
	findLevel();
	setTimeout(counting, 1000, 0);
}


function chooseNote()
{//alert(localStorage.getItem("level"));

if(played.indexOf(minNote) === -1)
{
	noteChoosen = minNote;
	played.shift();
	played.push(noteChoosen);
}

else
{
	noteChoosenNum = rand(0, levelNumber);
	noteChoosen = ass[noteChoosenNum].value;
	
	var repeats = 0;
	
	for (var n = 0; n < played.length; n++)
	{
		if (played[n] === noteChoosen)
		{
			repeats++;
		}
	}
	
	if (repeats < 2)
	{
		played.shift();
		played.push(noteChoosen);
	}	
	
	else
	{
		chooseNote();
	}
}
	
	var question = document.getElementById("question");
	var questionLink = document.getElementById(noteChoosen + "_sound").getAttribute("src");//"/sound/" + noteChoosen + ".mp3";
	question.src = questionLink;
	//alert(question.getAttribute("src"));
	question.play();

	var score = Number(localStorage.getItem(noteChoosen + "_score"));
		
			var bugHolder = document.getElementById("bugHolder");
			bugHolder.innerHTML = "<div id = \"bug\"></div>";
		
			var bug = document.getElementById("bug");
			var frameWidth = document.getElementById("gameframe").getBoundingClientRect().right - document.getElementById("gameframe").getBoundingClientRect().left;
			var bugHomeX = frameWidth / 2 - 7.5;//window.innerWidth / 2;// rand(mensure * -0.5, mensure * 0.5);
		
			bugHolder.style.left = bugHomeX + "px";
			//bug.style.left = "0px";
		
			//alert(noteChoosen);
			//		alert(window.innerWidth / 2 + rand(mensure * -0.5, mensure * 0.5) + "px");

			var bugTranslateX = document.getElementById(noteChoosen).getElementsByClassName('target')[0].getBoundingClientRect().left - document.getElementById("gameframe").getBoundingClientRect().left - bugHomeX + 1;
			var bugTranslateY = document.getElementById(noteChoosen).getElementsByClassName('target')[0].getBoundingClientRect().top + 25 + 1;
			//bug.addEventListener('transitionend', valuation, this.id);
			//var timeToAnswer = 10;//12 - Number(localStorage.getItem(noteChoosen + "_score"));
		
			if (Number(document.getElementById(noteChoosen+"_glass").innerHTML) === 10)
			{
				bugTranslateX = 0;
				bugTranslateY = 0;
			//	timeToAnswer = 10;
			}
			
			
			//timeToAnswer = setTimeout(valuation, timeToAns);
			bug.style.transitionDuration = timeToAnswer + "s";
			bug.style.transform = "translate(" + bugTranslateX + "px, " + bugTranslateY + "px)";
			bug.addEventListener('transitionend', valuation);

}
