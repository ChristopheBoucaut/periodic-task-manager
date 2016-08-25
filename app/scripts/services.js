import HeadContent from 'scripts/services/headContent';
import HeaderContent from 'scripts/services/headerContent';
import StorageProvider from 'scripts/services/storage';
import TaskManager from 'scripts/services/taskManager';

var nameModule = 'periodicTaskManager.services';

var servicesModule = angular.module(nameModule, []);

servicesModule.service('headContent', HeadContent);
servicesModule.service('headerContent', HeaderContent);
servicesModule.provider('storage', StorageProvider);
servicesModule.service('taskManager', TaskManager);

export default nameModule;