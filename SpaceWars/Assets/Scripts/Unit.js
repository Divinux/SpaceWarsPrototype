//0:red, 1:Blue, 2:yellow
var vColor : int;
var vPower : int;



var vTarget : GameObject;

var vDist : float;
var vH : int;


function Update () 
{
	if(vTarget != null)
	{
		transform.LookAt(vTarget.transform);
		transform.Translate(Vector3.forward * Time.deltaTime * vPower, Space.Self);
		vDist = Vector3.Distance(vTarget.transform.position, transform.position);
	}
	
	if(vDist < 0.3)
	{
		fLand();
	}
}

function fLand()
{

	vTarget.GetComponent(Planet).vUnits[vColor]++;
	vTarget.GetComponent(Planet).fBattle(vColor, vPower);

	Destroy(gameObject);
}