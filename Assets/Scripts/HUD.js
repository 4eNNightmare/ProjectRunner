#pragma strict

var score : int;
var guiSkin : GUISkin;

private var initialPositionX : float;

function Start(){
	initialPositionX = transform.position.x;
}

function OnGUI(){
	GUI.skin = guiSkin;
	if(transform.position.x - initialPositionX > score){
		score = transform.position.x - initialPositionX;
	}
	GUI.Label (Rect (Screen.width/2 - 50, 10, 100, 50), ""+score);	
}