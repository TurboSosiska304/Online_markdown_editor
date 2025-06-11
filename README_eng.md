# Markdown Editor

Interactive Markdown editor with live preview for GitHub Pages.

## Features

- Markdown editor with backlight (via the [marked] library (https://github.com/markedjs/marked ))
- Live view of the result on the right
- Export to `.md`, `.html` and `.zip` (both files at once)
- Theme switching: light and dark
- Drag'n'drop loading of Markdown files
- Character counter and file size
- A button to clear the content
- Saves text and theme in `localStorage`
- Adaptive and user-friendly interface for operation

## Project structure

- `index.html ` — the main page with markup
- `style.css` — styles, including dark and light themes
- `script.js ` — logic of the editor, export, themes and drag'n'drop

## How to use

1. Clone or download the repository.
2. Open the `index.html ` in the browser (preferably via GitHub Pages or a local server).
3. Write Markdown in the left field, the result will immediately appear on the right.
4. Use the buttons to export and switch themes.
5. Drag and drop the `.md` file onto the page to download its contents.
6. The "Clear all" button will reset the editor.

## Requirements

- A modern browser with support for ES6 and the `Blob` API.
- Internet for downloading the `marked` and `JSZip' libraries (CDN).

## License

MIT © 2025 Acoustic & Audio Physics

## Links

- The author's GitHub: [https://github.com/TurboSosiska304 ](https://github.com/TurboSosiska304 )

---

If you have any ideas or questions, open the issue or ping me ;)