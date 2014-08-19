#pragma strict
var newPoint 	: 	  Vector3;
var lastPoint	:	  Vector3;
var compareDist : 	  Vector3;
var initialDist : 	  Vector3;
var canJump		:	  boolean;
var object	 	:GameObject[];
var timer  		: 		float;
var betweenJump	:		float;
var camada		:		  int;
var contaCubos	:		  int;
var contaPrimeiraCamada	:         int;
var contaSegundaCamada	:         int;
var contaTerceiraCamada	:         int;

		

function Start () {
compareDist = initialDist = this.gameObject.transform.position;
canJump 	= true;
newPoint.x = 0;
newPoint.y = 0;
newPoint.z = 0;
lastPoint = newPoint;
lastPoint.x = 23; 
lastPoint.y =-0.5;
timer = 0;
betweenJump = 0;
camada = 1;
contaPrimeiraCamada = 0;
contaSegundaCamada = 0;
contaTerceiraCamada = 0;
}

function Update () {
compareDist.x = GameObject.Find("Player").GetComponent(Transform).position.x - initialDist.x;

if(timer >= 0.05 && contaCubos < 151)
{

	//newPoint.y =	 -0.5;
	//newPoint.x = betweenJump + compareDist.x;	
	DrawInstance(EscolheObjeto(camada));			
	timer = 0;
}	

}

function FixedUpdate(){
timer += Time.deltaTime;
}

function DrawInstance (tipo : int) : void
{
		camada = tipo;
		Instantiate(object[tipo],lastPoint,transform.rotation);
		lastPoint.x += 1 + betweenJump;
		betweenJump += 0;
		contaCubos += 1;
		canJump = true;
}


function EscolheObjeto(camada)
{
if(Random.value > 0.5)
{
	camada = 1;
	lastPoint.y = -0.25;

}
else{
	camada = 2;
	lastPoint.y = 0;

}
return camada;

}