#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var controlePause: boolean;
var botao: boolean;

var pausar: Texture2D;
var continuar: Texture2D;

var alteraBotao: GUISkin;

function Start () {
altura = 100;
largura = 100;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height/2 - altura/2;

controlePause = true;
botao = true;
}
function Update (){
}
function OnGUI(){
	if(botao){
		GUI.skin=alteraBotao;
		if (GUI.Button(new Rect(Screen.width-170, 10, largura, altura), pausar)){
			if (controlePause){
    			Time.timeScale = 0;
    			controlePause = false;
    			botao = false;
    		}
    	}
    }
    if(botao == false){
		if(controlePause == false){
			GUI.Box(Rect(0, 0, Screen.width, Screen.height)," ");
			GUI.skin=alteraBotao;
			if(GUI.Button(Rect(Screen.width-170, 10, largura, altura), continuar)){
				Time.timeScale = 1;
				controlePause = true;
				botao = true;
			}
		}
	}
}