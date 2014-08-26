#pragma strict
var newPoint 			: 	 	  int;
var contaCubos			:		  int;
var previousWidth		:		  int;
var sort 				: 		  int;
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
			
		case ("ground1") :
			objetosOrdenados[2] = objeto;
			break;
	
		case ("ground2") :
			objetosOrdenados[3] = objeto;
			break;
			
		case ("ground3") :
			objetosOrdenados[4] = objeto;
			break;
			
		case ("Obstaculo") :
			objetosOrdenados[5] = objeto;
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
			
		case ("Obstaculo") :
		
			podeInstanciar[0] = false;
			podeInstanciar[1] = false;
			podeInstanciar[2] = true;
			podeInstanciar[3] = false;
			podeInstanciar[4] = false;
			podeInstanciar[5] = false;
			//podeInstanciar[6] = false;
			//podeInstanciar[7] = false;
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
	case(0): //buraco
		lastObject = objetosOrdenados[0];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[0], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(1): //buraco 2
		lastObject = objetosOrdenados[1];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[1], new Vector3(lastPoint.x+objetosOrdenados[1].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 2;
	break;
	
	case(2): //cubo 1
		lastObject = objetosOrdenados[2];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[2], new Vector3(lastPoint.x+objetosOrdenados[2].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(3): // cubo 2
		lastObject = objetosOrdenados[3];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[3], new Vector3(lastPoint.x+objetosOrdenados[3].transform.localScale.x/2,-0.25,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(4): // cubo 3
		lastObject = objetosOrdenados[4];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[4], new Vector3(lastPoint.x+objetosOrdenados[4].transform.localScale.x/2,-0,0),transform.rotation);
		previousWidth = 1;
	break;
	
	case(5): // obstaculo
		lastObject = objetosOrdenados[5];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[5], new Vector3(lastPoint.x+3.5,0,0),transform.rotation);
		previousWidth = 7;
	break;
	
	default:
		lastObject = objetosOrdenados[0];
		lastPoint.x += previousWidth;
		Instantiate(objetosOrdenados[0], new Vector3(lastPoint.x+objetosOrdenados[0].transform.localScale.x/2,-0.5,0),transform.rotation);
		previousWidth = 1;	
}

}



