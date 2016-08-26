import Task from 'scripts/entity/task';

class Homepage {
    constructor($scope, $location, headContent, headerContent, taskManager) {
        $scope.loadingTasks = true;
        $scope.errorLoadingTasks = false;
        $scope.tasks = [];

        headContent.resetTitle();

        headerContent.setMainAction(function () {
            $location.path('/create');
        }, 'global:create');

        taskManager.getAll().then(
            function (tasks) {
                var today = new Date();
                for (var i = 0; i < tasks.length; i++) {
                    var daysBeforeNextTime = (tasks[i].nextDate - today) / (24 * 60 * 60 * 1000);
                    tasks[i].daysBeforeNextTime = Math.ceil(daysBeforeNextTime);
                }

                $scope.loadingTasks = false;
                $scope.tasks = tasks;
            },
            function () {
                $scope.loadingTasks = false;
                $scope.errorLoadingTasks = true;
            }
        );
    }
}

Homepage.$inject = ['$scope', '$location', 'headContent', 'headerContent', 'taskManager'];

export default Homepage;