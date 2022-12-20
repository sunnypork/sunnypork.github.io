// How long to wait before flipping the "me" icon
const FLIP_INTERVAL_MILLISECONDS = 1500;

let flipped = false;
const flipClass = 'flip';

const maxHappiness = 5;
const happinessDecay = 800;
let happiness = 0;

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

const incHappiness = () => {
    if (happiness < maxHappiness) {
        happiness = happiness + 1;
        if (happiness === maxHappiness) {
            alert("Woof!");
        }
    }
};

const decHappiness = () => {
    if (happiness > 0) {
        happiness = happiness - 1;
        console.log(happiness);
    }
};

const init = () => {
    $(".scratch-box").on("click", () => {
        incHappiness();
        setTimeout(decHappiness, happinessDecay);
    });
    setInterval(loopFlip, FLIP_INTERVAL_MILLISECONDS);
};

$(init);
