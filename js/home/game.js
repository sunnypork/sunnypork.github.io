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
    return true; // TODO remove
    const width = $window.width();
    if ($window.height() < width && width >= MIN_WIDTH_TO_PLAY) {
        return random(0, CHANCE_TO_PLAY_ONE_OF) === 0;
    }
    return false;

};

const win = ($game, $window) => (event) => {
    event.preventDefault();
    $game.off("mouseenter");
    $game.off("click");
    $game.css({
        backgroundColor: "red",
        top: 0,
        left: 0,
        width: $window.width(),
        height: $window.height(),
        "border-radius": 0,
    });
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
