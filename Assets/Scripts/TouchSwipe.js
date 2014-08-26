#pragma strict
var Swipe: GUIText;

private var startPos :Vector2; 
private var endPos: Vector2;
private var distPosY: float;
private var distPosX: float;
public static var touch: Touch;

function Start(){
	Application.LoadLevelAdditive("TrailTouch");	
}

function Update () {

	if (Input.touchCount > 0){
	
		touch = Input.touches[0];
		
		switch (touch.phase){
			case TouchPhase.Began:
				startPos = touch.position;
				break;
			case TouchPhase.Ended:
				endPos = touch.position;
				distPosY = Mathf.Abs(endPos.y - startPos.y);
				distPosX = Mathf.Abs(endPos.x - startPos.x);
				
				if(distPosY > distPosX){
					if (endPos.y < startPos.y) {
								
						Swipe.text = "Down Swipe/ Baixo";
					}		
					else{
						
						Swipe.text = "Up Swipe/ Cima";	
					}
						
					}
				else{
					if (endPos.x < startPos.x){
							Swipe.text = "Right Swipe/ Direita";
					}	
					else{	
							
							Swipe.text = "Left Swipe/ Esquerda";
					}
				}
			break;
		}
	}
}	