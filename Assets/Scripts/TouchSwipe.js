#pragma strict
private var startPos: Vector2; 
private var endPos: Vector2;

public var tempoSwipe: float;
private var duracaoSwipe : float;
private var distPosY: float;
private var distPosX: float;
public var distanciaMinima: float;
private var distXY: float;

public var touched: boolean;
public var swipeDown: boolean;
public var swipeUp: boolean;
public var touch: Touch;


function Start(){
	Application.LoadLevelAdditive("TrailTouch");
	duracaoSwipe = tempoSwipe;
	touched = false;
	swipeDown = false;
	swipeUp = false;
}

function Update () {
	
	if (Input.touchCount > 0){
		
		touch = Input.touches[0];
		
		switch(touch.phase){
			case TouchPhase.Began:
				duracaoSwipe = tempoSwipe;
				startPos = touch.position;
				touched = true;
				break;	
			case TouchPhase.Moved:
				duracaoSwipe = duracaoSwipe - Time.deltaTime;
				if(duracaoSwipe<=0 && touched == true){
					Swipe();
				}
			break;
			case TouchPhase.Ended:
				if(duracaoSwipe>0){
					Swipe();
				}
				touched = true;
			break;
		}
		
	}
	
}

function Swipe(){
		endPos = touch.position;
							
		distPosY = Mathf.Abs(endPos.y - startPos.y);
		distPosX = Mathf.Abs(endPos.x - startPos.x);
		distXY =(startPos - endPos).magnitude;
		
		
//		if(distanciaMinima > distXY && (GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded || GameObject.Find("Player").GetComponent(PlayerController).extraJumpCount > 0)){
//				swipeUp = true;
//		}
/*		else*/ if(distanciaMinima < distXY && (GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded || GameObject.Find("Player").GetComponent(PlayerController).extraJumpCount > 0)){
			if(distPosY > distPosX){
				if (endPos.y < startPos.y && (GameObject.Find("Player").GetComponent(PlayerController).isRolling == false)){//Down Swipe/ Baixo
					swipeDown = true;
				}		
				else if(endPos.y >= startPos.y && (GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded || GameObject.Find("Player").GetComponent(PlayerController).extraJumpCount > 0)){//UP Swipe/ Cima
						swipeUp = true;
					}
										
			}
			else{
				if (endPos.x < startPos.x){//Left Swipe/ Esquerda
								
				}	
				else{//Right Swipe/ Direita";
								
				}
			}
		}
			
		touched = false;
	}
