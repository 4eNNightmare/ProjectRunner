var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var newgame: boolean;
var botao: boolean;

static public var faseAtualNumber : int;

function Start () {
altura = 0;
largura = 0;

posiX = Screen.width/2 - largura/2;
posiY = Screen.height/2 - altura/2;

newgame = true;
botao = true;
}
function Update () {
}
function OnGUI(){
	if (GUI.Button(new Rect(0, 0, Screen.width, Screen.height), "Equipe de trabalho sistemas de informaçao 4º Periodo Diurno: \nFlavio Costa Ferreira, \nPaulo Henrique de Araujo leite, \nRamon Gonçalves de Queiroz, \nWender Pereira Silva\n\n PARA RETORNAR AO MENU PRINCIPAL \nCLIQUE EM QUALQUER PARTE DA TELA")){
    	Application.LoadLevel("MenuP");
	}
}