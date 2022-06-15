const canAnimate = ($element) =>
    !$element.is(":hover") && !$element.is(':animated');

const ifCanAnimate = (fn) => (element, ...args) => {
    const $element = typeof element === "string" ? $(element) : element;
    if (canAnimate($element)) {
        fn($element, ...args);
    }
};

const handleHeader = () => {
    // Get a random rotation
    const degrees = random(-HEADING_ROTATION_ABS_MAX_DEGREES, HEADING_ROTATION_ABS_MAX_DEGREES);
    editCssWithQuery("#heading", {
        'transform' : `rotate(${degrees}deg)`,
        myRotationProperty: degrees
    });
};

const handleBooks = () => {
    // Moves along the x axis
    const $container = $("#port-container");
    const maxLeft = getMaxButtonLeeway($container, "width");
    const leftPosition = random(0, maxLeft);
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
    const maxTop = getMaxButtonLeeway($container, "height");
    const topPosition = random(0, maxTop);
    editCssWithQuery($container, {
        top: `${topPosition}px`,
    });
};

const handleAboutMe = () => {
    wiggle("#me-container");
};

const wiggle = ifCanAnimate(($element) => {
    const maxDistance = WIGGLE_DISTANCE;
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

        const animation = {
            top: `${topPx + topDelta}px`,
            left: `${leftPx + leftDela}px`,
        }
        $element.animate(animation, frameDuration);
    }
    $element.animate({top, left}, frameDuration);
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
    const padding = `${BREATHE_ANIMATION_PADDING}px`;
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
        duration: transition,
    }, 'ease-in-out');
});

const getMaxButtonLeeway = ($container, cssProperty) => {
    const buttonWidth = parseInt($container.find(".menu-button").css(cssProperty));
    const spaceWidth = parseInt($container.parent().css(cssProperty));
    return spaceWidth - buttonWidth;
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
