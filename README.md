# Language Redirect Blocker (LRB) 🇺🇦

![Version](https://img.shields.io/badge/version-1.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

A lightweight, drop-in web component that strictly enforces language policies on your website. Detects usage of the blocked language (default: `ru`) and redirects users to a specific "Go Away" page with no option to return until they change their language preference.

**[Live Demo](index.html)** (View this locally)

## ✨ Features

-   **Zero Dependencies**: Pure HTML/CSS/JS. No framework required.
-   **Auto-Detection**: Instantly blocks users with Russian browser/OS settings (`navigator.language`).
-   **Strict Redirects**: Automatically redirects blocked users to `goaway.html`.
-   **Persistent**: Remembers user choice via `localStorage` and `cookie`.
-   **Themeable**: Fully customizable via CSS variables.
-   **A11y & SEO**: 
    -   `goaway.html` is marked `noindex` by default.
    -   Accessible buttons and contrast-compliant text.
-   **Glitch Effect**: Includes a stylish "Glitch" ASCII art animation for the redirect page.

## 📦 Installation

### 1. Structure
Copy the files to your project (e.g., `/assets/lrb/`):

```text
/your-project
├── index.html
└── assets/
    └── lrb/
        ├── language-blocker.css
        ├── lang.js
        └── goaway.html
```

### 2. Include Assets
Add this to the `<head>` of your website:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Distressed&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

<!-- LRB Styles & Script -->
<link rel="stylesheet" href="assets/lrb/language-blocker.css">
<script src="assets/lrb/lang.js" defer></script>
```

### 3. Add Switcher
Place this empty div wherever you want the language toggle to appear:

```html
<div class="lrb-element-switcher"></div>
```

### 4. Initialize
In your main script or at the end of `<body>`:

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    LanguageGoAway.init({
      redirectUrl: 'assets/lrb/goaway.html', // Path to your blocked page
      blockedLanguage: 'ru' // Default blocked language
    });
  });
</script>
```

## 🎨 Customization

Override CSS variables in your own stylesheet to match your brand:

```css
:root {
  /* Active Button Color */
  --lrb-primary: #2563eb; 
  
  /* Gradient Accent */
  --lrb-secondary: #06b6d4; 
  
  /* Go Away Page Background */
  --lrb-bg-color: #0f172a; 
}
```

## 🔜 Roadmap

We are currently working on a **WordPress Plugin** version of this tool! support for popular WP caching plugins and easy installation.

## 💬 Feedback

Have ideas or suggestions? We'd love to hear from you!
👉 **[Leave Feedback (Google Form)](https://forms.gle/pKpqSHRDUrftyUVU8)**

## 📄 License

MIT License. Feel free to use in any project.
