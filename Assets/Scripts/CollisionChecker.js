#pragma strict

public var isGrounded : boolean;
public var isWallHit : boolean;

function Start () {
	

}

function Update () {

}

function OnCollisionEnter(collision : Collision){
	switch(collision.gameObject.tag){
		case("Ground"):
			isGrounded = true;
		break;
		case("Wall"):
			isWallHit = true;
			Application.LoadLevel(Application.loadedLevel);
		
	}
}

function OnCollisionExit(collision : Collision){
	if(collision.gameObject.tag == "Ground"){
		isGrounded = false;
	}
	if(collision.gameObject.tag == "Wall"){
		isWallHit = false;
	}
}