#pragma strict

var downwardStrikeImpactParticle : GameObject;
var jumpImpactParticle : GameObject;
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
	
	if(GetComponent(PlayerController).action == GetComponent(PlayerController).action.Roll){
		transform.renderer.material.color = new Color(0,0,0,0);
		GameObject.Find("Player/PlayerCollider").transform.renderer.material.color = new Color(0,0,1,1);
		GameObject.Find("Player/PlayerCollider").transform.renderer.enabled = true;
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