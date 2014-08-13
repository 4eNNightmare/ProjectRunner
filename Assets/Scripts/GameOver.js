#pragma strict

function Start () {

}

function Update () {
	if(GetComponent(GameStateController).gameState == GameState.GameOver){
		Application.LoadLevel(Application.loadedLevel);
	}
}