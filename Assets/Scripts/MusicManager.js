#pragma strict


private static var instance : MusicManager;
private static var lastSceneName : String;
private enum musicEnum {none, music1, music2}
private var currentMusic : musicEnum;
public var music : AudioClip[];
			
public static function GetInstance() : MusicManager{
	return instance;
}

function Awake(){
	
	if(instance != null && instance != this){
		Destroy(gameObject);
		return;
	}
	else{
		instance = this;
		currentMusic = musicEnum.none;
	}
	DontDestroyOnLoad(gameObject);
}

function ChangeMusic(){
	switch(Application.loadedLevelName){
		case "MenuP":
			if(currentMusic != musicEnum.music1){
				transform.audio.clip = music[0];
				transform.audio.Play();
				currentMusic = musicEnum.music1;
			}
		break;
		case "Scene02":
			if(currentMusic != musicEnum.music2){
				transform.audio.clip =  music[1];
				transform.audio.Play();
				currentMusic = musicEnum.music2;
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