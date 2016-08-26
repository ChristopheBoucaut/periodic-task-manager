(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("scripts/app.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _controllers = require('scripts/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _services = require('scripts/services');

var _services2 = _interopRequireDefault(_services);

var _task = require('scripts/entity/task');

var _task2 = _interopRequireDefault(_task);

var _taskHistory = require('scripts/entity/taskHistory');

var _taskHistory2 = _interopRequireDefault(_taskHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nameModule = 'periodicTaskManager';

var mainModule = angular.module(nameModule, [_controllers2.default, _services2.default, 'ngMessages', 'ngRoute', 'ngMaterial', 'pascalprecht.translate']);

// Config router.
mainModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomepageController',
        templateUrl: 'homepage.html'
    }).when('/create/:id?', {
        controller: 'CreateController',
        templateUrl: 'create.html'
    }).when('/history', {
        controller: 'HistoryController',
        templateUrl: 'history.html'
    }).otherwise({ redirectTo: '/' });
}]);

// config translate module.
mainModule.config(['$translateProvider', function ($translateProvider) {
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

        var currentLang = navigator.language.substr(0, 2);

        if (listLang.indexOf(currentLang) > -1) {
            return currentLang;
        } else {
            return 'fr';
        }
    }
}]);

mainModule.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('red').warnPalette('deep-orange').dark();
}]);

mainModule.config(['$mdIconProvider', function ($mdIconProvider) {
    var defaultPathIcons = 'img/icons/';
    $mdIconProvider.icon('global:menu', defaultPathIcons + 'menu.svg').icon('global:search', defaultPathIcons + 'search.svg').icon('global:create', defaultPathIcons + 'create.svg').icon('global:check', defaultPathIcons + 'check.svg').icon('global:next', defaultPathIcons + 'next.svg').icon('global:delete', defaultPathIcons + 'delete.svg').icon('global:back', defaultPathIcons + 'back.svg');
}]);

mainModule.config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        date = new Date(date);

        return date.toLocaleDateString();
    };
}]);

mainModule.config(['storageProvider', function (storageProvider) {
    storageProvider.addEntity(_task2.default, function (name, db) {
        var objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    });
    storageProvider.addEntity(_taskHistory2.default, function (name, db) {
        var objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    });
}]);

exports.default = nameModule;
});

require.register("scripts/controllers.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _homepage = require('scripts/controllers/homepage');

var _homepage2 = _interopRequireDefault(_homepage);

var _create = require('scripts/controllers/create');

var _create2 = _interopRequireDefault(_create);

var _history = require('scripts/controllers/history');

var _history2 = _interopRequireDefault(_history);

var _head = require('scripts/controllers/head');

var _head2 = _interopRequireDefault(_head);

var _header = require('scripts/controllers/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nameModule = 'periodicTaskManager.controllers';

var controllersModule = angular.module(nameModule, []);

controllersModule.controller('HomepageController', _homepage2.default);
controllersModule.controller('CreateController', _create2.default);
controllersModule.controller('HistoryController', _history2.default);
controllersModule.controller('HeadController', _head2.default);
controllersModule.controller('HeaderController', _header2.default);

exports.default = nameModule;
});

require.register("scripts/controllers/create.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('scripts/entity/task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Create = function Create($scope, $routeParams, $translate, $mdToast, headContent, headerContent, taskManager) {
    _classCallCheck(this, Create);

    headerContent.removeMainAction();

    $scope.saveTask = function () {
        if ($scope.taskForm.$valid) {
            if (!$scope.task.nextDate) {
                var nextDate = new Date();
                nextDate.setDate(nextDate.getDate() + $scope.task.periodicity);
                $scope.task.nextDate = nextDate;
            }

            taskManager.save($scope.task).then(function (idTask) {
                console.log('success save. Id : ' + idTask);
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

        $scope.task = new _task2.default();
    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.minDate = tomorrow;
};

Create.$inject = ['$scope', '$routeParams', '$translate', '$mdToast', 'headContent', 'headerContent', 'taskManager'];

exports.default = Create;
});

require.register("scripts/controllers/head.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Manage the <head> HTML
var head = function head($scope, headContent) {
    _classCallCheck(this, head);

    $scope.additionnalTitle = null;
    $scope.$on(headContent.EVENT_CHANGE_TITLE, function (event, additionnalTitle) {
        $scope.additionnalTitle = additionnalTitle;
    });
};

head.$inject = ['$scope', 'headContent'];

exports.default = head;
});

require.register("scripts/controllers/header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header($scope, $location, $mdSidenav, headContent, headerContent) {
    _classCallCheck(this, Header);

    $scope.title = null;
    $scope.mainAction = null;
    $scope.isHome = true;
    $scope.$on(headContent.EVENT_CHANGE_TITLE, function (event, title) {
        $scope.title = title;
    });
    $scope.$on(headerContent.EVENT_CHANGE_MAIN_ACTION, function (event, mainAction) {
        $scope.mainAction = mainAction;
    });

    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

    $scope.backHome = function () {
        window.history.back();
    };

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() === '/') {
            $scope.isHome = true;
        } else {
            $scope.isHome = false;
        }
    });
};

