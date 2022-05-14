// Loaded via <script> tag, create shortcut to access PDF.js exports.
const pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/build/pdf.worker.js';

class PDF {

    pdfDoc = null;
    pageNum = 1;
    pageRendering = false;
    pageNumPending = null;
    context;

    constructor(id, url) {
        const $modal = $(`#${id}`);
        const $canvas = $modal.find('canvas');
        this.context = $canvas[0].getContext('2d');
        $modal.find(".prev").on('click', this.onPrevPage($modal));
        $modal.find(".next").on('click', this.onNextPage($modal));

        pdfjsLib.getDocument(url).promise.then((pdfDoc) => {
            this.pdfDoc = pdfDoc;
            $modal.find(".page-count").text(pdfDoc.numPages);
            this.queueRenderPage(this.pageNum, $modal)
        });
    }

    queueRenderPage(num, $modal) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num, $modal);
        }
        $modal.find('.page-num').text(num);
    }

    onPrevPage = ($modal) => () => {
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;
        this.queueRenderPage(this.pageNum, $modal);
    };

    onNextPage = ($modal) => () => {
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        this.pageNum++;
        this.queueRenderPage(this.pageNum, $modal);
    };

    renderPage(num, $modal) {
        this.pageRendering = true;
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then((page) => {
            const [,, width] = page.view;
            const scale = Math.min(($(window).width() * 0.5) / width, 1);
            const viewport = page.getViewport({scale});
            this.context.canvas.height = viewport.height;
            this.context.canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: this.context,
                viewport
            };

            page.render(renderContext).promise.then(() => {
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPage(this.pageNumPending, $modal);
                    this.pageNumPending = null;
                }
            });
        });
    }
}


function init() {
    BOOKS.forEach((book) => new PDF(book.id, book.pdf));
}

$(init);
