var connexionSymbol = Symbol('connexion');
var entitiesSymbol = Symbol('entities');

class Storage {
    constructor($q, entities) {
        this.$q = $q;
        this[connexionSymbol] = null;
        this[entitiesSymbol] = entities;
    }

    getObjectStore(entity, mode) {
        var deferred = this.$q.defer();
        this.getConnexion().then(function (connexion) {
            var stockageName = getStockageNameFromEntity(entity);
            var transaction = connexion.transaction(stockageName, mode);

            transaction.onerror = function(event) {
                console.error('Transaction failed.');
                deferred.reject(event);
            };

            var objectStore = transaction.objectStore(stockageName);
            deferred.resolve(objectStore);
        });

        return deferred.promise;
    }

    getConnexion() {
        var that = this;
        var deferred = this.$q.defer();

        if (this[connexionSymbol] !== null) {
            deferred.resolve(this[connexionSymbol]);
        } else {
            // Start connexion
            var connexion = window.indexedDB.open('PeriodicTaskManager', 1);

            connexion.onerror = function(event) {
                console.error('Fail to use indexedDB. Code : '+event.target.errorCode);
                deferred.reject(event);
            };

            connexion.onsuccess = function(event) {
                var db = event.target.result;

                this[connexionSymbol] = db;

                db.onerror = function(event) {
                    console.error('Fail to request.');
                    console.error(event);
                    deferred.reject(event);
                };

                deferred.resolve(this[connexionSymbol]);
            };

            // Cet évènement est seulement implémenté dans des navigateurs récents
            connexion.onupgradeneeded = function(event) {
                var db = event.target.result;

                // Config DB
                for (var i = 0; i < that[entitiesSymbol].length; i++) {
                    that[entitiesSymbol][i].initDb(getStockageNameFromEntity(that[entitiesSymbol][i].entity), db);
                }
            };
        }

        return deferred.promise;
    }
}

function getStockageNameFromEntity(entity) {
    return entity.name.toLowerCase();
}

class StorageProvider {
    constructor() {
        this.entities = [];

        this.$get = [
            '$q',
            function($q) {
                return new Storage($q, this.entities);
            }
        ];
    }

    addEntity(entity, initDb) {
        this.entities.push({entity: entity, initDb: initDb});
    }
}

StorageProvider.$inject = [];

export default StorageProvider;