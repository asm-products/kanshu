function wrapText(context, textJSON, x, y, maxWidth, lineHeight) {
    var hanzis = [];
    var pinyins = [];
    var punc = [];
    for(var i = 0; i < textJSON.length; i++){
    	var paragraph = textJSON[i];
    	for (var j = 0; j < paragraph.length; j++){
    		if(paragraph[j][0] == 'punc: '){
    			hanzis.push(paragraph[j][1])
    			if(!paragraph[j][2]){
    				pinyins.push('')
    			}else{
    				pinyins.push(paragraph[j][2])
    			}
    			punc.push(true);
    		}else{
    			hanzis.push(paragraph[j][0])
    			pinyins.push(paragraph[j][2])
    			punc.push(false)
    		}
    	}
    }
    var hanziLine = '';

	for(var i = 0; i < pinyins.length; i++) {
    	context.font = '10pt Calibri';
    	pinyin_width = context.measureText(pinyins[i]).width;

       	context.font = '18pt Calibri';
       	hanzi_width = context.measureText(hanzis[i]).width;
       	space_width =context.measureText(' ').width;

       	if(punc[i] == true){
       		var testLine = hanziLine + hanzis[i];
       	}else{
        	var testLine = hanziLine + ' ' + hanzis[i] + ' ';
        }

        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) { 
        	context.font = '18pt Calibri';
     		context.fillText(hanziLine, x, y + 25);
            hanziLine = ' ' + hanzis[i] + ' ';
            y += lineHeight;
            context.font = '10pt Calibri';
            context.textAlign='left';
            context.fillText(pinyins[i], x - pinyin_width/2 + (hanzi_width+2*space_width)/2, y); 

        }
        else {
        	context.font = '10pt Calibri';
            context.fillText(pinyins[i], x/2 + testWidth - pinyin_width/2 - hanzi_width/2, y);

            hanziLine = testLine;
        }
    }
    context.font = '18pt Calibri';
	context.fillText(hanziLine, x, y + 25);
}
      
var c = document.getElementById("canvas");
var context = c.getContext("2d");
context.moveTo(0,0);
var maxWidth = 300;
var lineHeight = 50;
var x = (canvas.width - maxWidth) / 2;
var y = 60;

wrapText(context, article1, x, y, maxWidth, lineHeight);
    