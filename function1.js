// 计时器
function countdownTimer(duration = 3, displayElement) {
    let timer = duration;
    let intervalId;
    let text = displayElement.textContent;
    const startTimer = () => {
        clearInterval(intervalId); // 清除之前的定时器
        intervalId = setInterval(() => {
            const minutes = Math.floor(timer / 60)//.toString().padStart(2, '0');
            const seconds = (timer % 60)//.toString().padStart(2, '0');
            displayElement.textContent = text + "=" + (minutes * 60 + seconds);
            if (--timer <= 0) {
                clearInterval(intervalId);
                //displayElement.textContent = "Time's up!";
            }
        }, 1000);
        };
    const stopTimer = () => {
        clearInterval(intervalId);
    };
    const getValue = () => {
        return timer;
    };
    const restartTimer = () => {
        timer = duration; // 重置计时器数值
        startTimer(); // 开始计时
    };
    return {
        start: startTimer,
        stop: stopTimer,
        restart: restartTimer,
        getValue: getValue
    };
}
// 改变文本颜色
function changeColor(id = "game-board", index = 0, color = "red") {
    var textElement = document.getElementById(id);
    var text = textElement.innerHTML;
    if (index >= 0 && index < text.length) {
        var newText = text.substring(0, index) + '<span style="color: ' + color + ';">' + text.charAt(index) + '</span>' + text.substring(index + 1);
        textElement.innerHTML = newText;
    }
}