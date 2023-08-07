let bottom = 0;
let locked = false;

const insertImage = (src) => {
    return new Promise((resolve) => {
        const $img = $(`<img class="still" src="${src}" alt="still"/>`);
        $('body').append($img);
        $img.on("click", () => window.open(src, "_blank"));
        $img.one("load", () => {
            resolve(onImageLoad($img));
        });
    });
};

const onImageLoad = ($img) => {
    return new Promise((resolve) => {
        while ($img.width() > $(window).width() || $img.height() > $(window).height()) {
            $img.css({width: `${$img.width() / WIDTH_OVERFLOW_FACTOR}px`})
        }
        const width = $img.width();
        const height = $img.height();
        const left = random(X_AXIS_MARGIN, $(window).width() - width - X_AXIS_MARGIN);
        const top = bottom + random(NEXT_IMAGE_MIN_DELTA, NEXT_IMAGE_MAX_DELTA);
        bottom = top + height;
        $img.css({
            left: `${left}px`,
            top: `${top}px`,
        });
        $img.fadeIn("slow");
        resolve();
    });
};

const insertImages = (images) => {
    return images.map(insertImage);
};

const insertRandomImages = async () => {
    if (locked) {
        return new Promise((resolve) => setTimeout(resolve)).then(insertRandomImages);
    } else {
        locked = true;
        const images = shuffleArray(IMAGES);
        await Promise.all(insertImages(images));
        locked = false;
    }
};

const atBottomOfPage = () => {
    const $window = $(window);
    const scrollHeight = $(document).height();
    const scrollPosition = $window.height() + $window.scrollTop();
    return (scrollHeight - scrollPosition) / scrollHeight < 0.05;
};

const fillPage = () => {
    insertRandomImages().then(() => {
        if (atBottomOfPage()) {
            fillPage();
        }
    });
}

const initInfiniteScroll = () => {
    const $window = $(window);
    const insertIfAtEnd = async () => {
        if (atBottomOfPage()) {
            $window.off("scroll", insertIfAtEnd);
            await insertRandomImages();
            $window.on("scroll", insertIfAtEnd);
            await insertIfAtEnd();
        }
    };
    $window.on("scroll", insertIfAtEnd);
    return insertIfAtEnd()
}

$(initInfiniteScroll);
