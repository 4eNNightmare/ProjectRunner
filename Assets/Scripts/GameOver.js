#pragma strict
private var timer : float = 3;
//private	var showMessage : boolean = false;
//private	var message : String;
//private var messageLenght : int;

function Start () {

}

function Update () {
//	if(GetComponent(GameStateController).gameState == GameState.GameOver){
//		if(GetComponent(CollisionChecker).headCeilingHit)
//			message = "Bateu os chifre no teto!";
//		if(GetComponent(CollisionChecker).headWallHit)
//			message = "Bateu as fuça na parede!";
//		if(GetComponent(CollisionChecker).footWallHit)
//			message = "Bateu as canelas!";
//		messageLenght = message.Length;
//	}
//	
	if(GetComponent(GameStateController).gameState == GameState.GameOver){			
		timer -= Time.deltaTime;
		if(timer <= 0){
			Application.LoadLevel(Application.loadedLevel);
		}
	}
//	showMessage = true;
}
function OnGUI(){
//	if(showMessage){
//		GUI.Label(Rect(Screen.width/2, Screen.height/2, 500, 20),message);
//	}
}