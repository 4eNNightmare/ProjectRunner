#pragma strict

public var isGrounded : boolean;
public var isWallHit : boolean;
public var collisionDistanceWall : float;
public var collisionDistanceGround : float;
public var climbDistance : float;
public var canClimb : boolean;
public var maxHeightStep : float;
public var footWallHit : boolean;
public var headWallHit : boolean;
public var bothWallHit : boolean;
public var guiSkin : GUISkin;
private var transformCollider : Transform;
private var hitWallHeightCheckerDistance : float;
public var rayCastLayer : LayerMask;

function Start () {
	transformCollider = GameObject.Find("Player/PlayerCollider").transform;
	canClimb = false;
}

function Update () {
	var rayGroundOriginBack : Vector3 = new Vector3(transformCollider.position.x - transformCollider.GetComponent(CapsuleCollider).radius, transformCollider.position.y, transformCollider.position.z);
	var rayGroundOriginFront : Vector3 = new Vector3(transformCollider.position.x + transformCollider.GetComponent(CapsuleCollider).radius, transformCollider.position.y, transformCollider.position.z);
	var rayWallOriginBot : Vector3 = new Vector3(transformCollider.position.x, transformCollider.position.y - transformCollider.GetComponent(CapsuleCollider).height/2, transformCollider.position.z);
	var rayWallHeightCheckerOrigin : Vector3 = new Vector3(transformCollider.position.x + transformCollider.GetComponent(CapsuleCollider).radius, transformCollider.position.y + transformCollider.GetComponent(CapsuleCollider).height/2, transformCollider.position.z);
	var rayWallOriginTop : Vector3 = new Vector3(transformCollider.position.x, transformCollider.position.y + transformCollider.GetComponent(CapsuleCollider).height/2, transformCollider.position.z);
	var rayClimbCheckerOrigin : Vector3 = new Vector3(transformCollider.position.x, transformCollider.position.y + transformCollider.GetComponent(CapsuleCollider).height/2, transformCollider.position.z);
	var groundDirection : Vector3 = Vector3.down;
	var wallDirection : Vector3 = Vector3.right;
	var rayGroundFront : Ray = new Ray(rayGroundOriginFront,groundDirection);
	var rayGroundBack : Ray = new Ray(rayGroundOriginBack,groundDirection);
	var rayWallBot : Ray = new Ray(rayWallOriginBot, wallDirection);
	var rayHeightChecker : Ray = new Ray(rayWallHeightCheckerOrigin, groundDirection);
	var rayWallTop : Ray = new Ray(rayWallOriginTop, wallDirection);
	var rayClimbChecker : Ray = new Ray(rayClimbCheckerOrigin, groundDirection);
	var hitGroundFront : RaycastHit;
	var hitGroundBack : RaycastHit;
	var hitWallBot : RaycastHit;
	var hitWallHeightChecker : RaycastHit;
	var hitWallTop : RaycastHit;
	var hitClimbChecker : RaycastHit;
	collisionDistanceGround = transformCollider.GetComponent(CapsuleCollider).height/2;
	collisionDistanceWall = transformCollider.GetComponent(CapsuleCollider).radius;
	
	if(Physics.Raycast(rayGroundFront, hitGroundFront, collisionDistanceGround, rayCastLayer)){
		if(hitGroundFront.collider.tag == "Ground"){
			isGrounded = true;
		}
	}
	else{
		if(Physics.Raycast(rayGroundBack, hitGroundBack, collisionDistanceGround, rayCastLayer)){
				isGrounded = true;
		}
		else{
			isGrounded = false;
		}
	}
	
	if(Physics.Raycast(rayHeightChecker, hitWallHeightChecker, 10, rayCastLayer)){
		Debug.DrawLine(rayWallHeightCheckerOrigin, hitWallHeightChecker.point, Color.blue);
		hitWallHeightCheckerDistance =  transformCollider.GetComponent(CapsuleCollider).height - Vector3.Distance(rayWallHeightCheckerOrigin, hitWallHeightChecker.point);
	}
	else{
		if(!isGrounded)
			canClimb = false;
	}
	
	if(Physics.Raycast(rayClimbChecker, hitClimbChecker, 10, rayCastLayer)){
		Debug.DrawLine(rayClimbCheckerOrigin, hitClimbChecker.point, Color.blue);
		if(Vector3.Distance(rayClimbCheckerOrigin, hitClimbChecker.point) <= climbDistance + Vector3.Distance(rayWallOriginTop, rayWallOriginBot)){
			if(hitWallHeightCheckerDistance <= maxHeightStep){
				canClimb = true;
			}
			else{
				canClimb = false;
			}
		}
		else{
			canClimb = false;
		}
	}
	else{
		if(!isGrounded)
			canClimb = false;
	}
	
	if(Physics.Raycast(rayWallBot, hitWallBot, collisionDistanceWall, rayCastLayer)){
		if(canClimb == false){
			isWallHit = true;
			footWallHit = true;
		}
	}
	
	if(Physics.Raycast(rayWallTop, hitWallTop, collisionDistanceWall, rayCastLayer)){
			isWallHit = true;
			headWallHit = true;
	}
	
	if(footWallHit && headWallHit){
		bothWallHit = true;
		footWallHit = false;
		headWallHit = false;
	}
	
	Debug.DrawRay(rayGroundOriginFront, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayGroundOriginBack, groundDirection*collisionDistanceGround, Color.green);
	Debug.DrawRay(rayWallOriginBot, wallDirection*collisionDistanceWall, Color.red);
	Debug.DrawRay(rayWallOriginTop, wallDirection*collisionDistanceWall, Color.red);
}

function OnGUI(){
	var boxWidth : float = 200;
	var boxHeight : float = Screen.height;
	GUI.skin = guiSkin;
	GUI.Box (new Rect (Screen.width - boxWidth,0,boxWidth,boxHeight),
	"[Positions]\nX: " + transformCollider.position.x + 
	"\nY: " + transformCollider.position.y + 
	"\n\n[Speeds]\nX: " + rigidbody.velocity.x + 
	"\nY: " + rigidbody.velocity.y + 
	"\n[Climb]\ncanClimb: " + canClimb + 
	"\nClimbGroundDistance: " + climbDistance + 
	"\nStepHeight: " + hitWallHeightCheckerDistance);
}