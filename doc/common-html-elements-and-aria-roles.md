# Common HTML Elements and Their ARIA Roles

This reference covers common HTML elements and their corresponding implicit ARIA roles, with examples relevant to Selenium, Playwright, and accessibility testing.

## Common HTML Elements and ARIA Roles

| HTML Element | Implicit ARIA Role | Notes |
|---|---|---|
| `<a href="...">` | `link` | Becomes a link when `href` is present |
| `<button>` | `button` | Native button |
| `<input type="button">` | `button` | Button input |
| `<input type="checkbox">` | `checkbox` | Checkbox control |
| `<input type="radio">` | `radio` | Radio button |
| `<input type="text">` | `textbox` | Single-line text input |
| `<input type="email">` | `textbox` | Email input |
| `<input type="search">` | `searchbox` | Search input |
| `<input type="password">` | `textbox` | Password input |
| `<input type="number">` | `spinbutton` | Numeric input |
| `<input type="range">` | `slider` | Range control |
| `<input type="submit">` | `button` | Submit control |
| `<input type="reset">` | `button` | Reset control |
| `<textarea>` | `textbox` | Multi-line text input |
| `<select>` | `combobox` / `listbox` | Depends on configuration and browser accessibility mapping |
| `<option>` | `option` | Option within a select/listbox |
| `<img alt="...">` | `img` | Meaningful image with alternative text |
| `<img alt="">` | `presentation` / `none` | Decorative image |
| `<h1>`–`<h6>` | `heading` | Heading level is also exposed |
| `<nav>` | `navigation` | Navigation landmark |
| `<main>` | `main` | Main content landmark |
| `<header>` | `banner`* | Typically page-level header |
| `<footer>` | `contentinfo`* | Typically page-level footer |
| `<aside>` | `complementary` | Supporting content |
| `<section>` | `region`* | Usually requires an accessible name |
| `<form>` | `form`* | Usually when it has an accessible name |
| `<article>` | `article` | Self-contained content |
| `<table>` | `table` | Data table |
| `<tr>` | `row` | Table row |
| `<th>` | `columnheader` / `rowheader` | Depends on header scope |
| `<td>` | `cell` | Table data cell |
| `<ul>` | `list` | Unordered list |
| `<ol>` | `list` | Ordered list |
| `<li>` | `listitem` | List item |
| `<dialog>` | `dialog` | Dialog/modal |
| `<summary>` | `button` | Disclosure control |
| `<progress>` | `progressbar` | Progress indicator |
| `<meter>` | `meter` | Scalar measurement |
| `<hr>` | `separator` | Thematic separator |
| `<div>` | None | No implicit semantic role |
| `<span>` | None | No implicit semantic role |
| `<p>` | None | No ARIA role |
| `<label>` | None | Provides/associates an accessible name |
| `<strong>` | None | Semantic emphasis |
| `<em>` | None | Semantic emphasis |

> **Note:** Some implicit role mappings depend on attributes, accessible names, browser/platform accessibility mappings, and HTML context. The table is intended as a practical automation reference rather than a complete ARIA specification.

## Most Important Roles to Remember

```text
<a>                  → link
<button>             → button
<input type="text">  → textbox
<input type="search"> → searchbox
<input type="checkbox"> → checkbox
<input type="radio"> → radio
<input type="number"> → spinbutton
<input type="range"> → slider
<select>             → combobox / listbox
<option>             → option
<img>                → img
<h1> - <h6>          → heading
<nav>                → navigation
<main>               → main
<aside>              → complementary
<article>            → article
<table>              → table
<tr>                 → row
<th>                 → columnheader / rowheader
<td>                 → cell
<ul> / <ol>          → list
<li>                 → listitem
<dialog>             → dialog
<progress>           → progressbar
<hr>                 → separator
```

## ARIA Role vs HTML Element

Native HTML elements already provide semantic information.

### Example: Button

```html
<button>Login</button>
```

The browser exposes this approximately as:

```text
Role: button
Accessible name: Login
```

You normally do **not** need to write:

```html
<button role="button">Login</button>
```

The native `<button>` already has the `button` role.

### Example: Link

```html
<a href="/home">Home</a>
```

The browser exposes:

```text
Role: link
Accessible name: Home
```

## Accessible Name

The ARIA role identifies **what the element is**, while the accessible name identifies **which element it is**.

For example:

```html
<button>Login</button>
```

```text
Role: button
Name: Login
```

For a form field:

```html
<label for="username">Username</label>
<input id="username" type="text">
```

The resulting accessibility information is approximately:

```text
Role: textbox
Name: Username
```

## Playwright Examples

Playwright provides `getByRole()` for locating elements based on their accessible role.

### Button

```typescript
await page.getByRole('button', { name: 'Login' }).click();
```

### Link

```typescript
await page.getByRole('link', { name: 'Home' }).click();
```

### Textbox

```typescript
await page.getByRole('textbox', { name: 'Username' }).fill('Siva');
```

### Checkbox

```typescript
await page.getByRole('checkbox', { name: 'Remember me' }).check();
```

### Radio Button

```typescript
await page.getByRole('radio', { name: 'Male' }).check();
```

### Heading

```typescript
await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
```

### Navigation

```typescript
await page.getByRole('navigation').isVisible();
```

## Why Use ARIA Roles in Automation?

Role-based locators are useful because they:

- Reflect the semantic meaning of an element.
- Make tests closer to how users interact with the application.
- Improve test readability.
- Reduce dependence on implementation-specific CSS classes.
- Work well with accessibility-focused testing.
- Encourage developers to build accessible interfaces.

### Preferred Playwright Locator

```typescript
await page.getByRole('button', { name: 'Login' }).click();
```

Instead of a brittle selector such as:

```typescript
await page.locator('#loginButton').click();
```

or:

```typescript
await page.locator('.btn-primary').click();
```

## Important Interview Point

**ARIA roles should not normally be added when native HTML already provides the correct semantic role.**

Prefer:

```html
<button>Login</button>
```

over:

```html
<div role="button">Login</div>
```

Native HTML elements generally provide better built-in keyboard behavior, semantics, and accessibility support.

## Quick Interview Answer

> ARIA roles describe the semantic purpose of an element to assistive technologies. Many HTML elements have implicit ARIA roles. For example, `<button>` has the `button` role, `<a href>` has the `link` role, a checkbox input has the `checkbox` role, and `<h1>` has the `heading` role. In Playwright, these roles can be used with `getByRole()` to create more user-centric and maintainable locators.
