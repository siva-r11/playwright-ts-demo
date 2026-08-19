# Playwright Locators — Complete Notes

> **Based on:** the pasted Playwright automation transcript  
> **Topic:** Playwright Locators, DOM, built-in locators, actions, assertions, `await`, browser roles, and Test ID customization.

---

## 1. Locator Concept

In UI automation, three activities are especially important:

1. **Element identification**
2. **Action**
3. **Assertion / validation**

Example flow:

```text
Locate element
    ↓
Perform action
    ↓
Validate result
```

A **locator** is used to identify a web element on a web page.

Examples of elements:

- Text boxes
- Input fields
- Radio buttons
- Checkboxes
- Dropdowns
- Images
- Links
- Buttons
- Headings

The transcript explains that Playwright locators identify elements based on their properties/attributes and provide built-in support for waiting and retrieving elements.

---

# 2. Locator Priority Discussed in the Session

The instructor presents the following priority:

```text
1. Playwright built-in locators
2. CSS locators
3. XPath
```

Playwright supports both CSS and XPath, but the session recommends starting with Playwright's built-in locators.

The seven built-in locator methods covered in the session are:

```text
1. getByAltText()
2. getByText()
3. getByRole()
4. getByLabel()
5. getByPlaceholder()
6. getByTitle()
7. getByTestId()
```

---

# 3. Why Locators Are Important

Locators are central to Playwright automation because they are used to:

- Find elements
- Perform actions
- Perform assertions
- Work with Playwright's waiting/retrieval behavior

The transcript emphasizes that Playwright can automatically wait while trying to find elements, reducing the need for manually added waits in many element interactions.

---

# 4. Auto-Waiting

The transcript describes **auto-waiting** as a Playwright feature.

Suppose an element is still loading:

```text
Test searches for element
        ↓
Element not ready
        ↓
Playwright waits automatically
        ↓
Element becomes available
        ↓
Action/assertion continues
```

The main point from the session is that explicit synchronization code is often unnecessary for normal locator interactions because Playwright handles waiting internally.

---

# 5. Retrievability

The transcript also explains **retrievability**.

Conceptually:

```text
Locate element
     ↓
Element not available yet
     ↓
Try again
     ↓
Try again
     ↓
Element found
     ↓
Locator/action continues
```

This is presented as another reason Playwright reduces manual synchronization work.

---

# 6. DOM — Document Object Model

## Full form

**DOM = Document Object Model**

The transcript stresses that DOM is important for understanding how locators work.

A common misconception is:

```text
HTML = DOM
```

The session explains that they are not exactly the same.

---

# 7. HTML vs DOM

### HTML

HTML is the page source/markup received by the browser.

Example:

```html
<html>
    <body>
        <button>Login</button>
        <input type="text">
        <p>Hello</p>
    </body>
</html>
```

### DOM

The browser interprets the page and creates a DOM representation at runtime.

Conceptually:

```text
HTML / page response
        ↓
Browser interprets page
        ↓
DOM structure
        ↓
Rendered UI
```

The DOM represents the page as a hierarchical structure of elements.

---

# 8. DOM Hierarchy

Example:

```text
HTML
├── HEAD
└── BODY
    ├── BUTTON
    ├── INPUT
    ├── P
    └── P
```

The transcript describes this as a hierarchical representation.

Each element can contain:

- Tag name
- Attributes
- Text
- Child elements

---

# 9. How to Inspect the DOM

Ways mentioned in the transcript:

### Open DevTools

Press:

```text
F12
```

or:

```text
Right click → Inspect
```

Then use the element inspector to identify:

- Tag name
- Attributes
- Text
- Placeholder
- Name
- Other element properties

Example:

```html
<input
    type="text"
    class="search"
    name="search"
    placeholder="Search store">
```

Important locator information includes:

```text
Tag      → input
Type     → text
Name     → search
Class    → search
Placeholder → Search store
```

---

# 10. Playwright Test Structure

A locator test still starts with the standard Playwright structure:

```typescript
import { test, expect } from '@playwright/test';

test('Verify Playwright locators', async ({ page }) => {
    // test steps
});
```

The transcript emphasizes:

- `test` → creates a test
- `expect` → adds assertions
- `page` → Playwright page fixture
- `async` → allows asynchronous Playwright operations
- `await` → waits for Promise-based operations

---

# 11. Test Title

A Playwright test commonly has two arguments:

```typescript
test('Test title', async ({ page }) => {
    // steps
});
```

First argument:

```text
Test title
```

Second argument:

```text
Arrow function containing test steps
```

The transcript recommends meaningful titles such as:

```text
Verify Playwright locators
Check login button
Verify registration page
```

---

# 12. Launching a Page

Use:

```typescript
await page.goto('https://example.com');
```

Example from the session style:

```typescript
await page.goto('https://demo.nopcommerce.com');
```

