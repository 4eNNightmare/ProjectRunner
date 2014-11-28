#pragma strict
private var timer : float = 3;
//private	var showMessage : boolean = false;
//private	var message : String;
public var GameOverTexture : Texture2D;
public var GameOver : boolean = false;
public var RagDoll : GameObject;

function Start () {

}

function Update () {

//	message = GetComponent(CollisionChecker).causeOfDeath;
	if(GetComponent(GameStateController).gameState == GameState.GameOver){
		if(!GameOver){
			var meshRenderers : Component[];
			meshRenderers = GetComponentsInChildren (SkinnedMeshRenderer);
			for (var mesh : SkinnedMeshRenderer in meshRenderers) {
				mesh.enabled = false;
			}
		
			rigidbody.isKinematic = true;
			rigidbody.detectCollisions = false;
			GameObject.Find("Player/PlayerCollider").collider.enabled = false;
			GameObject.Instantiate(RagDoll, transform.position, transform.rotation);
			GameOver = true;
		}		
		
		timer -= Time.deltaTime;
		if(timer <= 0){
			Application.LoadLevel(Application.loadedLevel);
		}
//		else{
//			showMessage = true;
//		}
	}


}
function OnGUI(){
//	if(showMessage){
//		GUI.Label(Rect(Screen.width/2, Screen.height/2, 500, 50),"GAME OVER \n("+message+")");
//	}

	if(GetComponent(GameStateController).gameState == GameState.GameOver){
		GUI.skin.box.alignment =  TextAnchor.MiddleCenter;
		GUI.Box(Rect(0, 0, Screen.width, Screen.height),"");
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height),GameOverTexture,ScaleMode.ScaleToFit, true, 0f);		
	}	
	
	
}