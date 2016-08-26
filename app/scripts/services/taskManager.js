import Task from 'scripts/entity/task';

var notifyChangeMainActionMethod = Symbol('notifyChangeMainAction');

class TaskManager {
    constructor($q, storage) {
        this.$q = $q;
        this.storage = storage;
    }

    save(task) {
        var deferred = this.$q.defer();

        var taskStore = this.storage.getObjectStore(Task, 'readwrite');
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

    getById(id) {
        var deferred = this.$q.defer();
        id = parseInt(id);

        var taskStore = this.storage.getObjectStore(Task, 'readonly');
        taskStore.then(function (objectStore) {
            var getRequest = objectStore.get(id);
            getRequest.onsuccess = function () {
                deferred.resolve(getRequest.result);
            };
            getRequest.onerror = function (event) {
                deferred.reject(event);
                console.error('Error to get the task: '+id);
                console.error(task);
            };
        }, function () {
            console.error('Fail to open transaction.');
            deferred.reject();
        });

        return deferred.promise;
    }

    getAll() {
        var deferred = this.$q.defer();

        var taskStore = this.storage.getObjectStore(Task, 'readonly');
        taskStore.then(function (objectStore) {
            var tasks = [];
            objectStore.openCursor().onsuccess = function(event) {
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
}


TaskManager.$inject = ['$q', 'storage'];

export default TaskManager;