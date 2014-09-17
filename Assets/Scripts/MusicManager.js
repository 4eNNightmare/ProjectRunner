#pragma strict


private static var instance : MusicManager;
private static var lastSceneName : String;
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
	}
	DontDestroyOnLoad(gameObject);
}

function ChangeMusic(){
	switch(Application.loadedLevelName){
		case "Scene01":
			if(music.Length > 0){
				transform.audio.clip = music[0];
				transform.audio.Play();
			}
			else{
				Debug.LogWarning("[MusicManager] Erro 001: Nao foi possivel mudar a musica");
			}
		break;
		case "Scene02":
			if(music.Length > 1){
				transform.audio.clip =  music[1];
				transform.audio.Play();
			}
			else{
				Debug.LogWarning("[MusicManager] Erro 002: Nao foi possivel mudar a musica");
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