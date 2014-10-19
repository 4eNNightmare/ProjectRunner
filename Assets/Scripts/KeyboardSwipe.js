#pragma strict

public var swipeDown: boolean;
public var swipeUp: boolean;
public var swipeAirDown: boolean;

function Update () {

	if(Input.GetKeyDown("down")){
		if(GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded){
			swipeDown = true;
		}
		else{
			swipeAirDown = true;
		}
	}
	
	if(Input.GetKeyDown("up") && GameObject.Find("Player").GetComponent(PlayerController).extraJumpCountTMP > 0){
		swipeUp = true;
	}
}