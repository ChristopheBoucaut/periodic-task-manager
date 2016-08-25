import HomepageController from 'scripts/controllers/homepage';
import CreateController from 'scripts/controllers/create';
import HeadController from 'scripts/controllers/head';
import HeaderController from 'scripts/controllers/header';

var nameModule = 'periodicTaskManager.controllers';

var controllersModule = angular.module(nameModule, []);

controllersModule.controller('HomepageController', HomepageController);
controllersModule.controller('CreateController', CreateController);
controllersModule.controller('HeadController', HeadController);
controllersModule.controller('HeaderController', HeaderController);

export default nameModule;