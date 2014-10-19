#pragma strict

public var isGrounded : boolean;
public var fatalCollision : boolean;
public var bodyHorizontalCollision : boolean;
public var headVerticalCollision : boolean;
public var canClimb : boolean;
public var rayCastLayer : LayerMask;
public var transformCollider : Transform;
public var maxHeightStep : float;
private var rayCeilingOrigin : Vector3;
private var rayGroundOrigin : Vector3;
private var collisionDistanceGround : float;
private var collisionDistanceCeiling : float;
private var headCenterPoint : Vector3;
private var bodyCenterPoint : Vector3;
private var colliderRadius : float;
private var colliderHeight : float;
public var causeOfDeath : String = "None";

private var hitWallHeightCheckerDistance : float;
private var hitWallHeightCheckerDistanceAUX : float;

function Start () {

}

function Update () {
	
	colliderRadius = transformCollider.GetComponent(CapsuleCollider).radius;
	colliderHeight = transformCollider.GetComponent(CapsuleCollider).height;
	if(!GetComponent(PlayerController).isRolling){//Deternina a posiçao central do colisor da cabeça e corpo
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
	var rayWallHeightCheckerOrigin : Vector3 = new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y + colliderHeight/2, transformCollider.position.z);
	var rayWallHeightCheckerOriginAUX : Vector3 = new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y + colliderHeight*10, transformCollider.position.z);
	var rayGround : Ray = new Ray(rayGroundOrigin, Vector3.down);
	var rayCeiling : Ray = new Ray(rayCeilingOrigin, Vector3.up);
	var rayWallHeightChecker : Ray = new Ray(rayWallHeightCheckerOrigin, Vector3.down);
	var rayWallHeightCheckerAUX : Ray = new Ray(rayWallHeightCheckerOriginAUX, Vector3.down);
	var hitGround : RaycastHit;
	var hitCeiling : RaycastHit;
	var hitFrontal : RaycastHit;
	var hitWallHeightChecker : RaycastHit;
	var hitWallHeightCheckerAUX : RaycastHit;

	collisionDistanceGround = transformCollider.GetComponent(CapsuleCollider).height/2;
	collisionDistanceCeiling = transformCollider.GetComponent(CapsuleCollider).height/2;	
	
	if(Physics.SphereCast(rayGround, colliderRadius, hitGround, collisionDistanceGround, rayCastLayer)){ //Detecta se a parte frontal inferior do personagem no sentido vertical tocou o chao.
		isGrounded = true;
		Debug.DrawLine(bodyCenterPoint, hitGround.point, Color.green);
	}
	else{
		isGrounded = false;
		canClimb = false;
	}

	if(Physics.Raycast(rayWallHeightChecker, hitWallHeightChecker, Mathf.Infinity, rayCastLayer)){//Mede a distancia da parte frontal da cabeça do personagem ate tocar em alguma superficie no sentido vertical. Para determinar o tamanho do degrau.
		Debug.DrawLine(rayWallHeightCheckerOrigin, hitWallHeightChecker.point, Color.blue);
		hitWallHeightCheckerDistance =  Vector3.Distance(rayWallHeightCheckerOrigin, new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y - colliderHeight/2, transformCollider.position.z)) - Vector3.Distance(rayWallHeightCheckerOrigin,hitWallHeightChecker.point);
		
		if(hitWallHeightCheckerDistance <= maxHeightStep){//Se a altura do degrau for ecalavel, ele podera escalar.
			canClimb = true;
			//quase caiu.
		}
		else{
			canClimb = false;
			if(!bodyHorizontalCollision){
				fatalCollision = true;
				if(String.Compare(causeOfDeath, "None") == 0){
					causeOfDeath = "Trupicou e caiu";
				}
			}
		}
	}

	if(Physics.SphereCast(rayCeiling, colliderRadius, hitCeiling, collisionDistanceCeiling, rayCastLayer)){//Detecta se bateu o topo da cabeça
		if(!GetComponent(PlayerController).isRolling){
			Debug.DrawLine(headCenterPoint, hitCeiling.point, Color.yellow);
			if(!bodyHorizontalCollision){
				headVerticalCollision = true;
			}
		}
	}
	


	if(bodyHorizontalCollision){
		if(!canClimb){//bateu de frente e nao pode escalar (canClimb = false)
			fatalCollision = true;
			if(String.Compare(causeOfDeath, "None") == 0){
				causeOfDeath = "Bateu de frente(Parede Baixa)";
			}
		}
		else{//bateu de frente mas o rayWallHeightChecker nao consegue detectar corretamente a altura da parede (camClimb = true)
			if(Physics.Raycast(rayWallHeightCheckerAUX, hitWallHeightCheckerAUX, Mathf.Infinity, rayCastLayer)){//Mede a distancia do rayWallHeightCheckerAUX ate superficie de contato
				Debug.DrawLine(rayWallHeightCheckerOriginAUX, hitWallHeightCheckerAUX.point, Color.green);
				hitWallHeightCheckerDistanceAUX =  Vector3.Distance(rayWallHeightCheckerOriginAUX, new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y - colliderHeight/2, transformCollider.position.z)) - Vector3.Distance(rayWallHeightCheckerOriginAUX,hitWallHeightCheckerAUX.point);
				
				if(Mathf.Round(hitWallHeightCheckerDistanceAUX) != Mathf.Round(hitWallHeightCheckerDistance)){//compara se existe diferenças nas mediçoes entre o rayWallHeightChecker e rayWallHeightCheckerAUX
					fatalCollision = true;
					if(String.Compare(causeOfDeath, "None") == 0){
						causeOfDeath = "Bateu de frente(Parede Alta)";
					}
					hitWallHeightCheckerDistance = hitWallHeightCheckerDistanceAUX;
				}
				else{
					//tropeçou mas nao caiu.
				}	
			}
		}
	}
	else{
		if(headVerticalCollision){
			fatalCollision = true;
			if(String.Compare(causeOfDeath, "None") == 0){
				causeOfDeath = "Bateu a cabeça";
			}	
		}
	}
}


