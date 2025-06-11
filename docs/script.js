const editor = document.getElementById('editor');
const preview = document.getElementById('preview-pane');
const charCount = document.getElementById('charCount');
const fileSize = document.getElementById('fileSize');
const body = document.body;

const defaultText = "# https://github.com/TurboSosiska304";
editor.value = localStorage.getItem("markdown") || defaultText;
update();

// Инициализация темы
body.setAttribute('data-theme', localStorage.getItem("theme") || "dark");

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

function toggleTheme() {
  const current = body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

// 🖱 Drag’n’drop
window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type === "text/markdown" || file.name.endsWith(".md")) {
    const reader = new FileReader();
    reader.onload = () => {
      editor.value = reader.result;
      localStorage.setItem("markdown", reader.result);
      update();
    };
    reader.readAsText(file);
  } else {
    alert("Пожалуйста, перетащи .md файл.");
  }
});

function clearAll() {
  if (confirm("Are you sure you want to clear everything? This is irreversible!")) {
    editor.value = "";
    localStorage.setItem("markdown", "");
    update();
  }
}