---

# 13. Locator Return Type

The transcript repeatedly emphasizes an important point:

> Locator methods return a **Locator** object.

For example:

```typescript
const logo = page.getByAltText('nopCommerce demo store');
```

Conceptually:

```text
getByAltText()
       ↓
   Locator
```

In TypeScript, the type can be specified as:

```typescript
import { Locator, test, expect } from '@playwright/test';

const logo: Locator = page.getByAltText('nopCommerce demo store');
```

---

# 14. When to Use `await`

The session explains that `await` is required when:

1. The operation returns a Promise.
2. The operation performs an action/assertion that returns a Promise.

### Locator creation

```typescript
const logo = page.getByAltText('...');
```

No `await` is needed merely to create the locator.

### Action

```typescript
await logo.click();
```

`click()` performs an action and returns a Promise.

### Assertion

```typescript
await expect(logo).toBeVisible();
```

The assertion is asynchronous and returns a Promise.

---

# 15. Important `await` Rule

Remember the distinction:

```typescript
page.getByText('Hello')
```

returns a locator.

Therefore:

```typescript
const element = page.getByText('Hello');
```

does not need `await`.

But:

```typescript
await element.click();
```

does.

And:

```typescript
await expect(element).toBeVisible();
```

does.

---

# 16. Locator #1 — `getByAltText()`

## Purpose

Used to locate elements using their **alt text**.

The transcript primarily demonstrates it for:

- Images
- Image-like elements
- Elements containing an `alt` attribute

Example HTML:

```html
<img
    src="logo.png"
    alt="nopCommerce demo store">
```

Locator:

```typescript
page.getByAltText('nopCommerce demo store');
```

---

# 17. `getByAltText()` Example

```typescript
import { test, expect, Locator } from '@playwright/test';

test('Verify logo', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com');

    const logo: Locator =
        page.getByAltText('nopCommerce demo store');

    await expect(logo).toBeVisible();
});
```

---

# 18. Key Points — `getByAltText()`

Use it when:

- The element has meaningful `alt` text.
- The target is typically an image/image-like element.

The transcript describes `alt` as an attribute/property.

Example:

```text
alt = "nopCommerce demo store"
```

The method returns a locator.

---

# 19. Locator #2 — `getByText()`

## Purpose

`getByText()` locates an element using its **visible text / inner text**.

Unlike `alt`, the text is not an HTML attribute.

Example:

```html
<h2>Welcome to our store</h2>
```

Locator:

```typescript
page.getByText('Welcome to our store');
```

---

# 20. When to Use `getByText()`

The transcript recommends it mainly for **non-interactive elements** such as simple text content.

Examples:

```html
<div>Welcome</div>
<p>Hello</p>
<span>Message</span>
<h2>Welcome to our store</h2>
```

These elements may primarily be used for displaying information rather than performing interaction.

---

# 21. `getByText()` Example

```typescript
await expect(
    page.getByText('Welcome to our store')
).toBeVisible();
```

The locator can be stored first:

```typescript
const text = page.getByText('Welcome to our store');

await expect(text).toBeVisible();
```

Or used directly:

```typescript
await expect(
    page.getByText('Welcome to our store')
).toBeVisible();
```

---

# 22. `getByText()` Supports Different Matching Forms

The transcript demonstrates three forms:

1. Full string
2. Substring / partial text
3. Regular expression

### Full text

```typescript
page.getByText('Welcome to our store');
```

### Substring

```typescript
page.getByText('Welcome to');
```

The transcript demonstrates that partial text can match the larger visible text.

### Regular expression

```typescript
page.getByText(/welcome to our store/i);
```

The `i` flag is used in the transcript to ignore case sensitivity.

---

# 23. Regular Expression Example

Regular expression syntax:

```typescript
/welcome\s+to\s+our\s+store/i
```

Here:

- `/ ... /` defines the expression.
- `\s+` represents spaces.
- `i` makes matching case-insensitive.

Example:

```typescript
await expect(
    page.getByText(/welcome\s+to\s+our\s+store/i)
).toBeVisible();
```

---

# 24. Case Sensitivity

The transcript notes that text values are case-sensitive when matching normal text.

For example:

```typescript
page.getByText('Welcome');
```

and:

```typescript
page.getByText('welcome');
```

can behave differently.

A regular expression with `i` can be used when case should be ignored:

```typescript
page.getByText(/welcome/i);
```

---

# 25. Locator #3 — `getByRole()`

`getByRole()` is one of the most important Playwright locators covered in the session.

It is used to locate elements using their **accessibility role** and accessible name.

Examples mentioned:

- Buttons
- Links
- Checkboxes
- Radio buttons
- Headings
- Lists
- Tables
- Other role-based elements

---

# 26. `getByRole()` Syntax

General pattern:

