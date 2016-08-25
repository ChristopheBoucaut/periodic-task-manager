var notifyChangeMethod = Symbol('notifyChange');

class HeadContent {
    constructor($rootScope) {
        this.EVENT_CHANGE_TITLE = 'change_head_title';
        this.additionnalTitle = null;

        this[notifyChangeMethod] = function () {
            $rootScope.$broadcast(this.EVENT_CHANGE_TITLE, this.additionnalTitle);
        };
    }

    /**
     * Reset the title on default value.
     */
    resetTitle() {
        this.additionnalTitle = null;
        this[notifyChangeMethod]();
    }

    /**
     * Set an additionnal title.
     *
     * @param {string} additionnalTitle
     */
    setAdditionnalTitle(additionnalTitle) {
        this.additionnalTitle = additionnalTitle;
        this[notifyChangeMethod]();
    }
}

HeadContent.$inject = ['$rootScope'];

export default HeadContent;