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
    if ($window.height() < width && width >= MIN_WIDTH_TO_PLAY) {
        return random(0, CHANCE_TO_PLAY_ONE_OF) === 0;
    }
    return false;

};

$(() => {
    const $window = $(window);
    if (shouldPlay($window)) {
        const $game = $("#game");
        $game.show();
        const onMouseEnter = moveMe($game, $window);
        $game.on("mouseenter", onMouseEnter);
        onMouseEnter();
    }
});
