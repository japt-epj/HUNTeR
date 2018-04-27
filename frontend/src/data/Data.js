export default {
    getPathsTeacher() {
        return [
            {path: 'exercise', title: 'Aufgabe erstellen', component: 'ParticipantExercise', icon: 'tasks'},
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
            {path: 'newUser', title: 'Schüler erstellen', component: 'TeacherNewParticipant', icon: 'add user'},
        ];
    },

    getPathsParticipant() {
        return [
            {path: 'settings', title: 'Persönliches', component: 'Settings', icon: 'setting'},
            {path: 'scan', title: 'Aufgabe scannen', component: 'ParticipantScanExercise', icon: 'camera retro'},
            {path: 'score', title: 'Aktueller ParticipantScore', component: 'ParticipantScore', icon: 'trophy'}
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

    getProgress(quizString) {
        return {value: this.getQuiz(quizString).solvedExercises, total: this.getQuiz(quizString).exercises};
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
    }
}