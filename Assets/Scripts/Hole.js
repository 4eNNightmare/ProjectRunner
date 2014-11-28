#pragma strict

function OnTriggerEnter (other : Collider) {
	if(other.name == 'Player'){
		GameObject.Find("Player").GetComponent(GameStateController).gameState = GameObject.Find("Player").GetComponent(GameStateController).gameState.GameOver;
	}
}