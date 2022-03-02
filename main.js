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
    if (buffer.length == 0) return
    cells[row][buffer.length - 1].innerText = '.';
    if (buffer.length > 0) buffer = buffer.slice(0, buffer.length - 1);
}

function setChar(s, i, c) {
    return s.slice(0, i) + c + s.slice(i+1, s.length);
}

function bufferCheck() {
    if (buffer.length != 5) return;
    if (words.indexOf(buffer) < 0) return;
    if (buffer == todaysWord) {
        win();
        return;
    }

    let nOccurences = {};
    for (const ch of todaysWord) {
        if (nOccurences.hasOwnProperty(ch))
            nOccurences[ch]++;
        else nOccurences[ch] = 1;
    }

    for (let i = 0; i < 5; i++) {
        cells[row][i].style.backgroundColor = 'grey';
        if (buffer[i] == todaysWord[i]) {
            nOccurences[buffer[i]]--;
            buffer = setChar(buffer, i, ' ');
            cells[row][i].style.backgroundColor = 'lightgreen';
        }
    }

    for (const key of Object.keys(nOccurences)) {
        for (; nOccurences[key] > 0; nOccurences[key]--) {
            if (buffer.indexOf(key) >= 0) {
                cells[row][buffer.indexOf(key)].style.backgroundColor = 'khaki';
                buffer = setChar(buffer, buffer.indexOf(key), ' ');
            }
        }
    }

    row++;
    buffer = ""
    if (row > 5) lose();
}

function lose() {
    title.innerText = todaysWord;
    window.onkeydown = () => {};
}

function win() {
    title.innerText = "Excellent!";
    for (let i = 0; i < 5; i++)
        cells[row][i].style.backgroundColor = 'lightgreen';
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
