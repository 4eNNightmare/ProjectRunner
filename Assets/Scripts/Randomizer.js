#pragma strict
var novoPonto 	: 	  Vector3;
var ultimoPonto	:	  Vector3;
var comparaDist : 	  Vector3;
var inicialDist : 	  Vector3;
var podeSaltar	:	  boolean;
var objeto	 	:  GameObject;
var contaTempo  : 		float;
var entrePulo	:		float;
		

function Start () {
comparaDist = inicialDist = this.gameObject.transform.position;
podeSaltar 	= true;
novoPonto.x = 0;
novoPonto.y = 0;
novoPonto.z = 0;
ultimoPonto = novoPonto;
contaTempo = 0;
entrePulo = 0;
}

function Update () {
comparaDist.x = GameObject.Find("Player").GetComponent(Transform).position.x - inicialDist.x;

if(contaTempo >= 0.5)
{

	ultimoPonto.y = -0.29;
	novoPonto.y =	 -0.29;
	novoPonto.x = entrePulo + comparaDist.x;
	
	
	if(Random.value > 0.2)
	{
		Instantiate(objeto,novoPonto,transform.rotation);
		novoPonto.x = comparaDist.x + 1 + entrePulo;
		Instantiate(objeto,novoPonto,transform.rotation);
		entrePulo += 0;
		podeSaltar = true;
	}
	
	else 
	{
		if(podeSaltar)
		{
			novoPonto.x = comparaDist.x +1.5 + entrePulo;
			Instantiate(objeto,novoPonto,transform.rotation);
			novoPonto.x = comparaDist.x +2.55 + entrePulo;
			Instantiate(objeto,novoPonto,transform.rotation);
			entrePulo += 3.5;
			podeSaltar = false;
		}
		else{
			Instantiate(objeto,novoPonto,transform.rotation);
			novoPonto.x = comparaDist.x + 1 + entrePulo;
			Instantiate(objeto,novoPonto,transform.rotation);
			entrePulo += 0;
		}
	}
			
	contaTempo = 0;
}	

}

function FixedUpdate(){
contaTempo += Time.deltaTime;
}