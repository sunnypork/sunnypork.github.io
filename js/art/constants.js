// The basic number of pixels wide and high that a youtube video should be displayed as
const BASE_WIDTH = 560;
const BASE_HEIGHT = 325;

// How many times the base size that a video may be displayed as at a min or max
const VIDEO_MIN_SIZE_FACTOR = 0.3;
const VIDEO_MAX_SIZE_FACTOR = 1.5;

// How many pixels there will be between the sides of the video and the edge
// of the window at a minimum when a new video is inserted
const X_AXIS_MARGIN = 0;

// Number of pixels down the screen that the next video will be inserted
// at a minimum and maximum
const NEXT_VIDEO_MIN_DELTA = 2;
const NEXT_VIDEO_MAX_DELTA = 100;

// If a video's size is selected as too large, this number is how much
// to divide that size by to try again
const WIDTH_OVERFLOW_FACTOR = 2;

// To add a youtube video, you can just leave a link
// If you would like a different thumbnail, insert it as
// {link: "link-to-youtube", preview: "link-to-thumbnail"}
const VIDEOS = [
    "https://www.youtube.com/watch?v=sAdfuqRl3ZA",
    "https://www.youtube.com/watch?v=1kV9KwPlYgc",
    "https://www.youtube.com/watch?v=eNf_Kc6EyvA",
    "https://www.youtube.com/watch?v=QTDgQN1yC1I",
    "https://www.youtube.com/watch?v=wM_9v42Vc-Y",
    "https://youtu.be/zX3Krhwt08U,
    {
        link: "https://www.youtube.com/watch?v=IOPt4T5VPYM",
        preview: "https://img.youtube.com/vi/IOPt4T5VPYM/mqdefault.jpg",
    },
    {
        link: "https://www.youtube.com/watch?v=JC8TwhX_Ea0",
        preview: "https://img.youtube.com/vi/JC8TwhX_Ea0/mqdefault.jpg",
    },
];
