# Image Editor

A simple browser-based image editor built with HTML, CSS, and JavaScript.

## Overview

This project is a minimal frontend image editor. It includes a single-page UI (`index.html`) with the editing logic in `script.js` and styling in `style.css` and `theme.css`.

## Features (implemented)

- Load an image from your computer via the **Choose Image** button.
- Interactive filter sliders applied in real time (canvas-based):
	- `brightness`, `contrast`, `saturation`, `hueRotation`, `blur`, `grayscale`, `sepia`, `opacity`, `invert`.
- Reset filters to defaults with the **Reset** button.
- Download the edited image as `edited-image.png` with the **Download** button.



## How to use

1. Click **Choose Image** and pick an image file from your computer.
2. Adjust sliders in the **Filters** panel to preview changes on the canvas.
3. Click **Reset** to restore defaults.
4. Click **Download** to save the edited image as PNG.

## Project Structure

- `index.html` — Main application HTML and UI
- `script.js` — Image loading, filter controls, canvas drawing, reset and download handlers
- `style.css` — Core layout and styles
- `theme.css` — Theme variables and color tokens

