class Header {
    constructor($scope, $location, $mdSidenav, headContent, headerContent) {
        $scope.title = null;
        $scope.mainAction = null;
        $scope.isHome = true;
        $scope.$on(headContent.EVENT_CHANGE_TITLE, function (event, title) {
            $scope.title = title;
        });
        $scope.$on(headerContent.EVENT_CHANGE_MAIN_ACTION, function (event, mainAction) {
            $scope.mainAction = mainAction;
        });

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };

        $scope.backHome = function() {
            $location.path('/');
        };

        $scope.$on('$routeChangeSuccess', function () {
            if ($location.path() === '/') {
                $scope.isHome = true;
            } else {
                $scope.isHome = false;
            }
        });
    }
}

Header.$inject = ['$scope', '$location', '$mdSidenav', 'headContent', 'headerContent'];

export default Header;