/* =========================================================
   ExamHub - Online Examination System
   Single JavaScript file (all pages merged)

   Pages are now "views" inside index.html and are switched
   with the URL hash:

   #home  #login  #register  #dashboard
   #exams?subject=c|python|java
   #instructions?subject=c|python|java
   #exam?subject=c|python|java
   #result  #history
========================================================= */


/* =========================================================
   SHARED DATA
========================================================= */

const subjectNames = {
    c: "C Programming",
    python: "Python",
    java: "Java"
};

const questionSets = {

    c: [
        {
            question: "Which symbol is used to end a statement in C?",
            options: [".", ";", ":", ","],
            answer: 1
        },
        {
            question: "Which data type is used to store whole numbers in C?",
            options: ["float", "char", "int", "double"],
            answer: 2
        },
        {
            question: "Which function is the starting point of a C program?",
            options: ["start()", "main()", "begin()", "run()"],
            answer: 1
        },
        {
            question: "Which header file is required for printf()?",
            options: ["math.h", "string.h", "stdio.h", "stdlib.h"],
            answer: 2
        },
        {
            question: "Which operator is used for logical AND in C?",
            options: ["&", "&&", "||", "!"],
            answer: 1
        },
        {
            question: "Which loop executes its body at least once?",
            options: ["for", "while", "do-while", "if"],
            answer: 2
        },
        {
            question: "Which symbol is used to access the address of a variable?",
            options: ["*", "&", "#", "%"],
            answer: 1
        },
        {
            question: "Which keyword is used to declare a constant in C?",
            options: ["constant", "const", "final", "static"],
            answer: 1
        },
        {
            question: "Which format specifier is used for an integer?",
            options: ["%f", "%c", "%d", "%s"],
            answer: 2
        },
        {
            question: "Which keyword is used to return a value from a function?",
            options: ["send", "return", "break", "value"],
            answer: 1
        }
    ],

    python: [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "define", "def", "fun"],
            answer: 2
        },
        {
            question: "Which function is used to display output in Python?",
            options: ["display()", "print()", "output()", "show()"],
            answer: 1
        },
        {
            question: "Which symbol is used for comments in Python?",
            options: ["//", "#", "/*", "<!--"],
            answer: 1
        },
        {
            question: "Which data type is used to store multiple values in a list?",
            options: ["list", "tuple", "set", "dict"],
            answer: 0
        },
        {
            question: "Which keyword is used for a conditional statement?",
            options: ["check", "if", "condition", "when"],
            answer: 1
        },
        {
            question: "Which function is used to find the length of a list?",
            options: ["size()", "length()", "len()", "count()"],
            answer: 2
        },
        {
            question: "Which symbol is used for exponentiation in Python?",
            options: ["^", "**", "//", "%%"],
            answer: 1
        },
        {
            question: "Which keyword is used to create a loop over a sequence?",
            options: ["loop", "for", "repeat", "iterate"],
            answer: 1
        },
        {
            question: "Which data type stores key-value pairs?",
            options: ["list", "tuple", "dictionary", "set"],
            answer: 2
        },
        {
            question: "Which keyword is used to import a module?",
            options: ["include", "using", "import", "module"],
            answer: 2
        }
    ],

    java: [
        {
            question: "Which keyword is used to create a class in Java?",
            options: ["class", "Class", "create", "object"],
            answer: 0
        },
        {
            question: "Which keyword creates an object in Java?",
            options: ["object", "create", "new", "this"],
            answer: 2
        },
        {
            question: "Which method is the entry point of a Java program?",
            options: ["start()", "main()", "run()", "begin()"],
            answer: 1
        },
        {
            question: "Which feature allows a class to inherit another class?",
            options: ["extends", "inherits", "implements", "super"],
            answer: 0
        },
        {
            question: "Which data type stores whole numbers in Java?",
            options: ["float", "int", "char", "double"],
            answer: 1
        },
        {
            question: "Which keyword is used to inherit a class?",
            options: ["implements", "extends", "inherit", "using"],
            answer: 1
        },
        {
            question: "Which keyword is used to implement an interface?",
            options: ["extends", "interface", "implements", "inherit"],
            answer: 2
        },
        {
            question: "Which concept means hiding internal implementation details?",
            options: ["Inheritance", "Abstraction", "Polymorphism", "Compilation"],
            answer: 1
        },
        {
            question: "Which symbol is used to end a Java statement?",
            options: [".", ";", ":", ","],
            answer: 1
        },
        {
            question: "Which language feature allows the same method name with different parameters?",
            options: ["Inheritance", "Method Overloading", "Encapsulation", "Abstraction"],
            answer: 1
        }
    ]
};


