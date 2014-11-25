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
	if (GUI.Button(new Rect(posiX, posiY-75, largura, altura), "INICIAR JOGO")){
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
    if (GUI.Button(new Rect(posiX, posiY-25, largura, altura), "SELEÇAO \nDE FASES")){
			Application.LoadLevel("SelecaoFases");
    }
    if (GUI.Button(new Rect(posiX, posiY+25, largura, altura), "CREDITOS")){
			Application.LoadLevel("Creditos");
    }
    if(GUI.Button(Rect(posiX, posiY+75, largura, altura), "SAIR")){
    	Application.Quit();
	}
}