function OnCollisionEnter(collision : Collision) {
	var contact : ContactPoint;
	for (contact in collision.contacts) {
		var p1 : Vector3 = contact.point;
		var p2 : Vector3 = contact.point + contact.normal;
		if(Vector2.Angle(p1, p2) < 0.2){
			bodyHorizontalCollision = true;	
		   	Debug.DrawLine(p1, p2, Color.red, 5, false);
		   	print(Vector2.Angle(p1, p2));
		}
		else{
			bodyHorizontalCollision = false;
			Debug.DrawLine(p1, p2, Color.yellow, 0.1, false);
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
	Gizmos.color = Color.green;
	Gizmos.DrawSphere(new Vector3(transformCollider.position.x + colliderRadius, transformCollider.position.y + colliderHeight*10, transformCollider.position.z), 0.25);
}

function OnGUI(){
	var boxWidth : float = 200;
	var boxHeight : float = Screen.height;
	//GUI.skin = guiSkin;
	GUI.Box (new Rect (Screen.width - boxWidth,0,boxWidth,boxHeight),
	"isGrounded: "+isGrounded+
	"[Position]"+
	"\nx: " + transform.position.x +
	"\ny: " + transform.position.y +
	"\n"+
	"[Climb]"+
	"\nWallHeight: " + hitWallHeightCheckerDistance.ToString("F2")+ "("+maxHeightStep+")" +
	"\ncanClimb: " + canClimb +
	"\ncause of death:\n "+causeOfDeath+
	"\n"+
	"[Jump]"+
	"\nExtra Jump: " + GetComponent(PlayerController).extraJumpCountTMP + "("+GetComponent(PlayerController).extraJumpCount+")"
	);
}