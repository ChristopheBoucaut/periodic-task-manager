// Manage the <head> HTML
class head {
    constructor($scope, headContent) {
        $scope.additionnalTitle = null;
        $scope.$on(headContent.EVENT_CHANGE_TITLE, function (event, additionnalTitle) {
            $scope.additionnalTitle = additionnalTitle;
        });
    }
}

head.$inject = ['$scope', 'headContent'];

export default head;