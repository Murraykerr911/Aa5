let week = 1;
let year = 2026;

let weeklyProfit = 0;
let weeklyLoss = 0;

let player = {};

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

function endWeek() {
    week++;

    // YEAR SYSTEM (52 weeks = new year)
    if (week > 52) {
        week = 1;
        year++;
    }

    // income & loss system
    let profit = Math.floor(Math.random() * 80) + (player.level * 10);
    let loss = Math.floor(Math.random() * 40);

    player.cash += (profit - loss);

    weeklyProfit = profit;
    weeklyLoss = loss;

    // reset energy
    energy = 100;

    // update UI
    updateUI();

    // show popup
    document.getElementById("profitLossText").innerText =
        weeklyLoss + " | " + weeklyProfit;

    document.getElementById("weekPopup").style.display = "flex";

    // update week display if it exists
    if (document.getElementById("weekDisplay")) {
        document.getElementById("weekDisplay").innerText =
            "Week " + week + ", " + year;
    }
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

function startCareer() {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("careerScreen").style.display = "block";

    player = {
        name: document.getElementById("nameInput").value,
        cash: 100,
        fame: 0,
        level: 1
    };

    localStorage.setItem("playerData", JSON.stringify(player));
}
function saveCharacter() {

    const input = document.getElementById("nameInput");

    const playerName = input.value;

    if (playerName.trim() === "") {
        alert("Enter a name");
        return;
    }

    document.getElementById("playerName").textContent = playerName;

    document.getElementById("characterPopup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startCareerBtn").addEventListener("click", startCareer);
});

document.getElementById("closeWeekBtn").addEventListener("click", function () {
    document.getElementById("weekPopup").style.display = "none";
});
