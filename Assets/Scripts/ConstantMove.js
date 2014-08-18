#pragma strict
public var moveSpeed : Vector3 = Vector3 (2.5, 0, 0);
public var jumpForce : float;
public var inputJump : boolean = false;
public var inputRoll : boolean = false;
public var rollDuration : float;
public var isRolling : boolean = false;
private var rollTimer : float;

function Update () {

	if(Input.GetMouseButtonDown(1) && GetComponent(CollisionChecker).isGrounded && !isRolling){
		inputRoll = true;
	}
	
	if(Input.GetMouseButtonDown(0) && GetComponent(CollisionChecker).isGrounded){
		inputJump = true;
		if(isRolling){
			rollTimer = 0;
		}
	}
	
	if(isRolling){
		rollTimer -= Time.deltaTime;
		if(rollTimer <= 0){
			GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y + 0.5;
			GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 2;
			isRolling = false;
		}
	}
}

function FixedUpdate () {
	
	if(inputRoll && !isRolling){
		isRolling = true;
		rollTimer = rollDuration;
		GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 1;
		GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y - 0.5;
		inputRoll = false;
		inputJump = false;
	}
	
	if(inputJump){
		rigidbody.velocity = Vector3(0, jumpForce, 0);
		inputJump = false;
	}
	
	if(!GetComponent(CollisionChecker).isWallHit){
		rigidbody.MovePosition(rigidbody.position + moveSpeed*Time.deltaTime);
	}
}