Header.$inject = ['$scope', '$location', '$mdSidenav', 'headContent', 'headerContent'];

exports.default = Header;
});

require.register("scripts/controllers/history.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('scripts/entity/task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Homepage = function Homepage($scope, $translate, headContent, headerContent, taskManager) {
    _classCallCheck(this, Homepage);

    $scope.loadingTasksHistory = true;
    $scope.errorLoadingTasksHistory = false;
    $scope.tasksHistory = [];

    headerContent.removeMainAction();

    $translate('history.title').then(function (title) {
        headContent.setAdditionnalTitle(title);
    });

    taskManager.getAllHistory().then(function (tasksHistory) {
        $scope.loadingTasks = false;
        $scope.tasksHistory = tasksHistory;
    }, function () {
        $scope.loadingTasks = false;
        $scope.errorLoadingTasks = true;
    });
};

Homepage.$inject = ['$scope', '$translate', 'headContent', 'headerContent', 'taskManager'];

exports.default = Homepage;
});

require.register("scripts/controllers/homepage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('scripts/entity/task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Homepage = function () {
    function Homepage($scope, $location, $mdDialog, $translate, headContent, headerContent, taskManager) {
        _classCallCheck(this, Homepage);

        var that = this;
        this.taskManager = taskManager;
        $scope.loadingTasks = true;
        $scope.errorLoadingTasks = false;
        $scope.tasks = [];

        headContent.resetTitle();

        headerContent.setMainAction(function () {
            $location.path('/create');
        }, 'global:create');

        taskManager.getAll().then(function (tasks) {
            var today = new Date();
            for (var i = 0; i < tasks.length; i++) {
                tasks[i].daysBeforeNextTime = that.determineDaysBeforeNextTime(today, tasks[i].nextDate);
            }

            $scope.loadingTasks = false;
            $scope.tasks = tasks;
        }, function () {
            $scope.loadingTasks = false;
            $scope.errorLoadingTasks = true;
        });

        $scope.check = function (task) {
            that.validTask(task);
            // Save in history.
            taskManager.addHistory(task);
        };

        $scope.report = function (task) {
            that.validTask(task);
        };

        $scope.delete = function ($index) {
            var task = $scope.tasks[$index];

            $translate(['homepage.task.delete.dialog.title', 'homepage.task.delete.dialog.description', 'homepage.task.delete.dialog.confirm', 'homepage.task.delete.dialog.cancel'], { name: task.name }).then(function (texts) {
                var confirm = $mdDialog.confirm().title(texts['homepage.task.delete.dialog.title']).textContent(texts['homepage.task.delete.dialog.description']).ok(texts['homepage.task.delete.dialog.confirm']).cancel(texts['homepage.task.delete.dialog.cancel']);
                $mdDialog.show(confirm).then(function () {
                    taskManager.delete(task.id).then(function () {
                        $scope.tasks.splice($index, 1);
                    });
                });
            });
        };
    }

    _createClass(Homepage, [{
        key: 'validTask',
        value: function validTask(task) {
            var nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + task.periodicity);
            task.nextDate = nextDate;
            task.daysBeforeNextTime = this.determineDaysBeforeNextTime(new Date(), task.nextDate);

            // Update BDD
            this.taskManager.save(task);
        }
    }, {
        key: 'determineDaysBeforeNextTime',
        value: function determineDaysBeforeNextTime(today, nextDate) {
            return Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
        }
    }]);

    return Homepage;
}();

Homepage.$inject = ['$scope', '$location', '$mdDialog', '$translate', 'headContent', 'headerContent', 'taskManager'];

exports.default = Homepage;
});

require.register("scripts/entity/task.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
    _classCallCheck(this, Task);

    this.name = name;
    this.nextDate = null;
    this.periodicity = 1;
};

exports.default = Task;
});

require.register("scripts/entity/taskHistory.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskHistory = function TaskHistory(name) {
    _classCallCheck(this, TaskHistory);

    this.name = name;
    this.date = new Date();
};

exports.default = TaskHistory;
});

