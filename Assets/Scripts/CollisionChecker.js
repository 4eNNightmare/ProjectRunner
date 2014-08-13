#pragma strict

public var isGrounded : boolean;
public var isWallHit : boolean;
public var collisionDistanceWall : float;
public var collisionDistanceGround : float;
public var canClimb : boolean;
public var climbDist : float;

function Start () {
	canClimb = false;
	if(collisionDistanceGround == 0)
		collisionDistanceGround = transform.localScale.y/2;
	if(collisionDistanceWall == 0)
		collisionDistanceWall = transform.localScale.x/2;
}

function Update () {
	var rayGroundOrigin : Vector3 = transform.position;
	var rayWallOriginBot : Vector3 = new Vector3(transform.position.x, transform.position.y - transform.localScale.y/2, transform.position.z);
	var rayWallOriginTop : Vector3 = new Vector3(transform.position.x, transform.position.y + transform.localScale.y/2, transform.position.z);
 	
	//var rayGroundOrigin : Vector3 = transform.position;
	//var rayWallOrigin: Vector3 = new Vector3(transform.position.x, transform.position.y + transform.localScale.y/2, transform.position.z);
	var groundDirection : Vector3 = Vector3.down;
	var wallDirection : Vector3 = Vector3.right;
	var rayGround : Ray = new Ray(rayGroundOrigin,groundDirection);
	var rayWallBot : Ray = new Ray(rayWallOriginBot, wallDirection);
	var rayWallTop : Ray = new Ray(rayWallOriginTop, wallDirection);
	var hitGround : RaycastHit;
	var hitWallBot : RaycastHit;
	var hitWallTop : RaycastHit;
	
	
	
	if(Physics.Raycast(rayGround, hitGround, collisionDistanceGround)){
		if(hitGround.collider.tag == "Ground"){
			isGrounded = true;
		}
	}
	else{
		isGrounded = false;
	}
	
	if((isGrounded) && (canClimb == false)){
		if(Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall)){
			if(Physics.Raycast(rayWallTop, hitWallTop, collisionDistanceWall)){
				if(hitWallTop.collider.tag == "Ground"){
					if(hitWallBot.collider.tag == "Ground"){
						isWallHit = true;
						Application.LoadLevel(Application.loadedLevel);
					}
				}
			}
		}
		else{
			isWallHit = false;
		}
	}
	else{
		if(canClimb == false){
			if((Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall)) || 
			(Physics.Raycast(rayWallTop, hitWallTop, collisionDistanceWall))) {
				if(hitWallBot.collider.tag == "Ground"){
					if(hitWallTop.collider.tag == "Ground"){
						isWallHit = true;
						Application.LoadLevel(Application.loadedLevel);
					}
				}
				else{
				isWallHit = false;
				}
			}
		}
	} 
	
	Debug.DrawRay(rayGroundOrigin, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayWallOriginBot, wallDirection*collisionDistanceWall, Color.red);
	Debug.DrawRay(rayWallOriginTop, wallDirection*collisionDistanceWall, Color.red);
}