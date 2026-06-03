/* ====================================
   THEME SWITCHER LOGIC
==================================== */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    
    // Check if the user previously chose the dark theme
    const currentTheme = localStorage.getItem("velocityTheme");
    
    if (currentTheme === "black") {
        document.body.classList.add("black-theme");
        if(toggle) toggle.checked = true;
    }
});

function toggleTheme() {
    const toggle = document.getElementById("themeToggle");
    
    if (toggle.checked) {
        document.body.classList.add("black-theme");
        localStorage.setItem("velocityTheme", "black");
    } else {
        document.body.classList.remove("black-theme");
        localStorage.setItem("velocityTheme", "blue");
    }
}

/* ====================================
   NAVIGATION LOGIC
==================================== */
function openBuilder() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("builder").style.display = "flex";
}

function backHome() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("builder").style.display = "none";
    document.getElementById("giftDisplay").style.display = "none";
    document.getElementById("myGarageScreen").style.display = "none";
    document.getElementById("mysteryRewardScreen").style.display = "none";
    document.getElementById("wrapScreen").style.display = "none";
    document.getElementById("spinWheelScreen").style.display = "none";
}

function backToGarage() {
    openMyGarage();
    document.getElementById("mysteryRewardScreen").style.display = "none";
}

/* ====================================
   CAR DATABASE & GRID RENDER
==================================== */
const cars = {
    corvette: { name: "Corvette", img: "https://i.ibb.co/xq9MxwVN/Chat-GPT-Image-May-23-2026-08-56-59-PM.png" },
    lambo: { name: "Lambo", img: "https://i.ibb.co/zWc0j3Ws/Chat-GPT-Image-May-23-2026-10-49-02-PM.png" },
    mustang: { name: "Mustang", img: "https://i.ibb.co/PskfjfFh/Chat-GPT-Image-May-23-2026-10-48-45-PM.png" },
    supra: { name: "Supra", img: "https://i.ibb.co/xSb37Frh/Chat-GPT-Image-May-23-2026-10-54-09-PM.png" },
    gtr: { name: "Nissan GTR", img: "https://i.ibb.co/1fyFMjSb/Chat-GPT-Image-May-24-2026-12-33-00-PM.png" },
    bmw: { name: "BMW M4", img: "https://i.ibb.co/ZzZWMN7M/Chat-GPT-Image-May-24-2026-12-32-54-PM.png" },
    batmobile: { name: "Batmobile", img: "https://i.ibb.co/HpC5p8Mk/Chat-GPT-Image-May-24-2026-12-23-21-PM.png" },
    f1: { name: "F1 Car", img: "https://i.ibb.co/M53MCkrR/Chat-GPT-Image-May-24-2026-09-09-42-PM.png" },
    porsche: { name: "Porsche 911 GT3", img: "https://i.ibb.co/0yD09SWm/Chat-GPT-Image-May-24-2026-09-12-13-PM.png" },
    ferrari: { name: "Ferrari", img: "https://i.ibb.co/TZQdQRd/Chat-GPT-Image-May-24-2026-09-15-10-PM.png" },
    bugatti: { name: "Bugatti Chiron", img: "https://i.ibb.co/rfFxNS3f/Chat-GPT-Image-May-30-2026-01-18-44-PM.png" },
    jesko: { name: "Koenigsegg Jesko", img: "https://i.ibb.co/YFfFgBSS/Chat-GPT-Image-May-30-2026-01-18-22-PM.png" },
    mclaren: { name: "McLaren P1", img: "https://i.ibb.co/jPkwRqt7/Chat-GPT-Image-May-30-2026-01-18-15-PM.png" },
    pagani: { name: "Pagani Huayra", img: "https://i.ibb.co/5WK5QCYy/Chat-GPT-Image-May-30-2026-01-18-08-PM.png" },
    charger: { name: "Dodge Charger", img: "https://i.ibb.co/Q3qwS8Mz/Chat-GPT-Image-May-30-2026-01-18-02-PM.png" },
    landcruiser: { name: "Toyota Land Cruiser", img: "https://i.ibb.co/35yK76my/Chat-GPT-Image-Jun-2-2026-12-23-40-PM.png" },
    cullinan: { name: "Rolls-Royce Cullinan Black Badge", img: "https://i.ibb.co/fdXyX9Yn/Chat-GPT-Image-Jun-2-2026-12-20-56-PM.png" },
    lykan: { name: "Lykan HyperSport", img: "https://i.ibb.co/vCH1mcW9/de41aa6a-e368-4e72-a963-7bfc524afea8.png" },
    raptor: { name: "Ford Raptor", img: "https://i.ibb.co/WWxPDh1T/80f24df6-0002-4397-ba5a-728e51b68214.png" }
};

