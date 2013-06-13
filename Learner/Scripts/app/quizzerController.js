function QuizCtrl($scope) {
    $scope.jsonified = jsonified;
    $scope.selectedEntry = null;
    $scope.selectedEntryIndex = -1;
    $scope.editMode = false;

    $scope.init = function () {
        console.log("Initting");

        $scope.jsonified.forEach(function (item) {
            item.entries = item.entries.filter(function (item, index) {
                return (item.text.length > 0);
            });
        });

        console.log("Randomizing order of sets");
        $scope.sortTopics();
    };

    $scope.openTopic = function (element) {
        $scope.editMode = false;

        $scope.quizOnArray(element);

    };

    $scope.quizOnArray = function (element) {
        console.debug("About to quiz");

        fisherYates(element.entries);

        $scope.selectedEntrySet = element;
        $scope.selectedEntryIndex = 0;
        $scope.selectedEntry = $scope.selectedEntrySet.entries[$scope.selectedEntryIndex];
    };

    $scope.sortTopics = function () {
        fisherYates($scope.jsonified);
    };

    $scope.anotherTopic = function () {
        $scope.sortTopics();

        $scope.selectedEntrySet = $scope.jsonified[0];
        $scope.quizOnArray($scope.selectedEntrySet);
    };

    $scope.showEntry = function (entry) {
        $scope.selectedEntry = entry;
    };

    $scope.next = function () {
        $scope.selectedEntryIndex++;
    };

    $scope.$watch("selectedEntryIndex", function (newValue, oldValue) {
        console.log("selectedEntryIndex " + newValue);
        if ($scope.selectedEntrySet && newValue > $scope.selectedEntrySet.length) {
            $scope.selectedEntry = null;
            $scope.selectedEntryIndex = -1;
            $scope.selectedEntrySet = null;
            return;
        }

        if ($scope.selectedEntrySet)
            $scope.selectedEntry = $scope.selectedEntrySet.entries[newValue];
    });

    $scope.editSelected = function (entry) {
        console.log("Editing");

        $scope.selectedEntrySet = entry;
        $scope.editMode = true;
    };

    $scope.deleteEntry = function (entryParent, entry) {
        console.log("About to delete");
        console.log(entry);

        entryParent.entries.splice(entryParent.entries.indexOf(entry), 1);

        $scope.next();
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
            selectedEntry: $scope.selectedEntry,
            setName: $scope.selectedEntrySet ? $scope.selectedEntrySet.name : "",
            selectedEntrySetLength: $scope.selectedEntrySet ? $scope.selectedEntrySet.entries.length : 1,
            selectedEntryIndex: $scope.selectedEntryIndex
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

    $scope.selectedEntry = null;

    $scope.newestFirst = function () {
        $scope.jsonified.sort(function (a, b) {
            return a.dateReviewed < b.dateReviewed;
        });
    };
}