require.register("scripts/services.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _headContent = require('scripts/services/headContent');

var _headContent2 = _interopRequireDefault(_headContent);

var _headerContent = require('scripts/services/headerContent');

var _headerContent2 = _interopRequireDefault(_headerContent);

var _storage = require('scripts/services/storage');

var _storage2 = _interopRequireDefault(_storage);

var _taskManager = require('scripts/services/taskManager');

var _taskManager2 = _interopRequireDefault(_taskManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nameModule = 'periodicTaskManager.services';

var servicesModule = angular.module(nameModule, []);

servicesModule.service('headContent', _headContent2.default);
servicesModule.service('headerContent', _headerContent2.default);
servicesModule.provider('storage', _storage2.default);
servicesModule.service('taskManager', _taskManager2.default);

exports.default = nameModule;
});

require.register("scripts/services/headContent.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notifyChangeMethod = Symbol('notifyChange');

var HeadContent = function () {
    function HeadContent($rootScope) {
        _classCallCheck(this, HeadContent);

        this.EVENT_CHANGE_TITLE = 'change_head_title';
        this.additionnalTitle = null;

        this[notifyChangeMethod] = function () {
            $rootScope.$broadcast(this.EVENT_CHANGE_TITLE, this.additionnalTitle);
        };
    }

    /**
     * Reset the title on default value.
     */


    _createClass(HeadContent, [{
        key: 'resetTitle',
        value: function resetTitle() {
            this.additionnalTitle = null;
            this[notifyChangeMethod]();
        }

        /**
         * Set an additionnal title.
         *
         * @param {string} additionnalTitle
         */

    }, {
        key: 'setAdditionnalTitle',
        value: function setAdditionnalTitle(additionnalTitle) {
            this.additionnalTitle = additionnalTitle;
            this[notifyChangeMethod]();
        }
    }]);

    return HeadContent;
}();

HeadContent.$inject = ['$rootScope'];

exports.default = HeadContent;
});

require.register("scripts/services/headerContent.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notifyChangeMainActionMethod = Symbol('notifyChangeMainAction');

var HeaderContent = function () {
    function HeaderContent($rootScope) {
        _classCallCheck(this, HeaderContent);

        this.EVENT_CHANGE_MAIN_ACTION = 'change_main_action';
        this.mainAction = null;

        this[notifyChangeMainActionMethod] = function () {
            $rootScope.$broadcast(this.EVENT_CHANGE_MAIN_ACTION, this.mainAction);
        };
    }

    /**
     * Remove the main action
     */


    _createClass(HeaderContent, [{
        key: 'removeMainAction',
        value: function removeMainAction() {
            this.mainAction = null;
            this[notifyChangeMainActionMethod]();
        }

        /**
         * Set an main action.
         *
         * @param {Function} callback
         * @param {String}   icon
         */

    }, {
        key: 'setMainAction',
        value: function setMainAction(callback, icon) {
            this.mainAction = { callback: callback, icon: icon };
            this[notifyChangeMainActionMethod]();
        }
    }]);

    return HeaderContent;
}();

HeaderContent.$inject = ['$rootScope'];

exports.default = HeaderContent;
});

require.register("scripts/services/storage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connexionSymbol = Symbol('connexion');
var entitiesSymbol = Symbol('entities');

var Storage = function () {
    function Storage($q, entities) {
        _classCallCheck(this, Storage);

        this.$q = $q;
        this[connexionSymbol] = null;
        this[entitiesSymbol] = entities;
    }

    _createClass(Storage, [{
        key: 'getObjectStore',
        value: function getObjectStore(entity, mode) {
            var deferred = this.$q.defer();
            this.getConnexion().then(function (connexion) {
                var stockageName = getStockageNameFromEntity(entity);
                var transaction = connexion.transaction(stockageName, mode);

                transaction.onerror = function (event) {
                    console.error('Transaction failed.');
                    deferred.reject(event);
                };

                var objectStore = transaction.objectStore(stockageName);
                deferred.resolve(objectStore);
            });

            return deferred.promise;
        }
    }, {
        key: 'getConnexion',
        value: function getConnexion() {
            var that = this;
            var deferred = this.$q.defer();

            if (this[connexionSymbol] !== null) {
                deferred.resolve(this[connexionSymbol]);
            } else {
                // Start connexion
                var connexion = window.indexedDB.open('PeriodicTaskManager', 1);

                connexion.onerror = function (event) {
                    console.error('Fail to use indexedDB. Code : ' + event.target.errorCode);
                    deferred.reject(event);
                };

                connexion.onsuccess = function (event) {
                    var db = event.target.result;

                    this[connexionSymbol] = db;

                    db.onerror = function (event) {
                        console.error('Fail to request.');
                        console.error(event);
                        deferred.reject(event);
                    };

                    deferred.resolve(this[connexionSymbol]);
                };

                // Cet évènement est seulement implémenté dans des navigateurs récents
                connexion.onupgradeneeded = function (event) {
                    var db = event.target.result;

                    // Config DB
                    for (var i = 0; i < that[entitiesSymbol].length; i++) {
                        that[entitiesSymbol][i].initDb(getStockageNameFromEntity(that[entitiesSymbol][i].entity), db);
                    }
                };
            }

            return deferred.promise;
        }
    }]);

    return Storage;
}();

function getStockageNameFromEntity(entity) {
    return entity.name.toLowerCase();
}

var StorageProvider = function () {
    function StorageProvider() {
        _classCallCheck(this, StorageProvider);

        this.entities = [];

        this.$get = ['$q', function ($q) {
            return new Storage($q, this.entities);
        }];
    }

    _createClass(StorageProvider, [{
        key: 'addEntity',
        value: function addEntity(entity, initDb) {
            this.entities.push({ entity: entity, initDb: initDb });
        }
    }]);

    return StorageProvider;
}();

exports.default = StorageProvider;
});