/* =========================================================
   HELPERS
========================================================= */

function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

function goTo(route) {
    window.location.hash = route;
}

function getHistory() {
    return JSON.parse(localStorage.getItem("examHistory")) || [];
}

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function hasSubject(subject) {
    return Object.prototype.hasOwnProperty.call(subjectNames, subject);
}

function clearMessage(element) {
    element.textContent = "";
    element.className = "";
}


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

/* Header */
const publicNav = document.getElementById("publicNav");
const userNav = document.getElementById("userNav");
const examHeaderRight = document.getElementById("examHeaderRight");
const headerTimer = document.getElementById("timer");
const logoutBtn = document.getElementById("logoutBtn");

/* Login */
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

/* Register */
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

/* Dashboard */
const welcomeMessage = document.getElementById("welcomeMessage");
const completedExams = document.getElementById("completedExams");
const averageScore = document.getElementById("averageScore");

/* Exam list */
const subjectTitle = document.getElementById("subjectTitle");
const examListTitle = document.getElementById("examListTitle");
const startExamBtn = document.getElementById("startExamBtn");

/* Instructions */
const instructionTitle = document.getElementById("instructionTitle");
const startTestBtn = document.getElementById("startTestBtn");

/* Exam */
const examTitle = document.getElementById("examTitle");
const questionContainer = document.getElementById("questionContainer");
const questionNumber = document.getElementById("questionNumber");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const countdown = document.getElementById("countdown");
const questionNumbers = document.getElementById("questionNumbers");

/* History */
const historyContainer = document.getElementById("historyContainer");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");


/* =========================================================
   ROUTER (replaces separate HTML pages)
========================================================= */

const viewNames = [
    "home", "login", "register", "dashboard", "exams",
    "instructions", "exam", "result", "history"
];

/* Pages anyone can open */
const publicViews = ["home", "login", "register"];

/* Pages that show Dashboard / Results / Logout in the header */
const userNavViews = ["dashboard", "exams", "instructions", "result", "history"];

let currentView = "";

function getRoute() {

    const raw = window.location.hash.replace(/^#\/?/, "");
    const parts = raw.split("?");

    return {
        name: parts[0] || "home",
        params: new URLSearchParams(parts[1] || "")
    };
}

function router() {

    /* Leaving the exam page always stops its timer */
    clearInterval(examState.timer);

    const route = getRoute();

    const name = viewNames.includes(route.name)
        ? route.name
        : "home";

    /* Login check (was done at the top of every page script) */
    if (!publicViews.includes(name) && !isLoggedIn()) {
        goTo("login");
        return;
    }

    currentView = name;

    /* Show only the active page */
    viewNames.forEach(function(view) {
        document.getElementById("view-" + view).hidden = (view !== name);
    });

    /* Header: public links / user links / exam timer */
    userNav.hidden = !userNavViews.includes(name);
    publicNav.hidden = (name === "exam") || userNavViews.includes(name);
    examHeaderRight.hidden = (name !== "exam");

    /* Run the page's own setup */
    if (viewInit[name]) {
        viewInit[name](route.params);
    }

    window.scrollTo(0, 0);
}


/* =========================================================
   LOGOUT (one handler for the shared header)
========================================================= */

logoutBtn.addEventListener("click", function(event) {

    event.preventDefault();

    localStorage.removeItem("loggedIn");

    goTo("login");
});


/* =========================================================
   REGISTER
========================================================= */

function initRegister() {

    registerForm.reset();
    clearMessage(registerMessage);
}

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = registerMessage;


    if (password !== confirmPassword) {

        message.textContent = "Passwords do not match.";
        message.className = "message error";

        return;
    }


    if (password.length < 6) {

        message.textContent = "Password must contain at least 6 characters.";
        message.className = "message error";

        return;
    }


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem("user", JSON.stringify(user));


    message.textContent = "Registration successful!";

    message.className = "message success";


    registerForm.reset();

});


/* =========================================================
   LOGIN
========================================================= */

function initLogin() {

    loginForm.reset();
    clearMessage(loginMessage);
}

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const message = loginMessage;


    const storedUser = localStorage.getItem("user");


    if (!storedUser) {

        message.textContent = "No account found. Please register first.";

        message.className = "message error";

        return;
    }


    const user = JSON.parse(storedUser);


    if (email === user.email && password === user.password) {

        localStorage.setItem("loggedIn", "true");

        message.textContent = "Login successful!";

        message.className = "message success";


        setTimeout(function() {

            if (currentView === "login") {
                goTo("dashboard");
            }

        }, 1000);

    } else {

        message.textContent = "Invalid email or password.";

        message.className = "message error";

    }

});


