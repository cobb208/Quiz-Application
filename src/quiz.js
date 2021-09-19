const mainCanvas = document.getElementById('mainCanvas');



/// Create area

const make_button = document.getElementById('make_button');

make_button.addEventListener('click', function() {
    let quiz_title = '';
    let quiz_description = '';
    mainCanvas.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Create a Quiz</h3>
                </div>
            </div>
            <div id="main_create_area" class="row mb-3">
                <div class="col">
                    <div>
                        <div class="mb-3">
                            <label for="quiz_title" class="form-label">Quiz Title</label>
                            <input id="quiz_title" class="form-control" type="text" />
                        </div>
                        <div class="mb-3">
                             <label for="quiz_description" class="form-label">Quiz Description</label>
                            <textarea id="quiz_description" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <button id="nextBtn" class="btn btn-primary">Next</button>
            </div>
        </div>
    `;

    const main_create_area = document.getElementById('main_create_area');
    const quiz_title_input = document.getElementById('quiz_title')
    const quiz_description_input = document.getElementById('quiz_description');


    const nextBtn = document.getElementById('nextBtn');


    nextBtn.addEventListener('click', function() {
        if(quiz_title_input.value.trim() === '' || quiz_description_input.value.trim() === '') {
            let h4 = document.createElement('h4');
            h4.classList.add('text-danger');
            h4.textContent = "Please give your quiz a title and description";
            main_create_area.getElementsByClassName('col')[0].prepend(h4);
            return;
        }
        quiz_title = quiz_title_input.value.trim().toLowerCase();
        quiz_description = quiz_description_input.value.trim().toLowerCase();


        function html_answer_container() {
            const li1 = document.createElement('li');
            li1.classList.add('list-group-item');

            const input1 = document.createElement('input');
            input1.classList.add('form-control');
            input1.setAttribute('type', 'text');
            input1.setAttribute('placeholder', 'Answer');

            li1.appendChild(input1);

            return li1;

        }

        function html_question_container() {
            const container = document.createElement('li');
            container.classList.add('list-group-item', 'mb-3');

            const div1 = document.createElement('div');
            div1.classList.add('mb-3');

            const label1 = document.createElement('label');
            label1.classList.add('form-label', 'fw-bold');
            label1.textContent = 'What is Your Question?';

            const input1 = document.createElement('input');
            input1.classList.add('form-control', 'question_input');
            input1.setAttribute('type', 'text');
            input1.setAttribute('placeholder', 'Question');

            div1.appendChild(label1);
            div1.appendChild(input1);

            container.appendChild(div1);

            const div2 = document.createElement('div');
            div2.classList.add('mb-3');

            const ul1 = document.createElement('ul');
            ul1.classList.add('list-group-item', 'mb-3');

            ul1.appendChild(html_answer_container());

            const button1 = document.createElement('button');
            button1.classList.add('btn', 'btn-primary', 'addAnswer');
            button1.textContent = 'Add an Answer';

            div2.appendChild(ul1);
            div2.appendChild(button1);

            container.appendChild(div2);

            button1.addEventListener('click', function (e) {
                e.target.previousSibling.appendChild(html_answer_container());
            })

            return container;

        }


        main_create_area.innerHTML = `
            <div class="col">
                <h4>Add Some Questions</h4>
                <ul id="question_container" class="list-group">
                </ul>
                <button id="add_question_btn" class="btn btn-primary">Add a question</button>
            </div>
        `;

        const question_container = document.getElementById('question_container');
        question_container.appendChild(html_question_container());
        const add_question_btn = document.getElementById('add_question_btn');

        add_question_btn.addEventListener('click', function() {

            question_container.append(html_question_container());
        });

        nextBtn.addEventListener('click', function() {
            const draft_questions = question_container.getElementsByClassName('question_input');
            let draft_questions_array = function() {
                let arr = [];
                for(item of draft_questions) {
                    arr.push(item);
                }

                return arr;

            }




            mainCanvas.innerHTML = `
                <h2>Review for, ${quiz_title}</h2>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            ${draft_questions_array().map(question => {
                                return `
                                    <div>${question.value}</div>
                                `
            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        })


    })
})


/// End Create Area





const startBtn = document.getElementById('startBtn');
const question1 = new Question(1, 'First Question', 'multiple', 'How many sides does a square have?', ['1', '2', '3', '4'], '4');
const question2 = new Question(2, 'Second Question', 'multiple', 'How many sides does a triangle have?', ['1', '2', '3', '4'], '3');
const question3 = new Question(3,'Third Question', 'multiple', 'How many sides does a octagon have?', ['8', '2', '3', '4'], '8');
const questions = [question1, question2, question3];

let answers = [];
let index = 0;

startBtn.addEventListener('click', function() {
    question_Change();
});

function question_Change() {
    mainCanvas.innerHTML = create_question(questions[index]);

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
    mainCanvas.innerHTML = '<button id="submitBtn" class="btn btn-success">Submit your Results</button>';
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();

        let right_answers = grade_user_answers();

        mainCanvas.innerHTML = `
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
