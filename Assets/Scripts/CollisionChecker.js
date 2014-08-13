#pragma strict

public var isGrounded : boolean;
public var isWallHit : boolean;
public var collisionDistanceWall : float;
public var collisionDistanceGround : float;

function Start () {
	if(collisionDistanceGround == 0)
		collisionDistanceGround = transform.localScale.y/2;
	if(collisionDistanceWall == 0)
		collisionDistanceWall = transform.localScale.x/2;
}

function Update () {
	var rayGroundOrigin : Vector3 = transform.position;
	var rayWallOrigin : Vector3 = new Vector3(transform.position.x, transform.position.y - transform.localScale.y/2, transform.position.z);
	var groundDirection : Vector3 = Vector3.down;
	var wallDirection : Vector3 = Vector3.right;
	var rayGround : Ray = new Ray(rayGroundOrigin,groundDirection);
	var rayWall : Ray = new Ray(rayWallOrigin,wallDirection);
	var hitGround : RaycastHit;
	var hitWall : RaycastHit;
	
	if(Physics.Raycast(rayGround, hitGround, collisionDistanceGround)){
		if(hitGround.collider.tag == "Ground"){
			isGrounded = true;
		}
	}
	else{
		isGrounded = false;
	}
	
	if(Physics.Raycast(rayWall, hitWall, collisionDistanceWall)){
		if(hitWall.collider.tag == "Ground"){
			isWallHit = true;
			Application.LoadLevel(Application.loadedLevel);
		}
	}
	else{
		isWallHit = false;
	}
	
	Debug.DrawRay(rayGroundOrigin, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayWallOrigin, wallDirection*collisionDistanceWall, Color.red);
}