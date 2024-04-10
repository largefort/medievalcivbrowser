let coins = 0;
let knightCount = 0;
let archerCount = 0;
let wizardCount = 0;
let woodcuttingLevel = 1;
let miningLevel = 1;
let paladinCount = 0;
let passiveIncome = 0;
let db;
let lastSaveTime = Date.now(); // Initialize lastSaveTime with the current time

// Add an HTML audio element for the upgrade sound
document.write(`
<audio id="upgradeSound">
    <source src="upgradesound.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
`);

// Preload the click sound
const clickSound = new Audio("click-sound.mp3");

// Array to store achieved achievements
let achievedAchievements = [];

function disableFingerZooming() {
    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, { passive: false });
}

disableFingerZooming();

function initializeDB() {
    const request = indexedDB.open("MedievalClickerDB", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('gameState')) {
            db.createObjectStore('gameState');
        }
        if (!db.objectStoreNames.contains('achievements')) {
            db.createObjectStore('achievements', { autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        loadGameData();
        loadAchievements();
    };

    request.onerror = function (event) {
        console.log("Error opening DB", event);
    };
}

function saveGameData() {
    const gameState = {
        coins,
        knightCount,
        archerCount,
        wizardCount,
        woodcuttingLevel,
        miningLevel,
        paladinCount,
        lastSaveTime: Date.now(), // Update the last save time
    };

    const transaction = db.transaction(["gameState"], "readwrite");
    const store = transaction.objectStore("gameState");
    store.put(gameState, "currentGameState");
}

function loadGameData() {
    const transaction = db.transaction(["gameState"], "readonly");
    const store = transaction.objectStore("gameState");
    const request = store.get("currentGameState");
    request.onsuccess = function (event) {
        if (request.result) {
            const savedState = request.result;

            coins = savedState.coins;
            knightCount = savedState.knightCount;
            archerCount = savedState.archerCount;
            wizardCount = savedState.wizardCount;
            woodcuttingLevel = savedState.woodcuttingLevel;
            miningLevel = savedState.miningLevel;
            paladinCount = savedState.paladinCount;
            lastSaveTime = savedState.lastSaveTime; // Update the last save time

            updateUI();
        }
    };
}

function saveAchievements() {
    const transaction = db.transaction(["achievements"], "readwrite");
    const store = transaction.objectStore("achievements");
    store.clear(); // Clear existing achievements

    achievedAchievements.forEach(achievement => {
        store.add(achievement);
    });
}

function loadAchievements() {
    const transaction = db.transaction(["achievements"], "readonly");
    const store = transaction.objectStore("achievements");
    const request = store.getAll();
    request.onsuccess = function (event) {
        if (request.result) {
            achievedAchievements = request.result;
            updateAchievementsUI();
        }
    };
}

initializeDB();

// Function to toggle music
function toggleMusic() {
    const medievalThemeAudio = document.getElementById("medievaltheme");
    if (medievalThemeAudio.paused) {
        medievalThemeAudio.play();
    } else {
        medievalThemeAudio.pause();
    }
}

// Function to toggle sound effects
function toggleSoundEffects() {
    const clickSoundAudio = document.getElementById("click-sound");
    const upgradeSoundAudio = document.getElementById("upgradeSound");
    const toggleSfxCheckbox = document.getElementById("toggle-sfx");

    // Check the state of the toggle-sfx checkbox
    if (toggleSfxCheckbox.checked) {
        // If the checkbox is checked, mute the sound effects
        clickSoundAudio.muted = true;
        upgradeSoundAudio.muted = true;
    } else {
        // If the checkbox is not checked, unmute the sound effects
        clickSoundAudio.muted = false;
        upgradeSoundAudio.muted = false;
    }
}

// Add event listeners to the checkboxes
document.getElementById("toggle-music").addEventListener("change", toggleMusic);
document.getElementById("toggle-sfx").addEventListener("change", toggleSoundEffects);

// Function to request fullscreen
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome and Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Internet Explorer
        element.msRequestFullscreen();
    }
}