```typescript
page.getByRole('role', {
    name: 'accessible name'
});
```

Example:

```typescript
page.getByRole('button', {
    name: 'Submit'
});
```

---

# 27. `getByRole()` — Example with Link

The transcript uses a registration link.

Example:

```typescript
await page.getByRole('link', {
    name: 'Register'
}).click();
```

Here:

```text
role = link
name = Register
```

---

# 28. Why `getByRole()` Is Powerful

It can be used with interactive elements such as:

```text
Button
Link
Checkbox
Radio
Listbox
```

It can also be used for role-based elements such as:

```text
Heading
Table
List
```

The session demonstrates using it for both interaction and validation.

---

# 29. Accessible Role vs HTML Attribute

The transcript explains an important distinction:

The **role used by `getByRole()` is not simply the presence of a literal `role` attribute**.

Some HTML elements have an implicit accessibility role.

Example:

```html
<button>Submit</button>
```

The element's role is:

```text
button
```

even without:

```html
role="button"
```

---

# 30. Implicit and Explicit Roles

## Implicit role

The element's HTML type naturally maps to a role.

Example:

```html
<button>Submit</button>
```

Role:

```text
button
```

The transcript calls this an **implicitly defined role**.

## Explicit / mapped role

Some elements have an accessibility role that differs from their HTML tag.

Example:

```html
<input type="checkbox">
```

Role:

```text
checkbox
```

Example:

```html
<h3>Sign Up</h3>
```

Role:

```text
heading
```

The transcript refers to these as explicitly defined/determined roles.

---

# 31. Examples of Roles Discussed

| HTML Element / Type | Role Discussed |
|---|---|
| `button` | `button` |
| Anchor link | `link` |
| Heading (`h1`–`h6`) | `heading` |
| Checkbox | `checkbox` |
| Radio | `radio` |
| Text input / email / password | `textbox` |
| Search input | `searchbox` |
| `li` | `listitem` |
| `option` | `option` |
| `table` | `table` |
| Image | `img` |

The exact role should be identified from the element and accessibility semantics.

---

# 32. `getByRole()` with Heading

Example:

```html
<h1>Register</h1>
```

Locator:

```typescript
page.getByRole('heading', {
    name: 'Register'
});
```

Validation:

```typescript
await expect(
    page.getByRole('heading', {
        name: 'Register'
    })
).toBeVisible();
```

---

# 33. `getByRole()` with Checkbox

Example:

```typescript
page.getByRole('checkbox', {
    name: 'Subscribe'
});
```

This can be used to locate and interact with a checkbox.

---

# 34. `getByRole()` with Button

Example:

```typescript
await page.getByRole('button', {
    name: 'Submit'
}).click();
```

This combines:

```text
Role → button
Name → Submit
Action → click
```

---

# 35. `getByRole()` — Name

The transcript repeatedly emphasizes the `name` option.

General pattern:

```typescript
page.getByRole('button', {
    name: 'Submit'
});
```

The name is the accessible/display name used to identify the correct role element.

---

# 36. `getByRole()` — When to Use

A good approach from the session is:

- Interactive element → consider `getByRole()`
- Button → `getByRole('button', ...)`
- Link → `getByRole('link', ...)`
- Checkbox → `getByRole('checkbox', ...)`
- Radio → `getByRole('radio', ...)`
- Heading → `getByRole('heading', ...)`

For simple non-interactive visible text, `getByText()` is also demonstrated.

---

# 37. Locator #4 — `getByLabel()`

`getByLabel()` is mainly demonstrated for **form controls**.

Typical form elements:

- First name
- Last name
- Email
- Password
- Other labeled fields

Example HTML concept:

```html
<label>First name:</label>
<input type="text">
```

Locator:

```typescript
page.getByLabel('First name:');
```

---

# 38. `getByLabel()` Example

The transcript uses form fields such as:

```text
First Name
Last Name
Email
```

Example:

```typescript
await page.getByLabel('First name:').fill('John');
await page.getByLabel('Last name:').fill('Doe');
await page.getByLabel('Email:').fill('abc@gmail.com');
```

The label text should match the label used by the form.

---

# 39. `fill()` Method

The session uses `fill()` to enter text.

Example:

```typescript
await page.getByLabel('First name:').fill('John');
```

The transcript compares this with Selenium's `sendKeys()` concept.

Recommended method in this session:

```typescript
fill()
```

The instructor advises using `fill()` rather than the older/duplicated `type()` method discussed in the transcript.

---

# 40. `getByLabel()` Advantages

Useful when:

- A form control has a visible label.
- You want to identify the field based on the label rather than low-level attributes.

Example:

```text
Label: First name:
        ↓
getByLabel()
        ↓
Input field
```

---

# 41. `getByLabel()` and `await`

Locator creation:

```typescript
page.getByLabel('First name:')
```

