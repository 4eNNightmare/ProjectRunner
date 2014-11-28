#pragma strict
var alteraBotao: GUISkin;

function Start () {
}

function Update () {
}

function OnGUI(){
	GUI.skin=alteraBotao;
	if (GUI.Button(new Rect(0, 0, Screen.width, Screen.height), "Equipe de trabalho sistemas de informaçao 4º Periodo Diurno:\nFlavio Costa Ferreira,\nPaulo Henrique de Araujo leite,\nRamon Gonçalves de Queiroz,\nWender Pereira Silva\n\nPARA RETORNAR AO MENU PRINCIPAL\nCLIQUE EM QUALQUER PARTE DA TELA")){
    	Application.LoadLevel("MenuP");
   	}
}