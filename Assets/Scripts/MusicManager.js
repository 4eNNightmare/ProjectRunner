#pragma strict


private static var instance : MusicManager;
private static var lastMusic : AudioClip;
private var lastSceneName : String;
public var music : AudioClip[];
			
public static function GetInstance() : MusicManager{
	return instance;
}

function Awake(){
	AudioListener.pause = false;
	
	if(instance != null && instance != this){
		Destroy(gameObject);
		return;
	}
	else{
		instance = this;
	}
	DontDestroyOnLoad(gameObject);
}

function ChangeMusic(){
	switch(Application.loadedLevelName){
		case "MenuP":
			if(lastMusic != music[0]){
				transform.audio.clip = music[0];
				transform.audio.Play();
				lastMusic = music[0];
			}
		break;
		case "Scene02":
			if(lastMusic != music[1]){
				transform.audio.clip =  music[1];
				transform.audio.Play();
				lastMusic = music[1];
			}
		break;
	}
	//print("[MusicManager]"+" "+Application.loadedLevelName+": "+audio.clip.name);
}

function Update(){
	if(lastSceneName != Application.loadedLevelName){
		ChangeMusic();
		lastSceneName = Application.loadedLevelName;
	}
}