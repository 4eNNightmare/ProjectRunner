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
	var rayGroundOriginBack : Vector3 = new Vector3(transform.position.x - transform.localScale.x/2, transform.position.y, transform.position.z);
	var rayGroundOriginFront : Vector3 = new Vector3(transform.position.x + transform.localScale.x/2, transform.position.y, transform.position.z);
	var rayWallOriginBot : Vector3 = new Vector3(transform.position.x, transform.position.y - transform.localScale.y/2, transform.position.z);
	var rayWallOriginTop : Vector3 = new Vector3(transform.position.x, transform.position.y + transform.localScale.y/2, transform.position.z);
	var rayClimbCheckerOrigin : Vector3 = new Vector3(transform.position.x, transform.position.y + transform.localScale.y/2, transform.position.z);
	var groundDirection : Vector3 = Vector3.down;
	var wallDirection : Vector3 = Vector3.right;
	var rayGroundFront : Ray = new Ray(rayGroundOriginFront,groundDirection);
	var rayGroundBack : Ray = new Ray(rayGroundOriginBack,groundDirection);
	var rayWallBot : Ray = new Ray(rayWallOriginBot, wallDirection);
	var rayWallTop : Ray = new Ray(rayWallOriginTop, wallDirection);
	var rayClimbChecker : Ray = new Ray(rayClimbCheckerOrigin, groundDirection);
	var hitGroundFront : RaycastHit;
	var hitGroundBack : RaycastHit;
	var hitWallBot : RaycastHit;
	var hitWallTop : RaycastHit;
	var hitClimbChecker : RaycastHit;
	
	
	if(Physics.Raycast(rayGroundFront, hitGroundFront, collisionDistanceGround)){
		if(hitGroundFront.collider.tag == "Ground"){
			isGrounded = true;
		}
	}
	else{
		if(Physics.Raycast(rayGroundBack, hitGroundBack, collisionDistanceGround)){
			if(hitGroundBack.collider.tag == "Ground"){
				isGrounded = true;
			}
		}
		else{
			isGrounded = false;
		}
	}
	
	if(Physics.Raycast(rayClimbChecker, hitClimbChecker, 10)){
		Debug.DrawLine(rayClimbCheckerOrigin, hitClimbChecker.point, Color.white);
		if(Vector3.Distance(rayClimbCheckerOrigin, hitClimbChecker.point) <= climbDistance + Vector3.Distance(rayWallOriginTop, rayWallOriginBot)){
			canClimb = true;
		}
		else{
			canClimb = false;
		}
	}
	
	if(Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall)){
		if(hitWallBot.collider.tag == "Ground" && canClimb == false){
			isWallHit = true;
		}
	}
	
	if(Physics.Raycast(rayWallTop, hitWallTop, collisionDistanceWall)){
		if(hitWallTop.collider.tag == "Ground"){
			isWallHit = true;
		}
	}

	
	Debug.DrawRay(rayGroundOriginFront, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayGroundOriginBack, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayWallOriginBot, wallDirection*collisionDistanceWall, Color.red);
	Debug.DrawRay(rayWallOriginTop, wallDirection*collisionDistanceWall, Color.red);
}