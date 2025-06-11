const editor = document.getElementById('editor');
const preview = document.getElementById('preview-pane');
const charCount = document.getElementById('charCount');
const fileSize = document.getElementById('fileSize');

// Стартовое содержимое
const defaultText = "# https://github.com/TurboSosiska304";

editor.value = localStorage.getItem("markdown") || defaultText;
update();

editor.addEventListener("input", () => {
  localStorage.setItem("markdown", editor.value);
  update();
});

function update() {
  const text = editor.value;
  preview.innerHTML = marked.parse(text);
  charCount.textContent = `${text.length} chars`;
  fileSize.textContent = `${(new Blob([text]).size / 1024).toFixed(2)} KB`;
}

function exportFile(type) {
  const content = type === "html" ? preview.innerHTML : editor.value;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = type === "html" ? "document.html" : "document.md";
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportZip() {
  const zip = new JSZip();
  zip.file("document.md", editor.value);
  zip.file("document.html", preview.innerHTML);
  zip.generateAsync({ type: "blob" }).then(content => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "markdown-export.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