function updateUI() {
    document.getElementById("counter").textContent = `Gold coins: ${compactNumberFormat(coins)}`;
    document.getElementById("knight-count").textContent = knightCount;
    document.getElementById("archer-count").textContent = archerCount;
    document.getElementById("wizard-count").textContent = wizardCount;
    document.getElementById("woodcutting-level").textContent = woodcuttingLevel;
    document.getElementById("mining-level").textContent = miningLevel;
    document.getElementById("paladin-count").textContent = paladinCount;

    updatePassiveIncome();
}

function updateAchievementsUI() {
    const achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = ""; // Clear existing list

    achievedAchievements.forEach(achievement => {
        const achievementDiv = document.createElement("div");
        achievementDiv.classList.add("achievement", "achieved");
        achievementDiv.innerHTML = `<i class="fas fa-trophy"></i> ${achievement.name}: ${achievement.description}`;
        achievementsList.appendChild(achievementDiv);
    });
}

function unlockAchievement(name, description) {
    const newAchievement = { name, description };
    achievedAchievements.push(newAchievement);
    saveAchievements();
    updateAchievementsUI();
}

function clickCastle() {
    coins++;
    saveGameData();
    updateUI();

    // Play the preloaded click sound
    clickSound.play();
}

function buyUpgrade(type) {
    let cost = 0;
    let upgradeCount;

    switch (type) {
        case "knight":
            cost = 10;
            upgradeCount = knightCount;
            if (coins >= cost) {
                coins -= cost;
                knightCount++;
                if (knightCount === 100) {
                    unlockAchievement("Knight Master", "Recruit 100 knights");
                }
            }
            break;
        case "archer":
            cost = 25;
            upgradeCount = archerCount;
            if (coins >= cost) {
                coins -= cost;
                archerCount++;
                if (archerCount === 50) {
                    unlockAchievement("Archery Champion", "Train 50 archers");
                }
            }
            break;
        case "wizard":
            cost = 50;
            upgradeCount = wizardCount;
            if (coins >= cost) {
                coins -= cost;
                wizardCount++;
                if (wizardCount === 10) {
                    unlockAchievement("Master Wizard", "Unlock all wizard spells");
                }
            }
            break;
        case "paladin":
            cost = 100;
            upgradeCount = paladinCount;
            if (coins >= cost) {
                coins -= cost;
                paladinCount++;
                if (paladinCount === 1) {
                    unlockAchievement("Paladin Enlistment", "Recruit the first paladin");
                }
            }
            break;
    }

    if (cost > 0) {
        // Play the upgrade sound
        const upgradeSound = document.getElementById("upgradeSound");
        upgradeSound.play();
    }

    saveGameData();
    updateUI();
}

function compactNumberFormat(num) {
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    return +(num / 1e12).toFixed(1) + "T";
}

function handleSkillingClick(skill) {
    switch (skill) {
        case "woodcutting":
            woodcuttingLevel++;
            break;
        case "mining":
            miningLevel++;
            break;
    }
    saveGameData();
    updateUI();
}

function updatePassiveIncome() {
    // Calculate passive income based on knights, archers, wizards, and paladins
    const knightIncomeRate = 1;   // Adjust the income rate for knights
    const archerIncomeRate = 2;   // Adjust the income rate for archers
    const wizardIncomeRate = 4;   // Adjust the income rate for wizards
    const paladinIncomeRate = 8;  // Adjust the income rate for paladins

    const totalPassiveIncome = (knightCount * knightIncomeRate + archerCount * archerIncomeRate + wizardCount * wizardIncomeRate + paladinCount * paladinIncomeRate);
    passiveIncome = totalPassiveIncome;
}

function earnPassiveIncome() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));

    coins += offlinePassiveIncome;
    lastSaveTime = currentTime; // Update the last save time

    saveGameData();
    updateUI();
}

setInterval(earnPassiveIncome, 1000);
