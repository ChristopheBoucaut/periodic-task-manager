import Task from 'scripts/entity/task';

class Homepage {
    constructor($scope, $location, headContent, headerContent, taskManager) {
        var that = this;
        this.taskManager = taskManager;
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
                    tasks[i].daysBeforeNextTime = that.determineDaysBeforeNextTime(today, tasks[i].nextDate);
                }

                $scope.loadingTasks = false;
                $scope.tasks = tasks;
            },
            function () {
                $scope.loadingTasks = false;
                $scope.errorLoadingTasks = true;
            }
        );

        $scope.check = function (task) {
            that.validTask(task);
            // Save in history.
        };

        $scope.report = function (task) {
            that.validTask(task);
        };

        $scope.delete = function ($index) {
            var task = $scope.tasks[$index];
            taskManager.delete(task.id).then(function () {
                $scope.tasks.splice($index, 1);
            });
        };
    }

    validTask(task) {
        var nextDate = new Date();
        nextDate.setDate(nextDate.getDate()+task.periodicity);
        task.nextDate = nextDate;
        task.daysBeforeNextTime = this.determineDaysBeforeNextTime(new Date(), task.nextDate);

        // Update BDD
        this.taskManager.save(task);
    }

    determineDaysBeforeNextTime(today, nextDate) {
        return Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
    }
}

Homepage.$inject = ['$scope', '$location', 'headContent', 'headerContent', 'taskManager'];

export default Homepage;