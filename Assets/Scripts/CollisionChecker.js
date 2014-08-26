#pragma strict

public var isGrounded : boolean;
public var fatalCollision : boolean;
public var bodyHorizontalCollision : boolean;
public var headVerticalCollision : boolean;
public var canClimb : boolean;
public var rayCastLayer : LayerMask;
public var transformCollider : Transform;
public var maxHeightStep : float;
public var maxHeightInAirStep : float;
public var groundDistanceToleranceToClimb : float;
private var rayCeilingOrigin : Vector3;
private var rayGroundOrigin : Vector3;
private var collisionDistanceGround : float;
private var collisionDistanceCeiling : float;
private var headCenterPoint : Vector3;
private var bodyCenterPoint : Vector3;
private var colliderRadius : float;
private var colliderHeight : float;
private var causeOfDeath : String = "\nNone";

private var hitWallHeightCheckerDistance : float;
private var DistanceToGroundCheckerDistance : float;

function Start () {

}

function Update () {
	
	colliderRadius = transformCollider.GetComponent(CapsuleCollider).radius;
	colliderHeight = transformCollider.GetComponent(CapsuleCollider).height;
	if(!GetComponent(ConstantMove).isRolling){//Deternina a posiçao central do colisor da cabeça e corpo
		headCenterPoint = new Vector3(transformCollider.position.x, transformCollider.position.y + colliderHeight/4, transformCollider.position.z);
		bodyCenterPoint = new Vector3(transformCollider.position.x, transformCollider.position.y - colliderHeight/4, transformCollider.position.z);
		rayGroundOrigin = headCenterPoint;
		rayCeilingOrigin = bodyCenterPoint;
	}
	else{
		headCenterPoint = transformCollider.position;
		bodyCenterPoint = transformCollider.position;
		rayGroundOrigin = new Vector3(transformCollider.position.x, transformCollider.position.y + colliderHeight/2, transformCollider.position.z);
		rayCeilingOrigin = new Vector3(transformCollider.position.x, transformCollider.position.y - colliderHeight/2, transformCollider.position.z);
	}
	var rayDistanceToGroundCheckerOrigin : Vector3 = new Vector3(transformCollider.position.x - colliderRadius/2, transformCollider.position.y + colliderHeight/2, transformCollider.position.z);
	var rayWallHeightCheckerOrigin : Vector3 = new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y + colliderHeight*4, transformCollider.position.z);
	var rayGround : Ray = new Ray(rayGroundOrigin, Vector3.down);
	var rayCeiling : Ray = new Ray(rayCeilingOrigin, Vector3.up);
	var rayWallHeightChecker : Ray = new Ray(rayWallHeightCheckerOrigin, Vector3.down);
	var rayDistanceToGroundChecker : Ray = new Ray(rayDistanceToGroundCheckerOrigin, Vector3.down);
	var hitGround : RaycastHit;
	var hitCeiling : RaycastHit;
	var hitFrontal : RaycastHit;
	var hitWallHeightChecker : RaycastHit;
	var hitDistanceToGroundChecker : RaycastHit;

	collisionDistanceGround = transformCollider.GetComponent(CapsuleCollider).height/2;
	collisionDistanceCeiling = transformCollider.GetComponent(CapsuleCollider).height/2;	
	
	if(Physics.SphereCast(rayGround, colliderRadius, hitGround, collisionDistanceGround, rayCastLayer)){ //Detecta se a parte frontal inferior do personagem no sentido vertical tocou o chao.
		isGrounded = true;
		Debug.DrawLine(bodyCenterPoint, hitGround.point, Color.green);
	}
	else{
		isGrounded = false;
	}

	if(Physics.Raycast(rayWallHeightChecker, hitWallHeightChecker, Mathf.Infinity, rayCastLayer)){//Mede a distancia da parte frontal da cabeça do personagem ate tocar em alguma superficie no sentido vertical. Para determinar o tamanho do degrau.
		Debug.DrawLine(rayWallHeightCheckerOrigin, hitWallHeightChecker.point, Color.blue);
		hitWallHeightCheckerDistance =  Vector3.Distance(rayWallHeightCheckerOrigin, 
		new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y - colliderHeight/2, transformCollider.position.z)) 
		- Vector3.Distance(rayWallHeightCheckerOrigin,hitWallHeightChecker.point);
	}
	else{
		if(!isGrounded)//Se o rayWallHeightChecker nao bater em alguma superficie, e se o personagem estiver no ar, ele nao podera escalar. ¬¬'
			canClimb = false;
	}
	
	if(Physics.SphereCast(rayDistanceToGroundChecker, transformCollider.GetComponent(CapsuleCollider).radius/2, hitDistanceToGroundChecker, 10, rayCastLayer)){//Mede a distancia do topo do personagem ate encontrar alguma superficie na vertical.
		Debug.DrawLine(rayDistanceToGroundCheckerOrigin, hitDistanceToGroundChecker.point, Color.red);
		DistanceToGroundCheckerDistance = Vector3.Distance(rayDistanceToGroundCheckerOrigin, hitDistanceToGroundChecker.point) - colliderHeight;
		if(DistanceToGroundCheckerDistance <= groundDistanceToleranceToClimb){//Se a distancia ateh a superficie for menor que a variavel groundDistanceToleranceToClimb...
			if(hitWallHeightCheckerDistance <= maxHeightStep){//... e a altura do degrau for ecalavel, ele podera escalar.
				canClimb = true;
			}
			else{
				canClimb = false;
			}
		}
		else{
			if(hitWallHeightCheckerDistance <= maxHeightInAirStep){//Se groundDistanceToleranceToClimb for maior que o permitido, a altura de degrau permitida para escalagem, sera diferenciada.
				canClimb = true;
			}
			else{
					canClimb = false;
			}
		}
	}
	else{
		if(hitWallHeightCheckerDistance <= maxHeightInAirStep){//Se groundDistanceToleranceToClimb nao encontrar uma superficie, a altura de degrau permitida para escalagem, sera diferenciada.
			canClimb = true;
		}
		else{
				canClimb = false;
		}
	}
	
	if(Physics.SphereCast(rayCeiling, colliderRadius, hitCeiling, collisionDistanceCeiling, rayCastLayer)){//Detecta se bateu o topo da cabeça
		if(!GetComponent(ConstantMove).isRolling){
			Debug.DrawLine(headCenterPoint, hitCeiling.point, Color.yellow);
			if(!bodyHorizontalCollision){
				headVerticalCollision = true;
			}
		}
	}

	if(bodyHorizontalCollision && !canClimb){
		fatalCollision = true;
		causeOfDeath = "\nBateu de frente";
	}
	else{
		if(headVerticalCollision){
			fatalCollision = true;
			causeOfDeath = "\nBateu a cabeça";
			
		}
	}
}


