!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},r={},o={}.hasOwnProperty,i=/^\.\.?(\/|$)/,a=function(e,t){for(var n,r=[],o=(i.test(t)?e+"/"+t:t).split("/"),a=0,s=o.length;a<s;a++)n=o[a],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},c=function(t){return function(n){var r=a(s(t),n);return e.require(r,t)}},l=function(e,t){var r=null;r=v&&v.createHot(e);var o={id:e,exports:{},hot:r};return n[e]=o,t(o.exports,c(e),o),o.exports},u=function(e){return r[e]?u(r[e]):e},f=function(e,t){return u(a(s(e),t))},d=function(e,r){null==r&&(r="/");var i=u(e);if(o.call(n,i))return n[i].exports;if(o.call(t,i))return l(i,t[i]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var h=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,p=function(e){if(h.test(e)){var t=e.replace(h,"");o.call(r,t)&&r[t].replace(h,"")!==t+"/index"||(r[t]=e)}if(g.test(e)){var n=e.replace(g,"");o.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if("object"==typeof e)for(var i in e)o.call(e,i)&&d.register(i,e[i]);else t[e]=r,delete n[e],p(e)},d.list=function(){var e=[];for(var n in t)o.call(t,n)&&e.push(n);return e};var v=e._hmr&&new e._hmr(f,d,t,n);d._cache=n,d.hmr=v&&v.wrap,d.brunch=!0,e.require=d}}(),function(){window;require.register("scripts/app.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var o=t("scripts/controllers"),i=r(o),a=t("scripts/services"),s=r(a),c=t("scripts/entity/task"),l=r(c),u=t("scripts/entity/taskHistory"),f=r(u),d="periodicTaskManager",h=angular.module(d,[i["default"],s["default"],"ngMessages","ngRoute","ngMaterial","pascalprecht.translate"]);h.config(["$routeProvider",function(e){e.when("/",{controller:"HomepageController",templateUrl:"homepage.html"}).when("/create/:id?",{controller:"CreateController",templateUrl:"create.html"}).when("/history",{controller:"HistoryController",templateUrl:"history.html"}).otherwise({redirectTo:"/"})}]),h.config(["$translateProvider",function(e){function t(){var e=new Array("fr"),t=navigator.language.substr(0,2);return e.indexOf(t)>-1?t:"fr"}e.useStaticFilesLoader({prefix:"translation.",suffix:".json"}),e.determinePreferredLanguage(t),e.useSanitizeValueStrategy("escape")}]),h.config(["$mdThemingProvider",function(e){e.theme("default").primaryPalette("blue").accentPalette("red").warnPalette("deep-orange").dark()}]),h.config(["$mdIconProvider",function(e){var t="img/icons/";e.icon("global:menu",t+"menu.svg").icon("global:search",t+"search.svg").icon("global:create",t+"create.svg").icon("global:check",t+"check.svg").icon("global:next",t+"next.svg").icon("global:delete",t+"delete.svg").icon("global:back",t+"back.svg")}]),h.config(["$mdDateLocaleProvider",function(e){e.formatDate=function(e){return e=new Date(e),e.toLocaleDateString()}}]),h.config(["storageProvider",function(e){e.addEntity(l["default"],function(e,t){console.log("Create entity for :"+e);t.createObjectStore(e,{keyPath:"id",autoIncrement:!0})}),e.addEntity(f["default"],function(e,t){console.log("Create entity for :"+e);t.createObjectStore(e,{keyPath:"id",autoIncrement:!0})})}]),e["default"]=d}),require.register("scripts/controllers.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var o=t("scripts/controllers/homepage"),i=r(o),a=t("scripts/controllers/create"),s=r(a),c=t("scripts/controllers/history"),l=r(c),u=t("scripts/controllers/head"),f=r(u),d=t("scripts/controllers/header"),h=r(d),g="periodicTaskManager.controllers",p=angular.module(g,[]);p.controller("HomepageController",i["default"]),p.controller("CreateController",s["default"]),p.controller("HistoryController",l["default"]),p.controller("HeadController",f["default"]),p.controller("HeaderController",h["default"]),e["default"]=g}),require.register("scripts/controllers/create.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=t("scripts/entity/task"),a=r(i),s=function c(e,t,n,r,i,s,l){o(this,c),s.removeMainAction(),e.saveTask=function(){if(e.taskForm.$valid){if(!e.task.nextDate){var t=new Date;t.setDate(t.getDate()+e.task.periodicity),e.task.nextDate=t}l.save(e.task).then(function(e){console.log("success save. Id : "+e),n("create.task.saved").then(function(e){var t=r.simple().textContent(e);t.position("top right"),r.show(t)}),window.history.back()})}},t.id?(n("create.title_update").then(function(e){i.setAdditionnalTitle(e)}),l.getById(t.id).then(function(t){e.task=t})):(n("create.title").then(function(e){i.setAdditionnalTitle(e)}),e.task=new a["default"]);var u=new Date;u.setDate(u.getDate()+1),e.minDate=u};s.$inject=["$scope","$routeParams","$translate","$mdToast","headContent","headerContent","taskManager"],e["default"]=s}),require.register("scripts/controllers/head.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function i(e,t){r(this,i),e.additionnalTitle=null,e.$on(t.EVENT_CHANGE_TITLE,function(t,n){e.additionnalTitle=n})};o.$inject=["$scope","headContent"],e["default"]=o}),require.register("scripts/controllers/header.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function i(e,t,n,o,a){r(this,i),e.title=null,e.mainAction=null,e.isHome=!0,e.$on(o.EVENT_CHANGE_TITLE,function(t,n){e.title=n}),e.$on(a.EVENT_CHANGE_MAIN_ACTION,function(t,n){e.mainAction=n}),e.openLeftMenu=function(){n("left").toggle()},e.backHome=function(){window.history.back()},e.$on("$routeChangeSuccess",function(){"/"===t.path()?e.isHome=!0:e.isHome=!1})};o.$inject=["$scope","$location","$mdSidenav","headContent","headerContent"],e["default"]=o}),require.register("scripts/controllers/history.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=t("scripts/entity/task"),a=(r(i),function s(e,t,n,r,i){o(this,s),e.loadingTasksHistory=!0,e.errorLoadingTasksHistory=!1,e.tasksHistory=[],r.removeMainAction(),t("history.title").then(function(e){n.setAdditionnalTitle(e)}),i.getAllHistory().then(function(t){e.loadingTasks=!1,e.tasksHistory=t},function(){e.loadingTasks=!1,e.errorLoadingTasks=!0})});a.$inject=["$scope","$translate","headContent","headerContent","taskManager"],e["default"]=a}),require.register("scripts/controllers/homepage.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t("scripts/entity/task"),s=(r(a),function(){function e(t,n,r,i,a,s,c){o(this,e);var l=this;this.taskManager=c,t.loadingTasks=!0,t.errorLoadingTasks=!1,t.tasks=[],a.resetTitle(),s.setMainAction(function(){n.path("/create")},"global:create"),c.getAll().then(function(e){for(var n=new Date,r=0;r<e.length;r++)e[r].daysBeforeNextTime=l.determineDaysBeforeNextTime(n,e[r].nextDate);t.loadingTasks=!1,t.tasks=e},function(){t.loadingTasks=!1,t.errorLoadingTasks=!0}),t.check=function(e){l.validTask(e),c.addHistory(e)},t.report=function(e){l.validTask(e)},t["delete"]=function(e){var n=t.tasks[e];i(["homepage.task.delete.dialog.title","homepage.task.delete.dialog.description","homepage.task.delete.dialog.confirm","homepage.task.delete.dialog.cancel"],{name:n.name}).then(function(o){console.log(o);var i=r.confirm().title(o["homepage.task.delete.dialog.title"]).textContent(o["homepage.task.delete.dialog.description"]).ok(o["homepage.task.delete.dialog.confirm"]).cancel(o["homepage.task.delete.dialog.cancel"]);r.show(i).then(function(){c["delete"](n.id).then(function(){t.tasks.splice(e,1)})})})}}return i(e,[{key:"validTask",value:function(e){var t=new Date;t.setDate(t.getDate()+e.periodicity),e.nextDate=t,e.daysBeforeNextTime=this.determineDaysBeforeNextTime(new Date,e.nextDate),this.taskManager.save(e)}},{key:"determineDaysBeforeNextTime",value:function(e,t){return Math.ceil((t-e)/864e5)}}]),e}());s.$inject=["$scope","$location","$mdDialog","$translate","headContent","headerContent","taskManager"],e["default"]=s}),require.register("scripts/entity/task.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function i(e){r(this,i),this.name=e,this.nextDate=null,this.periodicity=1};e["default"]=o}),require.register("scripts/entity/taskHistory.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function i(e){r(this,i),this.name=e,this.date=new Date};e["default"]=o}),require.register("scripts/services.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var o=t("scripts/services/headContent"),i=r(o),a=t("scripts/services/headerContent"),s=r(a),c=t("scripts/services/storage"),l=r(c),u=t("scripts/services/taskManager"),f=r(u),d="periodicTaskManager.services",h=angular.module(d,[]);h.service("headContent",i["default"]),h.service("headerContent",s["default"]),h.provider("storage",l["default"]),h.service("taskManager",f["default"]),e["default"]=d}),require.register("scripts/services/headContent.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=Symbol("notifyChange"),a=function(){function e(t){r(this,e),this.EVENT_CHANGE_TITLE="change_head_title",this.additionnalTitle=null,this[i]=function(){t.$broadcast(this.EVENT_CHANGE_TITLE,this.additionnalTitle)}}return o(e,[{key:"resetTitle",value:function(){this.additionnalTitle=null,this[i]()}},{key:"setAdditionnalTitle",value:function(e){this.additionnalTitle=e,this[i]()}}]),e}();a.$inject=["$rootScope"],e["default"]=a}),require.register("scripts/services/headerContent.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=Symbol("notifyChangeMainAction"),a=function(){function e(t){r(this,e),this.EVENT_CHANGE_MAIN_ACTION="change_main_action",this.mainAction=null,this[i]=function(){t.$broadcast(this.EVENT_CHANGE_MAIN_ACTION,this.mainAction)}}return o(e,[{key:"removeMainAction",value:function(){this.mainAction=null,this[i]()}},{key:"setMainAction",value:function(e,t){this.mainAction={callback:e,icon:t},this[i]()}}]),e}();a.$inject=["$rootScope"],e["default"]=a}),require.register("scripts/services/storage.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){return e.name.toLowerCase()}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=Symbol("connexion"),s=Symbol("entities"),c=function(){function e(t,n){r(this,e),this.$q=t,this[a]=null,this[s]=n}return i(e,[{key:"getObjectStore",value:function(e,t){var n=this.$q.defer();return this.getConnexion().then(function(r){var i=o(e),a=r.transaction(i,t);a.onerror=function(e){console.error("Transaction failed."),n.reject(e)};var s=a.objectStore(i);n.resolve(s)}),n.promise}},{key:"getConnexion",value:function(){var e=this,t=this.$q.defer();if(null!==this[a])t.resolve(this[a]);else{var n=window.indexedDB.open("PeriodicTaskManager",1);n.onerror=function(e){console.error("Fail to use indexedDB. Code : "+e.target.errorCode),t.reject(e)},n.onsuccess=function(e){var n=e.target.result;this[a]=n,n.onerror=function(e){console.error("Fail to request."),console.error(e),t.reject(e)},t.resolve(this[a])},n.onupgradeneeded=function(t){for(var n=t.target.result,r=0;r<e[s].length;r++)e[s][r].initDb(o(e[s][r].entity),n)}}return t.promise}}]),e}(),l=function(){function e(){r(this,e),this.entities=[],this.$get=["$q",function(e){return new c(e,this.entities)}]}return i(e,[{key:"addEntity",value:function(e,t){this.entities.push({entity:e,initDb:t})}}]),e}();e["default"]=l}),require.register("scripts/services/taskManager.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=t("scripts/entity/task"),s=r(a),c=t("scripts/entity/taskHistory"),l=r(c),u=(Symbol("notifyChangeMainAction"),function(){function e(t,n){o(this,e),this.$q=t,this.storage=n}return i(e,[{key:"save",value:function(e){var t=this.$q.defer(),n=this.storage.getObjectStore(s["default"],"readwrite");return n.then(function(n){var r=n.put(e);r.onsuccess=function(e){t.resolve(e.target.result)},r.onerror=function(n){t.reject(n),console.error("Error to save the task"),console.error(e)}}),t.promise}},{key:"getById",value:function(e){var t=this.$q.defer();e=parseInt(e);var n=this.storage.getObjectStore(s["default"],"readonly");return n.then(function(n){var r=n.get(e);r.onsuccess=function(){t.resolve(r.result)},r.onerror=function(n){t.reject(n),console.error("Error to get the task: "+e),console.error(task)}},function(){console.error("Fail to open transaction."),t.reject()}),t.promise}},{key:"getAll",value:function(){var e=this.$q.defer(),t=this.storage.getObjectStore(s["default"],"readonly");return t.then(function(t){var n=[];t.openCursor().onsuccess=function(t){var r=t.target.result;r?(n.push(r.value),r["continue"]()):e.resolve(n)}},function(){console.error("Fail to open transaction."),e.reject()}),e.promise}},{key:"delete",value:function(e){var t=this.$q.defer(),n=this.storage.getObjectStore(s["default"],"readwrite");return n.then(function(n){var r=n["delete"](e);r.onsuccess=function(){t.resolve(r.result)},r.onerror=function(n){t.reject(n),console.error("Error to delete the task: "+e)}},function(){console.error("Fail to open transaction."),t.reject()}),t.promise}},{key:"addHistory",value:function(e){var t=this.$q.defer(),n=new l["default"](e.name),r=this.storage.getObjectStore(l["default"],"readwrite");return r.then(function(e){var r=e.add(n);r.onsuccess=function(){t.resolve(r.result)},r.onerror=function(e){t.reject(e),console.error("Error to add the task history")}},function(){console.error("Fail to open transaction."),t.reject()}),t.promise}},{key:"getAllHistory",value:function(){var e=this.$q.defer(),t=this.storage.getObjectStore(l["default"],"readonly");return t.then(function(t){var n=[];t.openCursor().onsuccess=function(t){var r=t.target.result;r?(n.push(r.value),r["continue"]()):e.resolve(n)}},function(){console.error("Fail to open transaction."),e.reject()}),e.promise}}]),e}());u.$inject=["$q","storage"],e["default"]=u}),require.register("___globals___",function(e,t,n){})}(),require("___globals___");