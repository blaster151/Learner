// Plug in routing
app.config(function ($routeProvider) {
    console.log("In routeprovider");
    $routeProvider.when(
        "/page1",
        {
            templateUrl: "http://localhost:23253/scripts/app/page1.html"
        }
    ).when(
        "/page2",
        {
            templateUrl: "http://localhost:23253/scripts/app/page2.html"
        }
    ).when(
        "/quiz",
        {
            templateUrl: "http://localhost:23253/scripts/app/quiz.html",
            controller: "QuizModeCtrl"
        }
    ).when(
        "/browse",
        {
            templateUrl: "http://localhost:23253/scripts/app/browse.html",
            controller: "QuizCtrl"
        }
    ).otherwise(
        {
            templateUrl: "http://localhost:23253/scripts/app/browse.html",
            controller: "QuizCtrl"
}
    );
});