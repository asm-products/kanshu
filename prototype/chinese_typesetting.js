
function getChineseText(textJSON) {
	var chineseText = {
		hanzis: [],
		pinyins: [],
		punc: [],
		definition: [],
		definitions: [],
		hsks: []
	}	

    for(var i = 0; i < textJSON.length; i++){
    	var paragraph = textJSON[i];
    	for (var j = 0; j < paragraph.length; j++){
    		if(paragraph[j][0] == 'punc: '){
    			chineseText.hanzis.push(paragraph[j][1]);
    			chineseText.pinyins.push('');
    			chineseText.punc.push(true);
    			chineseText.definition.push('');
    			chineseText.definitions.push('');
    			chineseText.hsks.push('');
    		}else{
    			chineseText.hanzis.push(paragraph[j][0]);
    			chineseText.pinyins.push(paragraph[j][2]);
    			chineseText.punc.push(false);
    			chineseText.definition.push(paragraph[j][4])
    			chineseText.definitions.push(paragraph[j][3])
    			chineseText.hsks.push(paragraph[j][5])
    		}
    	}
    }	

    return chineseText;
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};

function addPinyinWidths(chineseText, font){
	var pinyins = chineseText.pinyins;
	var pinyinWidths = [];

	for(var i = 0; i < pinyins.length; i++){
		pinyinWidths.push(getTextWidth(" " + pinyins[i] + " ", font))
	}
	chineseText.pinyinWidths = pinyinWidths;
	return chineseText;
}

function addHanziWidths(chineseText, font){
	var hanzis = chineseText.hanzis;
	var hanziWidths = [];

	for(var i = 0; i < hanzis.length; i++){
		hanziWidths.push(getTextWidth(" " + hanzis[i] + " ", font))
	}
	chineseText.hanziWidths = hanziWidths;
	return chineseText;	
}

function phraseMouseenter(divEntered, index){
    //get definition and measure height
	var definitions = chineseText.definitions[index];
	$("#translation").html(definitions);
    $("#translation").css('display', 'block');
    var translationHeight = $("#translation").outerHeight();
    
    //set pop-up top to position it above selected phrase
    var top = $(divEntered).position().top - translationHeight;
    $("#translation").css('top', top - 8);

    //set pop-up left with constraints to keep it within the screen
    var left = Math.max($("#centered").offset().left, $(divEntered).position().left - $("#translation").outerWidth()/2 + $(divEntered).outerWidth()/2);
    var rightOverhang = left + $("#translation").outerWidth() - (($("#centered").offset().left + 320));
    if(rightOverhang > 0){
        left -= rightOverhang;
    }

    //position speech bubble point
    var triangleLeft = Math.max($("#centered").offset().left + 10, $(divEntered).position().left + $(divEntered).outerWidth()/2 - 20);    
	$("#translation").css('left', left);
    $("#translationTriangle1").css('left', triangleLeft);
    $("#translationTriangle2").css('left', triangleLeft + 15);
    $("#translationTriangle1").css('top', top + translationHeight - 8);
    $("#translationTriangle2").css('top', top + translationHeight - 8);
    $("#translationTriangle1").css('display', 'block');
    $("#translationTriangle2").css('display', 'block');
   
    //show pinyin if hidden
    $(divEntered).children().children().css('color','#000000');
}

function phraseMouseleave(divLeft){
	$("#translation").css('display', 'none');
    $("#translationTriangle1").css('display', 'none');
    $("#translationTriangle2").css('display', 'none');    
	$(divLeft).children().children().css('color','inherit');
}

function addPhrase(pinyin, hanzi, definition, punc, index){
	if(punc == false){
		var divAdded = $("<div class='phrase' id='phrase" + index + "'><span><p class='inlineDefinition'>" + definition + "</p></span><span style='font-size:" + pinyinFontsize + "pt'><p>" + pinyin + "</p></span><p class='hanzi' style='font-size: " + hanziFontsize + "pt'>" + hanzi + "</p></div>").appendTo("#centered");
		divAdded.hover(function(){
			phraseMouseenter(this, index);
		}, function(){
			phraseMouseleave(this);
		});
		divAdded.addClass("hsk" + chineseText.hsks[index])
	}else{
		$("<div class='punc' id='phrase" + index + "'><span style='font-size:" + pinyinFontsize + "pt'><p>" + pinyin + "</p></span><p class='hanzi' style='font-size:" + hanziFontsize + "pt'>" + hanzi + "</p></div>").appendTo("#centered");
	}
}

function mainSliderAction(sliderLevel){
    switch(sliderLevel){
        case 0:
            $(".hsk1 span").css('color','#000000');
            $(".hsk2 span").css('color','#000000');
            $(".hsk3 span").css('color','#000000');
            $(".hsk4 span").css('color','#000000');
            $(".hsk5 span").css('color','#000000');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');         
            break;
        case 1:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#000000');
            $(".hsk3 span").css('color','#000000');
            $(".hsk4 span").css('color','#000000');
            $(".hsk5 span").css('color','#000000');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');         
            break;
        case 2:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#000000');
            $(".hsk4 span").css('color','#000000');
            $(".hsk5 span").css('color','#000000');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');   
            break;      
        case 3:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#ffffff');
            $(".hsk4 span").css('color','#000000');
            $(".hsk5 span").css('color','#000000');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');         
            break;
        case 4:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#ffffff');
            $(".hsk4 span").css('color','#ffffff');
            $(".hsk5 span").css('color','#000000');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');         
            break;
        case 5:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#ffffff');
            $(".hsk4 span").css('color','#ffffff');
            $(".hsk5 span").css('color','#ffffff');
            $(".hsk6 span").css('color','#000000');
            $(".hsk7 span").css('color','#000000');   
            break;
        case 6:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#ffffff');
            $(".hsk4 span").css('color','#ffffff');
            $(".hsk5 span").css('color','#ffffff');
            $(".hsk6 span").css('color','#ffffff');
            $(".hsk7 span").css('color','#000000');   
            break;  
        case 7:
            $(".hsk1 span").css('color','#ffffff');
            $(".hsk2 span").css('color','#ffffff');
            $(".hsk3 span").css('color','#ffffff');
            $(".hsk4 span").css('color','#ffffff');
            $(".hsk5 span").css('color','#ffffff');
            $(".hsk6 span").css('color','#ffffff');
            $(".hsk7 span").css('color','#ffffff');   
            break;                      
    }
}

