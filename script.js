const typingTest = document.querySelector('.typing-test p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false;

function randomParagraph() {
    const paragaraphs = [
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes perfect, so keep on typing.",
        "JavaScript is a versatile programming language.",
        "Typing tests help improve your speed and accuracy.",
        "Consistency is key to mastering any skill.",
        "Stay focused and keep your eyes on the screen.",
        "Accuracy is more important than speed in typing.",
        "Take breaks to avoid fatigue during long typing sessions.",
        "Use all your fingers to type efficiently.",
        "Reading while typing can enhance your comprehension skills."
    ];
    const randomIndex = Math.floor(Math.random() * paragaraphs.length);
    typingTest.innerText = "";
    for (const char of paragaraphs[randomIndex]) {
        console.log(char);
        typingTest.innerHTML += `<span>${char}</span>`;
    }
    const spans = typingTest.querySelectorAll('span');
    if (spans.length) spans[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingTest.addEventListener('click', () => input.focus());
}

// userInput

function initTyping() {
    const char = typingTest.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        // Correct or incorrect check
        if (typedChar === char[charIndex].innerHTML) {
            char[charIndex].classList.add('correct');
        } else {
            mistakesCount++;
            char[charIndex].classList.add('incorrect');
        }

        charIndex++;

        // Remove old 'active' and add to next char (if exists)
        char.forEach(span => span.classList.remove('active'));
        if (charIndex < char.length) {
            char[charIndex].classList.add('active');
        } else {
            // Paragraph completed
            clearInterval(timer);
            input.value = "";
        }

        mistakes.innerText = mistakesCount;
        cpm.innerText = charIndex - mistakesCount;
    } else {
        clearInterval(timer);
    }
}


function initTimer() {
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft
        var wpmShow = Math.round(((charIndex - mistakesCount) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmShow;
    }
    else{
        clearInterval(timer);
    }
}
function reset() {
    randomParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakesCount = 0;
    isTyping = false;
    time.innerText = timeLeft;
    mistakes.innerText = mistakesCount;
    cpm.innerText = 0;
    wpm.innerText = 0;
    input.value = "";
}
input.addEventListener("input", initTyping);
btn.addEventListener("click",reset)
randomParagraph();
