const LOOP_MIN_SECONDS = 2.5;
const LOOP_MAX_SECONDS = 7;

const ANIMATION_MIN_SECONDS = 1;
const ANIMATION_MAX_SECONDS = 2.5;

// TODO don't move something if there's a cursor over it

const handleTitle = () => {
    // Get a random rotation
    const degrees = random(-10, 10);
    editCssWithId("#heading", {
        'transform' : `rotate(${degrees}deg)`,
    });
};

const handleVideoPortfolio = () => {
    // Moves along the x axis
    // Requires that #music is positioned relatively or absolutely
    // TODO calculate size of element and parent for better bounds
    const leftPosition = random(0, 10);
    editCssWithId("#music", {
        left: `${leftPosition}px`,
    });
};

const handleVideoArt = () => {
    console.log("Handle Video Art");
};

const handleStills = () => {
    // Moves along the y axis
    // Requires that #stills is positioned relatively or absolutely
    // TODO calculate size of element and parent for better bounds
    const topPosition = random(0, 10);
    editCssWithId("#stills", {
        top: `${topPosition}px`,
    });
};

const handleAboutMe = () => {
    console.log("Handle About Me");
};

const editCssWithId = (id, css) => {
    // Get a random animation duration
    const transition = random(ANIMATION_MIN_SECONDS * 1000, ANIMATION_MAX_SECONDS * 1000);
    $(id).css({
        ...css,
        'transition': `${transition}ms ease-in-out`,
    });
};

const handlers = [
    handleTitle,
    // handleVideoPortfolio,
    // handleVideoArt,
    // handleStills,
    // handleAboutMe,
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
};

$(init);
