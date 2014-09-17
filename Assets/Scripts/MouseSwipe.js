#pragma strict
private var startPos: Vector2; 
private var endPos: Vector2;

public var tempoSwipe: float;
private var duracaoSwipe : float;
private var distPosY: float;
private var distPosX: float;
public var distanciaMinima: float;
private var distXY: float;

public var clicked: boolean;
public var swipeDown: boolean;
public var swipeUp: boolean;

function Start(){
	Application.LoadLevelAdditive("TrailTouch");
	duracaoSwipe = tempoSwipe;
	clicked = false;
	swipeDown = false;
	swipeUp = false;
}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		duracaoSwipe = tempoSwipe;
		startPos = Input.mousePosition;
		clicked = true;
//		Debug.Log("press");
	}
	if(Input.GetMouseButton(0)){
		duracaoSwipe = duracaoSwipe - Time.deltaTime;
		if(duracaoSwipe<=0 && clicked == true){
			Swipe();
		}
//			Debug.Log("manteve Press");
	}
	if(Input.GetMouseButtonUp(0)){
		if(duracaoSwipe>0){
			Swipe();
			}
//		Debug.Log("soltou Press");
	}
}
function Swipe(){
		endPos = Input.mousePosition;
							
		distPosY = Mathf.Abs(endPos.y - startPos.y);
		distPosX = Mathf.Abs(endPos.x - startPos.x);
		distXY =(startPos - endPos).magnitude;
		
		

		if(distanciaMinima < distXY && (GameObject.Find("Player").GetComponent(CollisionChecker).rigidbody.velocity.y < 0 
		&& GameObject.Find("Player").GetComponent(PlayerController).extraJumpCountTMP > 0)){
			if(distPosY > distPosX){
				if (endPos.y < startPos.y && (GameObject.Find("Player").GetComponent(PlayerController).isRolling == false)){//Down Swipe/ Baixo
					swipeDown = true;
				}		
				else if(endPos.y >= startPos.y && (GameObject.Find("Player").GetComponent(CollisionChecker).isGrounded 
				|| GameObject.Find("Player").GetComponent(PlayerController).extraJumpCountTMP > 0)){//UP Swipe/ Cima
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
			
		clicked = false;
	}
