$(function(){

var wordsArray;
var arrayLength;
var reading = false;
var counter;
var action;
var frequency = 500;
var size;
var speed;
var progress;

$("#new").hide();
$("#pause").hide();
$("#resume").hide();
$("#result").hide();
$("#error").hide();
$("#controls").hide();

$("#start").click(function(){
	wordsArray = $("#userinput").val().split(/\s+/);
	arrayLength = wordsArray.length;

	if(arrayLength>1){
        reading = true;
        $("#new").show();
		$("#pause").show();
		$("#controls").show();
		$("#start").hide();
		$("#userinput").hide();
		$("#error").hide();

		$("#progressSlider").attr("max", arrayLength-1);

		counter = 0;
		$("#result").show();
		$("#result").text(wordsArray[counter]);
		action = setInterval(read, frequency);


	}
	else{
		$("#error").show();
	}
});

$("#new").click(function(){
	location.reload();
});

$("#pause").click(function(){
    clearInterval(action);
    reading = false;
    $(this).hide();
    $("#resume").show();
});

$("#resume").click(function(){
    action = setInterval(read, frequency);
    reading = true;
    $(this).hide();
    $("#pause").show();
});

$("#fontsizeSlider").on("slidestop", function(event,ui){
	$("#fontsizeSlider").slider("refresh");
	console.log("hh")
	size = parseInt($("#fontsizeSlider").val());
	$("#result").css("font-size", size);
	$("#fontsize").text(size);

});

$("#speedSlider").on("slidestop", function(event,ui){
	$("#speedSlider").slider("refresh");
	speed = parseInt($("#speedSlider").val());
	$("#speed").text(speed);
	clearInterval(action);
	frequency = (60000/speed);
	if(reading){
       action = setInterval(read, frequency);
	}

});

$("#progressSlider").on("slidestop", function(event,ui){
	$("#progressSlider").slider("refresh");
	progress = parseInt($("#progressSlider").val());
	clearInterval(action);
	counter = progress;
	$("#result").text(wordsArray[counter]);
	$("#progress").text(Math.floor((counter/(arrayLength-1))*100));
	if(reading){
       action = setInterval(read, frequency);
	}

});

function read(){
	if(counter == arrayLength-1){
		clearInterval(action);
		reading = false;
        $("#pause").hide();
	}
	else{
		counter++;
		$("#result").text(wordsArray[counter]);
		$("#progressSlider").val(counter).slider("refresh");	
		$("#progress").text(Math.floor((counter/(arrayLength-1))*100));
	}
}

});

