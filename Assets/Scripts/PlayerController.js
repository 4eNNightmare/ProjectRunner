#pragma strict
public var moveSpeed : Vector3 = Vector3 (2.5, 0, 0);
public var jumpForce : float;
public var inputJump : boolean = false;
public var inputRoll : boolean = false;
public var inputAirDown: boolean = false;
public var rollDuration : float;
public var isRolling : boolean = false;
public var extraJumpCount : int;
private var rollTimer : float;
@HideInInspector public var extraJumpCountTMP : int;

function Update () {
	if(GetComponent(GameStateController).gameState != GameState.GameOver){
	
		//==================[INPUT DETECTION]================
		if(Input.GetKeyDown("down")){
			if(GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded){
				if(!isRolling){
					inputRoll = true;
				}
			}
			else{
				inputAirDown = true;
			}
		}
		
		if(Input.GetKeyDown("up") && extraJumpCountTMP > 0){
			inputJump = true;
		}
		
		//==================[JUMP]======================

		if(inputJump){
			if(isRolling){//...se estiver rolando...
				rollTimer = 0;//...ira cancelar o rolamento.
			}
			
			if(!GetComponent(CollisionChecker).isGrounded){//------[EXTRA JUMP]----- Se estiver no ar...
				extraJumpCountTMP--;//...subtraira um pulo extra.
			}
		}
		
		if(GetComponent(CollisionChecker).isGrounded){//enquanto estiver no chao...
			extraJumpCountTMP = extraJumpCount; //reseta os pulos extras.
		}

		//==================[ROLL]========================
		if(isRolling){//se esta rolando...
			rollTimer -= Time.deltaTime;//...subtrai a duraçao do rolamento...
			if(rollTimer <= 0){//...se o tempo for menor que zero...
				GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y + 0.5;//...desloca levemente o colisor para cima...
				GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 2;//...e retorna o tamanho original do colisor.
				isRolling = false;
			}
		}
	}
}

function FixedUpdate () {
	
	//=======================[ROLL]========================
	if(inputRoll && !isRolling){
		isRolling = true;
		rollTimer = rollDuration;
		GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 1;
		GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y - 0.5;
		inputRoll = false;
		inputJump = false;
	}
	
	//========================[JUMP]=======================
	if(inputJump){
		rigidbody.velocity = Vector3(0, jumpForce, 0);
		inputJump = false;
	}
	
	//=================[DOWNWARD STRIKE]====================
	if(inputAirDown){
		rigidbody.velocity = Vector3(0, jumpForce*-2.5, 0);
		inputAirDown = false;
	}
	
	//========================[WALK]=======================
	if(!GetComponent(CollisionChecker).fatalCollision){
		rigidbody.MovePosition(rigidbody.position + moveSpeed*Time.deltaTime);
		if(rigidbody.velocity.x != 0){ //Tenta garantir que o jogador nao ira ganhar velocidade inesperadamente ao colidir
			rigidbody.velocity.x = 0;
		}
	}
}