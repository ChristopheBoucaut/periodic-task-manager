import Task from 'scripts/entity/task';

class Homepage {
    constructor($scope, $translate, headContent, headerContent, taskManager) {
        $scope.loadingTasksHistory = true;
        $scope.errorLoadingTasksHistory = false;
        $scope.tasksHistory = [];

        headerContent.removeMainAction();

        $translate('history.title').then(function (title) {
            headContent.setAdditionnalTitle(title);
        });

        taskManager.getAllHistory().then(
            function (tasksHistory) {
                $scope.loadingTasks = false;
                $scope.tasksHistory = tasksHistory;
            },
            function () {
                $scope.loadingTasks = false;
                $scope.errorLoadingTasks = true;
            }
        );
    }
}

Homepage.$inject = ['$scope', '$translate', 'headContent', 'headerContent', 'taskManager'];

export default Homepage;