const page = window.location.hash.length > 1 ? window.location.hash.replace("#", "") : "me";
history.replaceState({page}, "Redirecting", `/editor/${page}`);
const getSavedValue = () => localStorage.getItem(page) || '';
const setSavedValue = (value) => localStorage.setItem(page, value);

const addListener = () =>
	$iframe.contents().find("main").one("render", () => editor.setValue(getSavedValue(), -1))

const $iframe = $(`<iframe src="/${page}" id="main-frame" onload="addListener()" '></iframe>`);
$iframe.appendTo('#render-container');

const loadRender = () => {
	try {
		const value = editor.getSession().getValue();
		setSavedValue(value);
		const render = md.render(value);
		return insertRender($iframe.contents().find("main"), folder(page), render);
	} catch {}
};

const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/markdown");
editor.renderer.setShowGutter(false);
editor.setShowPrintMargin(false);
editor.session.setUseWrapMode(true);
editor.setShowInvisibles(true);
editor.getSession().on('change', loadRender);

const refresh = () =>
	fetch(`/${page}.md`)
		.then((response) => response.text())
		.then((text) => editor.setValue(text, -1));

document.getElementById("refresh").addEventListener("click", refresh);

document.getElementById("copy").addEventListener("click", () =>
	navigator.clipboard.writeText(getSavedValue()).then(() => alert("copied markdown text to clipboard")));
document.getElementById("beginner").addEventListener("click", () => editor.setValue(BEGINNER, -1));
document.getElementById("intermediate").addEventListener("click", () => editor.setValue(INTERMEDIATE, -1));
document.getElementById("advanced").addEventListener("click", () => editor.setValue(ADVANCED, -1));
document.getElementById("change").addEventListener("click", () => window.open(`https://github.com/sunnypork/sunnypork.github.io/edit/master/${page}.md`));
