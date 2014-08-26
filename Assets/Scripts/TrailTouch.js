#pragma strict


function Update () {
	//var ray : Ray = Camera.main.ScreenPointToRay (TouchSwipe.touch.position);
	switch (TouchSwipe.touch.phase){
			case TouchPhase.Moved:
				var ray : Ray = Camera.main.ScreenPointToRay (TouchSwipe.touch.position);
				var pos : Vector3 = ray.GetPoint(5);
				transform.position = pos;
			break;
	}
}