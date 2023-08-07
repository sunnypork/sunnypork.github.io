// Moves game piece to random place on the screen
const moveMe = ($game, $window) => {
    if (!$game.hasClass("win")) {
        const left = getRandomPropertyValue($game, $window, "width", "left");
        const top = getRandomPropertyValue($game, $window, "height", "top");
        $game.css({left, top});
    }
};

const runAway = ($game, $window) => {
    if (!$game.hasClass("win")) {
        const left = random(0, 2) === 0 ? -$game.width() : $window.width();
        const top = random(0, 2) === 0 ? -$game.height() : $window.height();
        $game.css({left, top});
    }
};

const hesitate = () => {
    const ms = random(0, HESITATION_MAX_MS);
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const getRandomPropertyValue = ($game, $window, measure, property) => {
    const oldProperty = parseInt($game.css(property) || "0");
    const windowSize = $window[measure]();
    const gameSize = $game[measure]();
    const max = windowSize - (gameSize * 3);
    const rawProperty = random(0, max);
    return rawProperty < (oldProperty -  gameSize) ? rawProperty : rawProperty + (gameSize * 2);
};

const shouldPlay = ($window) => {
    const width = $window.width();
    return $window.height() < width && width >= MIN_WIDTH_TO_PLAY && random(0, CHANCE_TO_PLAY_ONE_OF) === 0;
};

const win = ($game, $window) => (event) => {
    event.preventDefault();
    $game.off("mouseenter");
    $game.off("click");
    const windowWidth = $window.width();
    const windowHeight = $window.height();
    const widthPadding = windowWidth * 0.05;
    const heightPadding = windowHeight * 0.05;
    $game.addClass("win");
    $game.css({
        top: $window.scrollTop() + heightPadding,
        left: $window.scrollLeft() + widthPadding,
        width: windowWidth - (2 * widthPadding),
        height: windowHeight - (2 * heightPadding),
    });
    $game.find("#meemu").fadeOut("fast");
    $game.find("a").on("click", (event) => event.stopPropagation());
    setTimeout(
        () => $game.find("#win-screen").fadeIn(),
        250
    );
    setTimeout(
        () => {
            $game.css({cursor: "pointer"});
            $window.one(
                "click",
                () => $game.css({
                    cursor: undefined,
                    opacity: 0, "pointer-events": "none"
                })
            )
        },
        1000
    );
};

const tooltipHeightClass = ($game, $window) => {
    const top = parseInt($game.css("top"), 10);
    const centerHeight = top + $game.height() / 2;
    const isOnTop = centerHeight < $window.height() / 3;
    return isOnTop ? "tt-bottom" : "tt-top";
};

const showCatchMe = ($game, $window) => {
    const $tooltip = $game.find(".tooltip");
    $tooltip.addClass(tooltipHeightClass($game, $window));
    const show = () => {
        $game.off("mouseenter", cancelShow);
        $game.one("mouseenter", () => $tooltip.fadeOut());
        $tooltip.fadeIn();
    };
    const cancelShow = () => {
        clearTimeout(showTimeout);
    };

    const showTimeout = setTimeout(show, 1500);
    $game.one("mouseenter", cancelShow);
};

$(async () => {
    const $window = $(window);
    if (shouldPlay($window)) {
        let catchAttempts = random(CATCH_ATTEMPTS_MIN, CATCH_ATTEMPTS_MAX);
        const $game = $("#game");
        const $meemu = $("#meemu");
        const onMouseEnter = () => {
            catchAttempts = catchAttempts - 1;
            if (catchAttempts > 0) {
                hesitate().then(() => moveMe($game, $window));
            } else {
                runAway($game, $window);
            }
        };
        $game.on("mouseenter", onMouseEnter);
        $meemu.on("mousedown", win($game, $window));
        moveMe($game, $window);
        $game.show();
        showCatchMe($game, $window);
    }
});