returns a locator.

Filling the field:

```typescript
await page.getByLabel('First name:').fill('John');
```

requires `await` because `fill()` is an asynchronous action.

---

# 42. CAPTCHA Note from the Session

The transcript demonstrates a page that sometimes displays a CAPTCHA/human verification challenge.

The instructor explains that these security mechanisms are not intended to be automated.

For practice, the session suggests using an environment/page where the CAPTCHA does not interrupt the test.

Key learning point:

```text
CAPTCHA/security challenge
        ↓
Not a normal UI element for automation
```

---

# 43. Locator #5 — `getByPlaceholder()`

`getByPlaceholder()` locates an element using its `placeholder` attribute.

Example:

```html
<input
    type="text"
    placeholder="Search store">
```

Locator:

```typescript
page.getByPlaceholder('Search store');
```

---

# 44. When to Use `getByPlaceholder()`

The transcript recommends it especially for:

- Input boxes
- Search boxes
- Inputs without a useful visible label
- Inputs with a meaningful placeholder

Example:

```text
placeholder = Search store
```

---

# 45. `getByPlaceholder()` Example

```typescript
await page
    .getByPlaceholder('Search store')
    .fill('laptop');
```

The locator finds the input and `fill()` enters the search text.

---

# 46. `getByPlaceholder()` — Key Point

`placeholder` is an HTML attribute.

Example:

```html
<input placeholder="Search store">
```

So the locator uses that attribute value.

---

# 47. Five Locator Methods Covered So Far

| Locator | Main Target |
|---|---|
| `getByAltText()` | Images / elements with alt text |
| `getByText()` | Visible text / non-interactive text |
| `getByRole()` | Role-based / accessible elements |
| `getByLabel()` | Form controls with labels |
| `getByPlaceholder()` | Inputs with placeholder text |

---

# 48. Locator #6 — `getByTitle()`

`getByTitle()` locates an element using its `title` attribute.

Example:

```html
<a title="Homepage">Home</a>
```

Locator:

```typescript
page.getByTitle('Homepage');
```

---

# 49. When to Use `getByTitle()`

Use it when the element has a meaningful `title` attribute.

Example:

```html
<a
    href="/"
    title="Homepage">
    Home
</a>
```

Then:

```typescript
await expect(
    page.getByTitle('Homepage')
).toBeVisible();
```

---

# 50. `getByTitle()` Example

The transcript demonstrates locating a link using its title and then performing an assertion.

```typescript
await expect(
    page.getByTitle('Homepage')
).toBeVisible();
```

It can also be used for an action if the target supports that action.

Example:

```typescript
await page.getByTitle('Homepage').click();
```

---

# 51. `title` Is an Attribute

Important distinction:

```text
title → HTML attribute
```

Therefore:

```typescript
page.getByTitle('Homepage');
```

uses the title attribute value.

---

# 52. Locator #7 — `getByTestId()`

The final built-in locator demonstrated is:

```typescript
getByTestId()
```

It is used for elements marked with a test ID attribute.

Common HTML example:

```html
<input data-testid="profile-email">
```

Locator:

```typescript
page.getByTestId('profile-email');
```

---

# 53. Why Use Test IDs?

The transcript presents Test ID as especially useful when:

- Role-based locators are unstable/not suitable.
- Text-based locators are unstable/not suitable.
- You have a dedicated stable test attribute.

Example:

```html
<div data-testid="profile-name">
    John Doe
</div>
```

Locator:

```typescript
page.getByTestId('profile-name');
```

---

# 54. `getByTestId()` Example

```typescript
await expect(
    page.getByTestId('profile-email')
).toHaveText('email@example.com');
```

Another:

```typescript
await expect(
    page.getByTestId('profile-name')
).toHaveText('John Doe');
```

The transcript demonstrates using Test IDs to capture elements and then validate their text.

---

# 55. Default Test ID Attribute

The transcript demonstrates the standard test-ID idea using:

```html
data-testid="..."
```

Example:

```html
<div data-testid="profile-name">
    John Doe
</div>
```

Then:

```typescript
page.getByTestId('profile-name');
```

---

# 56. Test ID Customization

One of the most important advanced points in this session is that the Test ID attribute can be customized in Playwright configuration.

Suppose the application's developers use:

```html
data-pw="profile-name"
```

instead of:

```html
data-testid="profile-name"
```

The automation can be configured to use `data-pw`.

The test code can continue using:

```typescript
page.getByTestId('profile-name');
```

without changing every test.

---

# 57. Why Test ID Customization Is Useful

Without customization:

```text
Application changes:
data-testid
       ↓
data-pw
       ↓
Automation may stop finding elements
```

With Playwright's configurable Test ID attribute:

```text
Application changes:
data-testid
       ↓
data-pw

Update playwright.config.ts
       ↓
Existing getByTestId() code can remain the same
```

