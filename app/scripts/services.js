import HeadContent from 'scripts/services/headContent';
import HeaderContent from 'scripts/services/headerContent';
import StorageProvider from 'scripts/services/storage';

var nameModule = 'periodicTaskManager.services';

var servicesModule = angular.module(nameModule, []);

servicesModule.service('headContent', HeadContent);
servicesModule.service('headerContent', HeaderContent);
servicesModule.provider('storage', StorageProvider);

export default nameModule;