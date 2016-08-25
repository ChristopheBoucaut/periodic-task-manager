var notifyChangeMainActionMethod = Symbol('notifyChangeMainAction');

class HeaderContent {
    constructor($rootScope) {
        this.EVENT_CHANGE_MAIN_ACTION = 'change_main_action';
        this.mainAction = null;

        this[notifyChangeMainActionMethod] = function () {
            $rootScope.$broadcast(this.EVENT_CHANGE_MAIN_ACTION, this.mainAction);
        };
    }

    /**
     * Remove the main action
     */
    removeMainAction() {
        this.mainAction = null;
        this[notifyChangeMainActionMethod]();
    }

    /**
     * Set an main action.
     *
     * @param {Function} callback
     * @param {String}   icon
     */
    setMainAction(callback, icon) {
        this.mainAction = {callback: callback, icon: icon};
        this[notifyChangeMainActionMethod]();
    }
}

HeaderContent.$inject = ['$rootScope'];

export default HeaderContent;