#pragma strict
enum GameState{GameOver, Paused, Playing}
var gameState : GameState;

function Start () {
	gameState = GameState.Playing;
}

function Update () {
	if(GetComponent(CollisionChecker).isWallHit){
		gameState = GameState.GameOver;
	}
}