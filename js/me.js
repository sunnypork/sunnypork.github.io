const FLIP_INTERVAL_MILLISECONDS = 1500;

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
};

const init = () => {
    setInterval(loopFlip, FLIP_INTERVAL_MILLISECONDS);
};

$(init);