function changePinyinFontsize(fontsize){
    pinyinFontsize = fontsize
    $(".phrase > span > p").css('font-size', fontsize + 'pt')
    chineseText = addPinyinWidths(chineseText, fontsize);
    clipDefinitions()
}

function changeHanziFontsize(fontsize){
    hanziFontsize = fontsize
    $(".phrase > p").css('font-size', fontsize + 'pt')
    $(".punc > p").css('font-size', fontsize + 'pt')
    chineseText = addHanziWidths(chineseText, fontsize);
    clipDefinitions()
}

function changeSpacing(spacing){
    $(".phrase").css('padding-left', spacing + 'px')
    $(".phrase").css('padding-right', spacing + 'px')  
}

function clipDefinitions(){
    $(".inlineDefinition").each(function(){
        $(this).css('max-width', 6 * getTextWidth($(this).parent().parent().children().filter('.hanzi').text(), hanziFontsize + 'pt') + 'px');
    })    
}

function setKnob(slider, x) {
	var knobX = x - knobMid;
    knobX = Math.max(knobX, 0);
    knobX = Math.min(knobX, $(slider).outerWidth() - $(slider).children().filter(".knob").outerWidth());
    $(slider).children().filter(".knob").css('left',knobX);

    switch($(slider).attr('id')){
        case 'mainSlider':
            var sliderLevel = Math.floor(knobX/sliderStep);
            mainSliderAction(sliderLevel);
            break;
        case 'pinyinFontsize':
            //between 6 and 18pt 
            var sliderLevel = Math.floor(knobX/10) + 6;
            changePinyinFontsize(sliderLevel);
            break;       
        case 'hanziFontsize':
            //between 10 and 30
            var sliderLevel = 2 * (Math.floor(knobX/12) + 5);
            changeHanziFontsize(sliderLevel);
            break;
        case 'spacing':
            //between 0 and 10
            var sliderLevel = Math.floor(knobX/12);
            changeSpacing(sliderLevel)
            break;
    }
    $(slider).children().filter(".knob").html("<p>" + sliderLevel + "</p>");
}

function mouseXY(slider, e){
	e.preventDefault();
	if(mouseIsDown){
        if (!e)
           	var e = event;
        var mouseX = e.pageX - $(slider).offset().left;
       	if (mouseX >= 0 && mouseX <= $(slider).outerWidth() ) {
            setKnob(slider, mouseX);
       	}
    }
}

function main(){
    hanziFontsize = 24;
    pinyinFontsize = 10;

	chineseText = getChineseText(article2);
	chineseText = addHanziWidths(chineseText, hanziFontsize + "pt");
	chineseText = addPinyinWidths(chineseText, pinyinFontsize + "pt");
	mouseIsDown = false;

	for(var i = 0; i < chineseText.pinyins.length; i++){
		addPhrase(chineseText.pinyins[i], chineseText.hanzis[i], chineseText.definition[i], chineseText.punc[i], i);
	}

    changeHanziFontsize(hanziFontsize)
    changePinyinFontsize(pinyinFontsize)

	knobMid = $(".knob").outerWidth()/2.0;

	$(".slider").mousedown(function(e){
		e.preventDefault();
        mouseIsDown = true;
		mouseXY(this, e);
	})
	$(".slider").mousemove(function(e){
		mouseXY(this, e);
	});

	sliderWidth = $(".slider").outerWidth() - $(".knob").outerWidth();
	sliderStep = sliderWidth/7;

    initialSpacing = 2;
    changeSpacing(2);

    $("#mainSlider").children().filter(".knob").html("<p> 0 </p>")
    $("#pinyinFontsize").children().filter(".knob").html("<p>" + pinyinFontsize + "</p>")
    $("#pinyinFontsize").children().filter(".knob").css('left', (pinyinFontsize - 6) * 10 + 2);
    $("#hanziFontsize").children().filter(".knob").html("<p>" + hanziFontsize + "</p>")
    $("#hanziFontsize").children().filter(".knob").css('left', (hanziFontsize - 10) * 6);
    $("#spacing").children().filter(".knob").html("<p>" + initialSpacing + "</p>")
    $("#spacing").children().filter(".knob").css('left', (initialSpacing) * 12 + 2);


	$("body").mouseup(function(){
		mouseIsDown = false;
	})

    fontFamilies = ['Helvetica, Arial, "Times New Roman", "FangSong", "仿宋", STFangSong, "华文仿宋", serif', 'Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif','Arial, Helvetica, "KaiTi", "楷体", STKaiti, "华文楷体", serif']
    currentFamily = 0; 
    $("#fontButton").click(function(e){
        cycleFonts();
    })

    $("#inlineDefinitionButton").click(function(e){
        $(".inlineDefinition").toggle();
    });

}

function cycleFonts(){
    currentFamily++
    if(currentFamily >= fontFamilies.length){
        currentFamily = 0;
    }
    $("#currentFontfamily").html(fontFamilies[currentFamily])
    $(".phrase").css('font-family', fontFamilies[currentFamily])
    $(".punc").css('font-family', fontFamilies[currentFamily])    
}




