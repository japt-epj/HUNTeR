class Data {
    static getExercise(exerciseID) {
        let exerciseMap = new Map();
        exerciseMap.set('0123456789', {
            question: 'Was ist ein privater IPv4-Range?',
            answer1: '10.0.0.0/8',
            answer2: '172.16.0.0/12',
            answer3: '192.168.0.0/16',
            answer4: '127.0.0.0/8'
        });
        exerciseMap.set('1234567890', {
            question: 'Wer isch fett?',
            answer1: 'Am Pascal sis Mami.',
            answer2: 'Am Toby sis Mami',
            answer3: 'Am Jonas sis Mami',
            answer4: 'Am Pascal sis Mami'
        });
        exerciseMap.set('2345678901', {
            question: 'Was heisst 80 uf französisch?',
            answer1: 'quatre-vingts',
            answer2: 'huitante',
            answer3: 'octante',
            answer4: 'nonante'
        });
        return exerciseMap.get(exerciseID);
    }

    static getPathsTeacher() {
        return [
            {path: 'teacher/exercise', title: 'Aufgabe erstellen', component: 'Exercise', icon: 'tasks'},
            {
                path: 'teacher/exerciseOverview', title: 'Übersicht der Aufgaben',
                component: 'ExerciseOverview', icon: 'stack exchange'
            },
            {path: 'teacher/quiz', title: 'Quiz erstellen', component: 'Quiz', icon: 'tasks'},
            {
                path: 'teacher/quizOverview', title: 'Übersicht der Quizzes',
                component: 'QuizOverview', icon: 'stack exchange'
            }
        ];
    }

    static getPathsStudent() {
        return [
            {path: 'student/settings', title: 'Persönliches', component: 'Settings', icon: 'setting'},
            {path: 'student/scan', title: 'Aufgabe scannen', component: 'ScanExercise', icon: 'camera retro'},
            {path: 'student/score', title: 'Aktueller Score', component: 'Score', icon: 'trophy'}
        ];
    }

    static getQuiz(quizString) {
        let quizMap = new Map();
        quizMap.set('quiz1', {text: 'Quiz 1', exercises: 4, solvedExercises: 3, points: 10});
        quizMap.set('quiz2', {text: 'Quiz 2', exercises: 4, solvedExercises: 2, points: 6});
        quizMap.set('quiz3', {text: 'Quiz 3', exercises: 4, solvedExercises: 3, points: 9});
        quizMap.set('quiz4', {text: 'Quiz 4', exercises: 4, solvedExercises: 4, points: 12});
        return quizMap.get(quizString);
    }

    static getQuizzes() {
        return [
            {key: 'quiz1', value: 'quiz1', text: 'Quiz 1', title: 'IP-Adressen', score: '60%'},
            {key: 'quiz2', value: 'quiz2', text: 'Quiz 2', title: 'Transportmedien', score: '30%'},
            {key: 'quiz3', value: 'quiz3', text: 'Quiz 3', title: 'Wirtschaftsinformatik', score: '10%'},
            {key: 'quiz4', value: 'quiz4', text: 'Quiz 4', title: 'Business und Recht 2', score: '30%'}
        ]
    }

    static getExercises() {
        return [
            {
                key: 'exercise1',
                value: 'exercise1',
                text: 'Aufgabe 1',
                title: 'IP Adressen',
                score: '70%',
                qrCodeID: '9999'
            },
            {
                key: 'exercise2',
                value: 'exercise2',
                text: 'Aufgabe 2',
                title: 'Token Ring',
                score: '20%',
                qrCodeID: '1818'
            },
            {
                key: 'exercise3',
                value: 'exercise3',
                text: 'Aufgabe 3',
                title: 'Glasfaser',
                score: '40%',
                qrCodeID: '2018'
            },
            {key: 'exercise4', value: 'exercise4', text: 'Aufgabe 4', title: 'IPv6', score: '50%', qrCodeID: '8888'},
            {key: 'exercise5', value: 'exercise5', text: 'Aufgabe 5', title: 'IPv4', score: '60%', qrCodeID: '1994'}
        ];
    }

    static getProgress(quizString) {
        return {value: this.getQuiz(quizString).solvedExercises, total: this.getQuiz(quizString).exercises};
    }

    static getResults(quizString) {
        let quizMapping = new Map();
        quizMapping.set('quiz1',
            [
                {key: 'exercise1', correctAnswers: [false, true, true, false], userAnswers: [false, true, true, false]},
                {key: 'exercise2', correctAnswers: [true, false, true, true], userAnswers: [false, true, true, true]},
                {key: 'exercise3', correctAnswers: [true, false, true, false], userAnswers: [false, false, true, true]},
            ]
        );
        quizMapping.set('quiz2',
            [
                {key: 'exercise1', correctAnswers: [true, false, true, true], userAnswers: [true, false, true, false]},
                {key: 'exercise2', correctAnswers: [false, true, true, false], userAnswers: [false, true, true, false]},
            ]
        );
        quizMapping.set('quiz3',
            [
                {key: 'exercise1', correctAnswers: [true, false, true, true], userAnswers: [true, false, true, false]},
                {key: 'exercise2', correctAnswers: [false, true, true, false], userAnswers: [false, true, true, false]},
                {key: 'exercise3', correctAnswers: [false, false, true, true], userAnswers: [false, false, true, true]},
            ]
        );
        quizMapping.set('quiz4',
            [
                {key: 'exercise1', correctAnswers: [false, false, true, true], userAnswers: [true, false, true, false]},
                {key: 'exercise2', correctAnswers: [true, true, true, false], userAnswers: [false, true, true, true]},
                {key: 'exercise3', correctAnswers: [false, true, true, true], userAnswers: [true, false, true, true]},
                {key: 'exercise4', correctAnswers: [false, true, true, false], userAnswers: [false, true, false, true]},
            ]
        );
        return quizMapping.get(quizString);
    }

    static getLeaderboard() {
        return [
            {key: 'goldenUser', name: 'Andi Hörler', trophyColor: 'golden'},
            {key: 'silverUser', name: 'Jonas Kugler', trophyColor: 'silver'},
            {key: 'broncenUser', name: 'Pascal Hürlimann', trophyColor: 'bronce'},
        ];
    }
}

export default Data;