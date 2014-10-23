#pragma strict
public var moveSpeed : Vector3 = Vector3 (2.5, 0, 0);
public var jumpForce : float;
public var inputJump : boolean = false;
public var inputRoll : boolean = false;
public var inputAirDown: boolean = false;
public var rollDuration : float;
//public var isRolling : boolean = false;
//public var isDownwardStrike : boolean = false;
public var extraJumpCount : int;
public enum actionState {Run, Jump, Roll, DownwardStrike}
public var action : actionState;

private var rollTimer : float;
@HideInInspector public var extraJumpCountTMP : int;

function Update () {
	if(GetComponent(GameStateController).gameState != GameState.GameOver){
	
		//==================[INPUT DETECTION]================
		if(Input.GetKeyDown("down") && action != actionState.Roll){//Se apertar para baixo e nao estiver rolando...
			if(GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded){//...se estiver no chao...
				inputRoll = true;//...pode rolar.
			}
			else if(action != actionState.DownwardStrike){//... se estiver no ar e nao estiver em downwardStrike...
				inputAirDown = true;//...pode downwardStrike.
			}
		}
		
		
		if(Input.GetKeyDown("up") && extraJumpCountTMP > 0){
			inputJump = true;
		}
		
		//==================[JUMP]======================

		if(inputJump){
			if(action == actionState.Roll){//...se estiver rolando...
				rollTimer = 0;//...ira cancelar o rolamento.
			}
			
			if(!GetComponent(CollisionChecker).isGrounded){//------[EXTRA JUMP]----- Se estiver no ar...
				extraJumpCountTMP--;//...subtraira um pulo extra.
			}
		}
		else if(GetComponent(CollisionChecker).isGrounded){//enquanto estiver no chao...
			extraJumpCountTMP = extraJumpCount; //reseta os pulos extras.
			if(action == actionState.Jump){
				action = actionState.Run;
			}
		}

		//==================[ROLL]========================
		if(action == actionState.Roll){//se esta rolando...
			rollTimer -= Time.deltaTime;//...subtrai a duraçao do rolamento...
			if(rollTimer <= 0){//...se o tempo for menor que zero...
				GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y + 0.5;//...desloca levemente o colisor para cima...
				GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 2;//...e retorna o tamanho original do colisor.
				action = actionState.Run;
			}
		}
		
		//===============[DOWNWARD STRIKE]=================
		if(GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded && action == actionState.DownwardStrike){
			action = actionState.Run;//... ao colidir com o solo e o fim do Downward Strike.
		}
	
	}
}

function FixedUpdate () {
	
	//=======================[ROLL]========================
	if(inputRoll && action != actionState.Roll){
		action = actionState.Roll;
		rollTimer = rollDuration;
		GameObject.Find("Player/PlayerCollider").transform.GetComponent(CapsuleCollider).height = 1;
		GameObject.Find("Player/PlayerCollider").transform.position.y = GameObject.Find("Player/PlayerCollider").transform.position.y - 0.5;
		inputRoll = false;
		inputJump = false;
		inputAirDown = false;
	}
	
	//========================[JUMP]=======================
	if(inputJump){
		rigidbody.velocity = Vector3(0, jumpForce, 0);
		action = actionState.Jump;
		inputJump = false;
	}
	
	//=================[DOWNWARD STRIKE]====================
	if(inputAirDown){
		rigidbody.velocity = Vector3(0, jumpForce*-2.5, 0);
		action = actionState.DownwardStrike;
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