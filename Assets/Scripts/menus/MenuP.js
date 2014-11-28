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
altura = Screen.height/2;
largura = Screen.width/2;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height/2 - altura/2;

botao = true;
}
function Update () {
}
function OnGUI(){
	GUI.skin=alteraBotao;
	if (GUI.Button(new Rect(posiX, posiY-(Screen.height/3.5), largura, altura), iniciaJogo)){
		Application.LoadLevel(1);
		 faseAtualNumber = 1;
		
		/*if(newgame){
			GUI.Box(Rect(posiX, posiY-50, largura, altura),"Todo progresso sera \n perdido deseja continuar?");
			if (GUI.Button(new Rect(posiX, posiY-50, largura, altura), "Sim")){
    			Application.LoadLevel(1);
				faseAtualNumber = 1;
			}
		}
			if (GUI.Button(new Rect(posiX, posiY-50, largura, altura), "Nao")){
    			Application.LoadLevel(2);
				faseAtualNumber = 2;
			}
    	}*/
    }
    GUI.skin=alteraBotao;
    if (GUI.Button(new Rect(posiX-(Screen.width/4), posiY, largura, altura), selecaoFases)){
			Application.LoadLevel("SelecaoFases");
    }
    GUI.skin=alteraBotao;
    if (GUI.Button(new Rect(posiX+Screen.width/4, posiY, largura, altura), creditos)){
			Application.LoadLevel("Creditos");
    }
    GUI.skin=alteraBotao;
    if(GUI.Button(Rect(posiX, posiY+(Screen.height/3.5), largura, altura), sair)){
    	Application.Quit();
	}
}