The instructor presents this as a Playwright-specific convenience.

---

# 58. Test ID Configuration Concept

In `playwright.config.ts`, configure the desired attribute under the Playwright test configuration.

Conceptual example:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        testIdAttribute: 'data-pw',
    },
});
```

Then this HTML:

```html
<div data-pw="profile-name">
    John Doe
</div>
```

can still be located with:

```typescript
page.getByTestId('profile-name');
```

---

# 59. Important Test ID Principle

The method stays:

```typescript
getByTestId()
```

The configurable part is the underlying HTML attribute.

Example:

```text
Default:
getByTestId()
      ↓
data-testid

Customized:
getByTestId()
      ↓
data-pw
```

The locator method does not need to change.

---

# 60. Locator Comparison

| Locator | Looks At | Typical Use |
|---|---|---|
| `getByAltText()` | `alt` | Images |
| `getByText()` | Visible/inner text | Text content |
| `getByRole()` | Accessibility role/name | Interactive/accessibility-based elements |
| `getByLabel()` | Form label | Form controls |
| `getByPlaceholder()` | `placeholder` | Inputs/search |
| `getByTitle()` | `title` | Elements with title |
| `getByTestId()` | Test ID attribute | Stable automation hooks |

---

# 61. Attribute vs Text vs Role

The transcript emphasizes understanding what each method is using.

### `getByAltText()`

Uses:

```text
alt attribute
```

### `getByText()`

Uses:

```text
Visible / inner text
```

### `getByRole()`

Uses:

```text
Accessibility role + accessible name
```

### `getByLabel()`

Uses:

```text
Form label
```

### `getByPlaceholder()`

Uses:

```text
placeholder attribute
```

### `getByTitle()`

Uses:

```text
title attribute
```

### `getByTestId()`

Uses:

```text
Configured test ID attribute
```

---

# 62. Locator Selection Guide

A practical study guide based on the transcript:

```text
Image with alt text
    → getByAltText()

Visible non-interactive text
    → getByText()

Button / link / checkbox / radio / heading
    → getByRole()

Form field with visible label
    → getByLabel()

Input with useful placeholder
    → getByPlaceholder()

Element with useful title
    → getByTitle()

Stable automation attribute
    → getByTestId()
```

---

# 63. Example End-to-End Locator Test

```typescript
import { test, expect } from '@playwright/test';

test('Verify Playwright locators', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com');

    // Alt text
    await expect(
        page.getByAltText('nopCommerce demo store')
    ).toBeVisible();

    // Visible text
    await expect(
        page.getByText('Welcome to our store')
    ).toBeVisible();

    // Role
    await page.getByRole('link', {
        name: 'Register'
    }).click();

    // Heading
    await expect(
        page.getByRole('heading', {
            name: 'Register'
        })
    ).toBeVisible();
});
```

---

# 64. Another Example — Form Locators

```typescript
import { test, expect } from '@playwright/test';

test('Fill registration form', async ({ page }) => {
    await page.goto('https://example.com/register');

    await page.getByLabel('First name:').fill('John');
    await page.getByLabel('Last name:').fill('Doe');
    await page.getByLabel('Email:').fill('john@example.com');
});
```

---

# 65. Another Example — Placeholder

```typescript
test('Search product', async ({ page }) => {
    await page.goto('https://example.com');

    await page
        .getByPlaceholder('Search store')
        .fill('laptop');
});
```

---

# 66. Another Example — Role

```typescript
test('Submit form', async ({ page }) => {
    await page.goto('https://example.com');

    await page.getByRole('button', {
        name: 'Submit'
    }).click();
});
```

---

# 67. Another Example — Test ID

```typescript
test('Verify profile', async ({ page }) => {
    await page.goto('https://example.com/profile');

    await expect(
        page.getByTestId('profile-name')
    ).toHaveText('John Doe');
});
```

---

# 68. Combining Locator and Assertion

Two styles are demonstrated.

## Store locator

```typescript
const heading = page.getByRole('heading', {
    name: 'Register'
});

await expect(heading).toBeVisible();
```

## Direct locator

```typescript
await expect(
    page.getByRole('heading', {
        name: 'Register'
    })
).toBeVisible();
```

Both approaches can be used.

---

# 69. Combining Locator and Action

Example:

```typescript
await page.getByRole('link', {
    name: 'Register'
}).click();
```

Flow:

```text
getByRole()
    ↓
Locator
    ↓
click()
    ↓
Promise
    ↓
await
```

---

# 70. Locator + Fill

Example:

```typescript
await page
    .getByLabel('First name:')
    .fill('John');
```

Flow:

```text
getByLabel()
    ↓
Locator
    ↓
fill()
    ↓
