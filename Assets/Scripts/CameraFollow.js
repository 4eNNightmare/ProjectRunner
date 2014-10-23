#pragma strict
private var cam : GameObject;
public var cameraPrefab : GameObject;
public var deslocation : Vector3;
public var followSpeed : float;

function Start(){
	if(GameObject.Find("Main Camera")){
		Destroy(GameObject.Find("Main Camera"));
	}
	cam = GameObject.Instantiate(cameraPrefab, transform.position + deslocation, Quaternion.identity);
	cam.name = "Main Camera";
}

function FixedUpdate () {
	cam.transform.position = Vector3.Lerp(cam.transform.position, 
	new Vector3(transform.position.x + deslocation.x, transform.position.y + deslocation.y, transform.position.z + deslocation.z), followSpeed * Time.deltaTime);
}