#pragma strict
private var timer : float = 3;
private	var showMessage : boolean = false;
private	var message : String;

function Start () {

}

function Update () {

	message = GetComponent(CollisionChecker).causeOfDeath;
	if(GetComponent(GameStateController).gameState == GameState.GameOver){			
		timer -= Time.deltaTime;
		if(timer <= 0){
			Application.LoadLevel(Application.loadedLevel);
		}
		else{
			showMessage = true;
		}
	}
	
}
function OnGUI(){
	if(showMessage){
		GUI.Label(Rect(Screen.width/2, Screen.height/2, 500, 50),"GAME OVER \n("+message+")");
	}
}