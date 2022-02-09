let cells = [];
let buffer = "";
let row = 0;
let title;

const startTime = 1644296400000;
let diff = (new Date() - startTime)/(1000*60*60*24);
let todaysWord = words[Math.floor(diff)];

function bufferAdd(k) {
    if (buffer.length < 5) buffer += k;
    cells[row][buffer.length - 1].innerText = k;
}

function bufferDel() {
    cells[row][buffer.length - 1].innerText = '.';
    if (buffer.length > 0) buffer = buffer.slice(0, buffer.length - 1); 
}

function bufferCheck() {
    if (buffer.length != 5) return;

    let nCorrect = 0;

    for (let i = 0; i < 5; i++) {
        if (todaysWord[i] == buffer[i]) {
            cells[row][i].style.backgroundColor = "lightgreen";
            nCorrect++;
        } else if (todaysWord.indexOf(buffer[i]) > -1) {
            cells[row][i].style.backgroundColor = "khaki";
        } else cells[row][i].style.backgroundColor = "grey";
    }

    row++;
    buffer = "";
    if (row > 5) lose();
    if (nCorrect == 5) win();
}

function lose() {
    title.innerText = "Better luck next time!";
    window.onkeydown = () => {};
}

function win() {
    title.innerText = todaysWord;
    window.onkeydown = () => {};
}

window.onload = () => {
    for (let i = 0; i < 6; i++) {
        cells.push([]);
        for (let j = 0; j < 5; j++) {
            cells[i].push(document.getElementById("b" + j + i));
        }
    }

    title = document.getElementById("title");
}

window.onkeydown = e => {
    if (e.key >= 'a' && e.key <= 'z')
        bufferAdd(e.key);
    else if (e.key == "Backspace")
        bufferDel();
    else if (e.key == "Enter")
        bufferCheck();
}
