
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
		var divAdded = $("<div class='phrase' id='phrase" + index + "'><span style='font-size:12pt'><p>" + pinyin + "</p></span><p style='font-size: 18pt'>" + hanzi + "</p></div>").appendTo("#centered");
		divAdded.hover(function(){
			phraseMouseenter(this, index);
		}, function(){
			phraseMouseleave(this);
		});
		divAdded.addClass("hsk" + chineseText.hsks[index])
	}else{
		$("<div class='punc' id='phrase" + index + "'><span style='font-size:12pt'><p>" + pinyin + "</p></span><p style='font-size: 18pt'>" + hanzi + "</p></div>").appendTo("#centered");
	}
}

function setKnob(x) {
	var knobX = x - knobMid;
    knobX = Math.max(knobX, 0);
    knobX = Math.min(knobX, $("#slider").outerWidth() - $("#knob").outerWidth());
    $("#knob").css('left',knobX);

    var sliderLevel = Math.floor(knobX/sliderStep);
    $("#knob").html("<p>" + sliderLevel + "</p>");
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

function mouseXY(e){
	e.preventDefault();
	if(mouseIsDown){
        if (!e)
           	var e = event;
        var mouseX = e.pageX - $("#slider").offset().left;
       	if (mouseX >= 0 && mouseX <= $("#slider").outerWidth() ) {
            setKnob(mouseX);
       	}
    }
}

function main(){
	chineseText = getChineseText(article2);
	chineseText = addHanziWidths(chineseText, "18pt");
	chineseText = addPinyinWidths(chineseText, "12pt");
	mouseIsDown = false;

	for(var i = 0; i < chineseText.pinyins.length; i++){
		addPhrase(chineseText.pinyins[i], chineseText.hanzis[i], chineseText.punc[i], i);
	}

	$("<div id='translation'></div>").appendTo("#centered");

	knobMid = $("#knob").outerWidth()/2.0;

	$("#slider").mousedown(function(e){
		mouseIsDown = true;
		console.log(e);
		mouseXY(e);
	})
	$("#slider").mousemove(function(e){
		mouseXY(e);
	});

	sliderWidth = $("#slider").outerWidth() - $("#knob").outerWidth();
	sliderStep = sliderWidth/7;

	$("body").mouseup(function(){
		mouseIsDown = false;
	})

}




