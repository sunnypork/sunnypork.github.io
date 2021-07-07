const LOOP_MIN_SECONDS = 2.5;
const LOOP_MAX_SECONDS = 7;

const ON_CLICK_DELAY_SECONDS = 0.5;

const ANIMATION_MIN_SECONDS = 1;
const ANIMATION_MAX_SECONDS = 2.5;

const DRIP_ANIMATION_RATIO = 0.9;
const DRIP_MIN = 20;
const DRIP_MAX = 100;

const WIGGLE_DISTANCE = 3;
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
    console.log("Handle Video Art");
    drip("#art");
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

const handlers = [
    handleTitle,
    handleVideoPortfolio,
    handleVideoArt,
    handleStills,
    handleAboutMe,
];

const wiggle = (id) => {
    const maxDistance = WIGGLE_DISTANCE;
    const positions = random(WIGGLE_MIN_POSITIONS, WIGGLE_MAX_POSITIONS);
    const duration = randomDuration();
    const frameDuration = Math.round(duration / positions + 1);

    const $element = $(id);
    $element.stop(true);
    // Must match .button-container and .right-button-container in home.css
    const top = "80px"; // $element.css("top");
    const left = "40px"; // $element.css("left");
    const topPx = parseInt(top);
    const leftPx = parseInt(left);
    for (let i = 0; i < positions; i++) {
        const leftDela = random(-maxDistance, maxDistance);
        const topDelta = random(-maxDistance, maxDistance);

        const animation = {
            top: `${topPx + topDelta}px`,
            left: `${leftPx + leftDela}px`,
        }
        $element.animate(animation, frameDuration);
    }
    $element.animate({top, left}, frameDuration);
};

const drip = (id) => {
    const $element = $(id);
    $element.stop(true);
    // should match height of .menu-button in home.css
    const height = "144px"; // $element.css("height");
    const heightPx = parseInt(height);
    const newHeight = heightPx + random(DRIP_MIN, DRIP_MAX);

    const duration = randomDuration();
    const dripSpeed = DRIP_ANIMATION_RATIO * duration;
    const snapBackSpeed = (DRIP_ANIMATION_RATIO - 1) * duration;
    $element.animate({
        height: `${newHeight}px`,
    }, dripSpeed);
    $element.animate({
        height,
    }, snapBackSpeed);
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

let timeout;
let last;
const loop = () => {
    // Select a random procedure index
    let index = random(0, handlers.length);
    // Prevent selecting the same handler index twice in a row
    if (index === last) {
        index = (index + 1) % handlers.length;
    }
    last = index;
    // Select the handler
    const handler = handlers[index];
    // Perform said procedure
    handler();
    // Pick a random amount of time to wait before doing something new
    const randomTime = random(LOOP_MIN_SECONDS * 1000, LOOP_MAX_SECONDS * 1000);
    // Enqueue the new event
    timeout = setTimeout(loop, randomTime);
};

// This is TERRIBLE CODE
// Please don't look at it
const onButtonClick = (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    clearTimeout(timeout);

    const $target = $(event.target);
    const delay = ON_CLICK_DELAY_SECONDS * 1000;
    const transition = `${delay}ms ease-in-out`;

    const $window = $(window);
    const $parent = $target.parent();

    $target.stop(true);
    $parent.stop(true);

    const grandparentPos = $parent.parent().position();
    $parent.css({
        zIndex: 999
    });
    $target.css({
        width: $window.width() * 2,
        height: $window.height() * 2,
        transition,
    });
    $parent.css({
        top: - grandparentPos.top - ($window.height() / 2),
        left: - grandparentPos.left - ($window.width() / 2),
        transition,
    })

    setTimeout(() => {
        window.location.href = $target.data("href");
    }, delay);
};

const init = () => {
    loop();
    $(".menu-button").on('click', onButtonClick);
};

$(init);
