let buttonEventsTimeout;
let last;

const loopButtonEvents = () => {
    // Select a random procedure index
    let index = random(0, handlers.length);
    // Prevent selecting the same handler index twice in a row
    if (index === last) {
        index = (index + 1) % handlers.length;
    }
    last = index;
    // Select the handler
    const handler = handlers[index];
    // Perform said procedure
    handler();
    // Pick a random amount of time to wait before doing something new
    const randomTime = random(BUTTON_LOOP_MIN_SECONDS * 1000, BUTTON_LOOP_MAX_SECONDS * 1000);
    // Enqueue the new event
    buttonEventsTimeout = setTimeout(loopButtonEvents, randomTime);
};

const initButtonEvents = () => {
    loopButtonEvents();
};

$(initButtonEvents);
