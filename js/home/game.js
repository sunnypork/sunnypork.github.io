// Moves game piece to random place on the screen
const moveMe = ($game, $window) => {
    const getRandomLeft = getRandomPropertyValue($game, $window, "width", "left");
    const getRandomTop = getRandomPropertyValue($game, $window, "height", "top");
    return () => {
        const left = getRandomLeft();
        const top = getRandomTop();
        $game.css({left, top});
    };
};

const getRandomPropertyValue = ($game, $window, measure, property) => () => {
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
    $game.find("#meemu").fadeOut();
    $game.find("a").on("click", (event) => event.stopPropagation());
    setTimeout(
        () => $game.find("#win-screen").fadeIn(),
        250
    );
    setTimeout(
        () => $window.one(
            "click",
            () => $game.css({opacity: 0, "pointer-events": "none"})
        ),
        1000
    );
};

$(() => {
    const $window = $(window);
    if (shouldPlay($window)) {
        const $game = $("#game");
        $game.show();
        const onMouseEnter = moveMe($game, $window);
        $game.on("mouseenter", onMouseEnter);
        $game.on("click", win($game, $window));
        onMouseEnter();
    }
});
