#pragma strict
private var speed : Vector3 = Vector3 (2.5, 0, 0);
private var keyPress : boolean;

function Start () {

}

function Update () {

	if(Input.anyKeyDown && GetComponent(CollisionChecker).isGrounded){
		keyPress = true;
	}	
}

function FixedUpdate () {
	if(keyPress){
		rigidbody.velocity = Vector3(0, 6, 0);
		keyPress = false;
	}
	if(!GetComponent(CollisionChecker).isWallHit)
		rigidbody.MovePosition(rigidbody.position + speed*Time.deltaTime);
	
}