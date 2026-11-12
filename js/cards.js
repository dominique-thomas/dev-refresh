/*
  Project: Dev Refresh
  Description: Card data for all categories
  Author: Dominique Thomas (github.com/dominique-thomas)
  License: Shared publicly for demonstration purposes only. Reuse or redistribution not permitted without permission.
*/

/*
  Card fields
  id         unique, progress is saved against it, so do not rename
  category   matches an id in CATEGORIES
  title      shown in lists and as a Quick match answer
  summary    what it is and the older way, or the "why" on UI / UX cards
  demo       optional HTML rendered live on the card
  compare    optional { bad, good } HTML pair, used by UI / UX cards
  action     optional { label, run } button, run may return a status message
  code       optional snippet
  useCases   where it fits
  scenarios  Quick match prompts, each should point at this card only
*/

//----------------------------------
//  Categories
//----------------------------------

export const CATEGORIES = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "browser-apis", label: "Browser APIs" },
  { id: "ui-ux", label: "UI / UX" },
  { id: "accessibility", label: "Accessibility" },
  { id: "data", label: "Working with data" }
];

//----------------------------------
//  Cards
//----------------------------------

export const CARDS = [

  // HTML

  {
    id: "html-details",
    category: "html",
    title: "Accordion without JavaScript",
    summary: "You used to need a plugin or click handler. Now the browser handles expanding and collapsing.",
    demo: `<details>
      <summary>What is the return policy?</summary>
      <p>Thirty days, with the receipt.</p>
    </details>
    <details>
      <summary>Do you ship overseas?</summary>
      <p>Yes, to most countries.</p>
    </details>`,
    code: `<details>
  <summary>Question</summary>
  <p>Answer</p>
</details>`,
    useCases: "FAQs, transcripts, and optional hints.",
    scenarios: [
      "Expand a section in place when its heading is tapped, with no script.",
      "Keep a transcript folded under a heading until the reader opens it."
    ]
  },
  {
    id: "html-dialog",
    category: "html",
    title: "Native modal",
    summary: "Modals used to mean a plugin plus an overlay div. The dialog element brings its own backdrop, traps focus, and closes on Esc.",
    demo: `<dialog id="demo-dialog">
      <p>This is a native modal. Esc closes it too.</p>
      <form method="dialog"><button>Close</button></form>
    </dialog>
    <p>The dialog is in the page already, just not shown.</p>`,
    action: {
      label: "Open the modal",
      run: () => document.getElementById("demo-dialog").showModal()
    },
    code: `<dialog id="confirm">
  <p>Delete this slide?</p>
  <form method="dialog">
    <button>Cancel</button>
  </form>
</dialog>

document.getElementById("confirm").showModal();`,
    useCases: "Confirmations, settings panels, and image previews.",
    scenarios: [
      "Show a message over the page that dims everything behind it and closes on Esc.",
      "Ask for confirmation in a box that keeps keyboard focus inside it."
    ]
  },
  {
    id: "html-pickers",
    category: "html",
    title: "Date and color pickers",
    summary: "Datepicker and colorpicker plugins were everywhere. Input types now open the device's own picker.",
    demo: `<label>Date <input type="date"></label>
    <label>Color <input type="color" value="#a593ff"></label>`,
    code: `<input type="date">
<input type="color" value="#a593ff">
<input type="time">
<input type="range" min="0" max="10">`,
    useCases: "Scheduling fields, theme settings, and simple sliders.",
    scenarios: [
      "Let someone choose a day using the phone's own calendar control.",
      "Let someone choose a theme color from a swatch control, with no library."
    ]
  },
  {
    id: "html-validation",
    category: "html",
    title: "Form validation without a script",
    summary: "Checking fields used to mean a validation plugin. A few attributes make the browser block the submit and explain what is wrong.",
    demo: `<form>
      <label>Email <input type="email" required placeholder="you@example.com"></label>
      <button>Submit</button>
    </form>`,
    code: `<input type="email" required>
<input type="text" minlength="3" maxlength="20">
<input type="text" pattern="[A-Z]{3}[0-9]{4}">`,
    useCases: "Sign-up forms, settings forms, and quiz inputs.",
    scenarios: [
      "Stop a form from submitting when a field is empty, using only attributes.",
      "Have the browser reject an email address that is missing its @."
    ]
  },
  {
    id: "html-lazy",
    category: "html",
    title: "Lazy-loading images",
    summary: "Deferring images below the fold used to take a scroll listener or a plugin. One attribute does it now.",
    code: `<img src="chart.png" alt="Sales by month"
     loading="lazy" width="800" height="450">

<iframe src="lesson.html" loading="lazy"></iframe>`,
    useCases: "Long pages, galleries, and embedded lessons.",
    scenarios: [
      "Hold off downloading pictures far down a long page until the reader gets close."
    ]
  },
  {
    id: "html-datalist",
    category: "html",
    title: "Autocomplete suggestions",
    summary: "Autocomplete was a jQuery UI widget. A datalist gives a text field a list of suggestions and still accepts anything typed.",
    demo: `<label>Pick a topic
      <input list="demo-topics" placeholder="Start typing">
    </label>
    <datalist id="demo-topics">
      <option value="HTML"></option>
      <option value="CSS"></option>
      <option value="JavaScript"></option>
      <option value="Accessibility"></option>
    </datalist>`,
    code: `<input list="topics">
<datalist id="topics">
  <option value="HTML"></option>
  <option value="CSS"></option>
</datalist>`,
    useCases: "Search boxes, tag fields, and known-value inputs.",
    scenarios: [
      "Offer suggestions under a text field as someone types, while still allowing any value."
    ]
  },

  // CSS

  {
    id: "css-flex-grid",
    category: "css",
    title: "Centering and equal columns",
    summary: "Floats, clearfix, and negative margins did this job for years. Flexbox and grid handle it in a couple of lines.",
    demo: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px">
      <div class="demo-tile">One</div>
      <div class="demo-tile">Two</div>
      <div class="demo-tile">Three</div>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; height: 90px; border: 1px dashed var(--border-strong); border-radius: 8px">
      <div class="demo-tile">Centered</div>
    </div>`,
    code: `.columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    useCases: "Page layouts, toolbars, card grids, and empty states.",
    scenarios: [
      "Put a box in the exact middle of its container, both directions.",
      "Lay out three columns of equal width with a gap, without floats."
    ]
  },
  {
    id: "css-custom-properties",
    category: "css",
    title: "Custom properties for theming",
    summary: "Variables used to need Sass and a build step. CSS has its own, and they can change while the page is running.",
    demo: `<div style="--tone: #a593ff; display: flex; gap: 8px">
      <div class="demo-tile" style="flex: 1; border: 2px solid var(--tone)">Border</div>
      <div class="demo-tile" style="flex: 1; color: var(--tone)">Text</div>
      <div class="demo-tile" style="flex: 1; background: var(--tone); color: #14121c">Fill</div>
    </div>
    <p>All three read one value, --tone.</p>`,
    code: `:root {
  --accent: #a593ff;
}

.button {
  background: var(--accent);
}`,
    useCases: "Dark mode, brand colors, and spacing scales.",
    scenarios: [
      "Define a color once and have every rule that uses it update when it changes.",
      "Switch a whole page between light and dark by changing a few values."
    ]
  },
  {
    id: "css-clamp",
    category: "css",
    title: "Fluid sizes with clamp()",
    summary: "Scaling type meant a stack of media queries or a script. clamp() sets a minimum, a preferred size, and a maximum in one line.",
    demo: `<p style="font-size: clamp(1rem, 7vw, 2.25rem); font-weight: 700; line-height: 1.2">This heading scales</p>
    <p>Rotate your phone or resize the window to see it change.</p>`,
    code: `h1 {
  font-size: clamp(1rem, 7vw, 2.25rem);
}`,
    useCases: "Headings, padding, and anything that should scale within limits.",
    scenarios: [
      "Let a heading grow with the screen width but never drop under or go over set sizes."
    ]
  },
  {
    id: "css-scroll-snap",
    category: "css",
    title: "Scroll snap carousel",
    summary: "Carousels were one of the most common plugins. A scrolling row with snap points gives you the swipe behavior with no script.",
    demo: `<div style="display: flex; gap: 8px; overflow-x: auto; scroll-snap-type: x mandatory">
      <div class="demo-tile" style="flex: 0 0 80%; scroll-snap-align: center; padding: 36px 12px">Slide 1</div>
      <div class="demo-tile" style="flex: 0 0 80%; scroll-snap-align: center; padding: 36px 12px">Slide 2</div>
      <div class="demo-tile" style="flex: 0 0 80%; scroll-snap-align: center; padding: 36px 12px">Slide 3</div>
    </div>
    <p>Swipe sideways.</p>`,
    code: `.slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  flex: 0 0 80%;
  scroll-snap-align: center;
}`,
    useCases: "Image galleries, onboarding screens, and step-by-step panels.",
    scenarios: [
      "Make a swipeable row of slides that settles on one slide at a time."
    ]
  },
  {
    id: "css-sticky",
    category: "css",
    title: "Sticky headers",
    summary: "Pinning a header used to take a scroll handler that swapped classes. position: sticky does it with one rule.",
    demo: `<div style="height: 150px; overflow-y: auto; border: 1px solid var(--border-strong); border-radius: 8px">
      <div style="position: sticky; top: 0; padding: 8px 12px; background: var(--surface-raised); font-weight: 600">Section A</div>
      <p style="padding: 8px 12px">Scroll inside this box.</p>
      <p style="padding: 8px 12px">The heading stays put.</p>
      <p style="padding: 8px 12px">Until its section ends.</p>
      <p style="padding: 8px 12px">Still here.</p>
      <p style="padding: 8px 12px">And here.</p>
    </div>`,
    code: `.section-heading {
  position: sticky;
  top: 0;
}`,
    useCases: "Table headers, section labels, and toolbars.",
    scenarios: [
      "Keep a heading pinned to the top while the content under it scrolls."
    ]
  },
  {
    id: "css-aspect-ratio",
    category: "css",
    title: "aspect-ratio for media boxes",
    summary: "Responsive video boxes relied on the padding-bottom percentage hack. aspect-ratio states the shape directly.",
    demo: `<div style="aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: var(--surface-raised)">16 / 9 at any width</div>`,
    code: `.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}`,
    useCases: "Video embeds, thumbnails, and placeholder boxes.",
    scenarios: [
      "Keep a video box at 16 by 9 at any width, without the padding hack."
    ]
  },

  // JavaScript

  {
    id: "js-queryselector",
    category: "javascript",
    title: "querySelector in place of $()",
    summary: "Selecting by CSS selector was jQuery's headline feature. The browser has had the same thing built in for years.",
    code: `// jQuery
$(".card .title").addClass("active");

// Now
document.querySelector(".card .title")
  .classList.add("active");

// All matches
document.querySelectorAll(".card")
  .forEach((card) => card.hidden = false);`,
    useCases: "Any DOM work that used to start with $().",
    scenarios: [
      "Find an element with the same selector syntax you used inside $()."
    ]
  },
  {
    id: "js-fetch",
    category: "javascript",
    title: "fetch in place of $.ajax",
    summary: "Requests used to mean $.ajax or the awkward XMLHttpRequest. fetch is built in and returns a promise.",
    code: `// jQuery
$.ajax({ url: "/api/courses", success: showCourses });

// Now
fetch("/api/courses")
  .then((response) => response.json())
  .then(showCourses);`,
    useCases: "Loading content, saving form data, and calling APIs.",
    scenarios: [
      "Request something from a URL in the background without loading a library."
    ]
  },
  {
    id: "js-async-await",
    category: "javascript",
    title: "async / await in place of callbacks",
    summary: "Steps that depend on each other used to nest callback inside callback. await lets you write them top to bottom.",
    code: `async function loadCourse(id) {
  const response = await fetch("/api/courses/" + id);
  const course = await response.json();
  const lessons = await loadLessons(course);
  return lessons;
}`,
    useCases: "Any sequence of requests or timed steps.",
    scenarios: [
      "Write steps that wait on each other in reading order, without nesting callbacks."
    ]
  },
  {
    id: "js-array-methods",
    category: "javascript",
    title: "Array methods",
    summary: "$.each and $.grep covered looping and filtering. Arrays now have map, filter, find, and more of their own.",
    code: `const lessons = [
  { title: "Intro", done: true },
  { title: "Quiz", done: false }
];

const titles = lessons.map((lesson) => lesson.title);
const open = lessons.filter((lesson) => !lesson.done);
const quiz = lessons.find((lesson) => lesson.title === "Quiz");`,
    useCases: "Turning data into markup, filtering lists, and looking things up.",
    scenarios: [
      "Build a new list from an existing one without writing a for loop."
    ]
  },
  {
    id: "js-template-destructuring",
    category: "javascript",
    title: "Template literals and destructuring",
    summary: "Building strings meant quotes and plus signs, and reading object fields meant repeating the object name. Both got shorthand.",
    code: `const lesson = { title: "Intro", minutes: 12 };

// Pull fields out in one line
const { title, minutes } = lesson;

// Drop values into a string
const label = \`\${title} (\${minutes} min)\`;`,
    useCases: "Building markup strings and unpacking config objects.",
    scenarios: [
      "Drop variables into a string without plus signs, across several lines if needed."
    ]
  },
  {
    id: "js-optional-chaining",
    category: "javascript",
    title: "Optional chaining",
    summary: "Reading a nested value safely took a chain of && checks. The ?. operator stops and gives undefined if anything along the way is missing.",
    code: `// Before
const city = user && user.address && user.address.city;

// Now
const city = user?.address?.city;

// With a fallback
const name = user?.name ?? "Guest";`,
    useCases: "API responses and config objects with optional parts.",
    scenarios: [
      "Read a nested value that might be missing without the page throwing an error."
    ]
  },

  // Browser APIs

  {
    id: "api-speech",
    category: "browser-apis",
    title: "Read text aloud",
    summary: "The browser has built-in voices. No audio files and no library.",
    action: {
      label: "Hear it",
      run: () => {
        if (!("speechSynthesis" in window)) return "Speech is not available in this browser.";
        speechSynthesis.speak(new SpeechSynthesisUtterance("Welcome back"));
        return "Speaking. Check your volume if you hear nothing.";
      }
    },
    code: `const message = new SpeechSynthesisUtterance("Welcome back");
speechSynthesis.speak(message);`,
    useCases: "Read-aloud buttons and quick narration placeholders.",
    scenarios: [
      "Have the page speak a sentence without recording any audio."
    ]
  },
  {
    id: "api-clipboard",
    category: "browser-apis",
    title: "Copy to clipboard",
    summary: "Copy buttons used to need a Flash-based plugin, then a hidden text field trick. Now it is one call.",
    action: {
      label: "Copy a sample",
      run: async () => {
        await navigator.clipboard.writeText("Copied from Dev Refresh");
        return "Copied. Paste somewhere to check.";
      }
    },
    code: `await navigator.clipboard.writeText("Text to copy");`,
    useCases: "Copy link buttons, code samples, and share codes.",
    scenarios: [
      "Put a link on the clipboard when a button is tapped."
    ]
  },
  {
    id: "api-share",
    category: "browser-apis",
    title: "Native share sheet",
    summary: "Share buttons used to be a row of social widgets. On phones the page can open the system share menu instead.",
    action: {
      label: "Open share sheet",
      run: async () => {
        if (!navigator.share) return "Sharing is not available in this browser. Try it on a phone.";
        await navigator.share({ title: "Dev Refresh", url: location.href });
        return "";
      }
    },
    code: `await navigator.share({
  title: "Dev Refresh",
  url: location.href
});`,
    useCases: "Sharing a page, a result, or a certificate link.",
    scenarios: [
      "Open the phone's own share menu from a button on your page."
    ]
  },
  {
    id: "api-localstorage",
    category: "browser-apis",
    title: "Local storage",
    summary: "Remembering something on the device used to mean cookies and a plugin to read them. Local storage keeps simple values per site.",
    action: {
      label: "Count a tap",
      run: () => {
        const count = Number(localStorage.getItem("devRefresh.demoCount") || 0) + 1;
        localStorage.setItem("devRefresh.demoCount", count);
        return "Taps saved on this device: " + count + ". Reload and tap again, it keeps counting.";
      }
    },
    code: `localStorage.setItem("lastLesson", "3");
const lastLesson = localStorage.getItem("lastLesson");

// Objects go in as JSON
localStorage.setItem("progress", JSON.stringify({ seen: 8 }));`,
    useCases: "Bookmarking progress, remembering settings, and saving drafts.",
    scenarios: [
      "Remember where someone left off on this device between visits, with no server."
    ]
  },
  {
    id: "api-intersection-observer",
    category: "browser-apis",
    title: "Run code when something scrolls into view",
    summary: "This used to be a scroll handler measuring positions on every tick, usually through a waypoints plugin. An observer tells you when it happens.",
    code: `const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

observer.observe(document.querySelector(".chart"));`,
    useCases: "Reveal animations, pausing video off screen, and loading more items.",
    scenarios: [
      "Start an animation only once its section becomes visible on screen."
    ]
  },
  {
    id: "api-web-audio",
    category: "browser-apis",
    title: "Web Audio basics",
    summary: "Sound used to mean audio files or Flash. The browser can generate and shape sound in code.",
    action: {
      label: "Play a tone",
      run: () => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return "Web Audio is not available in this browser.";
        const context = new AudioContextClass();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        gain.gain.value = 0.1;
        oscillator.frequency.value = 440;
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.4);
        return "Played a short tone.";
      }
    },
    code: `const context = new AudioContext();
const oscillator = context.createOscillator();

oscillator.frequency.value = 440;
oscillator.connect(context.destination);
oscillator.start();
oscillator.stop(context.currentTime + 0.4);`,
    useCases: "Feedback sounds, simple games, and audio visualizers.",
    scenarios: [
      "Generate a tone or sound effect in code, with no audio file."
    ]
  },

  // UI / UX

  {
    id: "ux-tap-targets",
    category: "ui-ux",
    title: "Tap target size",
    summary: "Fingers are less precise than a mouse pointer. Controls around 44px tall with space between them are much harder to miss or mis-tap.",
    compare: {
      bad: `<div style="display: flex; gap: 2px">
        <button type="button" style="min-height: 0; padding: 1px 5px; font-size: 11px">Edit</button>
        <button type="button" style="min-height: 0; padding: 1px 5px; font-size: 11px">Copy</button>
        <button type="button" style="min-height: 0; padding: 1px 5px; font-size: 11px">Delete</button>
      </div>`,
      good: `<div style="display: flex; gap: 10px">
        <button type="button">Edit</button>
        <button type="button">Copy</button>
        <button type="button">Delete</button>
      </div>`
    },
    useCases: "Toolbars, list actions, and anything used on a phone.",
    scenarios: [
      "People keep hitting Delete when they meant Copy in a tight toolbar on phones."
    ]
  },
  {
    id: "ux-contrast",
    category: "ui-ux",
    title: "Contrast and readable text",
    summary: "Low-contrast text looks refined in a mockup and is hard to read on a real screen in daylight. Body text should stand clearly off its background.",
    compare: {
      bad: `<p style="color: #55525f">Export finished. Your file is ready to download.</p>`,
      good: `<p style="color: var(--text)">Export finished. Your file is ready to download.</p>`
    },
    useCases: "Body text, labels, placeholder text, and disabled states.",
    scenarios: [
      "Status text is hard to make out when the phone is used outdoors."
    ]
  },
  {
    id: "ux-button-labels",
    category: "ui-ux",
    title: "Button labels that say what happens",
    summary: "Yes, No, and OK make people reread the question. A label that names the action can be understood on its own.",
    compare: {
      bad: `<p>Delete this project?</p>
      <div style="display: flex; gap: 10px">
        <button type="button">Yes</button>
        <button type="button">No</button>
      </div>`,
      good: `<p>Delete this project?</p>
      <div style="display: flex; gap: 10px">
        <button type="button">Delete project</button>
        <button type="button">Keep it</button>
      </div>`
    },
    useCases: "Confirmations, forms, and any primary action.",
    scenarios: [
      "People pause at a confirmation because they have to reread the question to know what Yes does."
    ]
  },
  {
    id: "ux-states",
    category: "ui-ux",
    title: "Loading and empty states",
    summary: "A blank area reads as broken. Saying what belongs there and offering the next step turns it into a starting point.",
    compare: {
      bad: `<div style="height: 72px"></div>`,
      good: `<p>No projects yet.</p>
      <button type="button" style="align-self: flex-start">Create a project</button>`
    },
    useCases: "Lists, dashboards, search results, and first-run screens.",
    scenarios: [
      "A panel with nothing in it yet looks like the page failed to load."
    ]
  },
  {
    id: "ux-errors",
    category: "ui-ux",
    title: "Error messages that help",
    summary: "A code or a vague failure leaves people guessing. Say what went wrong in plain words and what to do about it.",
    compare: {
      bad: `<p>Error: invalid input (422)</p>`,
      good: `<p>That image is over 5 MB. Choose one under 5 MB.</p>`
    },
    useCases: "Uploads, forms, and failed requests.",
    scenarios: [
      "An upload fails and the message gives a code but no hint about how to fix it."
    ]
  },
  {
    id: "ux-thumb-reach",
    category: "ui-ux",
    title: "Thumb reach on phones",
    summary: "The top corners of a phone are the hardest area to reach one-handed. Main actions are easier to hit near the bottom.",
    compare: {
      bad: `<div style="display: flex; flex-direction: column; width: 110px; height: 180px; padding: 8px; border: 2px solid var(--border-strong); border-radius: 14px">
        <button type="button" style="align-self: flex-end; min-height: 0; padding: 4px 8px; font-size: 12px">Next</button>
      </div>`,
      good: `<div style="display: flex; flex-direction: column; justify-content: flex-end; width: 110px; height: 180px; padding: 8px; border: 2px solid var(--border-strong); border-radius: 14px">
        <button type="button" style="min-height: 0; padding: 8px; font-size: 12px">Next</button>
      </div>`
    },
    useCases: "Navigation bars, primary buttons, and step-through screens.",
    scenarios: [
      "The main action sits in the top corner and people need a second hand to press it."
    ]
  },

  // Accessibility

  {
    id: "a11y-semantics",
    category: "accessibility",
    title: "Semantic elements over generic divs",
    summary: "A div with a click handler looks like a button but ignores the keyboard and says nothing to a screen reader. The real element does both for free.",
    code: `<!-- Needs extra work to be usable -->
<div class="button" onclick="save()">Save</div>

<!-- Works with keyboard and screen readers -->
<button type="button" onclick="save()">Save</button>

<nav>...</nav>
<main>...</main>
<footer>...</footer>`,
    useCases: "Buttons, links, navigation, and page regions.",
    scenarios: [
      "Make a clickable control work with Tab and Enter without adding any attributes."
    ]
  },
  {
    id: "a11y-focus-visible",
    category: "accessibility",
    title: "Visible focus styles",
    summary: "Removing outlines because they showed on mouse clicks left keyboard users lost. :focus-visible shows the ring only when it is needed.",
    demo: `<button type="button">Tab to me</button>
    <p>With a keyboard, Tab shows a ring. A tap or click does not.</p>`,
    code: `:focus-visible {
  outline: 2px solid #a593ff;
  outline-offset: 2px;
}`,
    useCases: "Every interactive element on a page.",
    scenarios: [
      "Show a clear ring for keyboard users without it appearing on every mouse click."
    ]
  },
  {
    id: "a11y-reduced-motion",
    category: "accessibility",
    title: "Respecting reduced motion",
    summary: "Some people get dizzy or distracted by movement and set their device to limit it. A media query lets the page honor that setting.",
    code: `@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}`,
    useCases: "Page transitions, parallax, and auto-playing animation.",
    scenarios: [
      "Turn off animation for people who set their device to limit movement."
    ]
  },
  {
    id: "a11y-labels",
    category: "accessibility",
    title: "Labels on form fields",
    summary: "Placeholder text disappears as soon as someone types and is often skipped by screen readers. A label stays visible and is tied to its field.",
    demo: `<label for="demo-name">Course name</label>
    <input id="demo-name" type="text">
    <p>Tap the words "Course name" and the field takes focus.</p>`,
    code: `<label for="course-name">Course name</label>
<input id="course-name" type="text">`,
    useCases: "Every input, select, checkbox, and radio button.",
    scenarios: [
      "Make tapping the text next to a field put the cursor in that field."
    ]
  },
  {
    id: "a11y-alt-text",
    category: "accessibility",
    title: "Alt text that is useful",
    summary: "Alt text stands in for the image, so it should say what the image tells the reader. Decorative images get an empty alt so they are skipped.",
    code: `<!-- Says what the image shows -->
<img src="chart.png" alt="Completion rose from 60% to 85% after the redesign">

<!-- Decorative, skipped by screen readers -->
<img src="divider.png" alt="">`,
    useCases: "Charts, screenshots, diagrams, and photos.",
    scenarios: [
      "Describe what a chart shows for someone who cannot see it."
    ]
  },
  {
    id: "a11y-aria",
    category: "accessibility",
    title: "When ARIA is needed and when it is not",
    summary: "ARIA fills gaps that HTML cannot. If a native element already does the job, use it, and add ARIA only for what is left, like naming an icon button.",
    code: `<!-- Not needed, a button is already a button -->
<button role="button">Save</button>

<!-- Needed, the icon has no text of its own -->
<button aria-label="Close">
  <svg aria-hidden="true">...</svg>
</button>`,
    useCases: "Icon buttons, custom widgets, and live status messages.",
    scenarios: [
      "Give an icon-only button a name that screen readers will announce."
    ]
  },

  // Working with data

  {
    id: "data-file-protocol",
    category: "data",
    title: "What works when you double-click the file",
    summary: "A page opened from a folder runs under file:// and the browser treats it more strictly. fetch and module imports are blocked, and local storage behaves differently from browser to browser.",
    code: `// Blocked on file://
fetch("config.json");
import { CARDS } from "./cards.js";

// Works anywhere
<script src="config.js"></script>

// Quick local server from the project folder
npx serve
python3 -m http.server`,
    useCases: "Course wrappers, tools shared as a folder, and local previews.",
    scenarios: [
      "Work out why a page runs on a server but breaks when opened straight from a folder."
    ]
  },
  {
    id: "data-json",
    category: "data",
    title: "Reading JSON from a file or API",
    summary: "JSON is the usual format for data moving between a page and a server. It arrives as text and needs to be parsed into objects.",
    code: `// From a request
const response = await fetch("courses.json");
const courses = await response.json();

// From a string, and back again
const settings = JSON.parse("{\\"volume\\": 5}");
const text = JSON.stringify(settings);`,
    useCases: "Course data, quiz banks, and saved settings.",
    scenarios: [
      "Turn the text that came back from a request into objects you can loop over."
    ]
  },
  {
    id: "data-request-states",
    category: "data",
    title: "Handling slow and failed requests",
    summary: "A request can be slow, fail, or come back with an error page. fetch only rejects on network failure, so a 404 has to be checked by hand.",
    code: `status.textContent = "Loading...";

try {
  const response = await fetch("/api/courses");
  if (!response.ok) throw new Error(response.status);
  showCourses(await response.json());
} catch (error) {
  status.textContent = "Could not load courses. Try again.";
}`,
    useCases: "Anything that loads data after the page opens.",
    scenarios: [
      "Catch a 404 from a request, which fetch does not treat as a failure by default."
    ]
  },
  {
    id: "data-config-js",
    category: "data",
    title: "Config files as plain JavaScript",
    summary: "A .json config has to be fetched, which fails without a server. The same data in a .js file loads with a script tag anywhere, and it can hold comments.",
    code: `// config.js
const CONFIG = {
  title: "Safety Basics",
  passingScore: 80 // percent
};

<!-- index.html -->
<script src="config.js"></script>
<script src="app.js"></script>`,
    useCases: "Course wrappers, templates, and tools that run from a folder.",
    scenarios: [
      "Keep settings in their own file that still loads when there is no server."
    ]
  },
  {
    id: "data-url-params",
    category: "data",
    title: "Query strings and URLSearchParams",
    summary: "Reading ?lesson=3 from the address used to mean splitting strings by hand or a small plugin. URLSearchParams parses it for you.",
    code: `// Address: page.html?lesson=3&mode=review
const params = new URLSearchParams(location.search);

params.get("lesson"); // "3"
params.has("mode");   // true`,
    useCases: "Deep links, launch settings, and prefilled forms.",
    scenarios: [
      "Read the lesson number out of an address that ends in ?lesson=3."
    ]
  },
  {
    id: "data-api-keys",
    category: "data",
    title: "API keys and where they should not go",
    summary: "Anything in front-end code can be read by anyone who opens the page source. A secret key belongs on a server, which makes the call on the page's behalf.",
    code: `// Visible to every visitor
fetch("https://api.example.com/data?key=SECRET");

// The page asks your server, the server holds the key
fetch("/api/data");`,
    useCases: "Paid APIs, AI services, and anything billed per request.",
    scenarios: [
      "Decide whether a secret token is safe to put in a script that visitors download."
    ]
  }
];