function OnCollisionEnter(collision : Collision) {
	var contact : ContactPoint;
	for (contact in collision.contacts) {
		var p1 : Vector3 = contact.point;
		var p2 : Vector3 = contact.point + contact.normal;
		if(Mathf.Round(p1.y) == Mathf.Round(p2.y)){
			if(!headVerticalCollision){
				bodyHorizontalCollision = true;	
			   	Debug.DrawLine(p1, p2, Color.red, 2, false);
		   	}		
		}
		else{
			bodyHorizontalCollision = false;
		}
	}
}

function OnCollisionExit(collision : Collision) {
		bodyHorizontalCollision = false;
}

function OnDrawGizmos() {
	Gizmos.color = Color.white;
	Gizmos.DrawWireSphere(headCenterPoint, colliderRadius);
	Gizmos.color = Color.black;
	Gizmos.DrawWireSphere(bodyCenterPoint, colliderRadius);
}

function OnGUI(){
	var boxWidth : float = 200;
	var boxHeight : float = Screen.height;
	//GUI.skin = guiSkin;
	GUI.Box (new Rect (Screen.width - boxWidth,0,boxWidth,boxHeight),
	"[Climb]"+
	"\nWallHeight: " + hitWallHeightCheckerDistance.ToString("F2")+
	"\nDistToGrd: " + DistanceToGroundCheckerDistance.ToString("F2") +
	"(" + groundDistanceToleranceToClimb + ")" +
	"\ncanClimb: " + canClimb +
	"\ncause of death: " + causeOfDeath
	);
}