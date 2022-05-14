function createPDFModal(book) {
    const {id} = book;
    const $modal = $(`
    <div class="modal">
        <div>
            <button class="prev">Previous</button>
            <button class="next">Next</button>
            &nbsp; &nbsp;
            <span>Page: <span class="page-num"></span> / <span class="page-count"></span></span>
        </div>
    </div>`);
    $modal.attr("id", id);
    const $canvas = $('<canvas></canvas>');
    $modal.append($canvas);
    return $modal;
}


function createDescription(book) {
    const $description = $('<p></p>');
    $description.text(book.description);
    return $description;
}

function createPreview(book) {
    const {id, name, preview} = book;
    const $img = $('<img alt="" src="">');
    $img.attr("alt", name);
    $img.attr("src", preview);
    const $a = $('<a rel="modal:open"></a>');
    $a.attr("href", `#${id}`);
    $a.append($img);
    return $a;
}

function createEntry(book, swap) {
    const $div = $('<div></div>');
    let [left, right] = [
        createPreview(book),
        createDescription(book),
    ];
    if (swap) {
        [right, left] = [left, right];
    }
    $div.append(createPDFModal(book), left, right);
    return $div;
}

function createEntries(books) {
    const $container = $('#entries');
    for (let i = 0; i < books.length; i = i + 1) {
        $container.append(createEntry(books[i], i % 2));
    }
}

function init() {
    createEntries(BOOKS);
}

$(init);
