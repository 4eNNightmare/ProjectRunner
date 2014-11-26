#pragma strict

var downwardStrikeImpactParticle : GameObject;
var jumpImpactParticle : GameObject;
private var impacted : boolean = false;

function Start () {

}

function Update () {
	

	if(GetComponent(CollisionChecker).isGrounded){
		GameObject.FindWithTag("Character").animation.CrossFadeQueued("run", 0.10, QueueMode.CompleteOthers);
		transform.renderer.material.color = new Color(0,0,1,1);
		
		
	}
	else{
		
		if(rigidbody.velocity.y < 0){
			if(GetComponent(PlayerController).action == actionState.DownwardStrike){
				GameObject.FindWithTag("Character").animation.CrossFadeQueued("DownWard", 0.02, QueueMode.PlayNow);
			}
			else{
				GameObject.FindWithTag("Character").animation.CrossFadeQueued("Jump_Down", 0.02, QueueMode.CompleteOthers);
				transform.renderer.material.color = new Color(1,0,0,1);
			}
		}
		else{
				GameObject.FindWithTag("Character").animation.CrossFadeQueued("JumpAir_Up", 0.02, QueueMode.PlayNow);
				transform.renderer.material.color = new Color(1,1,0,1);
		}
	}
	
	if(GetComponent(CollisionChecker).fatalCollision){
		transform.renderer.material.color = new Color(0,1,0,1);
	}
	
	if(GetComponent(PlayerController).action == GetComponent(PlayerController).action.Roll){
		GameObject.FindWithTag("Character").animation.Play("roll");
		transform.renderer.material.color = new Color(0,0,0,0);
		//GameObject.Find("Player/PlayerCollider").transform.renderer.material.color = new Color(0,0,1,1);
		//GameObject.Find("Player/PlayerCollider").transform.renderer.enabled = true;
	}
	else{
		GameObject.Find("Player/PlayerCollider").transform.renderer.enabled = false;
	}
	
	if(GetComponent(CollisionChecker).isGrounded){
		if(!impacted){
			ParticleInstantiate();
		}
		impacted = true;
	}
	else{
		impacted = false;
	}
}

function ParticleInstantiate(){
	var particle : GameObject;
	switch(GetComponent(PlayerController).action){
		case GetComponent(PlayerController).action.DownwardStrike:
			particle = downwardStrikeImpactParticle;
		break;
		default:
			particle = jumpImpactParticle;
		break;
	}
	if(particle != null){
		GameObject.Instantiate(particle, new Vector3(transform.position.x, transform.position.y-0.75, transform.position.z), Quaternion.Euler(-90,0,0));
	}
}