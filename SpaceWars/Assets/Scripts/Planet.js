//owner of this planet.
var vOwner : int;
//3d text gameobject to display ship amount
var vText : GameObject;
//plnet NameToLayer
var vName : String;
//toggle to not initialize start planets
var vStart : boolean;



//max amount of ships this planet will produce
var vMaxUnits : int;

//array of all ships on this planet. length = 3
var vUnits: int[];

//selection trigger
var vSelected : boolean;
//speed the planet rotates at
var vRotationSpeed : int;
//amount of buildings on the planet
var vBuildings : int;
//general script handler object and component
var vSHO : GameObject;
var vSH : Component;
//temp var
var vHalf : int;
//ship prefab
var clone : GameObject[];
//stats of ships built on this planet
var vPower : int;
var vHP : int;
//amount 
var vMoney : int;
//countdown to next ship build
var vCounterInt : int;
var vCounter : int;
//player colors
var color0 : Color = Color(0, 0.5, 1, 1);
var color1 : Color = Color(0.5, 1, 0, 1);
var color2 : Color = Color(1, 0.7, 0, 1);
//neutral color
var color3 : Color = Color(0.5, 0.5, 0.5, 0.2);

function Awake () 
{
	vSelected = false;
	
	vRotationSpeed = 5;
	
	if(vStart == false)
	{
		vOwner = -1;
		vUnits[0] = 0;
		vUnits[1] = 0;
		vUnits[2] = 0;
		
		vCounterInt = 1000;
		vCounter = 1000;
	}
	
	vBuildings = 0;
	vSHO = GameObject.FindWithTag ("MainCamera");
	vSH = vSHO.GetComponent(Scripthandler);
	
	vPower = 1;
	vHP = 1;
	
	vCounterInt = 1000;
	vCounter = 1000;
}

function Update () 
{
	transform.Rotate(Vector3.up * Time.deltaTime * vRotationSpeed, Space.Self);
	if(vOwner == 0)
	{
		vText.GetComponent(TextMesh).text = vUnits[0].ToString();
		gameObject.light.color = color0;
	}
	else if(vOwner == 1)
	{
		vText.GetComponent(TextMesh).text = vUnits[1].ToString();
		gameObject.light.color = color1;
	}
	else if(vOwner == 2)
	{
		vText.GetComponent(TextMesh).text = vUnits[2].ToString();
		gameObject.light.color = color2;
	}
	else
	{
		vText.GetComponent(TextMesh).text = "0";
		gameObject.light.color = color3;
	}
	fOwnCheck();
	if(vOwner != -1)
	{
		fManufacture();
	}
}

function OnGUI()
{
	if(vSelected == true)
	{
		if(vOwner == 0)
		{
			GUI.Box(Rect(0,Screen.height - 100,Screen.width,100),"");
			GUI.Label(Rect(15,Screen.height - 90,200,20), vName);
			GUI.Label(Rect(15,Screen.height - 70,200,20), "Factories: " + vBuildings);
			GUI.Label(Rect(15,Screen.height - 50,200,20), "Production speed: " + vCounterInt);
			GUI.Label(Rect(15,Screen.height - 30,200,20), "Income: " + vBuildings * 10);
			GUI.Label(Rect(Screen.width - 200,Screen.height - 90,200,20), "Player Money: " + vSH.vMoney[0] + " $");
			
			if(GUI.Button(Rect(200,Screen.height-90,80,80),"Buy factory \n1000$"))
			{
				fBuyFac();
			}
		}
	}
}

function fBuyFac()
{
	if(vSH.vMoney[vOwner] >= 1000)
	{
		vSH.vMoney[vOwner] -= 1000;
		vBuildings++;
		vCounterInt -= 25;
		if(vCounterInt < 1)
		{
			vCounterInt = 1;
		}
	}
}

function OnMouseDown()
{
	//if no planet is selected
	if(vSH.vSelected == null)
	{
		if(vOwner == 0)
		{
			if(vUnits[0] > 0)
			{
				vSelected = true;
				vSH.vSelected = this.gameObject;
				gameObject.light.range += 1;
			}
		}
	}

	//if this planet is selected
	if(vSH.vSelected == this.gameObject)
	{
		
	}

	//if another planet is already selected
	if(vSH.vSelected != this.gameObject && vSH.vSelected != null)
	{
		vHalf = vSH.vSelected.GetComponent(Planet).vUnits[0] / 2;
		vSH.vSelected.GetComponent(Planet).vHalf = vHalf;
		vSH.vSelected.GetComponent(Planet).fSend(vSH.vSelected.GetComponent(Planet).vOwner, this.gameObject);
	}

}

function fSend(vC : int, vTarget : GameObject)
{
	vHalf = vUnits[vC] / 2;
	for(var n = 0; n < vHalf; n++)
	{
		var a : GameObject;
		a = Instantiate(clone[vOwner], transform.position, transform.rotation);
		a.GetComponent(Unit).vColor = vC;
		a.GetComponent(Unit).vPower = vPower;
		a.GetComponent(Unit).vTarget = vTarget;
		
		vUnits[vC]--;
	}
}

function fBattle(vOwn : int, vAm : int)
{
	if(vOwn == 0)
	{
		if(vUnits[1] > 0)
		{
			for(var s = 0; s < vAm; s++)
			{
				vUnits[1]--;
			}
			vUnits[vOwn]--;

			
		}
		else if(vUnits[2] > 0)
		{
			for(var t = 0; t < vAm; t++)
			{
				vUnits[2]--;
			}
			vUnits[vOwn]--;

		}
	}
	
	if(vOwn == 1)
	{
		if(vUnits[0] > 0)
		{
			for(var u = 0; u < vAm; u++)
			{
				vUnits[0]--;
				vUnits[vOwn]--;

			}
		}
		else if(vUnits[2] > 0)
		{
			for(var v = 0; v < vAm; v++)
			{
				vUnits[2]--;
				vUnits[vOwn]--;

			}
		}
	}
	
	if(vOwn == 2)
	{
		if(vUnits[1] > 0)
		{
			for(var w = 0; w < vAm; w++)
			{
				vUnits[1]--;
				vUnits[vOwn]--;

			}
		}
		else if(vUnits[0] > 0)
		{
			for(var i = 0; i < vAm; i++)
			{
				vUnits[0]--;
				vUnits[vOwn]--;

			}
		}
	}
}

function fOwnCheck()
{
	if(vUnits[1] == 0 && vUnits[2] == 0)
	{
		if(vUnits[0] > 0)
		{
			vOwner = 0;
		}
	}
	if(vUnits[0] == 0 && vUnits[2] == 0)
	{
		if(vUnits[1] > 0)
		{
			vOwner = 1;
		}
	}
	if(vUnits[1] == 0 && vUnits[0] == 0)
	{
		if(vUnits[2] > 0)
		{
			vOwner = 2;
		}
	}
	if(vUnits[1] == 0 && vUnits[2] == 0)
	{
		if(vUnits[0] == 0)
		{
			vOwner = -1;
		}
	}
}

function fManufacture()
{
	if(vUnits[vOwner] < vMaxUnits)
	{
		vCounter--;
	}
	
	if(vCounter < 0)
	{
		vUnits[vOwner]++;
		vCounter = vCounterInt;
		vSH.vMoney[vOwner] += vBuildings * 10;
	}
}