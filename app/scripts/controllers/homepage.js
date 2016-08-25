import Task from 'scripts/entity/task';

class Homepage {
    constructor($location, headerContent) {
        headerContent.setMainAction(function () {
            $location.path('/create');
        }, 'global:create');
    }
}

Homepage.$inject = ['$location', 'headerContent'];

export default Homepage;