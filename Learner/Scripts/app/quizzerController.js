app.controller("QuizModeCtrl", ["$scope", "$location", function ($scope, $location) {
    console.log("initializing QuizModeCtrl");
    console.log($scope.selectionInfo);

    $scope.anotherTopic = function () {
        console.log("Another Topic");

        $scope.sortTopics();
        
        $scope.selectionInfo.selectedEntrySet = $scope.jsonified[0];
        $scope.quizOnArray($scope.selectionInfo.selectedEntrySet);
    };

    $scope.next = function () {
        console.log("Next clicked");
        $scope.selectionInfo.selectedEntryIndex++;
        //$scope.selectionInfo.selectedEntry = $scope.selectionInfo.selectedEntrySet[$scope.selectionInfo.selectedEntryIndex];

        if ($scope.selectionInfo.selectedEntryIndex >= $scope.selectionInfo.selectedEntrySet.entries.length)
            $location.path("/browse");
    };

    $scope.deleteEntry = function () {
        console.log("About to delete");

        var entryParent = $scope.selectionInfo.selectedEntrySet;
        var entry = $scope.selectionInfo.selectedEntry;

        entryParent.entries.splice(entryParent.entries.indexOf(entry), 1);

        $scope.next();
    };

    $scope.google = function () {
        console.log("About to Google");
        window.open("https://www.google.com/?q=" + $scope.selectionInfo.selectedEntry.text, '_blank');
    };
}]);

app.controller("QuizCtrl", ["$scope", "$location", function ($scope, $location) {
    console.log("initializing outer QuizModeCtrl");

    $scope.jsonified = jsonified;


    $scope.jsonified.forEach(function (item) {
        item.entries = item.entries.filter(function (item, index) {
            return (item.text.length > 0);
        });
    });

    console.log("Randomizing order of sets");

    $scope.sortTopics = function () {
        fisherYates($scope.jsonified);
    };

    $scope.sortTopics();
    





    if (!$scope.selectionInfo)
        $scope.selectionInfo = {
            selectedEntrySet: null,
            selectedEntry: null,
            selectedEntryIndex: -1
        };
    
    $scope.editMode = false;

    $scope.init = function () {
        console.log("Initting");

    };

    $scope.openTopic = function (topic) {
        $scope.editMode = false;

        $scope.quizOnArray(topic);
        //$location.path("/quiz");
        location.hash = "quiz";
    };

    $scope.quizOnArray = function (element) {
        console.debug("About to quiz");

        $scope.selectionInfo.selectedEntrySet = element;

        fisherYates($scope.selectionInfo.selectedEntrySet);
        $scope.selectionInfo.selectedEntryIndex = 0;
        $scope.selectionInfo.selectedEntry = $scope.selectionInfo.selectedEntrySet.entries[$scope.selectionInfo.selectedEntryIndex];
    };

    $scope.$watch("selectionInfo.selectedEntryIndex", function (newValue, oldValue) {
        console.log("selectionInfo.selectedEntryIndex " + newValue);

        if ($scope.selectionInfo.selectedEntrySet)
            $scope.selectionInfo.selectedEntry = $scope.selectionInfo.selectedEntrySet.entries[newValue];
    });

    $scope.editSelected = function (entry) {
        console.log("Editing");

        $scope.selectionInfo.selectedEntrySet = entry;
        $scope.editMode = true;
    };

    $scope.recreateJson = function () {
        var output = jsonified.map(
            function (entry) {
                return {
                    name: entry.name,
                    dateReviewed: new Date(),
                    entries: entry.entries
                };
            });

        console.log(angular.toJson(output));
    };

    $scope.getScope = function () {
        var x = {
            selectedEntry: $scope.selectionInfo.selectedEntry,
            setName: $scope.selectionInfo.selectedEntrySet ? $scope.selectionInfo.selectedEntrySet.name : "",
            selectedEntrySetLength: $scope.selectionInfo.selectedEntrySet ? $scope.selectionInfo.selectedEntrySet.entries.length : 1,
            selectedEntryIndex: $scope.selectionInfo.selectedEntryIndex
        };

        return x;
    };

    $scope.initAddMode = function () {
        $scope.addMode = true;

    };

    $scope.add = function () {
        console.log("Adding content");

        var newContent = $scope.newContent;
        var newContentAsArray = $scope.newContent.split("\n");

        console.log(newContentAsArray);
        var output = newContentAsArray.map(
            function (entry) {
                return {
                    name: entry.name,
                    dateReviewed: new Date(),
                    entries: entry.entries
                };
            });

        var newSet = { name: $scope.entryName, dateReviewed: new Date(), entries: newContentAsArray.map(function (entry) { return { text: entry }; }) };

        $scope.jsonified.push(newSet);

        // Hide
        $scope.entryName = "";
        $scope.newContent = "";
        $scope.addMode = false;
    };

    $scope.newestFirst = function () {
        $scope.jsonified.sort(function (a, b) {
            return a.dateReviewed < b.dateReviewed;
        });
    };
}]);
