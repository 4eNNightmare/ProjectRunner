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
	controlePause = true;
	botao = true;
}

function OnGUI(){
	altura = (Screen.height+Screen.width)/30;
	largura = altura;
	posiX = Screen.width - altura;
	posiY = 0;
	
	if(botao){
		GUI.skin=alteraBotao;
		if (GUI.Button(new Rect(posiX, posiY, largura, altura), pausar)){
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
			if(GUI.Button(Rect(posiX, posiY, largura, altura), continuar)){
				Time.timeScale = 1;
				controlePause = true;
				botao = true;
			}
		}
	}
}