document.body.style.backgroundImage = "url('bagian awal.jpg')";

let currentQuestion = 1;
let score = 0;
let timerInterval;
let timeLeft = 30;
let timerStarted = false;

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', function() {
        score += parseInt(this.dataset.value);
        document.getElementById('q' + currentQuestion).style.display = 'none';
        currentQuestion++;
        if (currentQuestion <= 5) {
            document.getElementById('q' + currentQuestion).style.display = 'block';
        } else {
            showResult();
        }
    });
});

function showResult() {
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    if (score >= 3) {
        document.getElementById('result-message').innerText = "Sepertinya Anda sedang mengalami stres. Mari lakukan afirmasi positif!";
        setTimeout(() => {
            showAffirmation();
        }, 2000);
    } else {
        document.body.style.backgroundImage = "url('happy.jpg')";
        const messages = [
            "Wah kondisi kamu sangat baik hari ini! Semangat terus yaa!!",
            "Kondisi kamu cukup baik nih hari ini! Terus semangat dan jangan lupa untuk istirahat!!"
        ];
        document.getElementById('result-message').innerText = messages[Math.floor(Math.random() * messages.length)];
    }
}

function showAffirmation() {
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.affirmation').style.display = 'block';
    document.body.style.backgroundImage = "url('bg quiz.jpg')";
    document.getElementById('video-bg').style.display = 'block';
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.add('flipped');
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
    });
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            timeLeft = 0;
            document.getElementById('timer').innerText = timeLeft;
            clearInterval(timerInterval);
            document.getElementById('notification').style.display = 'block';
            document.getElementById('youtube-link').style.display = 'block';
        }
    }, 1000);
}
