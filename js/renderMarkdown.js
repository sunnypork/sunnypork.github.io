const md = window.markdownit({html: true}).use(window.markdownitFootnote);

const ROOT = "https://raw.githubusercontent.com/sunnypork/sunnypork.github.io/master";
// const ROOT = "http://localhost:63342/sunnypork.github.io";

const getPath = (suffix) => `${ROOT}/${suffix}`;

const getPage = (suffix) =>
	fetch(getPath(suffix))
		.then((response) => response.text())
		.then((text) => md.render(text));

const folder = (path) => path.split("/").slice(0, -1).join("/") || ".";
const descend = (path) => path.split("/").slice(1).join("/");

const join = (pathA, pathB) => {
	if (pathB.startsWith("./")) {
		return join(pathA, descend(pathB));
	} else if (pathB.startsWith("../")) {
		return join(folder(pathA), descend(pathB));
	} else {
		return `${pathA}/${pathB}`;
	}
};

const inlinePages = (relativeTo, $parent) =>
	Promise.all(
		fixLinks(relativeTo, $parent)
			.find("a")
			.map(async (_, element) => {
				const $element = $(element);
				const href = $element.attr("href");
				if (isInlineable($element)) {
					$element.css({display: "none"});
					return getPage(href).then((render) => {
						const $render = $(render);
						$element.replaceWith($render);
						return inlinePages(folder(href), $render);
					});
				}
			})
	).then(() => $parent);

const evalCode = ($parent) => {
	const $code = $parent.find("code");
	evalScripts($code);
	evalStyle($code);
};

const evalScripts = ($code) =>
	$code
		.filter((_, element) => element.classList.contains("language-eval"))
		.each((_, element) => eval(element.textContent));

const evalStyle = ($code) =>
	$code
		.filter((_, element) => element.classList.contains("language-style"))
		.each((_, element) => {
			const style = document.createElement("style");
			style.innerHTML = element.textContent;
			document.head.appendChild(style);
		});

const isAbsolutePath = (href) => href.startsWith("/") || /^[^\/]*:\/\//.test(href);

const resolveHref = (relativeTo, href) => (isAbsolutePath(href) ? href : join(relativeTo, href));

const isInlineable = ($element) => $element.text() === "#inline" && $element.attr("href").endsWith(".md");

const fixLinks = (relativeTo, $parent) => {
	$parent.find("a, area, base, link").each((_, element) => {
		const $element = $(element);
		const href = resolveHref(relativeTo, $element.attr("href"));
		$element.attr("href", href);
	});
	$parent.find("audio, embed, iframe, img, input, script, source, track, video").each((_, element) => {
		const $element = $(element);
		const src = resolveHref(relativeTo, $element.attr("src"));
		$element.attr("src", src);
	});
	$parent.find("h1, h2, h3, h4").each((_, element) => {
		const $element = $(element);
		const text = $element.text();
		const id = text
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^0-9a-z-]/g, "");
		$element.attr("id", id);
	});
	return $parent;
};

const insertRender = ($element, enclosingFolder, render) =>
	inlinePages(enclosingFolder, $element.html(render))
		.then(evalCode)
		.then(() => $element?.[0]?.dispatchEvent(new Event("render")));

const renderMarkdown = ($element, file) => {
	const href = resolveHref(folder(window.location.pathname), file);
	return getPage(href)
		.then((render) => insertRender($element, folder(href), render));
};