const grid = document.getElementById("carGrid");
let selectedCars = [];

// Initialize Grid (Only if on the builder page)
if(grid) {
    Object.keys(cars).forEach(key => {
        grid.innerHTML += `
            <div class="car-card" onclick="toggleCar(this,'${key}')">
                <img src="${cars[key].img}" loading="lazy" decoding="async">
                <h3>${cars[key].name}</h3>
            </div>
        `;
    });
}

function toggleCar(card, car) {
    if (selectedCars.includes(car)) {
        selectedCars = selectedCars.filter(item => item !== car);
        card.classList.remove("active");
    } else {
        selectedCars.push(car);
        card.classList.add("active");
    }
    updatePreview();
}

function updatePreview() {
    let friend = document.getElementById("friendName").value;
    let sender = document.getElementById("senderName").value;
    let message = document.getElementById("giftMessage").value;

    document.getElementById("previewFriend").innerHTML = "FOR " + (friend || "ARYAN");
    document.getElementById("previewMessage").innerHTML = message || "Every legend deserves a legendary ride.";
    document.getElementById("previewSender").innerHTML = "Gifted By " + (sender || "Manas") + " 💝";

    let preview = document.getElementById("previewCars");
    preview.innerHTML = "";

    selectedCars.forEach(car => {
        preview.innerHTML += `<img src="${cars[car].img}" loading="lazy" decoding="async">`;
    });
}

/* ====================================
   LINK GENERATION & GIFTS
==================================== */
function generateLink() {
    let friend = document.getElementById("friendName").value;
    let sender = document.getElementById("senderName").value;
    let message = document.getElementById("giftMessage").value;

    let finalLink = window.location.origin + window.location.pathname + "?gift=true" +
        "&cars=" + encodeURIComponent(selectedCars.join(",")) +
        "&friend=" + encodeURIComponent(friend) +
        "&sender=" + encodeURIComponent(sender) +
        "&message=" + encodeURIComponent(message);

    document.getElementById("giftLink").innerHTML = `
        <p>🎁 SEND THIS LINK</p><br><br>
        <a href="${finalLink}" target="_blank" style="color:#ffd500;">${finalLink}</a><br><br>
        <button class="copy-btn" onclick="copyLink('${finalLink}')">COPY LINK</button>
    `;
}

function copyLink(link) {
    navigator.clipboard.writeText(link);
    alert("Gift Link Copied 😎🔥");
}

// Check URL for Gifts on Load
const params = new URLSearchParams(window.location.search);

if (params.get("gift")) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("builder").style.display = "none";
    document.getElementById("wrapScreen").style.display = "flex";
    document.getElementById("giftTitle").innerHTML = "A GIFT FOR " + (params.get("friend") || "YOU").toUpperCase();
}

function openGift() {
    document.getElementById("wrapScreen").style.display = "none";
    document.getElementById("giftDisplay").style.display = "flex";
    document.getElementById("giftFriend").innerHTML = (params.get("friend") || "FRIEND").toUpperCase() + "'S GARAGE";
    document.getElementById("giftMessageText").innerHTML = params.get("message") || "Enjoy your cars!";
    document.getElementById("giftSender").innerHTML = "Gifted By " + (params.get("sender") || "Someone") + " 💝";

    let giftCars = document.getElementById("giftCars");
    giftCars.innerHTML = "";

    let giftCarsList = params.get("cars").split(",");
    giftCarsList.forEach(car => {
        if(cars[car]) {
            giftCars.innerHTML += `<img src="${cars[car].img}" loading="lazy" decoding="async">`;
        }
    });
}

