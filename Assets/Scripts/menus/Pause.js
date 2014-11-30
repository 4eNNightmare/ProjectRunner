#pragma strict

var posiX: float;
var posiY: float;

var altura: float;
var largura: float;

var posiX2: float;
var posiY2: float;

var altura2: float;
var largura2: float;

var controlePause: boolean;
var botao: boolean;

var pausar: Texture2D;
var continuar: Texture2D;

var alteraBotao: GUISkin;

var alteraBotao2: GUISkin;

function Start () {
	controlePause = true;
	botao = true;
	
altura2 = 60;
largura2 = Screen.width/5.5;

posiX2 = Screen.width/30 - largura/2;
posiY2 = Screen.height/2 - altura/2;
}

function OnGUI(){
	altura = (Screen.height+Screen.width)/20;
	largura = altura;
	posiX = Screen.width - altura;
	posiY = 0;
	
	if(GetComponent(GameStateController).gameState != GameState.GameOver){
		if(botao){
			GUI.skin=alteraBotao;
			if (GUI.Button(new Rect(posiX, posiY, largura, altura), pausar)){
				if (controlePause){
  	  				Time.timeScale = 0;
    				controlePause = false;
    				botao = false;
    				AudioListener.pause = true;
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
					AudioListener.pause = false;
				}
				GUI.Box(Rect(0, 0, Screen.width/5, Screen.height),"\n\n\n\n\nJogo Pausado");
				GUI.skin=alteraBotao2;
				if(GUI.Button(Rect(posiX2, posiY2-120, largura2, altura2), "Recomeçar")){
					Application.LoadLevel(Application.loadedLevel);
					Time.timeScale = 1;
					controlePause = true;
					botao = true;
					AudioListener.pause = false;
				}
				/*GUI.skin=alteraBotao2;
    			if (GUI.Button(Rect(posiX2, posiY2-40, largura2, altura2), "Selecao de Fases")){
					Application.LoadLevel("SelecaoFases");
					Time.timeScale = 1;
    			}*/
    			GUI.skin=alteraBotao2;
    			if(GUI.Button(Rect(posiX2, posiY2+40, largura2, altura2), "RETORNAR AO \nMENU PRINCIPAL")){
    				Application.LoadLevel("MenuP");
    				Time.timeScale = 1;
				}
				GUI.skin=alteraBotao2;
    			if(GUI.Button(Rect(posiX2, posiY2+120, largura2, altura2), "Sair")){
    				Application.Quit();
				}
			}
		}
	}
}