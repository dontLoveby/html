// File v0.2.2
// revise 100
// 游戏数据
var gameData = {
	width: 10,
	height: 10,
	blank: " ^",
	door: "门",
	wall1: "墙",
	playerX: 3,
	playerY: 3,
	playerWorldX: 0,
	playerWorldY: 0,
	world : {},
	enemy : function(x = 4, y = 5) {
		return {
			text : "敌",
			X : x,
			Y : y
		}
	},
	anywall : function(x = 0, y = 0, wallstr = "墙") {
		return {
			text : wallstr,
			X : x,
			Y : y
		}
	},
	enemies : [],
	walls : []
};
const duration = 1; // 倒计时时长，单位为秒
const displayElement = document.getElementById("timer1"); // 用于显示计时器的元素
const timer = countdownTimer(duration, displayElement);
timer.start();
// 创建敌人
gameData.enemies.push(gameData.enemy());

// 游戏界面
var gameBoard = document.getElementById('game-board');

// 生成世界
function generateWorld() {
	var board = '';
	for (var y = 0; y < gameData.height; y++) {
		for (var x = 0; x < gameData.width; x++) {
			var isPlayer = x === gameData.playerX && y === gameData.playerY;
			var isEnemy = gameData.enemies.some(function(enemy) {
				return enemy.X === x && enemy.Y === y;
			});
			var isWall = gameData.walls.some(function(wall) {
				return wall.X === x && wall.Y === y;
			});
		}
	}
	// 生成世界的逻辑
}

// 更新游戏界面
function updateGameBoard() {
	var board = '';
	// document.getElementById("debug").textContent = "timer=" + timer.getValue();
	for (var y = 0; y < gameData.height; y++) {
		for (var x = 0; x < gameData.width; x++) {
			var isPlayer = x === gameData.playerX && y === gameData.playerY;
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
					board += gameData.blank;
				}
			}
		}
		board += '\n';
	}
	var value = timer.getValue();
	if (value === 0) {
		for (var i = 0; i < gameData.enemies.length; i++) {
			do {
				var randomInt = Math.floor(Math.random() * 5);// 随机0~4
				var X = gameData.enemies[i].X;
				var Y = gameData.enemies[i].Y;
				if (randomInt === 0 && !isPositionOccupied(X + 1, Y) && !isLeaveedge(X + 1, Y))
					X += 1;
				else if (randomInt === 1 && !isPositionOccupied(X - 1, Y) && !isLeaveedge(X - 1, Y))
					X -= 1;
				else if (randomInt === 2 && !isPositionOccupied(X, Y + 1) && !isLeaveedge(X, Y + 1))
					Y += 1;
				else if (randomInt === 3 && !isPositionOccupied(X, Y - 1) && !isLeaveedge(X, Y - 1))
					Y -= 1;
				}while (X === gameData.playerX || Y === gameData.playerY);
			gameData.enemies[i].X = X;
			gameData.enemies[i].Y = Y;
		}
		timer.restart();
	}
	gameBoard.textContent = board;
}

// 监听键盘事件
document.addEventListener('keyup', function(event) {
	// 打印当前按下按键
	console.log(event.key);
	switch (event.key) {
		case ("a"):
		case ("ArrowLeft"): { // 左箭头键
			var newX = gameData.playerX - 1;
			var newY = gameData.playerY;

			if (!isPositionOccupied(newX, newY) && !isLeaveedge(newX, newY)) {
				gameData.playerX = newX;
				gameData.playerWorldX -= 1;
			}
			break;
		}
		case ("w"):
		case ("ArrowUp"): { // 上箭头键
			var newX = gameData.playerX;
			var newY = gameData.playerY - 1;

			if (!isPositionOccupied(newX, newY) && !isLeaveedge(newX, newY)) {
				gameData.playerY = newY;
				gameData.playerWorldY -= 1;
			}
			break;
		}
		case ("d"):
		case("ArrowRight"): { // 右箭头键
			var newX = gameData.playerX + 1;
			var newY = gameData.playerY;

			if (!isPositionOccupied(newX, newY) && !isLeaveedge(newX, newY)) {
				gameData.playerX = newX;
				gameData.playerWorldX += 1;
			}
			break;
		}
		case ("s"):
		case("ArrowDown"): { // 下箭头键
			var newX = gameData.playerX;
			var newY = gameData.playerY + 1;

			if (!isPositionOccupied(newX, newY) && !isLeaveedge(newX, newY)) {
				gameData.playerY = newY;
				gameData.playerWorldY += 1;
			}
			break;
		}
	}

	updateGameBoard();
});

// 判断是否南开边缘
function isLeaveedge(x = 0, y = 0) {
	if (x >= gameData.width || x < 0 || y >= gameData.height || y < 0) {
		return true;
	}
	else {
		return false;
	}
}

// 判断位置是否被占用
function isPositionOccupied(x, y) {
	if (x === gameData.playerX && y === gameData.playerY) {
		return true;
	}
	if (isLeaveedge(x, y)) {
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
setInterval(updateGameBoard, 200);

