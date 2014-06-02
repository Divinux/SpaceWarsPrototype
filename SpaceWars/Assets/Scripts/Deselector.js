//general script handler object and component
var vSHO : GameObject;
var vSH : Component;

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Planet"); 

function Start()
{
	vSHO = GameObject.FindWithTag ("MainCamera");
	vSH = vSHO.GetComponent(Scripthandler);
	
	gos = GameObject.FindGameObjectsWithTag("Planet"); 
}

function Update()
{
	if(Input.GetMouseButtonDown(1))
	{
		fDeselect();
	}
}

function OnMouseDown()
{
	fDeselect();
}

function fDeselect()
{
	vSH.vSelected = null;
	for (var go : GameObject in gos)  
	{
		if(go.GetComponent(Planet).vSelected == true)
		{
			go.light.range -= 1;
		}
		go.GetComponent(Planet).vSelected = false;
	}
}

