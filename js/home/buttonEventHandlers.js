const handleHeader = () => {
    console.log("Handle Header");
    // Get a random rotation
    const degrees = random(-HEADING_ROTATION_ABS_MAX_DEGREES, HEADING_ROTATION_ABS_MAX_DEGREES);
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

const wiggle = (id) => {
    const maxDistance = WIGGLE_DISTANCE;
    const positions = random(WIGGLE_MIN_POSITIONS, WIGGLE_MAX_POSITIONS);
    const duration = randomAnimationDuration();
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

    const duration = randomAnimationDuration();
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
        const transition = randomAnimationDuration();
        $element.css({
            ...css,
            'transition': `${transition}ms ease-in-out`,
        });
    }
};

const handlers = [
    handleHeader,
    handleVideoPortfolio,
    handleVideoArt,
    handleStills,
    handleAboutMe,
];

const randomAnimationDuration = () =>
    random(ANIMATION_MIN_SECONDS * 1000, ANIMATION_MAX_SECONDS * 1000);
