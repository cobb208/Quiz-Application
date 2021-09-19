function Question(id, title, type, question, answers, right_answer = null) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.question = question;
    this.answers = answers;
    this.right_answer = right_answer;
}

function QuestionAnswer(question_id, question_answer) {
    this.question_id = question_id;
    this.question_answer = question_answer;
}


class QuizSet {
    constructor(quiz_title, quiz_description, questions) {
        this.quiz_title = quiz_title;
        this.quiz_description = quiz_description;
        this.questions = questions;
    }

}