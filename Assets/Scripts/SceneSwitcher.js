#pragma strict

function OnGUI () {

	if(GUI.Button(new Rect(20,10,80,40), "Scene 1")) {
	    Application.LoadLevel("Scene01");
	}

	if(GUI.Button(new Rect(100,10,80,40), "Scene 2")) {
	    Application.LoadLevel("Scene02");
	}
}