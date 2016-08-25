import HeadContent from 'scripts/services/headContent';
import HeaderContent from 'scripts/services/headerContent';

var nameModule = 'periodicTaskManager.services';

var servicesModule = angular.module(nameModule, []);

servicesModule.service('headContent', HeadContent);
servicesModule.service('headerContent', HeaderContent);

export default nameModule;