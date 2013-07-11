var jsonified;

function fisherYates(myArray) {
    var i = myArray.length, j, tempi, tempj;
    if (i == 0)
        return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        tempi = myArray[i];
        tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}
;

app.controller("QuizModeCtrl", [
    "$scope",
    "$location",
    "$log",
    function ($scope, $location, $log) {
        $log.info("initializing QuizModeCtrl");
        $log.info($scope.selectionInfo);

        $scope.anotherTopic = function () {
            $log.info("Another Topic");

            $scope.sortTopics();

            $scope.selectionInfo.selectedEntrySet = $scope.jsonified[0];
            $scope.quizOnArray($scope.selectionInfo.selectedEntrySet);
        };

        var addStuff = function (x, y) {
            return x + y;
        };

        $scope.next = function () {
            $log.info("Next clicked");
            $scope.selectionInfo.selectedEntryIndex++;

            if ($scope.selectionInfo.selectedEntryIndex >= $scope.selectionInfo.selectedEntrySet.entries.length)
                $location.path("/browse");
        };

        $scope.deleteEntry = function () {
            $log.info("About to delete");

            var entryParent = $scope.selectionInfo.selectedEntrySet;
            var entry = $scope.selectionInfo.selectedEntry;

            entryParent.entries.splice(entryParent.entries.indexOf(entry), 1);

            $scope.next();
        };

        $scope.google = function () {
            $log.info("About to Google");
            window.open("https://www.google.com/?q=" + $scope.selectionInfo.selectedEntry.text, '_blank');
        };
    }
]);

app.controller("QuizCtrl", [
    "$scope",
    "$location",
    "$log",
    function ($scope, $location, $log) {
        $log.info("initializing outer QuizModeCtrl");

        $scope.jsonified = jsonified;

        $scope.jsonified.forEach(function (item) {
            item.entries = item.entries.filter(function (item, index) {
                return (item.text.length > 0);
            });
        });

        $log.info("Randomizing order of sets");

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
            $log.info("Initting");
        };

        $scope.openTopic = function (topic) {
            $scope.editMode = false;

            $scope.quizOnArray(topic);

            location.hash = "quiz";
        };

        $scope.quizOnArray = function (element) {
            $log.info("About to quiz");

            $scope.selectionInfo.selectedEntrySet = element;

            fisherYates($scope.selectionInfo.selectedEntrySet);
            $scope.selectionInfo.selectedEntryIndex = 0;
            $scope.selectionInfo.selectedEntry = $scope.selectionInfo.selectedEntrySet.entries[$scope.selectionInfo.selectedEntryIndex];
        };

        $scope.$watch("selectionInfo.selectedEntryIndex", function (newValue, oldValue) {
            $log.info("selectionInfo.selectedEntryIndex " + newValue);

            if ($scope.selectionInfo.selectedEntrySet)
                $scope.selectionInfo.selectedEntry = $scope.selectionInfo.selectedEntrySet.entries[newValue];
        });

        $scope.editSelected = function (entry) {
            $log.info("Editing");

            $scope.selectionInfo.selectedEntrySet = entry;
            $scope.editMode = true;
        };

        $scope.recreateJson = function () {
            var output = jsonified.map(function (entry) {
                return {
                    name: entry.name,
                    dateReviewed: new Date(),
                    entries: entry.entries
                };
            });

            $log.info(angular.toJson(output));
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
            $log.info("Adding content");

            var newContent = $scope.newContent;
            var newContentAsArray = $scope.newContent.split("\n");

            $log.info(newContentAsArray);
            var output = newContentAsArray.map(function (entry) {
                return {
                    name: entry.name,
                    dateReviewed: new Date(),
                    entries: entry.entries
                };
            });

            var newSet = { name: $scope.entryName, dateReviewed: new Date(), entries: newContentAsArray.map(function (entry) {
                    return { text: entry };
                }) };

            $scope.jsonified.push(newSet);

            $scope.entryName = "";
            $scope.newContent = "";
            $scope.addMode = false;
        };

        $scope.newestFirst = function () {
            $scope.jsonified.sort(function (a, b) {
                return (getDate(b.dateReviewed)) - (getDate(a.dateReviewed));
            });

            function getDate(dateValue) {
                if (dateValue) {
                    return new Date(dateValue.toString());
                } else {
                    return new Date("01/01/2001");
                }
            }
        };
    }
]);

var Topic = (function () {
    function Topic() {
    }
    return Topic;
})();

var Entry = (function () {
    function Entry() {
    }
    return Entry;
})();

var SelectionInfo = (function () {
    function SelectionInfo() {
    }
    return SelectionInfo;
})();
