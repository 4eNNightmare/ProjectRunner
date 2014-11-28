#pragma strict
public var FormaBotao 		: Vector2[]		;
public var MousePosition 	: Vector2		;
public var ClickPosition 	: Vector2		;
public enum LayoutState {Rectangle,Triangle}
public var StyleLayout 		: LayoutState	;
public var InputUp			: boolean		;
public var InputDown		: boolean		;
public var InputLeft		: boolean		;
public var InputRight		: boolean		;
public var larguraMaxima 	: int			;
public var alturaMaxima  	: int			;
public var alpha		 	: float			;
public var beta			 	: float			;
public var gama			 	: float			;

function Start () {
	InputDown 	= false;
	InputLeft 	= false;
	InputRight	= false;
	InputUp	  	= false;
	FormaBotao = new Vector2[5];
	larguraMaxima = Screen.width;
	alturaMaxima  = Screen.height;
	FormaBotao[0] = new Vector2(larguraMaxima-larguraMaxima,		alturaMaxima-alturaMaxima)	;
	FormaBotao[1] = new Vector2(larguraMaxima,						alturaMaxima-alturaMaxima)	;
	FormaBotao[2] = new Vector2(larguraMaxima-larguraMaxima,					 alturaMaxima)	;
	FormaBotao[3] = new Vector2(larguraMaxima,									 alturaMaxima)	;
	FormaBotao[4] = new Vector2(larguraMaxima/2,							   alturaMaxima/2)	;
}

function Update () {

	MousePosition = Input.mousePosition;
	ClickPosition.x = MousePosition.x;
	ClickPosition.y = MousePosition.y - alturaMaxima;
	
	if(ClickPosition.y < 0) ClickPosition.y = -ClickPosition.y;
	
	if(Input.GetMouseButtonDown(0)){
		
		//======================= LAYOUT DO RETANGULO =====================//
		if(StyleLayout == LayoutState.Rectangle){
			 if( (ClickPosition.x < larguraMaxima/2)&& (ClickPosition.y < alturaMaxima/2) ) InputUp = true;
			 if( (ClickPosition.x > larguraMaxima/2)&& (ClickPosition.y < alturaMaxima/2) ) print('null2');
			 if( (ClickPosition.x < larguraMaxima/2)&& (ClickPosition.y > alturaMaxima/2) ) InputDown=true;
			 if( (ClickPosition.x > larguraMaxima/2)&& (ClickPosition.y > alturaMaxima/2) ) print('null3');
			 // caso caia na divisa de x ou y nao faz nada.
		}
		//======================= LAYOUT DO TRIANGULO =====================//
		if(StyleLayout == LayoutState.Triangle){
				if( PointInTriangle(ClickPosition,FormaBotao[0],FormaBotao[4],FormaBotao[2]) ) print('BTN1'); //esquerda
				if( PointInTriangle(ClickPosition,FormaBotao[0],FormaBotao[4],FormaBotao[1]) ) InputUp   = true; //cima
				if( PointInTriangle(ClickPosition,FormaBotao[1],FormaBotao[4],FormaBotao[3]) ) print('BTN3'); //direita
				if( PointInTriangle(ClickPosition,FormaBotao[3],FormaBotao[4],FormaBotao[2]) ) InputDown = true; //baixo
		}
	}
	else{
		if(Input.GetKeyDown("up"))
			InputUp = true;
		if(Input.GetKeyDown("down"))
			InputDown=true;
	}
}


//==================== Calcula se esta dentro do triangulo =============================//
function area(p1 : Vector2,p2 :Vector2,p3 :Vector2)
{
	return	(p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function PointInTriangle (pt :Vector2,v1 :Vector2,v2 :Vector2,v3 :Vector2)
{
    var b1	  :boolean;
    var b2	  :boolean;
    var b3	  :boolean;

    b1 = area(pt, v1, v2) < 0.0f;
    b2 = area(pt, v2, v3) < 0.0f;
    b3 = area(pt, v3, v1) < 0.0f;

    return ((b1 == b2) && (b2 == b3));
}