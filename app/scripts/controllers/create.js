import Task from 'scripts/entity/task';

class Create {
    constructor($scope, $routeParams, $translate, $mdToast, headContent, headerContent, taskManager) {
        headerContent.removeMainAction();

        $scope.saveTask = function () {
            if ($scope.taskForm.$valid) {
                if (!$scope.task.nextDate) {
                    var nextDate = new Date();
                    nextDate.setDate(nextDate.getDate()+$scope.task.periodicity);
                    $scope.task.nextDate = nextDate;
                }

                taskManager.save($scope.task).then(function (idTask) {
                    console.log('success save. Id : '+idTask);
                    $translate('create.task.saved').then(function (content) {
                        var toast = $mdToast.simple().textContent(content);
                        toast.position('top right');
                        $mdToast.show(toast);
                    });
                    window.history.back();
                });
            }
        };

        if ($routeParams.id) {
            // Edit mode.
            $translate('create.title_update').then(function (title) {
                headContent.setAdditionnalTitle(title);
            });

            taskManager.getById($routeParams.id).then(function (task) {
                $scope.task = task;
            });
        } else {
            // Create mode.
            $translate('create.title').then(function (title) {
                headContent.setAdditionnalTitle(title);
            });

            $scope.task = new Task();
        }

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        $scope.minDate = tomorrow;
    }
}

Create.$inject = ['$scope', '$routeParams', '$translate', '$mdToast', 'headContent', 'headerContent', 'taskManager'];

export default Create;