#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var newgame: boolean;
var botao: boolean;

static public var faseAtualNumber : int;

function Start () {
altura = 40;
largura = 150;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height/2 - altura/2;

newgame = true;
botao = true;
}
function Update () {
}
function OnGUI(){
	if (GUI.Button(new Rect(posiX-100, posiY, largura, altura), "FASE1")){
		Application.LoadLevel("Scene01");
    }
    if (GUI.Button(new Rect(posiX+100, posiY, largura, altura), "FASE2")){
		Application.LoadLevel("Scene02");
    }
    if(GUI.Button(Rect(200, Screen.height-100, largura, altura), "RETORNAR AO \nMENU PRINCIPAL")){
    	Application.LoadLevel("MenuP");
	}
}