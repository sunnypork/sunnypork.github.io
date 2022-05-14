const FLIP_INTERVAL_MILLISECONDS_MIN = 800;
const FLIP_INTERVAL_MILLISECONDS_MAX = 2500;

let flipped = false;
const flipClass = 'flip';

const loopFlip = () => {
    const $flipper = $('#flipper');
    if (!$flipper.is(":hover")) {
        if (flipped) {
            $flipper.removeClass(flipClass);
        } else {
            $flipper.addClass(flipClass);
        }
        flipped = !flipped;
    }
    setTimeout(loopFlip, random(FLIP_INTERVAL_MILLISECONDS_MIN, FLIP_INTERVAL_MILLISECONDS_MAX));
};

const init = () => {
    setTimeout(loopFlip, FLIP_INTERVAL_MILLISECONDS_MAX);
};

$(init);
