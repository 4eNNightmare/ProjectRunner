#pragma strict
public var RotationFactor : float;
public var PositionFactor : float;

function Start () {
	var RandomRotation : Vector3;
	var RandomNumber : int;
	RandomNumber = Random.Range(1,100);
	
	if((RandomNumber >= 1)&&(RandomNumber < 25))
		RandomRotation = new Vector3(270,0+Random.Range(-RotationFactor,RotationFactor),0);
	
	if((RandomNumber >= 25)&&(RandomNumber < 50))
		RandomRotation = new Vector3(270,90+Random.Range(-RotationFactor,RotationFactor),0);
	
	if((RandomNumber >= 50)&&(RandomNumber < 75))
		RandomRotation = new Vector3(270,180+Random.Range(-RotationFactor,RotationFactor),0);
	
	if((RandomNumber >= 75)&&(RandomNumber <= 100))
		RandomRotation = new Vector3(270,270+Random.Range(-RotationFactor,RotationFactor),0);
	
	transform.rotation = Quaternion.Euler(RandomRotation);
	transform.position = new Vector3(transform.position.x + Random.Range(-PositionFactor,PositionFactor), 
	transform.position.y + Random.Range(-PositionFactor,PositionFactor), transform.position.z + Random.Range(-PositionFactor,PositionFactor));

}