/* ====================================
   GARAGE & LOCAL STORAGE
==================================== */
function saveGarage() {
    let userGarage = JSON.parse(localStorage.getItem("velocityGarage") || "[]");
    let giftCarsList = params.get("cars").split(",");

    giftCarsList.forEach(car => {
        if (!userGarage.includes(car)) {
            userGarage.push(car);
        }
    });

    localStorage.setItem("velocityGarage", JSON.stringify(userGarage));
    alert("🎉 Added to your garage!");
    backHome();
}

function openMyGarage() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("myGarageScreen").style.display = "flex";

    let userGarage = JSON.parse(localStorage.getItem("velocityGarage") || "[]");
    document.getElementById("garageCount").innerHTML = userGarage.length + " Cars Collected";

    let savedCars = document.getElementById("savedGarageCars");
    savedCars.innerHTML = "";

    userGarage.forEach(car => {
        if(cars[car]) {
            savedCars.innerHTML += `<img src="${cars[car].img}" loading="lazy" decoding="async">`;
        }
    });
}

/* ====================================
   MYSTERY BOX & SPIN WHEEL FEATURE
==================================== */
let unownedCarsForWheel = [];
let winningCarKey = "";

function openMysteryBox() {
    const today = new Date().toDateString();
    const lastOpened = localStorage.getItem("lastMysteryBox");

    if (lastOpened === today) {
        alert("⏳ You already opened today's Mystery Box. Come back tomorrow.");
        return;
    }

    let userGarage = JSON.parse(localStorage.getItem("velocityGarage") || "[]");
    const allCarKeys = Object.keys(cars);

    unownedCarsForWheel = allCarKeys.filter(car => !userGarage.includes(car));

    if (unownedCarsForWheel.length === 0) {
        alert("🏆 Congratulations! You own every car!");
        return;
    }

    // Hide Garage, Show Wheel Screen
    document.getElementById("myGarageScreen").style.display = "none";
    document.getElementById("spinWheelScreen").style.display = "flex";

    // Reset wheel rotation and button state
    document.getElementById("wheel").style.transform = "rotate(0deg)";
    const btn = document.getElementById("spinBtn");
    btn.disabled = false;
    btn.innerText = "SPIN TO UNLOCK";
    btn.style.opacity = "1";
}

function spinWheel() {
    const btn = document.getElementById("spinBtn");
    btn.disabled = true; // Prevent double-clicking
    btn.innerText = "SPINNING...";
    btn.style.opacity = "0.7";

    // 1. Pick a random winning car
    const randomIndex = Math.floor(Math.random() * unownedCarsForWheel.length);
    winningCarKey = unownedCarsForWheel[randomIndex];

    // 2. Calculate spin (5 full spins + a random degree offset)
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = (360 * 5) + extraDegrees;

    // 3. Trigger the CSS animation
    const wheel = document.getElementById("wheel");
    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    // 4. Wait for the 4-second animation to finish, then show reward
    setTimeout(() => {
        let userGarage = JSON.parse(localStorage.getItem("velocityGarage") || "[]");
        userGarage.push(winningCarKey);
        localStorage.setItem("velocityGarage", JSON.stringify(userGarage));
        
        localStorage.setItem("lastMysteryBox", new Date().toDateString());

        document.getElementById("spinWheelScreen").style.display = "none";
        showMysteryReward(winningCarKey);
    }, 4200);
}

function showMysteryReward(carKey) {
    const carData = cars[carKey];
    const giftBox = document.querySelector(".gift-box");

    if(giftBox) {
        giftBox.classList.add("shake");
        setTimeout(() => {
            giftBox.classList.remove("shake");
            transitionToRewardScreen(carData);
        }, 600);
    } else {
        transitionToRewardScreen(carData);
    }
}

function transitionToRewardScreen(carData) {
    document.getElementById("myGarageScreen").style.display = "none";
    document.getElementById("mysteryRewardScreen").style.display = "flex";
    document.getElementById("mysteryCar").innerHTML = `<img src="${carData.img}" loading="lazy" decoding="async">`;
    document.getElementById("mysteryCarName").innerHTML = carData.name.toUpperCase();
}
