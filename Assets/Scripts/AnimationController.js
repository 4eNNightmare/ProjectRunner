#pragma strict

var groundImpactParticle : GameObject;
private var impacted : boolean = false;

function Start () {

}

function Update () {

	if(GetComponent(CollisionChecker).isGrounded){
		transform.renderer.material.color = new Color(0,0,1,1);
	}
	else{
		if(rigidbody.velocity.y < 0){
			transform.renderer.material.color = new Color(1,0,0,1);
		}
		else{
			transform.renderer.material.color = new Color(1,1,0,1);
		}
	}
	
	if(GetComponent(CollisionChecker).fatalCollision){
		transform.renderer.material.color = new Color(0,1,0,1);
	}
	
	if(GetComponent(PlayerController).isRolling){
		transform.renderer.material.color = new Color(0,0,0,0);
		GameObject.Find("Player/PlayerCollider").transform.renderer.material.color = new Color(0,0,1,1);
		GameObject.Find("Player/PlayerCollider").transform.renderer.enabled = true;
	}
	else{
		GameObject.Find("Player/PlayerCollider").transform.renderer.enabled = false;
	}
	
	if(GetComponent(CollisionChecker).isGrounded){
		if(!impacted){
			var instace = GameObject.Instantiate(groundImpactParticle, new Vector3(transform.position.x, transform.position.y-1, transform.position.z), transform.rotation);
			instace.transform.rotation = Quaternion.Euler(-90,0,0);
		}
		impacted = true;
	}
	else{
		impacted = false;
	}

}