//function DrawInstance (Paulo : GameObject) : void
//{
//		Instantiate(Paulo,lastPoint,transform.rotation);
//}
////funçao Padrao;
//function EscolheObjeto() : GameObject
//{
//	var id : int = 0;
//	for(x in object)
//	{
//		object[id].name = "Paulo";
//		Debug.Log(object[id].name);
//		sort = Random.Range(3,10);
//		switch(x.name)
//		{
//			case("buraco1x1"):
//				if( ( (ground1 > 6)||(ground2>5)||(ground3>4) ) && ( (lastInstanciate.name != "buraco1x1")&&(lastInstanciate.name != "buraco2x1")&&(canJump) ) ) 
//				{
//					canJump = false;
//					lastInstanciate = x;
//					EscolheObjeto(x);
//				}
//				else
//				{
//					if(lastInstanciate != "Obstaculo")
//					{
//						canJump = false;
//						EscolheObjeto(lastInstanciate);							
//					}
//					else
//					{
//						for(obs in object)
//						{
//							if(obs.name == "ground3")
//							{	
//								canJump = true;
//								lastInstanciate = obs;
//								EscolheObjeto(obs);
//							}
//						}
//					}
//				}
//		novoObjeto = lastInstanciate;
//		break;
//		
//		case("buraco2x1"):
//				if( ( (ground1 > 6)||(ground2>6)||(ground3>6) ) && ( (lastInstanciate.name != "buraco1x1")&&(lastInstanciate.name != "buraco2x1")&&(canJump) ) ) 
//				{
//					canJump = false;
//					lastInstanciate = x;
//					EscolheObjeto(x);
//				}
//				else
//				{
//					if(lastInstanciate != "Obstaculo")
//					{
//					/*///#############################################################################################///////
//					///// MODIFICAR   		//Debug.Log("the book is on the table")// 						MODIFICAR ///////
//					////#############################################################################################//////*/
//						EscolheObjeto(lastInstanciate);							
//					}
//					else
//					{
//						for(obs in object)
//						{
//							if(obs.name == "ground2")
//							{	
//								canJump = true;
//								lastInstanciate = obs;
//								EscolheObjeto(obs);
//							}
//						}
//					}
//				}
//		novoObjeto = lastInstanciate;
//		break;
//	
//		case("ground1"):
//			if((sort > ground1)&&(lastInstanciate.name != x.name) )
//			{
//			sort = Random.Range(0,3);
//				if(sort <3)
//				{
//					lastInstanciate = x;
//					EscolheObjeto(x);
//				}
//				else
//				{
//					for(obs in object)
//					{
//						if(obs.name == "ground2")
//						{
//							lastInstanciate = obs;
//							EscolheObjeto(obs);
//						}
//					}
//				}
//			}
//		novoObjeto = lastInstanciate;
//		break;
//	
//		case("ground2"):
//			if(( (ground2 <=sort)||(ground1>sort)||(ground3>sort) )&&(lastInstanciate.name == x.name) )
//			{	
//			sort = Random.Range(0,3);
//				if(sort <3)
//				{
//
//					lastInstanciate = x;
//					EscolheObjeto(x);
//				}
//				else
//				{
//					for(obs in object)
//					{
//						if(obs.name == "ground2")
//						{
//							lastInstanciate = obs;
//							EscolheObjeto(obs);
//						}
//					}
//				}
//			}
//		novoObjeto = lastInstanciate;
//		break;
//		
//		case("ground3"):
//			if(( (ground2 <=sort)||(ground1>sort)||(ground3>sort) )&&(lastInstanciate.name == x.name) )
//			{	
//			sort = Random.Range(0,3);
//				if(sort <3)
//				{
//					lastInstanciate = x;
//					EscolheObjeto(x);
//				}
//				else
//				{
//					for(obs in object)
//					{
//						if(obs.name == "ground3")
//						{
//							lastInstanciate = obs;
//							EscolheObjeto(obs);
//						}
//					}
//				}
//			}
//		novoObjeto = lastInstanciate;
//		break;
//		
//		case("Obstaculo"):
//		break;
//		
//		default :
//			Debug.Log("Default");
//		
//	}
//	id++;
//}
//
//return novoObjeto;
//}
//
//function EscolheObjeto(reajuste : GameObject) : void
//{
//	switch(reajuste.name)
//	{
//		case("ground1"):
//			ground1 += 1;
//			ground2 = 0;
//			ground3 = 0;
//			contaCubos += 1;
//			lastPoint.y = -0.5;
//			lastPoint.x += 1;
//			if((ground1 % 15) == 0) Debug.Log("chao chao chao");
//			break;
//
//		case("ground2"):
//			ground1 = 0;
//			ground2 += 1;
//			ground3 = 0;
//			contaCubos += 1;
//			lastPoint.y = -0.25;
//			lastPoint.x += 1;
//			break;
//			
//		case("ground3"):
//			ground1 = 0;
//			ground2 = 0;
//			ground3 += 1;
//			contaCubos += 1;
//			lastPoint.y = 0;
//			lastPoint.x += 1;
//			break;
//		
//		case("buraco1x1"):
//			ground1 = 0;
//			ground2 = 0;
//			ground3 = 0;
//			contaCubos += 1;
//			lastPoint.y = 0;
//			lastPoint.x += 2;
//			break;
//		
//		case("buraco2x1"):
//			ground1 = 0;
//			ground2 = 0;
//			ground3 = 0;
//			contaCubos += 2;
//			lastPoint.y = 0;
//			lastPoint.x += 3;
//			break;
//			
//		case("Obstaculo"):
//			ground1 += 2;
//			ground2 = 0;
//			ground3 = 0;
//			contaCubos += 6;
//			lastPoint.y = 0;
//			lastPoint.x += 6;
//			break;	
//			
//		default :
//			Debug.Log("Debugando..");		
//		
//	}
//	DrawInstance(reajuste);
//
//}