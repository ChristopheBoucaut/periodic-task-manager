import Task from 'scripts/entity/task';
import TaskHistory from 'scripts/entity/taskHistory';

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

    delete(id) {
        var deferred = this.$q.defer();

        var taskStore = this.storage.getObjectStore(Task, 'readwrite');
        taskStore.then(function (objectStore) {
            var deleteRequest = objectStore.delete(id);
            deleteRequest.onsuccess = function () {
                deferred.resolve(deleteRequest.result);
            };
            deleteRequest.onerror = function (event) {
                deferred.reject(event);
                console.error('Error to delete the task: '+id);
            };
        }, function () {
            console.error('Fail to open transaction.');
            deferred.reject();
        });

        return deferred.promise;
    }

    addHistory(task) {
        var deferred = this.$q.defer();

        var taskHistory = new TaskHistory(task.name);

        var taskHistoryStore = this.storage.getObjectStore(TaskHistory, 'readwrite');
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

    getAllHistory() {
        var deferred = this.$q.defer();

        var taskHistoryStore = this.storage.getObjectStore(TaskHistory, 'readonly');
        taskHistoryStore.then(function (objectStore) {
            var tasksHistory = [];
            objectStore.openCursor().onsuccess = function(event) {
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
}


TaskManager.$inject = ['$q', 'storage'];

export default TaskManager;