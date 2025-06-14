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
  let content;
  let mimeType;
  let filename;

  if (type === "html") {
    content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Markdown</title>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;
    mimeType = "text/html;charset=utf-8";
    filename = "document.html";
  } else {
    content = editor.value;
    mimeType = "text/markdown;charset=utf-8";
    filename = "document.md";
  }

  const bom = '\uFEFF'; // Byte Order Mark для правильной кодировки
  const blob = new Blob([bom + content], { type: mimeType });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportZip() {
  const zip = new JSZip();

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Markdown</title>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;

  zip.file("document.md", '\uFEFF' + editor.value); // с BOM
  zip.file("document.html", '\uFEFF' + htmlContent); // с BOM

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
  if (file && (file.type === "text/markdown" || file.name.endsWith(".md"))) {
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
