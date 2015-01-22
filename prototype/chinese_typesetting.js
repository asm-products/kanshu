
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
	var definitions = chineseText.definitions[index];
	console.log($(divEntered).position().top)
	var top = $(divEntered).position().top + 50;
	var left = $(divEntered).position().left;
	$("#hsk").html(chineseText.hsks[index])
	$("#translation").html(definitions);
	$("#translation").css('display', 'block');
	$("#translation").css('top', top);
	$("#translation").css('left', left);
	$(divEntered).children().children().css('color','#000000');
}

function phraseMouseleave(divLeft){
	$("#translation").css('display', 'none');
	$(divLeft).children().children().css('color','inherit');
}

function addPhrase(pinyin, hanzi, punc, index){
	if(punc == false){
		var divAdded = $("<div class='phrase' id='phrase" + index + "'><span style='font-size:" + pinyinFontsize + "pt'><p>" + pinyin + "</p></span><p style='font-size: " + hanziFontsize + "pt'>" + hanzi + "</p></div>").appendTo("#centered");
		divAdded.hover(function(){
			phraseMouseenter(this, index);
		}, function(){
			phraseMouseleave(this);
		});
		divAdded.addClass("hsk" + chineseText.hsks[index])
	}else{
		$("<div class='punc' id='phrase" + index + "'><span style='font-size:" + pinyinFontsize + "pt'><p>" + pinyin + "</p></span><p style='font-size:" + hanziFontsize + "pt'>" + hanzi + "</p></div>").appendTo("#centered");
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
}

function changeHanziFontsize(fontsize){
    hanziFontsize = fontsize
    $(".phrase > p").css('font-size', fontsize + 'pt')
    $(".punc > p").css('font-size', fontsize + 'pt')
    chineseText = addHanziWidths(chineseText, fontsize);
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
		addPhrase(chineseText.pinyins[i], chineseText.hanzis[i], chineseText.punc[i], i);
	}

	$("<div id='translation'></div>").appendTo("#centered");

	knobMid = $(".knob").outerWidth()/2.0;

	$(".slider").mousedown(function(e){
		mouseIsDown = true;
		mouseXY(this, e);
	})
	$(".slider").mousemove(function(e){
		mouseXY(this, e);
	});

	sliderWidth = $(".slider").outerWidth() - $(".knob").outerWidth();
	sliderStep = sliderWidth/7;

    $("#mainSlider").children().filter(".knob").html("<p> 0 </p>")
    $("#pinyinFontsize").children().filter(".knob").html("<p>" + pinyinFontsize + "</p>")
    $("#pinyinFontsize").children().filter(".knob").css('left', (pinyinFontsize - 6) * 10 + 2);
    $("#hanziFontsize").children().filter(".knob").html("<p>" + hanziFontsize + "</p>")
    $("#hanziFontsize").children().filter(".knob").css('left', (hanziFontsize - 10) * 6);

	$("body").mouseup(function(){
		mouseIsDown = false;
	})

}




