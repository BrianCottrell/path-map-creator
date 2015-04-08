/* Map creator for pathing application website */
/* By Brian Cottrell		                   */
/* 12-10-2014      		                       */

/*VARIABLES*/
var x, y;					//X and Y coordinates of cursor
var points = [];			//Stores click points
var group = 0;				//Allows points to be grouped together
var groups = 48;			//Total number of groups
var color = '0,255,255';	//Starting point color
var mapImage = document.getElementsByClassName('map-image')[0];

/*FUNCTIONS*/
//Creates a new point at the cursor location
function addPoint(){
	var point = null;
	//Points expressed as a percentage of the image width
	x = event.clientX/mapImage.offsetWidth*100;
	y = event.clientY/mapImage.offsetWidth*100;
	//Store the point's location along with the currently selected group
	points.push([x, y, group]);
	//Create an html element to display the point on the page
	point = document.createElement('div');
	point.classList.add('point');
	point.style.backgroundColor = 'rgb('+color+')';
	mapImage.appendChild(point);
	//Convert the point's location back to pixels based on the width of the image
	point.style.marginLeft = (x*mapImage.offsetWidth/100-point.offsetWidth/2)+'px';
	point.style.marginTop = ((y-50)*mapImage.offsetWidth/100-point.offsetHeight/2)+'px';
};
//Removes the last point from the array as well as the page
function undoPoint(){
	points.pop();
	mapImage.removeChild(mapImage.childNodes[mapImage.childNodes.length-1])
}
//Selects the next group
function nextGroup(e){
	if(e){
		e.preventDefault();	//Prevent the context menu from displaying
	}
	group++;
	//Return the point data in the console after all of the points have been selected
	if(group >= groups){
		alert('Point data is now available.');
		console.log(JSON.stringify(points));
		group = 0;
	}
	//Changes to color of the points created whenever a new group is selected
	if(group%3 == 0){
		color = (3*group).toString()+','+(255-3*group).toString()+','+(255-3*group).toString();
	}else if(group%3 == 1){
		color = (255-3*group).toString()+','+(3*group).toString()+','+(3*group).toString();
	}else{
		color = (255-3*group).toString()+','+(255-3*group).toString()+','+(3*group).toString();
	}
};
//Returns to the previously selected group
function lastGroup(){
	group-=2;				//Decrement by 2 to correct for the increment when nextGroup is called
	nextGroup();
}

/*PROGRAM*/
//Add event listeners to map
mapImage.addEventListener('click', addPoint);
mapImage.addEventListener('contextmenu', nextGroup);
//Add listeners to buttons to remove points of return to the previous group
document.getElementsByTagName('button')[0].addEventListener('click', undoPoint);
document.getElementsByTagName('button')[1].addEventListener('click', lastGroup);
