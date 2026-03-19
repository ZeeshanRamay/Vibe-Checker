// ============================================================
//  VIBE CHECK MACHINE — index.js
// ============================================================

// SESSION 1 ─── Data & Types
let score = 0;
let currentIndex = 0;
let selectedChoice = null;

const questions = [ 
    {
        text: "How are you feeling today?",
        choices: [
            { label: "Not so great", points: 0 },
            { label: "Pretty good", points: 1 },
            { label: "Fantastic!", points: 2 },
        ],
    },
    {
        text: "How was your day?",
        choices: [
            { label: "Not so great", points: 0 },
            { label: "Pretty good", points: 1 },
            { label: "Fantastic!", points: 2 },
        ],
    },
    {
        text: "When was the last time you laughed?",
        choices: [
            { label: "Long time ago", points: 0 },
            { label: "Recently", points: 1 },
            { label: "Today", points: 2 },
        ],
    },
    {
        text: "When Do you wake up?",
        choices: [
            { label: "At night", points: 0 },
            { label: "In the evening", points: 1 },
            { label: "In the morning", points: 2 },
        ],
    },
    {
        text: "How many hours do you sleep?",
        choices: [
            { label: "3 to 4 hours", points: 0 },
            { label: "5 to 6 hours", points: 1 },
            { label: "7 to 8 hours", points: 2 },
        ],
    },
];

// SESSION 2 ─── Traditional Functions
function startQuiz() {
    score = 0;
    currentIndex = 0;
    selectedChoice = null;

    switchscreen("screen-start", "screen-quiz");
    showquestion();
}

function switchscreen(hideId, showId) {
    document.getElementById(hideId).classList.add("hidden");
    document.getElementById(showId).classList.remove("hidden");
}

function showquestion() {
    const question = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById("progress-fill").style.width = progressPercent + "%";

    const qCounterEl = document.getElementById("question-counter");
    qCounterEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

    const qText = document.getElementById("question-text");
    const qChoices = document.getElementById("choices-container");

    qText.textContent = question.text;
    qChoices.innerHTML = "";
    selectedChoice = null;

    const labels = ["A", "B", "C"];
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = `<span class="choice-tag">${labels[i]}</span> ${choice.label}`;

       
        btn.addEventListener("click", function() {
            selectChoice(btn, choice.points);
        });

        qChoices.appendChild(btn);
    }
}

function selectChoice(btn, points) {
    const allChoices = document.querySelectorAll(".choice-btn");
    allChoices.forEach(function(aButton){
        aButton.classList.remove("selected");
    });


   btn.classList.add("selected");
    selectedChoice = points;


    score += selectedChoice;
    currentIndex += 1;

    if(currentIndex < questions.length) showquestion();
        else showresult();
        }
    
        function showresult(score) {
          const result = computevibe();
        document.getElementById("result-emoji").textContent = result.emoji;
        document.getElementById("result-title").textContent = result.title;
        document.getElementById("result-desc").textContent = result.desc;
        
        switchscreen("screen-quiz", "screen-result");
    }

function computevibe() {
    if(score <= 3) {
        return {
            emoji: "🛋️",
            title: "The Cozy Sloth",
            desc: "Comfort is your superpower. You know exactly what you like and you protect your peace fiercely. Zero apologies."
        };
    } else if(score <= 6) {
        return {
            emoji: "🌿",
            title: "The Balanced Sage",
            desc: "You have this rare gift of going with the flow without losing yourself. People love being around you."
        };
    } else if (score <= 9) {
        return {
            emoji: "⭐",
            title: "The Chaotic Star",
            desc: "You run on spontaneity and vibes. Every day is an adventure. Your energy is contagious — and exhausting (lovingly)."
        };
    } else {
        return {
            emoji: "⚡",
            title: "The Energy Overload",
            desc: "You're a powerhouse of energy! You bring the storm wherever you go!"
        };
    }
}
   
function restart() {
    switchscreen("screen-result", "screen-start");
}
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
