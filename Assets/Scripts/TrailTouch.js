#pragma strict
public var touch: Touch;

function Update () {
	//switch (touch.phase){
			//case TouchPhase.Moved:
				var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
				var pos : Vector3 = ray.GetPoint(5);
				transform.position = pos;
			//break;
	//}
}