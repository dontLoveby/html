
// 定义游戏状态和开始场景
let gameState = "explore";
let playerInventory = {
	apple: 2,
	banana: 0,
	length: 2,
	language: "Chinese",
	texList: ["苹果", "香蕉"],
	textListE: ["apple", "banana"],
	text: function () {
		var list = this.textListE;
		var text = "";
		console.log(list);
		for (var i = 0; i < length; i++) {
			if (this[list[i]] > 0)
				text += textlist[i];
		}
		if (text === "") return "无";
		return text;
	}
};

let playerHealth = 100;
let upperlimitHealth = 100;
let playerPhysical = 1000;//体力
let upperlimitPhysical = 1000;
let playerHunger = 100;//饥饿度
let upperlimithunger = 100;

let state = 1;
let value;
let buttonText = "";
let oldButtonText = "";
let infoName = { choice1: "探索：", choice2: "休息：" };
const duration = 2; // 倒计时时长，单位为秒
const displayElement = document.getElementById("timer"); // 用于显示计时器的元素
const timer = countdownTimer(duration, displayElement);
//const button1 = document.getElementById("choice1");

function getButtonText(event) {
	// 获取当前按下的按钮元素
	var button = event.target;
	oldButtonText = buttonText;
	// 获取当前按钮的文本
	buttonText = button.innerText;
	// 打印按钮文本
	console.log(buttonText);
}

// 函数：处理选择1
const handleChoice1 = () => {
	//const min = 1;
	//生成0~5随机整数
	const max = 8;
	const randomInt = Math.floor(Math.random() * (max + 1));
	updateTimer();
	if (/*playerHunger >= -25 && playerPhysical >= 114*/1) {
		// 处理场景中选择1的结果
		/*if (gameState === "start") {
		  document.getElementById("game-text").innerHTML = "你决定外出探索。</p>";
		  gameState = "explore";
		} else */
		if (randomInt === 0) {
			document.getElementById("game-text").innerHTML = "你找到了一些蜂蜜，恢复了体力、饥饿度！</p>";
			playerHunger += 15;
			playerPhysical += 200;
			//gameState = "start";
		} else if (randomInt === 1) {
			document.getElementById("game-text").innerHTML = "你找到了一棵苹果树！</p>";
			playerInventory.apple += Math.floor(Math.random() * (2 + 1)) + 1;
			//gameState = "start";
		} else if (randomInt === 2) {
			document.getElementById("game-text").innerHTML = "你摘到到了一棵香蕉！</p>";
			playerInventory.banana++;
		} else if (randomInt === 3) {
			document.getElementById("game-text").innerHTML = "你摘到到了一个苹果！</p>";
			playerInventory.apple++;
		} else if (randomInt <= 6) {
			document.getElementById("game-text").innerHTML = "你被小草划伤！</p>";
			playerHealth -= 3;
		} else {
			document.getElementById("game-text").innerHTML = "你什么都没找到！</p>";
			//gameState = "start";
		}
		if (gameState === "explore") {
			playerPhysical -= 114;
			playerHunger -= 3;
			if (playerHealth > upperlimitHealth) {
				playerHealth = upperlimitHealth;
			}
			if (playerHunger > upperlimithunger) {
				playerHunger = upperlimithunger;
			}
		}
	} else {
		document.getElementById("game-text").innerHTML = "体力或饥饿度不足!</p>"
	}
	updatePlayerInfo();
};

// 函数：处理选择2
const handleChoice2 = () => {
	// 处理场景中选择2的结果
	updateTimer();
	document.getElementById("game-text").innerHTML = "你休息得很好，恢复了健康！</p>";
	playerHealth += playerHunger / 15 - 3;
	playerHunger -= 10;
	playerPhysical = upperlimitPhysical + playerHunger - 95;
	if (playerHealth > upperlimitHealth) {
		playerHealth = upperlimitHealth;
	}
	updatePlayerInfo();
};
const handleChoice3 = () => {
	// 处理场景中选择3的结果
	//Choose1.style.display = 'block';
	//Choose2.style.display = 'block';
	//Choose3.style.display = 'block';
	updateTimer();
	switch (oldButtonText) {
		case "苹果": {
			if (playerInventory.apple >= 1) {
				playerInventory.apple -= 1;
				playerHunger += 14;
				playerPhysical += 180;
				document.getElementById("game-text").innerHTML = " 进食了一颗苹果，饥饿度+14，体力+180.</p>"
			}
			break;
		}
		case "香蕉": {
			if (playerInventory.banana >= 1) {
				playerInventory.banana -= 1;
				playerHunger += 22;
				playerPhysical += 150;
				document.getElementById("game-text").innerHTML = " 进食了一条香蕉，饥饿度+22，体力+150.</p>"
			}
			break;
		}
	}
	//Choose1.style.display = 'none';
	//Choose2.style.display = 'none';
	//Choose3.style.display = 'none';
	updatePlayerInfo();
}

