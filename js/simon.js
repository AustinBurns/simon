var SimonSays = (function ($) {
    var COLORS = [
        'green',
        'red',
        'yellow',
        'blue'
    ];

    var chosenColors = [],
        numOfClicks = 0;

    function init() {
        $('.start').on('click', function () {
            startGame();
        });
    }

    function startGame() {
        var randNum = getRandNum();
            chosenColors = [];
            numOfClicks = 0;

        displayColor(randNum, true);

        listenForFeedback();
    }

    function listenForFeedback() {
        $('.board-boundry > div').on('click', function () {
            if ($(this).index() === chosenColors[numOfClicks]) {
                numOfClicks++;

                if (numOfClicks === chosenColors.length) {
                    $('.board-boundry > div').off('click');
                    numOfClicks = 0;
                    setTimeout(playbackColors, 1000);
                }
            } else {
                console.log('WRONG');
                $('.board-boundry > div').off('click');
                startGame();
            }
        });
    }

    function playbackColors() {
        var chosenNum = 0;

        for(var i = 0; i <= chosenColors.length; i++){
            setTimeout(colorIndexToDisplay(i), i * 500);
        }
    }

    function colorIndexToDisplay(index) {
        return function() {
            console.log(chosenColors, index);
            if (index < chosenColors.length) {
                chosenNum = chosenColors[index];
                displayColor(chosenNum, false);
            } else if (index === chosenColors.length) {
                chooseNewColor();
                listenForFeedback();
            }
        }
    }

    function chooseNewColor() {
        var randNum = getRandNum();

        displayColor(randNum, true);
    }



    function displayColor(colorIndex, addColor) {
        var colorClass = '.' + COLORS[colorIndex];

        $(colorClass).addClass('chosen');

        setTimeout(function() {
            $(colorClass).removeClass('chosen');
        }, 200);

        if (addColor) {
            chosenColors.push(colorIndex);
        }
    }

    function getRandNum() {
        return Math.floor((Math.random() * 4));
    }

    $(document).ready(function(){
        init();
    });

})(jQuery);
