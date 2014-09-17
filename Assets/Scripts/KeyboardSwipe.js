#pragma strict

public var swipeDown: boolean;
public var swipeUp: boolean;

function Update () {

	if(Input.GetKeyDown("down") && GameObject.Find("Player").GetComponent(PlayerController).extraJumpCountTMP > 0){
		swipeDown = true;
	}
	
	if(Input.GetKeyDown("up") && GameObject.Find("Player").GetComponent(PlayerController).extraJumpCountTMP > 0){
		swipeUp = true;
	}
}
