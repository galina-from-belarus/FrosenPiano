function test(id)
{
	alert(id);
	
	//document.getElementById(id).setAttribute("class", "white");
	//alert();
	//alert(document.getElementById('c1').getBoundingClientRect().right);
}

var mensure;


function writeCSS()
{
	// Вычисляем ширину приложения (мензуру клавиатуры)
		mensure = (Number(document.getElementById("gameframe").getBoundingClientRect().right) - Number(document.getElementById("gameframe").getBoundingClientRect().left));
		
		// Если получается меньше трехсот - ставим 300
		if (mensure < 300)
		{
				mensure = 300;
				
			var gameFrame = document.getElementById("gameframe")
				gameFrame.style.width = mensure + "px";
		}
	
	// Вычисляем отступы и размеры клавиш и смещения	
	var marginSize = Math.round(mensure / 500);
		if(marginSize < 1) marginSize = 1;
	
		mensure -= marginSize;

	var whites = document.getElementsByClassName("whiteFrosen");
	var whiteGlasses = document.getElementsByClassName("whiteGlass");
	
	var whitesWidth = mensure / 21;
	var whitesHeight = whitesWidth * 4.4;
	
	
	var blacks = document.getElementsByClassName("blackFrosen");
	var blackGlasses = document.getElementsByClassName("blackGlass");
		
	var blacksWidth = whitesWidth * 0.6;
	var blacksHeight = blacksWidth * 4.4;
	var blacksGap = whitesWidth - blacksWidth * 0.5 - marginSize;
	//alert(blacksGap);

	var keyBoard = document.getElementById("keyboard");
		keyBoard.style.width = mensure + marginSize + "px";
		keyBoard.style.height = whitesHeight + marginSize * 2 + "px";
		//keyBoard.style.padding = marginSize + "px";
	//alert(mensure + " || " + (mensure + marginSize));
	
	
	// Позиционируем доску со стаканами
	var glassBoard = document.getElementById("glassboard");
	glassBoard.style.top = document.getElementById("keyboard").getBoundingClientRect().bottom + whitesHeight / 5 + "px";
	
	// Задаем размер стаканов
	var glassWidth = whitesWidth * 0.75;
	var glassHeight = glassWidth * 1.5;
	var whiteGlassGap = (whitesWidth - glassWidth) * 0.5;
	var blacksGap = whitesWidth - blacksWidth * 0.5 - marginSize;
	
	// Задаем размер наклеек
	var labelWidth = glassWidth * 0.75;
	var labelHeight = labelWidth;
	
	//alert(glassWidth + "||" + labelHeight);
	
	// Высоту кнопки старта устанавливаем в белую клавишу.
	var start = document.getElementById("start");
	start.style.height = whitesWidth + "px";
	
	// Прописываем стили белых
	for (var w = 0; w < whites.length; w++)
	{
		var key = document.getElementById(whites[w].id);
			//alert(whiteGlasses[w].id);
		// Клавиши
			//key.style.position = "absolute";
			key.style.top = marginSize + "px";
			key.style.left = whitesWidth * w + marginSize + "px";
			key.style.width = whitesWidth - marginSize + "px";
			key.style.height = whitesHeight + "px";
			//key.style.margin = marginSize + "px";
			//key.innerHTML = key.id;
		//	alert (whitesWidth);
	
		// Стаканы
		var glass = document.getElementById(whiteGlasses[w].id);
			glass.style.left = whitesWidth * w + whiteGlassGap + marginSize + "px"
			glass.style.width = glassWidth + "px";
			glass.style.height = glassHeight + "px";
			//glass.style.background = ass[w].color;
			
		// Наклейки
		var label = glass.childNodes[0];
			label.style.height = labelHeight + "px";
			label.style.width = labelWidth + "px";
	}
	
	// Прописываем стили черных
	var space = 0;
		
	for (var b = 0; b < blacks.length; b++)
	{
			if(b === 2 || b === 5 || b === 7 || b === 10 || b === 12 || b === 17) space ++;
		// Клавиши
		var key = document.getElementById(blacks[b].id);
			//key.style.position = "absolute";
			key.style.top = marginSize * 2 + "px";
			key.style.left = blacksGap + whitesWidth * (b + space) + marginSize + "px";
			key.style.width = blacksWidth - marginSize + "px";
			key.style.height = blacksHeight + "px";
			key.style.margin = marginSize + "px";
			//key.innerHTML = key.id;
			//alert (blacksWidth);
		
		// Стаканы
		var glass = document.getElementById(blackGlasses[b].id);
			glass.style.top = glassHeight * 0.75 + "px";
			glass.style.left = blacksGap + whitesWidth * (b + space) + marginSize + blacksWidth / 2 - glassWidth / 2 + "px";
			glass.style.width = glassWidth + "px";
			glass.style.height = glassHeight + "px";

			// Наклейки
		var label = glass.childNodes[0];
			label.style.height = labelHeight + "px";
			label.style.width = labelWidth + "px";
	}
	setVar();
}