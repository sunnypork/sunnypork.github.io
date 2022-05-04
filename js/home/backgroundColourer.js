const BG_RANDOM_MILLISECONDS_MIN = 1000;
const BG_RANDOM_MILLISECONDS_MAX = 4000;

const getRandomColour = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const setBackgroundColour = (transition) => {
    const $bg2 = $("#bg-2");
    $("#bg-1").css({
        'background-image': $bg2.css('background-image'),
    });
    $bg2.finish();
    $bg2.css({
        'background-image': `linear-gradient(${getRandomColour()}, ${getRandomColour()})`,
        opacity: 0,
    });
    $bg2.animate({
        opacity: 1,
    }, transition);
};

const loopBackgroundColourChange = () => {
    const time = random(BG_RANDOM_MILLISECONDS_MIN, BG_RANDOM_MILLISECONDS_MAX);
    setBackgroundColour(time);
    setTimeout(loopBackgroundColourChange, time);
};

const init = () => {
    loopBackgroundColourChange();
};

$(init);
