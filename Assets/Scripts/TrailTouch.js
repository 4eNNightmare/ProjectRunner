#pragma strict

function Update () {
	switch (GameObject.Find("Player/Main Camera").GetComponent(TouchSwipe).touch.phase){
			case TouchPhase.Moved:
				var ray : Ray = GameObject.Find("cameraTrail").camera.ScreenPointToRay(Input.mousePosition);
				var pos : Vector3 = ray.GetPoint(5);
				transform.position = pos;
			break;
	}
}