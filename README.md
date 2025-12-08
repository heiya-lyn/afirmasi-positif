<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tes Kesehatan Mental</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-image 0.5s ease;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            max-width: 600px;
            width: 90%;
        }
        h1, h2 {
            color: #333;
        }
        .quiz {
            display: block;
        }
        .result, .affirmation {
            display: none;
        }
        .question {
            margin-bottom: 20px;
        }
        .options {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .option {
            background-image: url('tombol pink.jpg'); /* URL gambar tombol yang benar */
            background-size: cover;
            background-position: center;
            width: 120px; /* Diperbesar dari 100px */
            height: 120px; /* Diperbesar dari 100px */
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 14px; /* Diperbesar dari default */
            text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        }
        .option:hover {
            transform: scale(1.05);
        }
        .cards {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            flex-wrap: wrap; /* Agar rapi di layar kecil */
        }
        .card {
            width: 180px; /* Disesuaikan untuk lebih rapih, dari 200px */
            height: 120px; /* Disesuaikan untuk proporsi yang lebih baik, dari 150px */
            background: linear-gradient(135deg, #FF8DA1, #FFB3BA); /* Efek glossy dengan gradient */
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5); /* Efek glossy dengan shadow dan inset */
            transition: transform 0.3s ease;
            margin: 10px; /* Tambah margin untuk rapih */
        }
        .card:hover {
            transform: scale(1.05);
        }
        .card.flipped {
            background: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            /* Hapus rotateY untuk menghindari tulisan terbalik */
        }
        .card-content {
            display: none;
        }
        .card.flipped .card-content {
            display: block;
        }
        .timer {
            font-size: 24px;
            margin-top: 20px;
        }
        .notification {
            display: none;
            margin-top: 20px;
            padding: 10px;
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            color: #155724;
        }
        .video-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .youtube-link {
            margin-top: 10px;
            display: none; /* Awalnya hidden, muncul setelah notifikasi */
        }
    </style>
</head>
<body id="body">
    <!-- Video background menggunakan bg sad untuk afirmasi -->
    <div class="background-image" id="bg sad" style="display: none;">
    
    </div>
    <div class="container">
        <div class="quiz">
            <h1>Tes Kesehatan Mental</h1>
            <p>Jawab pertanyaan berikut untuk mengetahui apakah kamu sedang stres.</p>
            <div id="questions">
                <!-- Pertanyaan Quiz (contoh sederhana, bisa disesuaikan) -->
                <div class="question" id="q1">
                    <h2>1. Apakah kamu sering merasa cemas tanpa alasan jelas?</h2>
                    <div class="options">
                        <button class="option" data-value="1">Ya</button>
                        <button class="option" data-value="0">Tidak</button>
                    </div>
                </div>
                <div class="question" id="q2" style="display:none;">
                    <h2>2. Apakah kamu kesulitan tidur di malam hari?</h2>
                    <div class="options">
                        <button class="option" data-value="1">Ya</button>
                        <button class="option" data-value="0">Tidak</button>
                    </div>
                </div>
                <div class="question" id="q3" style="display:none;">
                    <h2>3. Apakah kamu merasa lelah sepanjang hari?</h2>
                    <div class="options">
                        <button class="option" data-value="1">Ya</button>
                        <button class="option" data-value="0">Tidak</button>
                    </div>
                </div>
                <div class="question" id="q4" style="display:none;">
                    <h2>4. Apakah kamu kehilangan minat pada hobi atau aktivitas favorit?</h2>
                    <div class="options">
                        <button class="option" data-value="1">Ya</button>
                        <button class="option" data-value="0">Tidak</button>
                    </div>
                </div>
                <div class="question" id="q5" style="display:none;">
                    <h2>5. Apakah kamu sering merasa mudah marah?</h2>
                    <div class="options">
                        <button class="option" data-value="1">Ya</button>
                        <button class="option" data-value="0">Tidak</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="result">
            <h2 id="result-message"></h2>
        </div>
        <div class="affirmation">
            <h2>Afirmasi Positif untuk Kamu!</h2>
            <p>Klik pada kartu untuk membaliknya dan ikuti perintah selama 30 detik.</p>
            <div class="cards">
                <div class="card" id="card1">
                    <div class="card-back">Kartu 1</div>
                    <div class="card-content">
                        <p>Tarik napas 3 kali dan ucapkan "Aku kuat dan aku bisa hadapi tantangan."</p>
                    </div>
                </div>
                <div class="card" id="card2">
                    <div class="card-back">Kartu 2</div>
                    <div class="card-content">
                        <p>Pejamkan mata lalu ucapkan "Aku berharga dan pantas bahagia."</p>
                        
                    </div>
                </div>
                <div class="card" id="card3">
                    <div class="card-back">Kartu 3</div>
                    <div class="card-content">
                        <p>Letakkan tangan di dada dan ucapkan "Aku tenang. Aku aman Aku cukup."</p>
                       
                    </div>
                </div>
            </div>
            <div class="timer" id="timer">30</div>
            <div class="notification" id="notification">Selamat! Anda telah berhasil melakukan afirmasi positif.</div>
            <div class="youtube-link" id="youtube-link">
                <a href="https://youtu.be/MvSkn9svGGw" target="_blank">Tonton Video Pentingnya Kesehatan Mental</a>
            </div>
        </div>
    </div>

    <script>
        // Wallpaper awal untuk quiz (URL gambar yang benar)
        document.body.style.backgroundImage = "url('bagian awal.jpg')";

        let currentQuestion = 1;
        let score = 0;
        let timerInterval;
        let timeLeft = 30;
        let timerStarted = false; // Flag untuk memastikan timer hanya mulai sekali

        // Fungsi untuk menangani klik opsi quiz
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
            if (score >= 3) { // Jika 3 atau lebih "Ya", dianggap stres
                document.getElementById('result-message').innerText = "Sepertinya Anda sedang mengalami stres. Mari lakukan afirmasi positif!";
                setTimeout(() => {
                    showAffirmation();
                }, 2000);
            } else {
                // Wallpaper untuk hasil tidak stres (URL gambar yang benar)
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
            // Wallpaper untuk afirmasi (URL gambar yang benar)
            document.body.style.backgroundImage = "url('bg quiz.jpg')";
            // Tampilkan video di background
            document.getElementById('video-bg').style.display = 'block';
        }

        // Fungsi untuk membalik kartu
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.add('flipped');
                // Mulai timer saat kartu pertama dibalik
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
                    timeLeft = 0; // Pastikan tidak negatif
                    document.getElementById('timer').innerText = timeLeft;
                    clearInterval(timerInterval);
                    document.getElementById('notification').style.display = 'block';
                    document.getElementById('youtube-link').style.display = 'block'; // Tampilkan link YouTube
                }
            }, 1000);
        }
    </script>
</body>
</html>
