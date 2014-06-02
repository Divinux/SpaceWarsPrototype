var vState = 0;



function OnGUI () 
{
	if(vState == 0)
	{
		GUI.Box(Rect(0,0,Screen.width,100),"How to play: Click on any owned planet to select it. Click anywhere on the background or rightclick to deselect.\nClick on any planet with a planet already selected to send half of the stationed ships.\nYou win when no enemy has a planet left. You lose if you have no planets left.\nPress M to mute music.");
		if(GUI.Button(Rect(0,100,Screen.width,20),"OK"))
		{
			vState = 1;
		}
	}
}