/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="app.ts" />

// Plug in routing
app.config(function ($routeProvider: ng.IRouteProvider) {
    console.log("In routeprovider");
    $routeProvider.when(
        "/page1",
        {
            templateUrl: "/scripts/app/page1.html"
        }
        ).when(
        "/page2",
        {
            templateUrl: "/scripts/app/page2.html"
        }
        ).when(
        "/quiz",
        {
            templateUrl: "/scripts/app/quiz.html",
            controller: "QuizModeCtrl"
        }
        ).when(
        "/browse",
        {
            templateUrl: "/scripts/app/browse.html",
            controller: "QuizCtrl"
        }
        ).otherwise(
        {
            redirectTo: '/browse'
        }
        );
});