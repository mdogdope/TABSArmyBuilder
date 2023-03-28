import {data} from "./data.js";

window.updateTroopLists = updateTroopLists;
window.calculate = calculate;
window.generate = generate;
window.copy = copy;
window.minus = minus;
window.plus = plus;
window.setLimit = setLimit;

var categories = Object.keys(data);


// Generate and populate the troop tables.
for(var iCategory = 0; iCategory < categories.length; iCategory++){
	
	var table = document.getElementById(categories[iCategory].concat("Troops"));
	var names = Object.keys(data[categories[iCategory]]);
	
	for(var iName = 0; iName < names.length; iName++){
		var name = document.createElement("p");
		name.className = "tooltip";
		
		var nameString = names[iName].replaceAll("-", " ");
		var parts = nameString.split(" ");
		
		var buff = "";
		for(var i = 0; i < parts.length; i++){
			buff = buff.concat(parts[i][0].toUpperCase() + parts[i].substring(1));
			buff += " ";
		}
		
		name.innerHTML = buff;
		
		var tooltipText = document.createElement("img");
		tooltipText.className = "tooltiptext";
		tooltipText.src = "images/" + names[iName] + ".webp";
		
		name.appendChild(tooltipText);
		
		var cost = document.createElement("p");
		cost.innerHTML = data[categories[iCategory]][names[iName]].cost;
		
		var hp = document.createElement("p");
		hp.innerHTML = data[categories[iCategory]][names[iName]].hp;
		
		var selector = document.createElement("div");
		selector.className = "selector"
		
		var btnMinus = document.createElement("button");
		btnMinus.setAttribute("onclick", "minus(this.parentElement)");
		btnMinus.className = "minus";
		btnMinus.disabled = true;
		btnMinus.id = categories[iCategory] + "-" + names[iName] + "Minus"
		btnMinus.innerHTML = "-";
		
		var troopCount = document.createElement("input");
		troopCount.setAttribute("type", "number");
		troopCount.setAttribute("onchange", "calculate()");
		troopCount.id = names[iName].concat("Count");
		troopCount.min = 0;
		troopCount.value = 0;
		
		var btnPlus = document.createElement("button");
		btnPlus.setAttribute("onclick", "plus(this.parentElement)");
		btnPlus.className = "plus";
		btnPlus.id = categories[iCategory] + "-" + names[iName] + "Plus"
		btnPlus.innerHTML = "+";
		
		selector.appendChild(btnMinus);
		selector.appendChild(troopCount);
		selector.appendChild(btnPlus);
		
		
		table.appendChild(name);
		table.appendChild(cost);
		table.appendChild(hp);
		table.appendChild(selector);
	}
}

updateTroopLists();
function updateTroopLists(){
	
	var checks = [];
	for(var i = 0; i < categories.length; i++){
		var category = categories[i];
		checks = checks.concat(document.getElementById(category).checked);
	}
	
// Check if table should be hidden or not.
	for(var i = 0; i < checks.length; i++){
		var searchString = categories[i];
		
		var table = document.getElementsByClassName(searchString);
		if(checks[i]){
			table[0].style.display = "block";
		}else{
			table[0].style.display = "none";
		}
	}
}

function minus(parent){
	var count = parent.querySelector("input");
	if(count.value > 0){
		count.value--;
	}
	
	if(count.value <= 0){
		parent.querySelector(".minus").disabled = true;
	}
	
	calculate();
	setLimit();
	updateRemaining();
}

function plus(parent){
	var count = parent.querySelector("input");
	count.value++;
	parent.querySelector(".minus").disabled = false;
	calculate();
	setLimit();
	updateRemaining();
}

function calculate(){
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
	setLimit();
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


setLimit();
function setLimit(){
	var limit = document.getElementById("limit").value;
	var total = document.getElementById("total").innerHTML;
	
	document.getElementById("remaining").innerHTML = Math.abs(limit - total);
	
	if(limit - total < 0){
		document.getElementById("remaining-label").innerHTML = "Over:";
	}else{
		document.getElementById("remaining-label").innerHTML = "Remaining:"
	}
	updateRemaining();
}

function updateRemaining(){
	var totalLeft = Number(document.getElementById("remaining").innerHTML);
	
	for(var iCategory = 0; iCategory < categories.length; iCategory++){
		var troops = Object.keys(data[categories[iCategory]]);
		for(var iTroop = 0; iTroop < troops.length; iTroop++){
			var cost = data[categories[iCategory]][troops[iTroop]].cost;
			
			if(cost > totalLeft){
				document.getElementById(categories[iCategory] + "-" + troops[iTroop] + "Plus").disabled = true;
			}else{
				document.getElementById(categories[iCategory] + "-" + troops[iTroop] + "Plus").disabled = false;
			}
		}
	}
	
}