/* =========================================================
   DASHBOARD
========================================================= */

function initDashboard() {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

        const user = JSON.parse(storedUser);

        welcomeMessage.textContent =
            "Welcome, " + user.name + "!";
    }

    const history = getHistory();

    completedExams.textContent =
        history.length;

    if (history.length > 0) {

        let totalPercentage = 0;

        history.forEach(function(result) {
            totalPercentage += result.percentage;
        });

        const average =
            Math.round(totalPercentage / history.length);

        averageScore.textContent =
            average + "%";

    } else {

        averageScore.textContent = "0%";
    }
}


/* =========================================================
   EXAM LIST
========================================================= */

function initExams(params) {

    const subject = params.get("subject");

    if (hasSubject(subject)) {

        subjectTitle.textContent =
            subjectNames[subject] + " Examinations";

        examListTitle.textContent =
            subjectNames[subject] + " Test 1";

        /* Start Examination -> Instructions -> Exam */
        startExamBtn.href =
            "#instructions?subject=" + subject;

    } else {

        subjectTitle.textContent = "Available Exams";

        examListTitle.textContent = "Programming Test";

        startExamBtn.href = "#instructions";
    }
}


/* =========================================================
   INSTRUCTIONS
========================================================= */

function initInstructions(params) {

    const subject = params.get("subject");

    if (hasSubject(subject)) {

        instructionTitle.textContent =
            subjectNames[subject] + " Test";

        startTestBtn.href =
            "#exam?subject=" + subject;

    } else {

        instructionTitle.textContent = "Programming Test";

        startTestBtn.href = "#exam";
    }
}


/* =========================================================
   EXAMINATION
========================================================= */

const examState = {
    name: "Programming Test",
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
    timeLeft: 10 * 60,
    timer: null
};

function initExam(params) {

    const subject = params.get("subject");

    if (hasSubject(subject)) {

        examState.name = subjectNames[subject] + " Test";

    } else {

        examState.name = "Programming Test";
    }

    examTitle.textContent = examState.name;

    const key =
        Object.prototype.hasOwnProperty.call(questionSets, subject)
            ? subject
            : "c";

    examState.questions = questionSets[key];

    examState.currentQuestion = 0;

    examState.userAnswers =
        new Array(examState.questions.length).fill(null);

    examState.timeLeft = 10 * 60;

    showQuestion();

    updateTimerDisplay();

    startTimer();
}

function showQuestion() {

    const q = examState.questions[examState.currentQuestion];

    let html = "";

    html += `<div class="question-card">`;

    html += `
        <div class="question-top">
            <span>Question ${examState.currentQuestion + 1}</span>
            <span>${examState.questions.length} Questions</span>
        </div>
    `;

    html += `<h2>${escapeHTML(q.question)}</h2>`;

    html += `<div class="options">`;

    q.options.forEach(function(option, index) {

        const checked =
            examState.userAnswers[examState.currentQuestion] === index
                ? "checked"
                : "";

        html += `
            <label class="option">
                <input
                    type="radio"
                    name="answer"
                    value="${index}"
                    ${checked}
                >
                <span>${escapeHTML(option)}</span>
            </label>
        `;
    });

    html += `</div>`;

    html += `</div>`;

    questionContainer.innerHTML = html;

    questionNumber.textContent =
        `Question ${examState.currentQuestion + 1} of ${examState.questions.length}`;

    previousBtn.disabled =
        examState.currentQuestion === 0;

    if (examState.currentQuestion === examState.questions.length - 1) {

        nextBtn.style.display = "none";

    } else {

        nextBtn.style.display = "inline-block";
    }

    updateQuestionNumbers();
}

function updateQuestionNumbers() {

    questionNumbers.innerHTML = "";

    examState.questions.forEach(function(question, index) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent = index + 1;

        button.className = "question-number";

        if (index === examState.currentQuestion) {
            button.classList.add("current");
        }

        if (examState.userAnswers[index] !== null) {
            button.classList.add("answered");
        }

        button.addEventListener("click", function() {

            examState.currentQuestion = index;

            showQuestion();
        });

        questionNumbers.appendChild(button);
    });
}

/* Save the selected option */
questionContainer.addEventListener("change", function(event) {

    if (event.target.name === "answer") {

        examState.userAnswers[examState.currentQuestion] =
            Number(event.target.value);

        updateQuestionNumbers();
    }

});

previousBtn.addEventListener("click", function() {

    if (examState.currentQuestion > 0) {

        examState.currentQuestion--;

        showQuestion();
    }

});

nextBtn.addEventListener("click", function() {

    if (examState.currentQuestion < examState.questions.length - 1) {

        examState.currentQuestion++;

        showQuestion();
    }

});

