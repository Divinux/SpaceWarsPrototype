var vTexture : Texture2D;


function OnGUI () 
{
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),vTexture, ScaleMode.StretchToFill, false);
	if(GUI.Button(Rect(Screen.width/2-200,200,90,50),"Tutorial"))
	{
		Application.LoadLevel (1);
	}
	if(GUI.Button(Rect(Screen.width/2-100,200,90,50),"Level 1"))
	{
		Application.LoadLevel (2);
	}
	if(GUI.Button(Rect(Screen.width/2,200,90,50),"Level 2"))
	{
		Application.LoadLevel (3);
	}
	if(GUI.Button(Rect(Screen.width/2+100,200,90,50),"Level 3"))
	{
		Application.LoadLevel (4);
	}
	
}
