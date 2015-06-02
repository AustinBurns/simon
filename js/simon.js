var SimonSays = (function ($) {
    var COLORS = [
        'green',
        'red',
        'yellow',
        'blue'
    ];

    var chosen = [],
        numOfClicks = 0;

    function init() {
        $('.start').on('click', function () {
            startGame();
        });
    }

    function startGame() {
        var randNum = getRandNum();
            chosen = [];
            numOfClicks = 0;

        displayColor(randNum, true);

        listenForFeedback();
    }

    function listenForFeedback() {
        $('.board-boundry > div').on('click', function () {
            if ($(this).index() === chosen[numOfClicks]) {
                numOfClicks++;

                if (numOfClicks === chosen.length) {
                    $('.board-boundry > div').off('click');
                    numOfClicks = 0;
                    addNewColor();
                }
            } else {
                console.log('WRONG');
                $('.board-boundry > div').off('click');
                startGame();
            }
        });
    }

    function addNewColor() {
        var randNum = getRandNum(),
            chosenNum = 0;

        for(var i = 0; i <= chosen.length; i++){
            setTimeout(function() {
                var index = i;

                if (i > chosen.length) {
                    chosenNum = chosen[index];
                    displayColor(chosenNum, false);
                    console.log(chosen, index);
                } else if (i === chosen.length) {
                    displayColor(randNum, true);
                    listenForFeedback();
                }
            }, 1000 * i);
        }
    }

    function displayColor(colorIndex, addColor) {
        var colorClass = '.' + COLORS[colorIndex];

        $(colorClass).addClass('chosen');

        setTimeout(function() {
            $(colorClass).removeClass('chosen');
        }, 200);

        if (addColor) {
            chosen.push(colorIndex);
        }
    }

    function getRandNum() {
        return Math.floor((Math.random() * 4));
    }

    $(document).ready(function(){
        init();
    });

})(jQuery);
