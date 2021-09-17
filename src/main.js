const mainForm = document.getElementById('mainForm');
const startBtn = document.getElementById('startBtn');
const question1 = new Question(1, 'First Question', 'multiple', 'How many sides does a square have?', ['1', '2', '3', '4'], '4');
const question2 = new Question(2, 'Second Question', 'multiple', 'How many sides does a triangle have?', ['1', '2', '3', '4'], '3');
const question3 = new Question(3,'Third Question', 'multiple', 'How many sides does a octagon have?', ['8', '2', '3', '4'], '8');
const questions = [question1, question2, question3];

let answers = [];
let index = 0;

startBtn.addEventListener('click', function(e) {
    e.preventDefault();
    question_Change();
});

function question_Change() {
    mainForm.innerHTML = create_question(questions[index]);

    let question_blocks = document.getElementsByName('question');

    question_blocks.forEach(question_b => {
        question_b.addEventListener('click', () => {
            document.getElementById('nextBtn').disabled = false;
        });
    })

    document.getElementById('nextBtn').addEventListener('click', function(e) {
        e.preventDefault();

        update_user_answers();

        increment_index();
        if(index < questions.length) {
            question_Change();
        } else {
            endOfQuiz();
        }

    });
}

function increment_index() {
    index++;
}

function endOfQuiz() {
    mainForm.innerHTML = '<button id="submitBtn" class="btn btn-success">Submit your Results</button>';
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();

        let right_answers = grade_user_answers();

        mainForm.innerHTML = `
            <h3>Quiz Complete, Thank You!</h3>
            <p>You got ${right_answers} correct out of ${questions.length}</p>
        `;
    });
}

function create_question(question) {
    return `
<div class="container">
    <div class="row">
        <div class="col">
            <h3>${question.title}</h3>
        </div>
    </div>
    <div class="row">
        <p>${question.question}</p>
    </div>
    <div class="row">
        <div class="col">
            ${create_multiple_choice_question(question)}
        </div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <button id="nextBtn" class="btn btn-primary" disabled>Next Question</button>
        </div>
    </div>
</div>    
`
}

function create_multiple_choice_question(question) {
    return question.answers.map(answer => {
        return `
            <div class="form-check">
                <input class="form-check-input" data-question="${question.id}" id="choice_${answer}" type="radio" name="question" value="${answer}">
                <label class="form-check-label" for="choice_${answer}">
                ${answer}
                </label>
            </div>  
        `
    }).join('');

}

function update_user_answers() {
    let user_answer = document.getElementsByName('question');
    if(user_answer) {
        for(let i = 0; i < user_answer.length; i++) {
            if(user_answer[i].checked) {
                answers.push(new QuestionAnswer(user_answer[i].dataset.question, user_answer[i].value));
            }
        }
    }
}

function grade_user_answers() {
    let right_answer = 0;

    answers.forEach(answer => {
        questions.forEach(question => {
            if(answer.question_id.toString() === question.id.toString()) {
                if(answer.question_answer.toString() === question.right_answer.toString()) {
                    right_answer++;
                }
            }
        });
    });

    return right_answer;
}
