#pragma strict
private var startPos :Vector2; 
private var endPos: Vector2;

public var tempoSwipe : float;
private var duracaoSwipe : float;
private var distPosY: float;
private var distPosX: float;

public var touched : boolean;
public var swipeDown : boolean;
public var swipeUp : boolean;
public var touch: Touch;


function Start(){
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

		if(distPosY > distPosX){
			if (endPos.y < startPos.y) {//Down Swipe/ Baixo
				swipeDown = true;
			}		
				else{//UP Swipe/ Cima
					swipeUp = true;
				}
									
		}
		else{
			if (endPos.x < startPos.x){//Left Swipe/ Esquerda
							
			}	
			else{//Right Swipe/ Direita";
							
			}
		}
				touched = false;
	}
