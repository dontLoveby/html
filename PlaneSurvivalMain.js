// revise 100
// import countdownTimer from "./function1.js";
// 游戏基本信息
const 游戏基本信息 = {
	版本: "0.2.4",
	作者: "DontLoveBy",
	游戏名: "平面生存",
	游戏介绍: "这是一个平面生存的游戏，玩家需要生存下去，并探索这个世界。",
	游戏规则: "玩家可以通过移动来控制角色的移动，通过攻击来击败敌人，通过收集资源来升级自己的能力。",
	游戏目标: "生存下去，并探索这个世界。",
	游戏特色: "这是一个平面生存的游戏，玩家可以通过移动来控制角色的移动，通过攻击来击败敌人，通过收集资源来升级自己的能力。",
	游戏源码: "https://github.com/DontLoveBy/html"
};
// Basic information about the game
const basicInformation = {
	version: 游戏基本信息.版本,
	author: 游戏基本信息.作者,
	GameName: "planar survival",
	gameDescription: "It is a flat survival game where the player needs to survive and explore the world",
	gameRules: "Players can control their character s movement by moving defeat enemies by attacking and upgrade their abilities by gathering resources",
	GameGoal: "Survive and explore the world",
	gameCharacteristic: "It is a flat survival game where players can control the movement of their characters by moving defeat enemies by attacking and upgrade their abilities by gathering resources",
	gameSource: 游戏基本信息.游戏源码
};


// 游戏数据
var gameData = {
	window: {
		width: 15,
		height: 15,
		scale: 10,
		offsetX: 0,
		offsetY: 0,
		blank: " ^",
		door: "门",
		wall: "墙",
		playerX: 3,
		playerY: 3
	},
	enemy: function (x = 4, y = 5) {
		return {
			text: "敌",
			X: x,
			Y: y
		}
	},
	pushWall: function (x = 0, y = 0, wall_str = "墙") {
		return {
			text: wall_str,
			X: x,
			Y: y
		}
	},
	enemies: [],
	walls: [],
	world: {/*区块*/
		size: 10,// 已加载的区块数量
		playerWorldX: 0,
		playerWorldY: 0,
		hash: {/* 区块哈希表 */ },
		load: function (x, y) {// 加载区块
			var a = gameData.world.hash[x + "," + y];
			if (a === undefined) {// 区块未加载
				gameData.world.hash[x + "," + y] = a = gameData.world.size * gameData.world.size;
				for (var i = - gameData.world.size / 2; i < gameData.world.size / 2; i++) {
					for (var j = - gameData.world.size / 2; j < gameData.world.size / 2; j++) {
						var b = gameData.world.hash[i + "," + j];
						if (b === undefined) {
							gameData.world.hash[i + "," + j] = b = gameData.world.size * gameData.world.size;
							gameData.walls.push(gameData.pushWall(i, j));
							// gameData.walls.push(gameData.anyWall(i, j, "墙"));
							// gameData.walls.push(gameData.anyWall(i, j, "敌"));	
							// gameData.walls.push(gameData.anyWall(i, j, "门"));
						}
					}
				}
			}
		},
		push: function (x, y, name) {
			var a = gameData.world.hash[x + "," + y];
			if (a === undefined) {
				gameData.world.hash[x + "," + y] = a = gameData.world.size * gameData.world.size;
				for (var i = - gameData.world.size / 2; i < gameData.world.size / 2; i++) {
					for (var j = - gameData.world.size / 2; j < gameData.world.size / 2; j++) {
						var b = gameData.world.hash[i + "," + j];
						if (b === undefined) {
							gameData.world.hash[i + "," + j] = b = gameData.world.size * gameData.world.size;
							gameData.walls.push(gameData.pushWall(i, j, name));
						}
					}
				}
			}
		}
	}
};
const duration = 1; // 倒计时时长，单位为秒
const displayElement = document.getElementById("timer1"); // 用于显示计时器的元素
const gameTimeDuration = 0.1;
const timer = countdownTimer(duration, displayElement);
const gameTimerDisplayElement = document.getElementById("timer2"); // 用于显示游戏时长的元素
const gameTimer = countdownTimer(0.1, displayElement);
gameTimer.start(); // 开始游戏计时器
timer.start();
// 创建敌人
gameData.enemies.push(gameData.enemy());

// 根据游戏时长计算当前游戏刻的函数
function getGameTick() {
	return Math.floor(gameTimer.getValue() / gameTimeDuration);
}
// 是否在移动
var moving = false;
// 上一个移动中的游戏刻
var lastMove = 0;

// 游戏界面
var gameBoard = document.getElementById('game-board');

// 生成世界
function generateWorld() {
	var board = '';
	for (var i = 0; i < gameData.window.height; i++) {
		for (var x = 0; x < gameData.window.width; x++) {
			var isPlayer = x === gameData.window.playerX && i === gameData.window.playerY;
			var isEnemy = gameData.enemies.some(function (enemy) {
				return enemy.X === x && enemy.Y === i;
			});
			var isWall = gameData.window.walls.some(function (wall) {
				return wall.X === x && wall.Y === i;
			});
		}
	}
	// 生成世界的逻辑
	for (var i = - gameData.world.size / 2, a = 0; i < gameData.world.size / 2; i++) {
		for (var j = - gameData.world.size / 2; j < gameData.world.size / 2; j++, a++) {
			gameData.world.hash[i + "," + j] = a;
		}
	}
}

