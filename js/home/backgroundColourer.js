const BG_RANDOM_TIME_MIN = 1000;
const BG_RANDOM_TIME_MAX = 2000;

const getRandomColour = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const setBackgroundColour = (transition) => {
    $("body").css({
        'background-image': `linear-gradient(${getRandomColour()}, ${getRandomColour()})`,
        'transition': `${transition}ms ease-in-out`,
    })
};

const loopBackgroundColourChange = () => {
    const time = random(BG_RANDOM_TIME_MIN, BG_RANDOM_TIME_MAX);
    setBackgroundColour(time);
    setTimeout(loopBackgroundColourChange, time);
};

const init = () => {
    loopBackgroundColourChange();
};

$(init);
