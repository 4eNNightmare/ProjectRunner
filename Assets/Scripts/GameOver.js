#pragma strict
private var timer : float = 3;
function Start () {

}

function Update () {
	if(GetComponent(GameStateController).gameState == GameState.GameOver){
		timer -= Time.deltaTime;
		if(timer <= 0)
			Application.LoadLevel(Application.loadedLevel);
	}
}