require.register("scripts/services/taskManager.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('scripts/entity/task');

var _task2 = _interopRequireDefault(_task);

var _taskHistory = require('scripts/entity/taskHistory');

var _taskHistory2 = _interopRequireDefault(_taskHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notifyChangeMainActionMethod = Symbol('notifyChangeMainAction');

var TaskManager = function () {
    function TaskManager($q, storage) {
        _classCallCheck(this, TaskManager);

        this.$q = $q;
        this.storage = storage;
    }

    _createClass(TaskManager, [{
        key: 'save',
        value: function save(task) {
            var deferred = this.$q.defer();

            var taskStore = this.storage.getObjectStore(_task2.default, 'readwrite');
            taskStore.then(function (objectStore) {
                var putRequest = objectStore.put(task);
                putRequest.onsuccess = function (event) {
                    deferred.resolve(event.target.result);
                };
                putRequest.onerror = function (event) {
                    deferred.reject(event);
                    console.error('Error to save the task');
                    console.error(task);
                };
            });

            return deferred.promise;
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            var deferred = this.$q.defer();
            id = parseInt(id);

            var taskStore = this.storage.getObjectStore(_task2.default, 'readonly');
            taskStore.then(function (objectStore) {
                var getRequest = objectStore.get(id);
                getRequest.onsuccess = function () {
                    deferred.resolve(getRequest.result);
                };
                getRequest.onerror = function (event) {
                    deferred.reject(event);
                    console.error('Error to get the task: ' + id);
                    console.error(task);
                };
            }, function () {
                console.error('Fail to open transaction.');
                deferred.reject();
            });

            return deferred.promise;
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            var deferred = this.$q.defer();

            var taskStore = this.storage.getObjectStore(_task2.default, 'readonly');
            taskStore.then(function (objectStore) {
                var tasks = [];
                objectStore.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        tasks.push(cursor.value);
                        cursor.continue();
                    } else {
                        deferred.resolve(tasks);
                    }
                };
            }, function () {
                console.error('Fail to open transaction.');
                deferred.reject();
            });

            return deferred.promise;
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            var deferred = this.$q.defer();

            var taskStore = this.storage.getObjectStore(_task2.default, 'readwrite');
            taskStore.then(function (objectStore) {
                var deleteRequest = objectStore.delete(id);
                deleteRequest.onsuccess = function () {
                    deferred.resolve(deleteRequest.result);
                };
                deleteRequest.onerror = function (event) {
                    deferred.reject(event);
                    console.error('Error to delete the task: ' + id);
                };
            }, function () {
                console.error('Fail to open transaction.');
                deferred.reject();
            });

            return deferred.promise;
        }
    }, {
        key: 'addHistory',
        value: function addHistory(task) {
            var deferred = this.$q.defer();

            var taskHistory = new _taskHistory2.default(task.name);

            var taskHistoryStore = this.storage.getObjectStore(_taskHistory2.default, 'readwrite');
            taskHistoryStore.then(function (objectStore) {
                var addRequest = objectStore.add(taskHistory);
                addRequest.onsuccess = function () {
                    deferred.resolve(addRequest.result);
                };
                addRequest.onerror = function (event) {
                    deferred.reject(event);
                    console.error('Error to add the task history');
                };
            }, function () {
                console.error('Fail to open transaction.');
                deferred.reject();
            });

            return deferred.promise;
        }
    }, {
        key: 'getAllHistory',
        value: function getAllHistory() {
            var deferred = this.$q.defer();

            var taskHistoryStore = this.storage.getObjectStore(_taskHistory2.default, 'readonly');
            taskHistoryStore.then(function (objectStore) {
                var tasksHistory = [];
                objectStore.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        tasksHistory.push(cursor.value);
                        cursor.continue();
                    } else {
                        deferred.resolve(tasksHistory);
                    }
                };
            }, function () {
                console.error('Fail to open transaction.');
                deferred.reject();
            });

            return deferred.promise;
        }
    }]);

    return TaskManager;
}();

TaskManager.$inject = ['$q', 'storage'];

exports.default = TaskManager;
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map