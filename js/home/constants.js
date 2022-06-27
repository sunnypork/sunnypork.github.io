// How long to wait before trying to start another animation
// at a minimum and maximum
const BUTTON_LOOP_MIN_SECONDS = 0;
const BUTTON_LOOP_MAX_SECONDS = 0.5;

// How long to wait before changing the title of the webpage the first time
const TITLE_LOOP_DELAY_SECONDS = 1.5;
// How long to wait before changing the title of the webpage again at a min/max
const TITLE_LOOP_MIN_SECONDS = 0;
const TITLE_LOOP_MAX_SECONDS = 0;

// The length of the animation where the button covers the whole screen
const ON_CLICK_ANIMATION_SECONDS = 0.5;

// How long one of the home button animations will last at a minimum/maximum
const ANIMATION_MIN_SECONDS = 0.6;
const ANIMATION_MAX_SECONDS = 2;

// How many degrees the heading will rotate in either direction from centre
const HEADING_ROTATION_ABS_MAX_DEGREES = 360;

// factor of the button's width that the sliding buttons can escape their bounding boxes.
// example: 0.1 -> 10% of the button can be outside the bounding box
const SLIDE_BUTTON_WIDTH_ESCAPE = 0.5;

// factor for how long the animation will spend dripping down vs snapping back up
// example: 0.8 -> 80% of the animation time will be dripping down, 20% snapping up
const DRIP_ANIMATION_RATIO = 0.9;
// number of pixels to drip down at a minimum or maximum
const DRIP_MIN = 40;
const DRIP_MAX = 200;

// factor for how long the animation will spend inhaling vs exhaling
// example: 0.8 -> 80% of the animation time will be inhaling, 20% exhaling
const BREATHE_ANIMATION_RATIO = 0.5;
// factor for how much of width should be added to padding during an inhale
// example: 0.5 -> 50% of the button's width will be added to the sides of the button
const BREATHE_ANIMATION_PADDING_TO_WIDTH = 0.2;
// How many times to breathe in a single animation
const BREATHE_COUNT = 1;

// factor of the button's width that the button will move away from centre for a "wiggle"
// example: 0.1 -> move away from center by 10% of buttons size as a maximum
const WIGGLE_DISTANCE_BUTTON_FACTOR = 0.05;
const WIGGLE_MIN_POSITIONS = 15;
const WIGGLE_MAX_POSITIONS = 20;
const WIGGLE_ABS_MAX_DEGREES = 5;

//// For the clicking game
// Minimum width of the screen to enable the game
const MIN_WIDTH_TO_PLAY = 768;
// Chance to play the game is 1 out of this number
const CHANCE_TO_PLAY_ONE_OF = 50;