// 更新游戏界面
function updateGameBoard() {
	var board = '';
	// document.getElementById("debug").textContent = "timer=" + timer.getValue();
	for (var y = 0; y < gameData.window.height; y++) {
		for (var x = 0; x < gameData.window.width; x++) {
			var isPlayer = x === gameData.window.playerX && y === gameData.window.playerY;
			var isEnemy = false;
			var enemyText = "敌";

			for (var i = 0; i < gameData.enemies.length; i++) {
				if (x === gameData.enemies[i].X && y === gameData.enemies[i].Y) {
					isEnemy = true;
					enemyText = gameData.enemies[i].text;
				}
				if (isPlayer) {
					board += '你';
				} else if (isEnemy) {
					board += enemyText;
				} else {
					board += gameData.window.blank;
				}
			}
		}
		board += '\n';
	}
	var value = timer.getValue();
	if (value === 0) {
		for (var i = 0; i < gameData.enemies.length; i++) {// 敌人移动
			var X = gameData.enemies[i].X;
			var Y = gameData.enemies[i].Y;
			var playerX = gameData.window.playerX;
			var playerY = gameData.window.playerY;
			if (X - playerX <= 3 || X - playerX >= -3 || Y - playerY <= 3 || Y - playerY >= -3) {
				if (isPositionOccupied(X + 1, Y) && isLeaveEdge(X + 1, y) && (X + 1 - playerX < 3 || X + 1 - playerX > -3))
					X += 1;
				else if (isPositionOccupied(X - 1, Y) && isLeaveEdge(X - 1, y) && (X - 1 - playerX < 3 || X - 1 - playerX > -3))
					X -= 1;
				else if (isPositionOccupied(X, Y + 1) && isLeaveEdge(X, Y + 1) && (Y + 1 - playerY < 3 || Y + 1 - playerY > -3))
					Y += 1;
				else if (isPositionOccupied(X, Y - 1) && isLeaveEdge(X, Y - 1) && (Y - 1 - playerY < 3 || Y - 1 - playerY > -3))
					Y -= 1;
			} else
				do {
					var randomInt = Math.floor(Math.random() * 5);// 随机0~4
					if (randomInt === 0 && !isPositionOccupied(X + 1, Y) && !isLeaveEdge(X + 1, Y))
						X += 1;
					else if (randomInt === 1 && !isPositionOccupied(X - 1, Y) && !isLeaveEdge(X - 1, Y))
						X -= 1;
					else if (randomInt === 2 && !isPositionOccupied(X, Y + 1) && !isLeaveEdge(X, Y + 1))
						Y += 1;
					else if (randomInt === 3 && !isPositionOccupied(X, Y - 1) && !isLeaveEdge(X, Y - 1))
						Y -= 1;
				} while (X === gameData.window.playerX || Y === gameData.window.playerY);// 如果敌人移动到玩家位置，重新生成位置
			gameData.enemies[i].X = X;
			gameData.enemies[i].Y = Y;
		}
		timer.restart();// 重置计时器
	}
	gameBoard.textContent = board;
}

// 监听键盘事件
document.addEventListener("keypress", function (event) {
	// 打印当前按下按键
	console.log(event.key);
	moving = true;
	// 处理按键事件
	// if (getGameTick() - lastMove >= 2) {
	switch (event.key) {
		// 每两个时间刻（0.2s）最多移动一格
		case ("a"):
		case ("ArrowLeft"): { // 左箭头键
			var newX = gameData.window.playerX - 1;
			var newY = gameData.window.playerY;
			if (!isPositionOccupied(newX, newY) && !isLeaveEdge(newX, newY)) {
				gameData.window.playerX = newX;
				gameData.playerWorldX -= 1;
			}
			break;
		}
		case ("w"):
		case ("ArrowUp"): { // 上箭头键
			var newX = gameData.window.playerX;
			var newY = gameData.window.playerY - 1;
			if (!isPositionOccupied(newX, newY) && !isLeaveEdge(newX, newY)) {
				gameData.window.playerY = newY;
				gameData.playerWorldY -= 1;
			}
			break;
		}
		case ("d"):
		case ("ArrowRight"): { // 右箭头键
			var newX = gameData.window.playerX + 1;
			var newY = gameData.window.playerY;
			if (!isPositionOccupied(newX, newY) && !isLeaveEdge(newX, newY)) {
				gameData.window.playerX = newX;
				gameData.playerWorldX += 1;
			}
			break;
		}
		case ("s"):
		case ("ArrowDown"): { // 下箭头键
			var newX = gameData.window.playerX;
			var newY = gameData.window.playerY + 1;
			if (!isPositionOccupied(newX, newY) && !isLeaveEdge(newX, newY)) {
				gameData.window.playerY = newY;
				gameData.playerWorldY += 1;
			}
			break;
		}
	}
	// lastMove = getGameTick();
	// }

	updateGameBoard();
});

// document.addEventListener("keyup", function (event) {
// 	switch (event) {
// 		case ("a"):
// 		case ("ArrowLeft"):
// 		case ("w"):
// 		case ("ArrowUp"):
// 		case ("d"):
// 		case ("ArrowRight"):
// 		case ("s"):
// 		case ("ArrowDown"): {
// 			moving = false;
// 			break;
// 		}
// 	}
// })

// 判断是否南开边缘
function isLeaveEdge(x = 0, y = 0) {
	if (x >= gameData.window.width || x < 0 || y >= gameData.window.height || y < 0) {
		return true;
	}
	else {
		return false;
	}
}

// 判断位置是否被占用
function isPositionOccupied(x, y) {
	if (x === gameData.window.playerX && y === gameData.window.playerY) {
		return true;
	}
	if (isLeaveEdge(x, y)) {
		return false;
	}
	for (var i = 0; i < gameData.enemies.length; i++) {
		if (x === gameData.enemies[i].X && y === gameData.enemies[i].Y) {
			return true;
		}
	}

	return false;
}

// 初始化游戏界面
updateGameBoard();

// 每隔0.2秒渲染界面
setInterval(updateGameBoard, 1);

