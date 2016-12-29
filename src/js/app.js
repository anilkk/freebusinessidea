(function() {

    var IdeaGenerator = {

        init: function(config) {
            this.data = config || {};
            this.problemDOM = document.querySelector('#problem');
            this.solutionOneDOM = document.querySelector('#solutionOne');
            this.solutionTwoDOM = document.querySelector('#solutionTwo');
            this.getData();
        },
        getData: function() {
            this.getProblemsData()
                .then(function(data) {
                    IdeaGenerator.data.problems = data;
                    return IdeaGenerator.getSolutionsData();
                })
                .then(function(data) {
                    IdeaGenerator.data.solutions = data;
                    IdeaGenerator.attachDomEvent();
                    IdeaGenerator.showResult();
                })
                .then(null, function(data) {
                    console.log('something went wrong', data);
                    throw new Error('something went wrong');
                });
        },
        getProblemsData: function() {
            return this.getJSON('src/data/problems.json');
        },
        getSolutionsData: function() {
            return this.getJSON('src/data/solutions.json');
        },
        getRandomProblem: function() {
            return this.getRandomItemFromArray(this.data.problems);
        },
        getRandomSolution: function() {
            return this.getRandomItemFromArray(this.data.solutions);
        },
        attachDomEvent: function() {
            document.addEventListener('click', function ($event) {
            	IdeaGenerator.showResult();
            });
        },
        showResult: function () {
        	this.problemDOM.innerHTML = '<h1>' + this.getRandomProblem() + '</h1>';
        	this.solutionOneDOM.innerHTML = this.getSolutionHTML();
        },
        getSolutionHTML: function () {
            var solution = this.getRandomSolution();
            return '<a href="https://' + solution +  '.com" target="_blank">' +
                         '<img src="'+ location.origin + location.pathname.slice(0, -10) +'/src/img/' + solution +'.png">' +
                   '</a>' + 
                   '<br>' +
                   '<h1>' + this.getRandomSolution() + '</h1>';
        },
        getRandomItemFromArray: function(array) {
            var numberOfItems = array.length;

            return array[Math.floor(Math.random() * numberOfItems)];
        },
        getJSON: function(url) {
            var xhr = new XMLHttpRequest();
            return new Promise(function(resolve, reject) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            });
        }
    };

    IdeaGenerator.init();
})();
