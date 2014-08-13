#pragma strict

function Start () {

}

function Update () {

	if(GetComponent(CollisionChecker).isGrounded){
		transform.renderer.material.color = new Color(0,0,1,1);
		GameObject.Find("Player/Trail").transform.GetComponent(TrailRenderer).renderer.material.color = new Color(0.5,0.5,1,0.75);
	}
	else{
		if(rigidbody.velocity.y < 0){
			transform.renderer.material.color = new Color(1,0,0,1);
			GameObject.Find("Player/Trail").transform.GetComponent(TrailRenderer).renderer.material.color = new Color(1,0.5,0.5,0.75);
		}
		else{
			transform.renderer.material.color = new Color(1,1,0,1);
			GameObject.Find("Player/Trail").transform.GetComponent(TrailRenderer).renderer.material.color = new Color(1,1,0.5,0.75);
		}
	}
	
	if(GetComponent(CollisionChecker).isWallHit){
		transform.renderer.material.color = new Color(0,1,0,1);
		GameObject.Find("Player/Trail").transform.GetComponent(TrailRenderer).renderer.material.color = new Color(0,1,0,1);
	}

}