await
```

---

# 71. Locator + Assertion

Example:

```typescript
await expect(
    page.getByText('Welcome to our store')
).toBeVisible();
```

Flow:

```text
getByText()
    ↓
Locator
    ↓
expect()
    ↓
toBeVisible()
    ↓
await
```

---

# 72. The Role of the Locator Object

The transcript explains that the result of built-in locator methods is a Locator object.

Example:

```typescript
const registerLink = page.getByRole('link', {
    name: 'Register'
});
```

Then the locator can be used for:

```typescript
await registerLink.click();
```

or:

```typescript
await expect(registerLink).toBeVisible();
```

---

# 73. Actions Depend on Element Type

The transcript emphasizes that the action should depend on the kind of element.

Examples:

### Button

```typescript
await button.click();
```

### Input

```typescript
await input.fill('John');
```

### Checkbox

```typescript
await checkbox.check();
```

### Link

```typescript
await link.click();
```

### Image

Usually the important operation may be validation rather than clicking.

The main point:

```text
Element type
    ↓
Choose appropriate action
```

---

# 74. Locator Strategy — Practical Thinking

Before writing a locator, inspect the element.

Ask:

1. What kind of element is it?
2. Is it interactive?
3. Does it have visible text?
4. Does it have a label?
5. Does it have a placeholder?
6. Does it have alt text?
7. Does it have a useful title?
8. Does it have a stable test ID?
9. What accessibility role does it have?

Then choose the most appropriate built-in locator.

---

# 75. Practice HTML Page

The instructor mentions a practice HTML page containing examples of all seven built-in locator types.

The suggested exercise is:

```text
Open practice HTML page
        ↓
Inspect elements
        ↓
Identify attributes/text/roles
        ↓
Create locators
        ↓
Perform actions
        ↓
Add assertions
```

The goal is not simply to memorize the methods, but to identify the correct locator for each element.

---

# 76. Running Locator Tests

Run a specific test file using:

```bash
npx playwright test <test-file>
```

Example:

```bash
npx playwright test playwright-locators.spec.ts
```

---

# 77. Run in Headed Mode

The transcript demonstrates headed execution using:

```bash
npx playwright test <test-file> --headed
```

This allows you to see the browser UI while the test executes.

---

# 78. View HTML Report

Use:

```bash
npx playwright show-report
```

The report can show:

- Test status
- Assertions
- Steps
- Values used in actions
- Failures
- Execution details

This is useful when debugging locator failures.

---

# 79. Local HTML Page with Live Server

The transcript also demonstrates creating a local HTML page for locator practice.

Example:

```text
app.html
```

A VS Code Live Server extension can be used to host the page locally.

Workflow:

```text
Create app.html
      ↓
Install Live Server extension
      ↓
Restart VS Code
      ↓
Right-click app.html
      ↓
Open with Live Server
      ↓
HTML page opens on local server URL
```

---

# 80. Why Use Live Server?

The session gives a practical reason:

Sometimes a real website does not contain every locator type required for practice.

Instead, create one local HTML page containing:

- Images
- Text
- Buttons
- Links
- Headings
- Form fields
- Placeholders
- Test IDs
- Other elements

Then practice all locator types on one page.

---

# 81. Live Server Advantage

When the HTML code is changed, the local page can reflect the changes quickly during development.

This is useful when practicing:

- Attributes
- Locator strategies
- Test IDs
- Different element types

---

# 82. Using the Local Server URL

Once the page is hosted by Live Server, Playwright can navigate to the generated local URL:

```typescript
await page.goto('http://localhost:....');
```

The exact port is environment-specific.

The transcript notes that the Live Server URL remains available while the VS Code environment/server is running.

---

# 83. Test ID Customization Scenario

Example initial HTML:

```html
<div data-testid="profile-email">
    email@example.com
</div>
```

Test:

```typescript
await expect(
    page.getByTestId('profile-email')
).toHaveText('email@example.com');
```

Later, the developer changes:

```html
<div data-pw="profile-email">
    email@example.com
</div>
```

Without configuration, the old Test ID strategy would fail.

Instead, configure:

```typescript
use: {
    testIdAttribute: 'data-pw',
}
```

Then the same test remains:

```typescript
await expect(
    page.getByTestId('profile-email')
).toHaveText('email@example.com');
```

---

# 84. Important Lesson About Test IDs

The transcript presents Test ID as a **customizable locator strategy**.

The key idea:

```text
Locator API remains:
getByTestId()

