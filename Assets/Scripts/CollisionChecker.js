#pragma strict

public var isGrounded : boolean;
public var isWallHit : boolean;
public var collisionDistanceWall : float;
public var collisionDistanceGround : float;
public var climbDistance : float;
public var canClimb : boolean;;

function Start () {
	canClimb = false;
	if(collisionDistanceGround == 0)
		collisionDistanceGround = transform.localScale.y/2;
	if(collisionDistanceWall == 0)
		collisionDistanceWall = transform.localScale.x/2;
	if(climbDistance == 0)
		climbDistance = 1;
}

function Update () {
	var rayGroundOrigin : Vector3 = transform.position;
	var rayWallOriginBot : Vector3 = new Vector3(transform.position.x, transform.position.y - transform.localScale.y/2, transform.position.z);
	var rayWallOriginTop : Vector3 = new Vector3(transform.position.x, transform.position.y + transform.localScale.y/2, transform.position.z);
	var groundDirection : Vector3 = Vector3.down;
	var wallDirection : Vector3 = Vector3.right;
	var rayGround : Ray = new Ray(rayGroundOrigin,groundDirection);
	var rayWallBot : Ray = new Ray(rayWallOriginBot, wallDirection);
	var rayWallTop : Ray = new Ray(rayWallOriginTop, wallDirection);
	var rayClimbChecker : Ray = new Ray(rayWallOriginBot, groundDirection);
	var hitGround : RaycastHit;
	var hitWallBot : RaycastHit;
	var hitWallTop : RaycastHit;
	var hitClimbChecker : RaycastHit;
	
	
	if(Physics.Raycast(rayGround, hitGround, collisionDistanceGround)){
		if(hitGround.collider.tag == "Ground"){
			isGrounded = true;
			canClimb = true;
		}
	}
	else{
		isGrounded = false;
		if(Physics.Raycast(rayClimbChecker, hitClimbChecker, climbDistance) && Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall)){
			if(hitClimbChecker.collider.tag == "Ground"){
				canClimb = true;
				}
		}
		else{
			canClimb = false;

		}
	}
	
	if(Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall)){
		if(hitWallBot.collider.tag == "Ground" ){	
			if(!canClimb){
				isWallHit = true;
				
			}
			else{
				isGrounded = true;
			}
		}
	}
	if(Physics.Raycast(rayWallTop, hitWallTop, collisionDistanceWall)){
		if(hitWallTop.collider.tag == "Ground"){
			isWallHit = true;
		}
	}

	
	Debug.DrawRay(rayGroundOrigin, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayWallOriginBot, wallDirection*collisionDistanceWall, Color.red);
	Debug.DrawRay(rayWallOriginTop, wallDirection*collisionDistanceWall, Color.red);
	Debug.DrawRay(rayWallOriginBot, groundDirection*climbDistance, Color.white);
}