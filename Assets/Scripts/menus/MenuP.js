#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var newgame: boolean;
var botao: boolean;

static public var faseAtualNumber : int;

var iniciaJogo: Texture2D;
var selecaoFases: Texture2D;
var creditos: Texture2D;
var sair: Texture2D;

var alteraBotao: GUISkin;

function Start () {
	altura = (Screen.height+Screen.width)/12;
	largura = altura;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height- altura;

botao = true;
}
function Update () {
}
function OnGUI(){
	GUI.skin=alteraBotao;
	if (GUI.Button(new Rect(posiX-(largura*1.5), posiY, largura, altura), iniciaJogo)){
		Application.LoadLevel("Scene02");
    }
    //GUI.skin=alteraBotao;
    //if (GUI.Button(new Rect(0, 0, largura, altura), selecaoFases)){
	//		Application.LoadLevel("SelecaoFases");
    //}
    GUI.skin=alteraBotao;
    if (GUI.Button(new Rect(posiX, posiY, largura, altura), creditos)){
			Application.LoadLevel("Creditos");
    }
    GUI.skin=alteraBotao;
    if(GUI.Button(Rect(posiX+(largura*1.5), posiY, largura, altura), sair)){
    	Application.Quit();
	}
}