const canAnimate = ($element) =>
    !$element.is(":hover") && !$element.is(':animated');

const ifCanAnimate = (fn) => (element, ...args) => {
    const $element = typeof element === "string" ? $(element) : element;
    if (canAnimate($element)) {
        fn($element, ...args);
    }
};

const rotateCss = (css, degrees) => ({
    ...css,
    'transform' : `rotate(${degrees}deg)`,
    myRotationProperty: degrees
});

const handleHeader = () => {
    // Get a random rotation
    const degrees = random(-HEADING_ROTATION_ABS_MAX_DEGREES, HEADING_ROTATION_ABS_MAX_DEGREES);
    editCssWithQuery("#heading", rotateCss({}, degrees));
};

const handleBooks = () => {
    // Moves along the x axis
    const $container = $("#port-container");
    const leftPosition = getButtonSlidePx($container, "width");
    editCssWithQuery($container, {
        left: `${leftPosition}px`,
    });
};

const handleVideoArt = () => {
    breathe("#art");
};

const handleStills = () => {
    // Move along the y axis
    const $container = $("#stills-container");
    const topPosition = getButtonSlidePx($container, "height");
    editCssWithQuery($container, {
        top: `${topPosition}px`,
    });
};

const handleAboutMe = () => {
    wiggle("#me-container");
};

const wiggle = ifCanAnimate(($element) => {
    const $button = $element.find(".menu-button");

    const width = parseInt($button.css("width"));
    const maxDistance = WIGGLE_DISTANCE_BUTTON_FACTOR * width;
    const positions = random(WIGGLE_MIN_POSITIONS, WIGGLE_MAX_POSITIONS);
    const duration = randomAnimationDuration();
    const frameDuration = Math.round(duration / positions + 1);

    const top = $element.css("top");
    const left = $element.css("left");
    const topPx = parseInt(top);
    const leftPx = parseInt(left);
    for (let i = 0; i < positions; i++) {
        const leftDela = random(-maxDistance, maxDistance);
        const topDelta = random(-maxDistance, maxDistance);
        const degrees = random(-WIGGLE_ABS_MAX_DEGREES, WIGGLE_ABS_MAX_DEGREES);

        const animation = {
            top: `${topPx + topDelta}px`,
            left: `${leftPx + leftDela}px`,
        };
        animate($element, animation, frameDuration);
        animate($button, rotateCss({}, degrees), frameDuration);
    }
    animate($element, {top, left}, frameDuration);
    animate($button, rotateCss({}, 0), frameDuration);
});

const drip = ifCanAnimate(($element) => {
    const height = $element.css("height");
    const heightPx = parseInt(height);
    const newHeight = heightPx + random(DRIP_MIN, DRIP_MAX);

    const duration = randomAnimationDuration();
    const dripSpeed = DRIP_ANIMATION_RATIO * duration;
    const snapBackSpeed = (1 - DRIP_ANIMATION_RATIO) * duration;
    $element.animate({
        height: `${newHeight}px`,
    }, dripSpeed);
    $element.animate({
        height,
    }, snapBackSpeed);
});

const breathe = ifCanAnimate(($element) => {
    const width = parseInt($element.css("width"));
    const padding = `${BREATHE_ANIMATION_PADDING_TO_WIDTH * width}px`;
    const negativePadding = `-${padding}`;

    const totalDuration = randomAnimationDuration();
    const duration = totalDuration / BREATHE_COUNT;
    const breatheIn = BREATHE_ANIMATION_RATIO * duration;
    const breatheOut = (1 - BREATHE_ANIMATION_RATIO) * duration;

    for (let i = 0; i < BREATHE_COUNT; i = i + 1) {
        $element
            .animate({padding, top: negativePadding, left: negativePadding}, breatheIn)
            .animate({padding: 0, top: 0, left: 0}, breatheOut);
    }
});

const editCssWithQuery = ifCanAnimate(($element, css) => {
    const transition = randomAnimationDuration();
    animate($element, css, transition);
});

const animate = ($element, css, duration) => {
    $element.animate({
        ...css,
    }, {
        step: function(now, fx) {
            if (fx.prop === "myRotationProperty") {
                $(this).css('-webkit-transform','rotate('+now+'deg)');
                $(this).css('-moz-transform','rotate('+now+'deg)');
                // add Opera, MS etc. variants
                $(this).css('transform','rotate('+now+'deg)');
            }
        },
        duration,
    }, 'ease-in-out');
};

const getButtonSlidePx = ($container, cssProperty) => {
    const buttonWidth = parseInt($container.find(".menu-button").css(cssProperty));
    const spaceWidth = parseInt($container.parent().css(cssProperty));
    const halfButtonWidth = buttonWidth * SLIDE_BUTTON_WIDTH_ESCAPE;
    const max = spaceWidth - halfButtonWidth;
    return random(-halfButtonWidth, max);
};

const handlers = [
    handleHeader,
    handleBooks,
    handleVideoArt,
    handleStills,
    handleAboutMe,
];

const randomAnimationDuration = () =>
    random(ANIMATION_MIN_SECONDS * 1000, ANIMATION_MAX_SECONDS * 1000);
