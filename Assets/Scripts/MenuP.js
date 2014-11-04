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
	if (GUI.Button(new Rect(posiX, posiY-50, largura, altura), "fase1")){
		/*if(newgame){
			GUI.Box(Rect(posiX, posiY-50, largura, altura),"Todo progresso sera \n perdido deseja continuar?");
			if (GUI.Button(new Rect(posiX, posiY-50, largura, altura), "Sim")){
    			*/Application.LoadLevel(1);
				faseAtualNumber = 1;
			/*}
			if (GUI.Button(new Rect(posiX, posiY-50, largura, altura), "Nao")){
    			Application.LoadLevel(2);
				faseAtualNumber = 2;
			}
    	}*/
    }
    if (GUI.Button(new Rect(posiX, posiY, largura, altura), "fase2")){
			Application.LoadLevel(2);
    }
    if(GUI.Button(Rect(posiX, posiY+50, largura, altura), "Sair")){
    	Application.Quit();
	}
}