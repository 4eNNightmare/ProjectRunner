#pragma strict
var newPoint 			: 	 	  int;
var previousWidth		:		  int;
var r 					:		  int;
var repetition			:       int[];
var timer  				: 		float;
var nextPieceofGroundX	:		float;
var podeInstanciar		: 	boolean[];
var lastPoint			:	  Vector3;
var compareDist 		: 	  Vector3;
var thirdObject			:  GameObject;
var penObject			:  GameObject;
var lastObject			:  GameObject;
var object	 			:GameObject[];
var objetosOrdenados	:GameObject[];


		
function Start () {
	lastPoint = new Vector3(23,-0.5,0);
	timer = 0;
	previousWidth = 0;
	nextPieceofGroundX = 0;
	lastObject = penObject = thirdObject = object[0] ;
	podeInstanciar[0] = true;
	
}



	
function Update () {
	repetition = new int[objetosOrdenados.length];
	if(timer >= 0.1)
	{	
		ordenaObjetos();
		podeFazer();
		desenhaPaulo();
					
		timer = 0;
	}	
}

function FixedUpdate(){
	timer += Time.deltaTime;
}
function detectaUltimos(){
	thirdObject = penObject;
	penObject = lastObject;
}


function ordenaObjetos() : void
{
for(objeto in object)
{
	switch(objeto.name)
	{
		case ("buraco1x1") :
			objetosOrdenados[0] = objeto;
			break;
				
		case ("buraco2x1") :
			objetosOrdenados[1] = objeto;
			break;
		
		case ("buraco3x1") :
			objetosOrdenados[2] = objeto;
			break;
			
		case ("buraco4x1") :
			objetosOrdenados[3] = objeto;
			break;
			
		case ("buraco5x1") :
			objetosOrdenados[4] = objeto;
			break;
			
		case ("buraco6x1") :
			objetosOrdenados[5] = objeto;
			break;
			
		case ("buraco7x1") :
			objetosOrdenados[6] = objeto;
			break;
			
		case ("ground1") :
			objetosOrdenados[7] = objeto;
			break;
	
		case ("ground2") :
			objetosOrdenados[8] = objeto;
			break;
			
		case ("ground3") :
			objetosOrdenados[9] = objeto;
			break;
			
		case ("Obstaculo1") :
			objetosOrdenados[10] = objeto;
			break;
			
		case ("Obstaculo2.1") :
			objetosOrdenados[11] = objeto;
			break;
			
		case ("Obstaculo2.2") :
			objetosOrdenados[12] = objeto;
			break;
			
		case ("Obstaculo2.3") :
			objetosOrdenados[13] = objeto;
			break;
			
		default :
			Debug.Log("Default");	
		}
	}
}

