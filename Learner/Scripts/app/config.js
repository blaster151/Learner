app.config(function ($routeProvider) {
    console.log("In routeprovider");
    $routeProvider.when("/page1", {
        templateUrl: "/scripts/app/page1.html"
    }).when("/page2", {
        templateUrl: "/scripts/app/page2.html"
    }).when("/quiz", {
        templateUrl: "/scripts/app/quiz.html",
        controller: "QuizModeCtrl"
    }).when("/browse", {
        templateUrl: "/scripts/app/browse.html",
        controller: "QuizCtrl"
    }).otherwise({
        redirectTo: '/browse'
    });
});
