const LOOP_MIN_SECONDS = 2.5;
const LOOP_MAX_SECONDS = 7;

const ON_CLICK_DELAY_SECONDS = 0.5;

const ANIMATION_MIN_SECONDS = 1;
const ANIMATION_MAX_SECONDS = 2.5;

const WIGGLE_DISTANCE = 4;
const WIGGLE_MIN_POSITIONS = 11;
const WIGGLE_MAX_POSITIONS = 20;

const handleTitle = () => {
    console.log("Handle Title");
    // Get a random rotation
    const degrees = random(-10, 10);
    editCssWithQuery("#heading", {
        'transform' : `rotate(${degrees}deg)`,
    });
};

const handleVideoPortfolio = () => {
    console.log("Handle Video Portfolio");
    // Moves along the x axis
    const leftPosition = random(0, 96);
    editCssWithQuery("#port-container", {
        left: `${leftPosition}px`,
    });
};

const handleVideoArt = () => {
    console.log("Handle Video Art")
};

const handleStills = () => {
    console.log("Handle Stills");
    // Move along the y axis
    const topPosition = random(0, 80);
    editCssWithQuery("#stills-container", {
        top: `${topPosition}px`,
    });
};

const handleAboutMe = () => {
    console.log("Handle About Me");
    wiggle("#me-container");
};

const wiggle = (id) => {
    const maxDistance = WIGGLE_DISTANCE;
    const positions = random(WIGGLE_MIN_POSITIONS, WIGGLE_MAX_POSITIONS);
    const duration = randomDuration();
    const frameDuration = Math.round(duration / positions + 1);

    const $element = $(id);
    const topPx = parseInt($element.css("top"));
    const leftPx = parseInt($element.css("left"));
    for (let i = 0; i < positions; i++) {
        const leftDela = random(-maxDistance, maxDistance);
        const topDelta = random(-maxDistance, maxDistance);

        const animation = {
            top: `${topPx + topDelta}px`,
            left: `${leftPx + leftDela}px`,
        }
        $element.animate(animation, frameDuration);
    }
    $element.animate({top: `${topPx}px`, left: `${leftPx}px`}, frameDuration);
};

const editCssWithQuery = (query, css) => {
    const $element = $(query);
    if (!$element.is(":hover")) {
        const transition = randomDuration();
        $element.css({
            ...css,
            'transition': `${transition}ms ease-in-out`,
        });
    }
};

const handlers = [
    handleTitle,
    handleVideoPortfolio,
    handleVideoArt,
    handleStills,
    handleAboutMe,
];

/**
 * Gets a random number between [min, max)
 * @param min lower bound
 * @param max upper bound
 * @return {number}
 */
const random = (min, max) => {
    return min + Math.floor(Math.random() * (max - min));
};

const randomDuration = () =>
    random(ANIMATION_MIN_SECONDS * 1000, ANIMATION_MAX_SECONDS * 1000);

const loop = () => {
    // Select a random procedure
    const handler = handlers[random(0, handlers.length)];
    // Perform said procedure
    handler();
    // Pick a random amount of time to wait before doing something new
    const randomTime = random(LOOP_MIN_SECONDS * 1000, LOOP_MAX_SECONDS * 1000);
    // Enqueue the new event
    setTimeout(loop, randomTime);
};

const init = () => {
    loop();
    $(".menu-button").on('click', (event) => {
        event.stopPropagation();
        event.stopImmediatePropagation();

        const $target = $(event.target);
        const delay = ON_CLICK_DELAY_SECONDS * 1000;
        const transition = `${delay}ms ease-in-out`;

        $("body").css({
            'backgroundColor': $target.css("backgroundColor"),
            transition,
        });
        $("#page").css({
            'opacity': 0,
            transition,
        });
        setTimeout(() => {
            window.location.href = $target.data("href");
        }, delay);
    });
};

$(init);
