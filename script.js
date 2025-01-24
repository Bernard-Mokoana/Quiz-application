document.addEventListener('DOMContentLoaded', () => {

  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next Question";
  nextBtn.id = "next-btn";
  nextBtn.classList.add("hidden");
  document.querySelector(".container").appendChild(nextBtn);

  const restartBtn = document.getElementById("restart-btn");

  const quiz = document.getElementById("quiz-container");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");


  const timerDisplay = document.createElement("p");
  timerDisplay.id = "timer";
  timerDisplay.textContent = "Time remaining: 10 seconds";
  questionContainer.appendChild(timerDisplay);

  const questions = [
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Machine Language"
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which programming language is used for web development alongside HTML and CSS?",
      choices: ["Python", "JavaScript", "Java", "C++"],
      answer: "JavaScript",
    },
    {
      question: "What is the purpose of a version control system?",
      choices: [
        "To design user interfaces",
        "To track and manage changes in code",
        "To compile code",
        "To debug code"
      ],
      answer: "To track and manage changes in code",
    },
    {
      question: "Which of the following is a popular JavaScript library for building user interfaces?",
      choices: ["Angular", "React", "Vue", "Django"],
      answer: "React",
    },
    {
      question: "What is an API?",
      choices: [
        "Application Programming Interface",
        "Application Processing Information",
        "Automated Programming Interface",
        "Advanced Protocol Integration"
      ],
      answer: "Application Programming Interface",
    },
    {
      question: "What does CSS stand for?",
      choices: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Custom Style Syntax",
        "Computer Style System"
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What is the role of a database in web development?",
      choices: [
        "To store and retrieve data",
        "To style the website",
        "To host the website",
        "To compile code"
      ],
      answer: "To store and retrieve data",
    },
    {
      question: "Which of the following is a backend programming language?",
      choices: ["HTML", "CSS", "Python", "React"],
      answer: "Python",
    },
    {
      question: "What is the purpose of the HTTP protocol?",
      choices: [
        "To secure data",
        "To transfer hypertext",
        "To store data",
        "To compile code"
      ],
      answer: "To transfer hypertext",
    },
    {
      question: "Which of the following is a NoSQL database?",
      choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      answer: "MongoDB",
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;

  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);

  function startQuiz() {
    startBtn.classList.add('hidden');
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function nextQuestion() {
    clearInterval(timer); 
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showQuestion() {
    nextBtn.classList.add('hidden');
    questionText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}: ${questions[currentQuestionIndex].question}`;
    const shuffledChoices = shuffleArray(questions[currentQuestionIndex].choices);
    choicesList.innerHTML = "";
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
    startTimer();
  }

  function selectAnswer(selectedLi, choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    Array.from(choicesList.children).forEach((li) => li.classList.add("disabled"));
    clearInterval(timer); 

    if (choice === correctAnswer) {
      selectedLi.classList.add("correct");
      score++;
    } else {
      selectedLi.classList.add("incorrect");
      Array.from(choicesList.children).forEach((li) => {
        if (li.textContent === correctAnswer) {
          li.classList.add("correct");
        }
      });
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    clearInterval(timer); 
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    nextBtn.classList.add('hidden');
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      } else {
        timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
      }
    }, 1000);
  }

  function restartQuiz() {
    clearInterval(timer); 
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    startBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    questionContainer.classList.add('hidden');
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
});
