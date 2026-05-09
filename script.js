// 🔢 GAME DATA
let money = 1000;
let energy = 100;
let week = 1;
let level = 1;

// 🎮 NAVIGATION (SWITCH SCREENS)
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById(screenId).classList.add('active');
}

// 📄 OPEN SUB PAGES (LIKE SONGS / ALBUMS)
function openPage(pageId) {
    showScreen(pageId);
}

// 📅 END WEEK SYSTEM
function endWeek() {
    week++;
    energy = 100;

    updateUI();
}

// 🔄 UPDATE UI VALUES
function updateUI() {
    document.querySelector('.money').innerText = "£" + money;
    document.querySelector('.energy').innerText = "⚡ " + energy;
    document.querySelector('.week').innerText = "Week " + week + ", 2026";
    document.querySelector('.level').innerText = "LVL." + level;
}

// 🎤 CREATE SONG SYSTEM
function createSong() {
    if (energy < 10) {
        alert("Not enough energy");
        return;
    }

    energy -= 10;

    let earnings = Math.floor(Math.random() * 500) + 100;
    money += earnings;

    let song = document.createElement("div");
    song.classList.add("card");
    song.innerText = "New Song Released • Earned £" + earnings;

    document.getElementById("songsList").appendChild(song);

    updateUI();
}

// 🚀 START GAME
updateUI();

// CHARACTER CREATOR

function saveCharacter() {

    let playerName = document.getElementById("nameInput").value;

    if (playerName.trim() === "") {
        alert("Please enter a name");
        return;
    }

    document.getElementById("playerName").innerText = playerName;

    document.getElementById("characterPopup").style.display = "none";
}