Underlying HTML attribute can be configured.
```

This means application changes to the test ID attribute can be handled centrally in configuration.

---

# 85. Built-In Locator Summary

The complete list from the transcript:

```text
1. getByAltText()
2. getByText()
3. getByRole()
4. getByLabel()
5. getByPlaceholder()
6. getByTitle()
7. getByTestId()
```

---

# 86. Quick Comparison Table

| Method | Primary Identification | Example |
|---|---|---|
| `getByAltText()` | `alt` | `getByAltText('Logo')` |
| `getByText()` | Visible text | `getByText('Welcome')` |
| `getByRole()` | Role + name | `getByRole('button', { name: 'Login' })` |
| `getByLabel()` | Label | `getByLabel('First name:')` |
| `getByPlaceholder()` | Placeholder | `getByPlaceholder('Search')` |
| `getByTitle()` | `title` attribute | `getByTitle('Homepage')` |
| `getByTestId()` | Test ID attribute | `getByTestId('profile-email')` |

---

# 87. Attribute / Property Summary

From the transcript:

```text
alt         → getByAltText()
text        → getByText()
role        → getByRole()
label       → getByLabel()
placeholder → getByPlaceholder()
title       → getByTitle()
test ID     → getByTestId()
```

Important distinction:

- `alt` → attribute
- `text` → visible/inner text
- `role` → accessibility semantics
- `label` → form label
- `placeholder` → attribute
- `title` → attribute
- Test ID → configured attribute

---

# 88. Common Interview Questions

## Q1. What is a locator in Playwright?

A locator is a mechanism used to identify web elements on a page. Playwright provides built-in locator APIs for finding elements by role, text, label, placeholder, alt text, title, and test ID.

---

## Q2. What are Playwright built-in locators?

The session covers:

```text
getByAltText()
getByText()
getByRole()
getByLabel()
getByPlaceholder()
getByTitle()
getByTestId()
```

---

## Q3. What is the recommended locator priority discussed in the session?

```text
1. Built-in Playwright locators
2. CSS
3. XPath
```

---

## Q4. What is `getByText()` used for?

It locates elements using visible/inner text and is demonstrated primarily for non-interactive text content.

---

## Q5. What is `getByAltText()` used for?

It locates elements using the `alt` text, especially images.

---

## Q6. What is `getByRole()`?

It locates elements using their accessibility role and accessible name.

Example:

```typescript
page.getByRole('button', {
    name: 'Login'
});
```

---

## Q7. What is the difference between implicit and explicit roles?

The transcript describes:

**Implicit role:** the role naturally corresponds to the HTML element type.

Example:

```html
<button>Submit</button>
```

Role:

```text
button
```

**Explicit/mapped role:** the accessibility role differs from the literal HTML tag/type.

Examples discussed include:

```text
input checkbox → checkbox
h3             → heading
```

---

## Q8. What is `getByLabel()` used for?

It is used to locate form controls by their labels.

Example:

```typescript
await page.getByLabel('First name:').fill('John');
```

---

## Q9. What is `getByPlaceholder()` used for?

It locates elements using their placeholder attribute.

Example:

```typescript
page.getByPlaceholder('Search store');
```

---

## Q10. What is `getByTitle()` used for?

It locates elements using a meaningful `title` attribute.

Example:

```typescript
page.getByTitle('Homepage');
```

---

## Q11. What is `getByTestId()`?

It locates elements using a configured Test ID attribute.

Example:

```typescript
page.getByTestId('profile-name');
```

---

## Q12. Can the Test ID attribute be customized?

Yes. The session demonstrates configuring the underlying Test ID attribute in `playwright.config.ts`.

Example:

```typescript
use: {
    testIdAttribute: 'data-pw',
}
```

Then:

```typescript
page.getByTestId('profile-name');
```

can work against:

```html
data-pw="profile-name"
```

---

## Q13. Does locator creation need `await`?

The session explains that creating the locator itself does not require `await`.

Example:

```typescript
const button = page.getByRole('button', {
    name: 'Submit'
});
```

But the action does:

```typescript
await button.click();
```

---

## Q14. Why does `click()` need `await`?

Because the click operation is asynchronous and returns a Promise.

```typescript
await button.click();
```

---

## Q15. Why does `toBeVisible()` need `await`?

It is an asynchronous assertion.

```typescript
await expect(button).toBeVisible();
```

---

# 89. Common Mistakes to Avoid

### Mistake 1 — Adding `await` to every locator creation

Avoid:

```typescript
const logo = await page.getByAltText('Logo');
```

Prefer:

```typescript
const logo = page.getByAltText('Logo');
```

---

### Mistake 2 — Forgetting `await` for actions

Avoid:

```typescript
button.click();
```

Prefer:

```typescript
await button.click();
```

---

### Mistake 3 — Forgetting `await` for assertions

Avoid:

```typescript
expect(button).toBeVisible();
```

Prefer:

```typescript
await expect(button).toBeVisible();
```

---

### Mistake 4 — Choosing a locator without inspecting the element

Always inspect:

```text
Tag
Attributes
Visible text
Label
Placeholder
Role
Test ID
```

Then choose the locator.

---

### Mistake 5 — Using the wrong role

For `getByRole()`, the correct role is critical.

Examples:

```text
Button       → button
Link         → link
Checkbox     → checkbox
Radio        → radio
Heading      → heading
Textbox      → textbox
Search input → searchbox
```

---

# 90. Recommended Locator Decision Tree

```text
Start
  |
  +-- Image with alt?
  |       └── getByAltText()
  |
  +-- Visible text?
  |       └── getByText()
  |
  +-- Accessible/interactive role?
  |       └── getByRole()
  |
  +-- Form field with visible label?
  |       └── getByLabel()
  |
  +-- Input with placeholder?
  |       └── getByPlaceholder()
  |
  +-- Meaningful title?
  |       └── getByTitle()
  |
  +-- Stable test attribute?
          └── getByTestId()
