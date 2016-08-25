var connexionSymbol = Symbol('connexion');
var entitiesSymbol = Symbol('entities');

class Storage {
    constructor($q, entities) {
        this.$q = $q;
        this[connexionSymbol] = null;
        this[entitiesSymbol] = entities;
    }

    getConnexion() {
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
                for (var name in this[entitiesSymbol]) {
                    if (this[entitiesSymbol].hasOwnProperty(name)) {
                        this[entitiesSymbol][name](name.toLowerCase(), db);
                    }
                }
            };
        }

        return deferred.promise;
    }
}

class StorageProvider {
    constructor() {
        this.entities = {};

        this.$get = [
            '$q',
            function($q) {
                return new Storage($q, this.entities);
            }
        ];
    }

    addEntity(entity, initDb) {
        this.entities[entity.name] = initDb;
    }
}

StorageProvider.$inject = [];

export default StorageProvider;