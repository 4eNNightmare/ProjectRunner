#pragma strict

function Update () {
	if(GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).touch.phase == TouchPhase.Moved
	||Input.GetMouseButton(0)){
		var ray : Ray = GameObject.Find("cameraTrail").camera.ScreenPointToRay(Input.mousePosition);
		var pos : Vector3 = ray.GetPoint(5);
		transform.position = pos;
	}
}