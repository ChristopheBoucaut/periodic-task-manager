class Homepage {
    constructor(headerContent) {
        headerContent.setMainAction(function () {
            console.log('ee');
        }, 'global:create');
    }
}

Homepage.$inject = ['headerContent'];

export default Homepage;