function podeFazer(){
	switch(lastObject.name)
	{
		case ("buraco1x1") :
			podeInstanciar[0] = false;
			if(penObject.name == "ground3" && penObject.name == "ground2") podeInstanciar[0] = true;
			if(thirdObject.name == "buraco1x1" || thirdObject.name == "buraco2x1") podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = true;
			podeInstanciar[3] = false;
			if(penObject.name == "ground3"||penObject.name == "ground2") podeInstanciar[3] = true;
			podeInstanciar[4] = false;
			if(thirdObject.name == "ground3" && penObject.name == "ground2") podeInstanciar[4]= true;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			break;
				
		case ("buraco2x1") :
			podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = true;
			podeInstanciar[3] = false;
			if(penObject.name == "ground2") podeInstanciar[3] = true;
			podeInstanciar[4] = false;
			if(penObject.name == "ground3") podeInstanciar[4] = true;
			podeInstanciar[5] = false;
			if(penObject.name == "ground3" && thirdObject.name == "ground3") podeInstanciar[5] = true;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			break;
			
		case ("buraco3x1") :
			break;
		
		case ("buraco4x1") :
			break;
			
		case ("buraco5x1") :
			break;
			
		case ("buraco6x1") :
			break;
	
		case ("buraco7x1") :
			break;
			
		case ("ground1") :
			podeInstanciar[3] = true;
			podeInstanciar[2] = true;
			podeInstanciar[4] = false;
			if((thirdObject.name == "ground2")&&(penObject.name == "ground1")&&(lastObject.name == "ground1")) podeInstanciar[4] = false;
			if(penObject.tag == "Ground" && lastObject.tag == "Ground")podeInstanciar[0] = true;
			if((thirdObject.name == "ground3") && ((penObject.name == "buraco1x1") ||(penObject.name == "ground2") || (penObject.name == "buraco2x1")))
			{
				podeInstanciar[0] = false;
				podeInstanciar[1] = false;
				podeInstanciar[2] = true;
				podeInstanciar[5] = false;
			}
			
			if((thirdObject.name == "ground1") && (penObject == "ground1") && (lastObject.name == "ground1"))
			{
				podeInstanciar[0] = true;
				podeInstanciar[1] = true;
				podeInstanciar[2] = true;
				podeInstanciar[3] = true;
			}
			
			if(((thirdObject.name == "ground2") || (thirdObject.name == "ground3")) || (penObject.name == "ground2")){
				podeInstanciar[0] = false;
				podeInstanciar[1] = false;
				podeInstanciar[2] = true;
				podeInstanciar[3] = false;
		
			}
			if(penObject.name == "ground1" && (lastObject.name == "buraco2x1") || (lastObject.name == "buraco1x1")){
			 podeInstanciar[3] = false;
			 podeInstanciar[2] = true;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			}
			if(penObject.name == "ground1" && (thirdObject.name == "buraco2x1") || (thirdObject.name == "buraco1x1")){
			 podeInstanciar[3] = false;
			 podeInstanciar[2] = true;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			}
			if((thirdObject.name == "ground2") && (penObject.name == "ground1")) podeInstanciar[4] = false;
			break;
	
		case ("ground2") :
			podeInstanciar[2] = true;
			if((thirdObject.name  == "ground1") && (penObject.name == "ground2") && (lastObject.name == "ground2"))	podeInstanciar[2] = false;
			if(penObject.name == "ground2" && (thirdObject.name == "buraco2x1") || (thirdObject.name == "buraco1x1")){
			 podeInstanciar[4] = false;
			 podeInstanciar[3] = true;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			}
			if(penObject.name == "ground2")
			{
			podeInstanciar[0] = true;
			podeInstanciar[1] = true;
			podeInstanciar[3] = true;
			podeInstanciar[4] = true;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			}
			else{
			podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = false;
			podeInstanciar[3] = true;
			podeInstanciar[4] = false;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			}
			if((thirdObject.name == "buraco2x1") && (penObject.name == "ground2")) podeInstanciar[4] = false;
			break;
			
		case ("ground3") :
			if(penObject.name != "ground3"){
				podeInstanciar[0] = false;
				podeInstanciar[1] = false;
				podeInstanciar[2] = false;
				podeInstanciar[3] = false;
				podeInstanciar[4] = true;
				podeInstanciar[5] = false;
				
			}
			else{
				podeInstanciar[0] = false;
				podeInstanciar[1] = false;
				podeInstanciar[2] = false;
				podeInstanciar[3] = true;
				podeInstanciar[4] = true;
				podeInstanciar[5] = true;
			}
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			break;
			
		case ("Obstaculo1") :
		
			podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = true;
			podeInstanciar[3] = false;
			podeInstanciar[4] = false;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			break;
			
		case ("Obstaculo2.1") :
			break;
			
		case ("Obstaculo2.2") :
			break;
			
		case ("Obstaculo2.3") :
			break;
			
		default :
		
			podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = true;
			podeInstanciar[3] = false;
			podeInstanciar[4] = false;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
			Debug.Log("Default escolha");	
	}
}


function desenhaPaulo() : void
{

do{
		r = Random.Range(0, objetosOrdenados.Length);
}
 while (podeInstanciar[r] == false);
	detectaUltimos();
switch(r)
{
	case(0): //buraco 1x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(1): //buraco 2x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[1].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 2;
	break;
	
	case(2): //buraco 3x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 3;
	break;
	
	case(3): //buraco 4x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 4;
	break;
	
	case(4): //buraco 5x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 5;
	break;
	
	case(5): //buraco 6x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 6;
	break;
	
	case(6): //buraco 7x1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 7;
	break;

	
	case(7): //cubo 1 /ground 1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[2].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(8): // cubo 2 /ground 2
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[3].transform.localScale.x/2,-0.25,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(9): // cubo 3 /ground 3
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+objetosOrdenados[4].transform.localScale.x/2,-0,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(10): // obstaculo 1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+3.5,0,0),transform.rotation);
		previousWidth = 7;
	break;
	
	case(11): // obstaculo 2.1
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+1.5,-0.5,0),transform.rotation);
		previousWidth = 3;
	break;
	
	case(12): // obstaculo 2.2
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+1.5,-0.25,0),transform.rotation);
		previousWidth = 3;
	break;
	
	case(13): // obstaculo 2.3
		lastObject = objetosOrdenados[r];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[r], new Vector3(lastPoint.x+1.5,0,0),transform.rotation);
		previousWidth = 3;
	break;
	
	default:
		lastObject = objetosOrdenados[0];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[0], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;	
}

}
