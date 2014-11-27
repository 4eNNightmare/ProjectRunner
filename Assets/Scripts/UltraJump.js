#pragma strict

public var DublejumpForce : GameObject;

function Start () {
DublejumpForce = GameObject.Find("Player");
}

function Update () {

}

function OnTriggerEnter(col : Collider)
{
	if(DublejumpForce.GetComponent(PlayerController).action == actionState.DownwardStrike){
    	if(col.gameObject.name == "Player"){
    		//DublejumpForce.GetComponent(PlayerController).inputJump = true;
    		//DublejumpForce.GetComponent(PlayerController).jumpForce = DublejumpForce.GetComponent(PlayerController).jumpForce*2;
    		//GameObject.Find("Player").rigidbody.velocity = Vector3(0, GetComponent(PlayerController).jumpForce*4, 0);
    		DublejumpForce.rigidbody.velocity = Vector3(0, DublejumpForce.GetComponent(PlayerController).jumpForce*2, 0);
			DublejumpForce.GetComponent(PlayerController).action = actionState.Jump;
			DublejumpForce.GetComponent(PlayerController).inputJump = false;
			//GameObject.FindWithTag("Character").animation.CrossFade("JumpDuble", 0.3);
        	GameObject.FindWithTag("Cogumelo").animation.Play("Impulso");
        	
    	}
	}
}
	
