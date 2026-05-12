// =======================
// 🎮 STAR EMPIRE DATA
// =======================

let money = 1000;
let energy = 100;

let week = 1;
let year = 2026;

let level = 1;

let weeklyProfit = 0;
let weeklyLoss = 0;

let weeklySalary = 100;
let songIncome = 0;
let expenses = 0;

// 👤 PLAYER
let player = {
    name: "Unnamed Star",
    fame: 0
};

// =======================
// 🔄 UPDATE UI
// =======================

function updateUI() {

    // MONEY
    document.querySelector(".money").innerText =
        "£" + money;

    // ENERGY
    document.querySelector(".energy").innerText =
        "⚡ " + energy;

    // WEEK
    document.querySelector(".week").innerText =
        "Week " + week + ", " + year;

    // LEVEL
    document.querySelector(".level").innerText =
        "LVL." + level;

    // PLAYER NAME
    document.getElementById("playerName").innerText =
        player.name;
}

// =======================
// 📱 SCREEN NAVIGATION
// =======================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId)
        .classList.add("active");
}

// =======================
// 📄 OPEN PAGE
// =======================

function openPage(pageId) {
    showScreen(pageId);
}

// =======================
// 📅 END WEEK SYSTEM
// =======================

function endWeek() {

    week++;

    // NEW YEAR
    if (week > 52) {
        week = 1;
        year++;
    }

    // RESET ENERGY
    energy = 100;

    // WEEKLY MONEY
    weeklyProfit =
        weeklySalary + songIncome;

    weeklyLoss =
        expenses;

    // UPDATE PLAYER MONEY
    money += (weeklyProfit - weeklyLoss);

    // UPDATE SUMMARY TEXT
    let summary =
        document.getElementById("profitLossText");

    if (summary) {

        summary.innerHTML = `
            Salary: +£${weeklySalary}<br>
            Song Income: +£${songIncome}<br>
            Expenses: -£${weeklyLoss}<br><br>

            <strong>
                Total: £${weeklyProfit - weeklyLoss}
            </strong>
        `;
    }

    // SHOW POPUP
    let popup =
        document.getElementById("weekPopup");

    if (popup) {
        popup.style.display = "flex";
    }

    // RESET SONG INCOME
    songIncome = 0;

    updateUI();
}
// =======================
// 🎤 CREATE SONG
// =======================

function createSong() {

    // ENERGY CHECK
    if (energy < 10) {

        alert("Not enough energy");

        return;
    }

    // USE ENERGY
    energy -= 10;

    // RANDOM EARNINGS
    let earnings =
        Math.floor(Math.random() * 500) + 100;

    money += earnings;

    // CREATE SONG CARD
    let song = document.createElement("div");

    song.classList.add("card");

    song.innerHTML = `
        <strong>New Song Released</strong><br>
        Earned £${earnings}
    `;

    document.getElementById("songsList")
        .appendChild(song);

    updateUI();
}

// =======================
// 👤 CHARACTER CREATOR
// =======================

function saveCharacter() {

    let input =
        document.getElementById("nameInput");

    let playerName =
        input.value;

    // EMPTY CHECK
    if (playerName.trim() === "") {

        alert("Enter a name");

        return;
    }

    // SAVE NAME
    player.name = playerName;

    // UPDATE UI
    updateUI();

    // HIDE POPUP
    document.getElementById("characterPopup")
        .style.display = "none";

    // SAVE DATA
    localStorage.setItem(
        "starEmpirePlayer",
        JSON.stringify(player)
    );
}

// =======================
// 💾 LOAD SAVE
// =======================

function loadGame() {

    let savedPlayer =
        localStorage.getItem("starEmpirePlayer");

    if (savedPlayer) {

        player =
            JSON.parse(savedPlayer);

        document.getElementById("characterPopup")
            .style.display = "none";
    }

    updateUI();
}

// =======================
// ❌ CLOSE WEEK POPUP
// =======================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        let closeBtn =
            document.getElementById("closeWeekBtn");

        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                function () {

                    document.getElementById("weekPopup")
                        .style.display = "none";
                }
            );
        }

        loadGame();
    }
);