function updateTimerDisplay() {

    const minutes =
        Math.floor(examState.timeLeft / 60);

    const seconds =
        examState.timeLeft % 60;

    const text =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    countdown.textContent = text;

    headerTimer.textContent = text;
}

function startTimer() {

    clearInterval(examState.timer);

    examState.timer = setInterval(function() {

        examState.timeLeft--;

        updateTimerDisplay();

        if (examState.timeLeft <= 0) {

            calculateResult();
        }

    }, 1000);
}

submitBtn.addEventListener("click", function() {

    const confirmSubmit =
        confirm(
            "Are you sure you want to submit the examination?"
        );

    if (confirmSubmit) {

        calculateResult();
    }

});

function calculateResult() {

    clearInterval(examState.timer);

    let score = 0;

    examState.questions.forEach(function(question, index) {

        if (examState.userAnswers[index] === question.answer) {

            score++;
        }

    });

    const percentage =
        Math.round(
            (score / examState.questions.length) * 100
        );

    const examResult = {

        exam: examState.name,

        score: score,

        total: examState.questions.length,

        percentage: percentage,

        date: new Date().toLocaleString()

    };

    const history = getHistory();

    history.push(examResult);

    localStorage.setItem(
        "examHistory",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "examScore",
        score
    );

    localStorage.setItem(
        "totalQuestions",
        examState.questions.length
    );

    goTo("result");
}


/* =========================================================
   RESULT
========================================================= */

function initResult() {

    const score =
        Number(localStorage.getItem("examScore")) || 0;

    const total =
        Number(localStorage.getItem("totalQuestions")) || 10;

    const percentage =
        Math.round((score / total) * 100);

    document.getElementById("score").textContent =
        score;

    document.getElementById("totalQuestions").textContent =
        total;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("percentageText").textContent =
        percentage + "%";

    const resultStatus =
        document.getElementById("resultStatus");

    const resultMessage =
        document.getElementById("resultMessage");

    if (percentage >= 40) {

        resultStatus.textContent =
            "Pass";

        resultStatus.className =
            "pass";

        resultMessage.textContent =
            "Congratulations! You passed the examination.";

    } else {

        resultStatus.textContent =
            "Fail";

        resultStatus.className =
            "fail";

        resultMessage.textContent =
            "You did not pass the examination. Keep practicing and try again.";
    }
}


/* =========================================================
   HISTORY
========================================================= */

function initHistory() {

    displayHistory();
}

function displayHistory() {

    const history = getHistory();


    if (history.length === 0) {

        historyContainer.innerHTML = `
            <div class="empty-history">
                <div class="empty-icon">
                    📋
                </div>

                <h2>
                    No Exam History
                </h2>

                <p>
                    You have not completed any examinations yet.
                </p>

                <a href="#dashboard" class="btn">
                    Take an Exam
                </a>
            </div>
        `;

        return;
    }


    let tableHTML = `

        <div class="history-table-container">

            <table class="history-table">

                <thead>

                    <tr>

                        <th>Exam</th>

                        <th>Score</th>

                        <th>Percentage</th>

                        <th>Status</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>
    `;


    history.forEach(function(result) {

        let status;

        if (result.percentage >= 40) {

            status =
                `<span class="status-pass">Pass</span>`;

        } else {

            status =
                `<span class="status-fail">Fail</span>`;
        }


        tableHTML += `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(result.exam)}
                    </strong>
                </td>

                <td>
                    ${result.score}/${result.total}
                </td>

                <td>
                    ${result.percentage}%
                </td>

                <td>
                    ${status}
                </td>

                <td>
                    ${escapeHTML(result.date)}
                </td>

            </tr>
        `;
    });


    tableHTML += `

                </tbody>

            </table>

        </div>
    `;


    historyContainer.innerHTML = tableHTML;
}

clearHistoryBtn.addEventListener(
    "click",
    function() {

        const confirmClear =
            confirm(
                "Are you sure you want to clear all exam history?"
            );


        if (confirmClear) {

            localStorage.removeItem("examHistory");

            localStorage.removeItem("examScore");

            localStorage.removeItem("totalQuestions");

            displayHistory();

            alert("Exam history cleared successfully.");
        }

    }
);


/* =========================================================
   START THE APP
========================================================= */

/* Which setup function runs when each page opens */
const viewInit = {
    login: initLogin,
    register: initRegister,
    dashboard: initDashboard,
    exams: initExams,
    instructions: initInstructions,
    exam: initExam,
    result: initResult,
    history: initHistory
};

window.addEventListener("hashchange", router);

router();