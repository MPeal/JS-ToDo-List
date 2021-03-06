var todos = []; //the array of to-do item objects

function findFocus() //finds which element is current in-focus
{
	var active = document.activeElement;
	var focus = active.id;
	return focus;	
}

//allows a to-do item to be added/removed just by pressing enter
document.addEventListener('keyup',function(e){
    if(e.keyCode === 13)
	{
		if(findFocus() == "toggleButton")
		{
			toggleAll();
		}
		else if(findFocus() == "removeButton")
		{
			clearToDos();
		}
		else if(document.getElementById("todo").value.length != 0)
		{
			addToDo();
		}
	}
});

function addToDo()
{
	var todo = {};
	todo.content = document.getElementById("todo").value;
	todo.completed = false;
	todos.push(todo);
	document.getElementById("todo").value = "";
	displayList();
}

function changeToDo(position, newToDo)
{
	todos[position] = newToDo;
}

function removeToDo(position)
{
	var i = position;
	todos.splice(i, 1);
	displayList();
}

function clearToDos()
{
	todos = [];
	displayList();
}

function completeToDo(index)
{
	todos[index].completed = true;
	var item = document.getElementById("item"+index);
	console.log(item);
	item.removeChild(item.childNodes[1]); //the delete button
	item.removeChild(item.childNodes[2]); //the complete button AFTER the delete button is gone
	displayList();
}

function completeBlue(index)
{
	document.getElementById("complete"+index).style.color="blue";
}

function displayList()
{
	//reset "disp" div to blank each time
	document.getElementById("disp").innerHTML = "";
	
	//if there are no todos, display that info as a message
	if(todos.length === 0)
	{
		document.getElementById("disp").innerHTML = "<br>You have no items in your to-do list!";
	}
	
	//THE BELOW CODE ADDS ELEMENTS THROUGH 'APPENDCHILD()' FUNCTIONS
	//for each todo in the array
	for(var i=0; i<todos.length; i++)
	{
		var todo = todos[i];
		var list = document.querySelector("ol"); //the parent list
		var item = document.createElement("li"); //each individual to-do item
		item.id = "item"+i;
		item.className = "list";
		item.textContent = todo.content;
		list.appendChild(item); //adds the item to the list
		
		if(todo.completed == true) //if the item is completed, put a slash through it
		{
			document.getElementById("item"+i).style.textDecoration = "line-through";
		}
		
		//if the todos aren't completed, display them with corresponding 'complete' and 'delete' buttons
		if(todo.completed == false)
		{
			item.innerHTML += "  ";
			item.appendChild(this.createDelete(i));
			item.innerHTML += "  ";
			item.appendChild(this.createComplete(i));
		}
		//else, if the task is complete, there should be no 'complete' or 'delete' button
		
		//disp.innerHTML += "<br>"; //gives some padding between each to-do item
	}
	
	
	/*THE BELOW CODE ADDS ELEMENTS VIA EXPLICIT HTML.
	//for each todo element...
	for(var i=0; i < todos.length; i++)
	{
		var todo = todos[i];
		
		//if it's completed, display it with a slash through it...
		if(todo.completed == true)
		{
			document.getElementById("disp").innerHTML += "<s>"+(i+1)+". "+todo.content+"</s><br>";
		}
		else //else, display it along with its own complete "button" and a delete "button"
		{
			document.getElementById("disp").innerHTML += (i+1)+". "+todo.content+" <em class='complete' id='complete"+i+"' onclick='complete("+i+")' style='font-size:10px;'><u>Complete</u></em>  <em class='remove' id='remove"+i+"' onclick='removeToDo("+i+")' style='font-size:10px;'><u>Remove</u></em></br>";
		}
	}*/
}

function createDelete(index)
{
	/*var del = document.createElement("em");
	del.id = "delete"+index;
	del.textContent = "Delete";
	del.className = "deleteButton";
	del.setAttribute("onclick", "removeToDo("+index+")");
	return del;*/
	
	var del = document.createElement("img");
	del.id = "delete"+index;
	del.className = "deleteButton";
	del.setAttribute("onclick", "removeToDo("+index+")");
	del.setAttribute("onmouseover", "redX("+index+")");
	del.setAttribute("onmouseleave", "whiteX("+index+")");
	del.setAttribute("src", "white x.png");
	del.height = 20;
	del.width = 20;
	return del;
}

function redX(index)
{
	var x = document.getElementById("delete"+index);
	x.setAttribute("src", "redx.png");
}

function whiteX(index)
{
	var x = document.getElementById("delete"+index);
	x.setAttribute("src", "white x.png");
}

function createComplete(index)
{
	/*var comp = document.createElement("em");
	comp.textContent = "Complete";
	comp.className = "completeButton";
	comp.id = "complete"+index;
	comp.setAttribute("onclick", "completeToDo("+index+")");
	
	return comp;*/
	
	var comp = document.createElement("img");
	comp.className = "completeButton";
	comp.id = "completeButton"+index;
	comp.setAttribute("onclick", "completeToDo("+index+")");
	comp.setAttribute("onmouseover", "greenCheck("+index+")");
	comp.setAttribute("onmouseleave", "whiteCheck("+index+")");
	comp.setAttribute("src", "white checkmark.png");
	comp.height = 20;
	comp.width = 20;
	
	return comp;
}

function greenCheck(index)
{
	var x = document.getElementById("completeButton"+index);
	x.setAttribute("src", "greencheckmark.png");
}

function whiteCheck(index)
{
	var x = document.getElementById("completeButton"+index);
	x.setAttribute("src", "white checkmark.png");
}

function toggleAll() //this function sets all tasks to completed.  if all are completed, it sets all to incomplete.
{
	var completedCount = 0;
	//first, check if all are completed
	for(var i=0; i<todos.length; i++)
	{
		var todo = todos[i];
		if(todo.completed == true)
		{
			completedCount++;
		}
	}
	
	if(completedCount == todos.length) //if they're all completed, toggle all to incomplete
	{
		for(var i=0; i<todos.length; i++)
		{
			todos[i].completed = false;
		}
	}
	else //otherwise, if some aren't completed, toggle everything to completed
	{
		for(var i=0; i<todos.length; i++)
		{
			todos[i].completed = true;
		}
	}
	
	displayList();
}

/*function changeHeadColor()
{
	var rVal = Math.floor(Math.random()*255);
	var gVal = Math.floor(Math.random()*255);
	var bVal = Math.floor(Math.random()*255);
			
	document.getElementById("head").style.color="rgb("+rVal+","+gVal+","+bVal+")";
	var color = document.getElementById("head").style.color;
	console.log("Header color changed to: "+color);
}

function twinkleHead()
{
	var timer = setInterval(changeHeadColor, 500);
}*/
