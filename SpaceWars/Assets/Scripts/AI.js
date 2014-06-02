var vColor : int;

var gos : GameObject[];
var gob : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Planet"); 
gob = gos;

var vTarget : GameObject;

var vCounterInt : int;
var vCounter : int;

function Start () 
{
	vCounterInt = 100;
	vCounter = vCounterInt;
}

function Update () 
{
	vCounter--;
	if(vCounter <= 0)
	{
		fSendOut();
		vCounter = vCounterInt;
	}

}

function fSendOut()
{
	for (var go : GameObject in gos)  
	{
		if(go.GetComponent(Planet).vOwner == vColor)
		{

			if(go.GetComponent(Planet).vUnits[vColor] > go.GetComponent(Planet).vMaxUnits / 2)
			{
				fFindTarget();
				go.GetComponent(Planet).fSend(vColor, vTarget);
			}
		}
	}
}

function fFindTarget()
{
	for (var g : GameObject in gob)  
	{
		if(g.GetComponent(Planet).vOwner != vColor)
		{
			vTarget = g;
			return;
		}
	}
}