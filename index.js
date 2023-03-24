import {data} from "./data.js";

// console.log(Object.keys(data));


// var troopNode = document.createElement("div");
// troopNode.innerHTML = "hello";
// troopNode.className = "troop";
// document.getElementById("troops").appendChild(troopNode);






// var troopNode = document.createElement("div");
// troopNode.className = "troop";

// var troopName = document.createElement("p");
// troopName.innerHTML = "test";

// var troopCost = document.createElement("p");
// troopCost.innerHTML = "300";

// troopNode.appendChild(troopName);
// troopNode.appendChild(troopCost);

// troops.appendChild(troopNode);

window.updateTroopLists = updateTroopLists;
window.calculate = calculate;
window.generate = generate;
window.copy = copy;

var categories = Object.keys(data);


// Generate and populate the troop tables.
for(var iCategory = 0; iCategory < categories.length; iCategory++){
	
	var table = document.getElementById(categories[iCategory].concat("Troops"));
	var names = Object.keys(data[categories[iCategory]]);
	
	for(var iName = 0; iName < names.length; iName++){
		var name = document.createElement("p");
		
		var nameString = names[iName].replaceAll("-", " ");
		
		var parts = nameString.split(" ");
		
		var buff = "";
		for(var i = 0; i < parts.length; i++){
			buff = buff.concat(parts[i][0].toUpperCase() + parts[i].substring(1));
			buff += " ";
		}
		
		name.innerHTML = buff;
		
		var cost = document.createElement("p");
		cost.innerHTML = data[categories[iCategory]][names[iName]].cost;
		
		var hp = document.createElement("p");
		hp.innerHTML = data[categories[iCategory]][names[iName]].hp;
		
		var troopCount = document.createElement("input");
		troopCount.setAttribute("type", "number")
		troopCount.id = names[iName].concat("Count");
		troopCount.setAttribute("onChange", "calculate()");
		troopCount.style.margin = "8px";
		troopCount.defaultValue = 0;
		troopCount.min = 0;
		
		table.appendChild(name);
		table.appendChild(cost);
		table.appendChild(hp);
		table.appendChild(troopCount);
	}
}

updateTroopLists();
function updateTroopLists(){
	
	var checks = [];
	for(var i = 0; i < categories.length; i++){
		var category = categories[i];
		checks = checks.concat(document.getElementById(category).checked);
	}
	
	// console.log(checks.toString())
	
// Check if table should be hidden or not.
	for(var i = 0; i < checks.length; i++){
		var searchString = categories[i];
		
		// console.log(searchString);
		
		var table = document.getElementsByClassName(searchString);
		if(checks[i]){
			table[0].style.display = "block";
		}else{
			table[0].style.display = "none";
		}
	}
}

function calculate(){
	
	// document.getElementById("total").innerHTML = document.getElementById("clubberCount").value;
	
	var totalCost = 0;
	var totalHp = 0;
	var totalTroops = 0;
	for(var iCategory = 0; iCategory < categories.length; iCategory++){
		var troops = Object.keys(data[categories[iCategory]]);
		for(var iTroop = 0; iTroop < troops.length; iTroop++){
			var countString = troops[iTroop].concat("Count");
			var count = document.getElementById(countString).value;
			var cost = data[categories[iCategory]][troops[iTroop]].cost;
			var hp = data[categories[iCategory]][troops[iTroop]].hp;
			
			totalCost += count*cost;
			totalHp += count*hp;
			totalTroops += count*1;
		}
	}
	document.getElementById("total").innerHTML = totalCost;
	document.getElementById("hp").innerHTML = totalHp;
	document.getElementById("troopCount").innerHTML = totalTroops;
}

function generate(){
	var message = "";
	for(var iCategory = 0; iCategory < categories.length; iCategory++){
		var troops = Object.keys(data[categories[iCategory]]);
		for(var iTroop = 0; iTroop < troops.length; iTroop++){
			var name = troops[iTroop];
			var count = document.getElementById(troops[iTroop].concat("Count")).value;
			if(count !== "0"){
				message += "(" + name + ":" + count + ") ";
			}
		}
	}
	document.getElementById("output").innerHTML = message;
	
}

function copy(){
	var message = document.getElementById("output").innerHTML;
	navigator.clipboard.writeText(message);
}
