import json
import os

# dataOld = {}

# dataOld["tribal"] = {"clubber": 70, "protector": 80, "spear-thrower": 120, "stoner": 160, "bone-mage": 300, "chieftain": 400, "mammoth": 2200}

# dataOld["farmer"] = {"halfing": 50, "farmer": 80, "hay-baler": 140, "potionseller": 340, "harvester": 500, "wheelbarrow": 1000, "scarecrow": 1200}

# dataOld["medieval"] = {"bard": 60, "squire": 100, "archer": 140, "healer": 180, "knight": 650, "catapult": 1000, "the-king": 1500}

# dataOld["ancient"] = {"shield-bearer": 100, "sarissa": 120, "hoplite": 180, "snake-archer": 300, "ballista": 900, "minotaur": 1600, "zeus": 2000}


categories = ["tribal", "farmer", "medieval", "ancient", "viking", "dynasty", "renaissance", "pirate", "spooky", "wild-west", "legacy", "fantasy-good", "fantasy-evil", "secret"]


data = {}

for category in categories:
	data[category] = {}
	count = 0
	while(True):
		count += 1
		print(category + ": " + str(count))
		name = input("Name:")
		if(name == "end"):
			break;
		cost = input("Cost:")
		hp = input("HP:")
		
		print("==============")
		
		data[category][name] = {"cost": cost, "hp": hp}
	
	print("\n=========")
	print("New Era")
	print("=========\n")
		

jsonObj = json.dumps(data, indent=4)

print(jsonObj)

with open("data.json", "w") as file:
    file.write(jsonObj)
