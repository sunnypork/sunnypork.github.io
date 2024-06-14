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
        random(0, 2)
            ? $game.css({
                left: -$game.width(),
                top: getRandomPropertyValue($game, $window, "height", "top"),
            })
            : $game.css({
                left: getRandomPropertyValue($game, $window, "width", "left"),
                top: -$game.height()
            });
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
        () => $game.find("#win-screen").fadeIn().css("display", "flex"),
        250
    );
    setTimeout(
        () => {
            $game.css({cursor: "pointer"});
            if (window.location.hash !== "#guest-book") {
                history.pushState(null, null, "#guest-book");
            }
            $window.on(
                "click",
                (event) => {
                    event.preventDefault();
                    history.back();
                },
            )
            $window.one('hashchange', function() {
                $window.off('click');
                $game.css({
                    cursor: '',
                    opacity: 0,
                    "pointer-events": "none"
                })
            });
        },
        500
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
    let catchAttempts = random(CATCH_ATTEMPTS_MIN, CATCH_ATTEMPTS_MAX);
    const $game = $("#game");
    const $meemu = $("#meemu");
    const $guestBook = $("#guest-book");
    $guestBook.on('load', () => $guestBook.fadeIn());

    let wanderTimeout;
    const wander = () => {
        onMouseEnter();
        if (catchAttempts) {
            wanderTimeout = setTimeout(() => wander(), random(200, 1500));
        }
    };

    const onMouseEnter = () => {
        wanderTimeout && clearTimeout(wanderTimeout);
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
    const width = $window.width();
    if ($window.height() < width && width >= MIN_WIDTH_FOR_PLAY_TOOLTIP) {
        showCatchMe($game, $window);
    } else {
        wander();
    }
    if (window.location.hash === "#guest-book") {
        $game.trigger('mouseenter');
        $meemu.trigger('mousedown');
    }
});
