var vSelected : GameObject;
var vMoney : int[];

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Planet"); 

var vPlanets : int[];

var vWinStatus : int;

function Start () 
{
	vSelected = null;
	vMoney[0] = 1000;
	vMoney[1] = 1000;
	vMoney[2] = 1000;
	
	vWinStatus = 0;
}



function Update () 
{
	fWinCheck();
	if(Input.GetMouseButtonDown(0))
	{
		audio.Play();
	}
	if(Input.GetKeyUp("m"))
	{
		AudioListener.pause = !AudioListener.pause;
	}

}

function fWinCheck()
{
	vPlanets[0]=0;
	vPlanets[1]=0;
	vPlanets[2]=0;

	for (var gop : GameObject in gos)  
	{
		if(gop.GetComponent(Planet).vOwner != -1)
		{
			vPlanets[gop.GetComponent(Planet).vOwner]++;
		}
	}
	
	if(vPlanets[0] == 0)
	{
		//you lose
		vWinStatus = 2;
	}
	
	if(vPlanets[1] == 0 && vPlanets[2] == 0)
	{
		vWinStatus = 1;
	}
}

function OnGUI()
{
	if(vWinStatus == 1)
	{
		GUI.Box(Rect(Screen.width/2 - 200,Screen.height/2 - 100,400,200),"");
		GUI.Label(Rect(Screen.width/2 - 100,Screen.height/2 - 100,400,200),"Congratulations!\n\nYou win!");
		if(GUI.Button(Rect(Screen.width/2 - 100,Screen.height/2 +60,200,30),"Main Menu"))
		{
			Application.LoadLevel (0);
		}
		
	}

	if(vWinStatus == 2)
	{
		GUI.Box(Rect(Screen.width/2 - 200,Screen.height/2 - 100,400,200),"");
		GUI.Label(Rect(Screen.width/2 - 100,Screen.height/2 - 100,400,200),"Sorry, you lose!");
		if(GUI.Button(Rect(Screen.width/2 - 100,Screen.height/2 +60,200,30),"Main Menu"))
		{
			Application.LoadLevel (0);
		}
		
	}
}
