export default class Data {
    static getPathsTeacher() {
        return [
            {path: 'exercise', title: 'Aufgabe erstellen', component: 'StudentExercise', icon: 'tasks'},
            {
                path: 'exerciseOverview',
                title: 'Übersicht der Aufgaben',
                component: 'TeacherExercisesOverview',
                icon: 'stack exchange'
            },
            {path: 'quiz', title: 'Quiz erstellen', component: 'Quiz', icon: 'tasks'},
            {
                path: 'quizOverview', title: 'Übersicht der Quizzes',
                component: 'TeacherQuizOverview', icon: 'stack exchange'
            }
        ];
    }

    static getPathsStudent() {
        return [
            {path: 'settings', title: 'Persönliches', component: 'Settings', icon: 'setting'},
            {path: 'scan', title: 'Aufgabe scannen', component: 'StudentScanExercise', icon: 'camera retro'},
            {path: 'score', title: 'Aktueller StudentScore', component: 'StudentScore', icon: 'trophy'}
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

    static getLeaderBoard() {
        return [
            {key: 'goldenUser', name: 'Andi Hörler', score: '99%', trophyColor: 'golden'},
            {key: 'silverUser', name: 'Jonas Kugler', score: '90%', trophyColor: 'silver'},
            {key: 'broncenUser', name: 'Pascal Hürlimann', score: '80%', trophyColor: 'bronce'},
        ];
    }
}