export default {
    getPathsTeacher() {
        return [
            {path: 'exercise', title: 'Aufgabe erstellen', component: 'StudentExercise', icon: 'tasks'},
            {
                path: 'exerciseOverview',
                title: 'Übersicht der Aufgaben',
                component: 'TeacherExerciseOverview',
                icon: 'stack exchange'
            },
            {path: 'quiz', title: 'Quiz erstellen', component: 'Quiz', icon: 'tasks'},
            {
                path: 'quizOverview', title: 'Übersicht der Quizzes',
                component: 'TeacherQuizOverview', icon: 'stack exchange'
            },
            {path: 'execution', title: 'Ausführung erstellen', component: 'TeacherExecution', icon: 'calendar'},
            {path: 'newUser', title: 'Schüler erstellen', component: 'TeacherNewStudent', icon: 'add user'},
        ];
    },

    getPathsStudent() {
        return [
            {path: 'settings', title: 'Persönliches', component: 'Settings', icon: 'setting'},
            {path: 'scan', title: 'Aufgabe scannen', component: 'StudentScanExercise', icon: 'camera retro'},
            {path: 'score', title: 'Aktueller StudentScore', component: 'StudentScore', icon: 'trophy'}
        ];
    },

    getQuiz(quizString) {
        let quizMap = new Map();
        quizMap.set('quiz1', {text: 'Quiz 1', exercises: 4, solvedExercises: 3, points: 10});
        quizMap.set('quiz2', {text: 'Quiz 2', exercises: 4, solvedExercises: 2, points: 6});
        quizMap.set('quiz3', {text: 'Quiz 3', exercises: 4, solvedExercises: 3, points: 9});
        quizMap.set('quiz4', {text: 'Quiz 4', exercises: 4, solvedExercises: 4, points: 12});
        return quizMap.get(quizString);
    },

    getQuizzes() {
        return [
            {key: 'quiz1', value: 'quiz1', text: 'Quiz 1', title: 'IP-Adressen', score: '60%'},
            {key: 'quiz2', value: 'quiz2', text: 'Quiz 2', title: 'Transportmedien', score: '30%'},
            {key: 'quiz3', value: 'quiz3', text: 'Quiz 3', title: 'Wirtschaftsinformatik', score: '10%'},
            {key: 'quiz4', value: 'quiz4', text: 'Quiz 4', title: 'Business und Recht 2', score: '30%'}
        ]
    },

    getProgress(quizString) {
        return {value: this.getQuiz(quizString).solvedExercises, total: this.getQuiz(quizString).exercises};
    },

    getStudents(quizString) {
        return [
            {
                key: 'student1',
                email: 'schlaubi.schlumpf@gmail.com'
            }
        ]
    },

    getResults(quizString) {
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
    },

    getLeaderBoard() {
        return [
            {key: 'goldenUser', name: 'Andi Hörler', score: '99%', trophyColor: 'golden'},
            {key: 'silverUser', name: 'Jonas Kugler', score: '90%', trophyColor: 'silver'},
            {key: 'broncenUser', name: 'Pascal Hürlimann', score: '80%', trophyColor: 'bronce'},
        ];
    },

    getDateOptions() {
        return [
            {key: '2hours', text: 'Nächste zwei Stunden', value: {size: 2, dimension: 'hours'}},
            {key: '4hours', text: 'Nächste vier Stunden', value: {size: 4, dimension: 'hours'}},
            {key: '1day', text: 'Nächster Tag', value: {size: 1, dimension: 'days'}},
            {key: '2day', text: 'Nächsten zwei Tage', value: {size: 2, dimension: 'days'}},
            {key: '3days', text: 'Nächsten drei Tage', value: {size: 3, dimension: 'days'}},
            {key: '1week', text: 'Nächste Woche', value: {size: 1, dimension: 'weeks'}},
            {key: '2week', text: 'Nächsten zwei Wochen', value: {size: 2, dimension: 'weeks'}},
        ];
    }
}