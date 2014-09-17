#pragma strict
public var moveSpeed : Vector3 = Vector3 (2.5, 0, 0);
public var jumpForce : float;
public var inputJump : boolean = false;
public var inputRoll : boolean = false;
public var rollDuration : float;
public var isRolling : boolean = false;
public var extraJumpCount : int;
private var rollTimer : float;
@HideInInspector public var extraJumpCountTMP : int;

function Update () {
	if(GetComponent(GameStateController).gameState != GameState.GameOver){
		if(GetComponent(CollisionChecker).isGrounded && !isRolling &&
		   GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeDown || 
		   GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeDown ||
		   GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeDown){
		   		inputRoll = true;
				GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeDown = false;
				GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeDown = false;
				GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeDown = false;
		}
		
		if(GetComponent(CollisionChecker).isGrounded){//se estiver no chao...
			if(GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeUp ||
			   GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeUp || 
			   GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeUp){//...e o swipe for para cima...
				inputJump = true;//...ira pular...
				if(isRolling){//...e se estiver rolando...
					rollTimer = 0;//...ira cancelar o rolamento.
				}
				GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeUp = false;
				GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeUp = false;
				GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeUp = false;
			}
			extraJumpCountTMP = extraJumpCount; //enquanto estiver no chao reseta os pulos extras.
		}
		else{//Se estiver no ar...
			if(extraJumpCountTMP > 0 && 
			   GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeUp || 
			   GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeUp || 
			   GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeUp){//...e ainda tiver pulos extras...
				inputJump = true;//...ira pular...
				extraJumpCountTMP--;//...mas subitraira um pulo extra.
				GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).swipeUp = false;
				GameObject.Find("Player/Main Camera").GetComponent(MouseSwipe).swipeUp = false;
				GameObject.Find("Player/Main Camera").GetComponent(KeyboardSwipe).swipeUp = false;
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
	
	if(!GetComponent(CollisionChecker).fatalCollision){
		rigidbody.MovePosition(rigidbody.position + moveSpeed*Time.deltaTime);
	}
}