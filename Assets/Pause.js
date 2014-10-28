#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var perSkin: GUISkin;
var perSkin2: GUISkin;

var controlePause: boolean;

function Start () {

altura = 50;
largura = 150;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height/2 - altura/2;

controlePause = true;
}
function Update (){
}
function OnGUI(){
	if (GUI.Button(new Rect(posiX, posiY-210, largura, altura), "Pause")){
		if (controlePause){
    		Time.timeScale = 0;
    		controlePause = false;
    	}
    }
	if(controlePause == false){
		if(GUI.Button(Rect(posiX, posiY-110, largura, altura), "Continuar")){
			Time.timeScale = 1;
			controlePause = true;
		}
	}
}