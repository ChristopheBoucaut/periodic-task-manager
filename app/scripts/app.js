import controllersModule from 'scripts/controllers';
import servicesModule from 'scripts/services';
import Task from 'scripts/entity/task';
import TaskHistory from 'scripts/entity/taskHistory';

var nameModule = 'periodicTaskManager';

var mainModule = angular.module(nameModule, [
    controllersModule,
    servicesModule,
    'ngMessages',
    'ngRoute',
    'ngMaterial',
    'pascalprecht.translate',
]);

// Config router.
mainModule.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when(
                '/',
                {
                    controller: 'HomepageController',
                    templateUrl: 'homepage.html'
                }
            )
            .when(
                '/create/:id?',
                {
                    controller: 'CreateController',
                    templateUrl: 'create.html'
                }
            )
            .when(
                '/history',
                {
                    controller: 'HistoryController',
                    templateUrl: 'history.html'
                }
            )
            .otherwise({ redirectTo: '/' });
    }
]);

// config translate module.
mainModule.config([
    '$translateProvider',
    function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'translation.',
            suffix: '.json'
        });

        $translateProvider.determinePreferredLanguage(determinePreferredLanguage);
        $translateProvider.useSanitizeValueStrategy('escape');

        /**
         * Determine the preferred language for the user.
         *
         * @return string Return the language.
         */
        function determinePreferredLanguage() {
            var listLang = new Array('fr');

            var currentLang = navigator.language.substr(0,2);

            if (listLang.indexOf(currentLang) > -1) {
                return currentLang;
            } else {
                return 'fr';
            }
        }
    }
]);

mainModule.config(['$mdThemingProvider',function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red')
        .warnPalette('deep-orange')
        .dark();
}]);

mainModule.config(['$mdIconProvider', function ($mdIconProvider) {
    var defaultPathIcons = 'img/icons/';
    $mdIconProvider
        .icon('global:menu', defaultPathIcons+'menu.svg')
        .icon('global:search', defaultPathIcons+'search.svg')
        .icon('global:create', defaultPathIcons+'create.svg')
        .icon('global:check', defaultPathIcons+'check.svg')
        .icon('global:next', defaultPathIcons+'next.svg')
        .icon('global:delete', defaultPathIcons+'delete.svg')
        .icon('global:back', defaultPathIcons+'back.svg');
}]);

mainModule.config(['$mdDateLocaleProvider', function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        date = new Date(date);

        return date.toLocaleDateString();
    };
}]);

mainModule.config(['storageProvider', function (storageProvider) {
    storageProvider.addEntity(Task, function (name, db) {
        var objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    });
    storageProvider.addEntity(TaskHistory, function (name, db) {
        var objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    });
}]);

mainModule.run(function () {
    // Register serviceWorker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
});

export default nameModule;