```

---

# 91. Practice Checklist

- [ ] Understand what a locator is.
- [ ] Understand the three automation activities: identification, action, assertion.
- [ ] Understand DOM vs page source/HTML.
- [ ] Inspect elements using DevTools.
- [ ] Practice `getByAltText()`.
- [ ] Practice `getByText()`.
- [ ] Practice `getByRole()`.
- [ ] Learn common accessibility roles.
- [ ] Practice `getByLabel()`.
- [ ] Practice `getByPlaceholder()`.
- [ ] Practice `getByTitle()`.
- [ ] Practice `getByTestId()`.
- [ ] Understand implicit vs explicit roles.
- [ ] Understand when `await` is required.
- [ ] Practice locator + action.
- [ ] Practice locator + assertion.
- [ ] Run tests in headed/headless mode.
- [ ] Check the Playwright HTML report.
- [ ] Create a local HTML page for practice.
- [ ] Use VS Code Live Server.
- [ ] Practice Test ID customization in `playwright.config.ts`.
- [ ] Try the seven locators on one practice page.

---

# 92. Final Revision Sheet

## Core Concept

```text
Locator = identifies a web element
```

## Priority Discussed

```text
Built-in locators
      ↓
CSS
      ↓
XPath
```

## Seven Built-In Locators

```typescript
page.getByAltText(...)
page.getByText(...)
page.getByRole(...)
page.getByLabel(...)
page.getByPlaceholder(...)
page.getByTitle(...)
page.getByTestId(...)
```

## Actions

```typescript
await locator.click();
await locator.fill('value');
```

## Assertions

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('value');
```

## Test ID Customization

```typescript
use: {
    testIdAttribute: 'data-pw',
}
```

---

# 93. One Complete Example

```typescript
import { test, expect } from '@playwright/test';

test('Practice Playwright locators', async ({ page }) => {

    await page.goto('https://example.com');

    // 1. Image
    await expect(
        page.getByAltText('Company Logo')
    ).toBeVisible();

    // 2. Visible text
    await expect(
        page.getByText('Welcome')
    ).toBeVisible();

    // 3. Button
    await page.getByRole('button', {
        name: 'Login'
    }).click();

    // 4. Form field by label
    await page.getByLabel('Username').fill('siva');

    // 5. Form field by placeholder
    await page
        .getByPlaceholder('Enter password')
        .fill('password');

    // 6. Element by title
    await expect(
        page.getByTitle('Homepage')
    ).toBeVisible();

    // 7. Element by test ID
    await expect(
        page.getByTestId('profile-name')
    ).toHaveText('Siva');
});
```

---

# 94. Key Takeaways

1. Locators are fundamental to Playwright automation.
2. Every automated interaction starts by identifying the correct element.
3. Playwright provides seven built-in locator methods in this session.
4. Built-in locators are preferred in the transcript over CSS and XPath.
5. The DOM is the runtime structure through which element information is represented.
6. `getByAltText()` is useful for elements with `alt` text.
7. `getByText()` is useful for visible text.
8. `getByRole()` uses accessibility roles and accessible names.
9. `getByLabel()` is useful for labeled form fields.
10. `getByPlaceholder()` is useful for inputs with meaningful placeholders.
11. `getByTitle()` uses the `title` attribute.
12. `getByTestId()` provides a dedicated automation hook.
13. Locator creation returns a Locator object.
14. Actions such as `click()` and `fill()` are asynchronous.
15. Assertions such as `toBeVisible()` are asynchronous.
16. `await` is used with Promise-based actions/assertions.
17. Role names are important when using `getByRole()`.
18. Test ID configuration can be customized centrally.
19. A local HTML page plus Live Server is useful for locator practice.
20. The best locator is chosen based on the element's characteristics rather than using one locator for everything.

---

## Session Flow

```text
Understand locators
      ↓
Understand DOM
      ↓
Inspect element
      ↓
Choose built-in locator
      ↓
Create Locator
      ↓
Perform action
      ↓
Add assertion
      ↓
Run test
      ↓
View report
      ↓
Practice all seven locator methods
```

