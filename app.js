(function() {

    var IdeaGenerator = {

        init: function(config) {
            this.data = config[0];
            this.attachDomEvent();
        },
        getRandomProblem: function() {
            return this.getRandomItemFromArray(this.data.problems);
        },
        getRandomSolution: function() {
            return this.getRandomItemFromArray(this.data.solutions);
        },
        attachDomEvent: function() {
            console.log('random', this.getRandomProblem(), this.getRandomSolution());
        },
        getRandomItemFromArray: function(array) {
            var numberOfItems = array.length;

            return array[Math.floor(Math.random() * numberOfItems)];
        }
    };


    var data = [{
        problems: ['food', 'tarvel', 'fashion'],
        solutions: ['twitter', 'facebook', 'LinkedIn']
    }];

    IdeaGenerator.init(data);
})();