const handleFood2 = () => {
	updatePlayerInfo();
	if (playerInventory["banana"] >= 1) {
		document.getElementById("game-text").innerHTML = " 选择了一条香蕉，按下“进食”进行食用</p>"
	} else {
		document.getElementById("game-text").innerHTML = " 抱歉，您还没有香蕉</p>"
	}
}
const handleFood1 = () => {
	updatePlayerInfo();
	if (playerInventory["apple"] >= 1) {
		document.getElementById("game-text").innerHTML = " 选择了一条苹果，按下“进食”进行食用</p>"
	} else {
		document.getElementById("game-text").innerHTML = " 抱歉，您还没有苹果</p>"
	}
}
// 函数：更新玩家信息
const updatePlayerInfo = () => {
	console.log(playerInventory.apple);
	console.log(playerInventory.banana);
	console.log(playerInventory.text());
	// console.log(playerInventory.list());
	document.getElementById("health").textContent = "健康值: " + playerHealth;
	document.getElementById("inventory").textContent = "物品: " + playerInventory.text();
	document.getElementById("physical").textContent = "体力值：" + playerPhysical + "/" + upperlimitPhysical;
	document.getElementById("hunger-levels").textContent = "饥饿度：" + playerHunger;
};

// 更新游戏状态
const updateGameInfo = () => {
	var a = 0;
	var b;
	var bl = buttonText.length;
	// let playerInventoryText = "";
	// eventbuttonText = options.innerText;
	value = timer.getValue(); // 获取计时器数值
	document.getElementById("debug").innerHTML = "timer=" + value;
	switch (value) {
		case 0: {
			b = document.getElementById("game-text").innerHTML.substring(0, b + 2);
			if (b === buttonText + ":" || b === "<p>" + buttonText.substring(0, bl - 1)) {
				a = bl + 1;
				if (document.getElementById("game-text").innerHTML.substring(0, bl + 1) === "<p>") {
					a += 3;
				} else {
					a += 0;
				}
			}
			/*if (document.getElementById("game-text").innerHTML.substring(1) === ":")
				document.getElementById("game-text").innerHTML = document.getElementById("game-text").innerHTML.substring(1, bl + 1);*/
			state = 1;
			break;
		}
		default:
			if (state === 1) {
				document.getElementById("game-text").innerHTML = buttonText + ":" + document.getElementById("game-text").innerHTML;
				state = 0;
			}
	}
	if (document.getElementById("game-text").innerHTML.substring(0, bl + 1) != "<p>") {
		document.getElementById("game-text").innerHTML = "<p>" + document.getElementById("game-text").innerHTML;
	}
}

const updateTimer = () => {
	state = 1;
	timer.restart(); //重新计时
}
// 获取按钮的引用
var Choose1 = document.getElementById('choose1');
var Choose2 = document.getElementById('choose2');
// 隐藏按钮
/*Choose1.style.display = 'none';2
Choose2.style.display = 'none';
Choose3.style.display = 'none';*/
// 开始计时器
timer.start()
const intervalId = setInterval(updateGameInfo, 100);
// 添加事件监听器
document.getElementById("choice1").addEventListener("click", handleChoice1);
document.getElementById("choice2").addEventListener("click", handleChoice2);
document.getElementById("choice3").addEventListener("click", handleChoice3);
document.getElementById("apple").addEventListener("click", handleFood1);
document.getElementById("banana").addEventListener("click", handleFood2);
