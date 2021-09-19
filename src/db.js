let db;

window.onload = function() {
    let request = window.indexedDB.open('quiz_app_db', 1);

    request.onsuccess = function() {
        db = request.result;
    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;

       // Creates the quiz
        let object_store = db.createObjectStore('quiz_set_db', { keyPath: 'id', autoIncrement: true});
        object_store.createIndex('quiz_title', 'title', { unique: false});
        object_store.createIndex('quiz_description', 'quiz_description', { unique: false});

        object_store = db.createObjectStore('question_db', { keyPath: 'id', autoIncrement: true});
        object_store.createIndex('quiz_id', 'quiz_id', {unique: false})
        object_store.createIndex('question_description', 'question_description', { unique: false});
        object_store.createIndex('right_answer', 'right_answer', { unique: false});

        object_store = db.createObjectStore('questions_ref_db', { keyPath: 'id', autoIncrement: true});
        object_store.createIndex('question_id', 'question_id', { unique: false});
        object_store.createIndex('question', 'question', { unique: false});
    }
}
