document.addEventListener("DOMContentLoaded", main);
function main() {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      weight: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      weight: 2,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      weight: 3,
    },
    {
      question: "How many moons does jupiter has",
      choices: [
        '85',
        '95',
        '78',
        '82',
      ],
      answer: '95',
      weight: 10,
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedChoice;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    nextbtncheckfnc();
  });

  function nextbtncheckfnc() {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedChoice === correctAnswer) {
      score += questions[currentQuestionIndex].weight;
    }
    console.log("the score is", score);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      console.log("the score is", score, "last element");
      showResult();
    }
  }

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; //clear previous choices
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        document
          .querySelectorAll("#choices-list li")
          .forEach((li) => li.classList.remove("selected"));

        li.classList.add("selected");
        selectAnswer(choice);
      });
      console.log(choice, li, "rendered li");

      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    nextBtn.classList.remove("hidden");
    selectedChoice = choice;
  }

  const totalMarks = questions.reduce((acc, curr) => acc + curr.weight, 0);

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${totalMarks}`;
  }
}
