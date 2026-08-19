# Playwright Automation with TypeScript — Notes

> **Source:** Notes created from the provided Playwright automation video transcript.  
> **Focus:** Environment setup, project structure, basic test creation, fixtures, async/await, execution commands, reports, UI/debug modes, browser selection, and Playwright architecture.

---

## 1. What is Playwright?

Playwright is a browser automation and end-to-end testing framework from Microsoft.

The video focuses on using Playwright with **Node.js + TypeScript**.

### Supported languages discussed

Playwright supports:

- TypeScript / JavaScript through Node.js
- Python
- Java
- .NET

For TypeScript, the video emphasizes that the syntax is essentially JavaScript syntax with TypeScript support.

---

# 2. Prerequisites

Before creating a Playwright project, install:

1. **Node.js**
2. **Visual Studio Code**

These are the primary prerequisites discussed in the session.

### Node.js

Node.js is required because Playwright's TypeScript/JavaScript setup is Node.js based.

Node.js installation also provides **npm**.

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

### VS Code

VS Code is used for:

- Writing TypeScript tests
- Managing the project
- Running commands in the integrated terminal
- Debugging automation code

---

# 3. npm and npx

Two commands are especially important.

## npm

**npm = Node Package Manager**

It is mainly used to install and manage Node.js packages.

Example:

```bash
npm install <package-name>
```

## npx

**npx = Node Package Executor**

It is used to execute packages/commands.

Example:

```bash
npx playwright test
```

### Easy way to remember

| Command | Purpose |
|---|---|
| `npm` | Install/manage packages |
| `npx` | Execute package commands |

---

# 4. Creating a Playwright Project

Create a new empty folder and open it in VS Code.

Example:

```text
PW-Demos/
```

Open the folder in VS Code.

Then open the VS Code terminal.

## Install Playwright

The command shown in the session is:

```bash
npm init playwright@latest
```

This starts the Playwright project setup wizard.

> **Note:** The transcript sometimes transcribes "Playwright" as "playright". The correct package/command name is `playwright`.

---

# 5. Playwright Installation Wizard

When the installation command is executed, Playwright asks several questions.

## Language selection

Choose:

```text
TypeScript
```

or JavaScript depending on the project.

For this course, TypeScript is the preferred option.

## Test directory

Playwright asks where end-to-end tests should be stored.

The default is:

```text
tests
```

Keep the default unless there is a reason to change it.

## GitHub Actions

The setup wizard can create a GitHub Actions workflow.

The video leaves this disabled initially and mentions that it can be enabled later.

## Install Playwright browsers

Playwright can install its supported browser binaries during setup.

The browsers discussed are:

- Chromium
- Firefox
- WebKit

---

# 6. Playwright Browser Support

The default browser projects discussed in the video are:

- **Chromium**
- **Firefox**
- **WebKit**

WebKit is associated with Safari browser behavior.

Playwright can also be configured for additional browser/device profiles such as:

- Google Chrome
- Microsoft Edge
- Mobile Chrome
- Mobile Safari

---

# 7. Default Playwright Project Structure

After installation, the project contains a structure similar to:

```text
PW-Demos/
│
├── node_modules/
├── tests/
│   └── example.spec.ts
│
├── package.json
├── playwright.config.ts
└── ...
```

## node_modules

Contains installed Node.js packages and their dependencies.

Playwright-related packages are installed here.

> Normally, `node_modules` should not be committed to Git. It is recreated using the project dependencies.

---

# 8. tests Folder

The `tests` folder is the default location for Playwright test files.

Example:

```text
tests/
├── example.spec.ts
├── login.spec.ts
└── checkout.spec.ts
```

The Playwright configuration determines where test files are discovered.

If tests are created somewhere else, the test directory configuration must be changed accordingly.

---

# 9. Test File Naming Convention

For TypeScript:

```text
.spec.ts
```

Example:

```text
mytest.spec.ts
login.spec.ts
checkout.spec.ts
```

For JavaScript:

```text
.spec.js
```

The filename can be different, but the test file should follow the configured Playwright test matching pattern.

---

# 10. playwright.config.ts

`playwright.config.ts` is the main Playwright configuration file.

It can be used to configure:

- Test directory
- Browsers/projects
- Parallel execution
- Number of workers
- Reporters
- Retries
- Timeouts
- Base URL
- Other test execution settings

Example concept:

```text
playwright.config.ts
```

The video specifically discusses browser configuration and the test directory.

---

# 11. package.json

`package.json` is the main package configuration file for a Node.js project.

The video compares it conceptually with Java's:

```text
pom.xml
```

### Comparison

| Java | Node.js / Playwright |
|---|---|
| Maven project | Node.js project |
| `pom.xml` | `package.json` |
| Maven dependencies | npm dependencies |

`package.json` contains information such as:

- Project name
- Version
- Dependencies
- Scripts
- Package configuration

Playwright dependencies are added during project initialization.

---

# 12. Playwright Installation Is Project-Specific

The video emphasizes that Playwright setup is associated with the project folder.

If you create another independent project folder, Playwright needs to be initialized there as well.

Typical setup:

```bash
mkdir PW-Demos
cd PW-Demos
npm init playwright@latest
```

---

# 13. Check Playwright Version

Use:

```bash
npx playwright --version
```

This displays the installed Playwright version.

---

# 14. Creating a Basic Playwright Test

Create a TypeScript test file inside the test directory.

Example:

```text
tests/mytest.spec.ts
```

Import the Playwright test APIs:

```typescript
import { test, expect } from '@playwright/test';
```

Two important APIs introduced in the video are:

- `test`
- `expect`

---

# 15. test Function

The `test()` function is used to define a test case.

Basic syntax:

```typescript
test('test title', async ({ page }) => {
    // test steps
});
```

The test receives:

1. A test title
2. A function containing the test steps

Example:

```typescript
test('Verify page title', async ({ page }) => {
    // test steps
});
```

---

# 16. expect Function

`expect` is used for assertions/validations.

Example:

```typescript
await expect(page).toHaveTitle('My Shop');
```

The assertion checks whether the actual page title matches the expected title.

If it matches:

```text
PASS
```

If it does not match:

```text
FAIL
```

---

# 17. Playwright Page Fixture

One of the most important concepts introduced in the video is the **page fixture**.

Example:

```typescript
test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');
});
```

Here:

```typescript
{ page }
```

is a Playwright fixture.

The `page` fixture represents a browser page/tab.

The video also introduces `browser` as another Playwright fixture.

---

# 18. What is a Fixture?

A fixture provides a prepared object/resource that can be used by the test.

The video introduces fixtures as predefined Playwright resources.

Important examples:

```text
page
browser
```

### page

Represents a browser page.

Used for:

- Navigation
- Locators
- Actions
- Reading page information
- Assertions

### browser

Represents the browser instance and is used for browser-level operations.

The video postpones detailed browser/context discussion for later sessions.

---

# 19. page.goto()

To navigate to a URL:

```typescript
await page.goto('https://example.com');
```

This opens the specified URL in the Playwright page.

Basic flow:

```text
Test
  ↓
page fixture
  ↓
page.goto()
  ↓
Application opens
```

---

# 20. Verifying Page Title

Use:

```typescript
await expect(page).toHaveTitle('Expected Title');
```

Example:

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});
```

This is an assertion, not simply a method for printing the title.

---

# 21. Getting the Page Title

If you want to retrieve the title value:

```typescript
const title = await page.title();
console.log(title);
```

Difference:

### Assertion

```typescript
await expect(page).toHaveTitle('Example Domain');
```

Used to validate.

### Retrieve value

```typescript
const title = await page.title();
console.log(title);
```

Used to get and print the actual value.

---

# 22. Complete Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    const title = await page.title();
    console.log(`Page title: ${title}`);

    await expect(page).toHaveTitle('Example Domain');
});
```

---

# 23. Why async and await Are Important

A major portion of the video explains:

- Synchronous execution
- Asynchronous execution
- Promise
- `await`
- `async`

These concepts are essential when writing Playwright tests in TypeScript.

---

# 24. Synchronous Execution

Synchronous execution means statements execute sequentially.

Example:

```typescript
console.log('Step 1');
console.log('Step 2');
console.log('Step 3');
```

Execution order:

```text
Step 1
  ↓
Step 2
  ↓
Step 3
```

The next operation follows the previous operation.

---

# 25. Asynchronous Execution

Asynchronous operations can perform work in the background.

Examples of operations that can involve asynchronous behavior:

- Browser interaction
- Page navigation
- Accessing external resources
- Database/file operations

Conceptually:

```text
Step 1 → background task
Step 2 → may continue
Step 3 → may continue
```

This creates a problem when Step 2 depends on Step 1 finishing.

---

# 26. Why Await Is Needed

Suppose:

```text
Step 1 → fetch data
Step 2 → use that data
```

Step 2 cannot correctly continue until Step 1 completes.

`await` tells the program to wait for the asynchronous operation to complete.

Example:

```typescript
await page.goto('https://example.com');

const title = await page.title();
```

The second operation waits for the first asynchronous operation to complete.

---

# 27. Promise

A Promise represents the eventual result of an asynchronous operation.

The video explains two important outcomes:

```text
Resolved
Rejected
```

### Resolved

The asynchronous operation completed successfully.

### Rejected

The asynchronous operation failed.

Conceptually:

```text
Async operation
      ↓
   Promise
   /     \
Resolved  Rejected
```

---

# 28. Promise and await

If a Playwright operation returns a Promise, `await` is generally used when the next step depends on its completion.

Example:

```typescript
await page.goto('https://example.com');
```

Example:

```typescript
const title = await page.title();
```

The video demonstrates that without `await`, the code may continue while the Promise is still pending.

---

# 29. async and await Relationship

If `await` is used inside a function, that function should be asynchronous.

Example:

```typescript
test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');
});
```

Important relationship:

```text
async
  ↓
allows await inside the function
  ↓
await waits for the Promise
```

---

# 30. Do We Need await Everywhere?

No.

The video specifically explains that synchronous operations such as:

```typescript
console.log('Hello');
```

do not require `await`.

Example:

```typescript
console.log('Step 1');
console.log('Step 2');
```

No Promise is involved in this simple operation.

But Playwright browser operations generally involve asynchronous work, so `await` is commonly required.

---

# 31. Common Mistake — Missing await

Incorrect:

```typescript
const title = page.title();
console.log(title);
```

The variable may contain a pending Promise rather than the actual title.

Correct:

```typescript
const title = await page.title();
console.log(title);
```

The video demonstrates that the title becomes available after waiting for the Promise to resolve.

---

# 32. Basic Test with Async/Await

Recommended pattern:

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    const title = await page.title();
    console.log(title);

    await expect(page).toHaveTitle('Example Domain');
});
```

---

# 33. Browser Configuration

By default, the generated Playwright project contains browser projects.

The video demonstrates:

```text
Chromium
Firefox
WebKit
```

If no specific project is supplied, the configured projects are executed.

Conceptually:

```text
One test
   ↓
Chromium
Firefox
WebKit
```

So a single test can produce multiple browser executions.

---

# 34. Worker Concept

The video introduces the term **worker**.

A worker represents a browser execution instance in the context demonstrated.

For example:

```text
Chromium → Worker
Firefox  → Worker
WebKit   → Worker
```

With three configured browser projects, the same test can execute against all three.

---

# 35. Running All Tests

Basic command:

```bash
npx playwright test
```

This runs the configured tests.

The video demonstrates that, with the default browser projects enabled, tests are executed against those configured browsers.

---

# 36. Headless Mode

Playwright runs tests in headless mode by default in the command-line execution demonstrated.

Headless means:

```text
Browser UI is not visibly displayed.
```

The browser executes in the background.

This is useful for:

- CI/CD
- Faster execution
- Automated regression runs

---

# 37. Headed Mode

To see the browser UI during execution:

```bash
npx playwright test --headed
```

Headed mode means:

```text
Browser UI is visible.
```

This is useful when learning or visually observing test execution.

---

# 38. Run a Specific Test File

If the project contains:

```text
tests/
├── mytest.spec.ts
└── mytest2.spec.ts
```

Run only one file:

```bash
npx playwright test mytest.spec.ts
```

This avoids running every test in the test directory.

---

# 39. Run Multiple Test Files

Multiple files can be passed to the command:

```bash
npx playwright test mytest.spec.ts mytest2.spec.ts
```

This executes the specified files instead of the entire test suite.

---

# 40. Run Tests Matching a Title

Playwright supports filtering tests by title.

Example:

```bash
npx playwright test -g "verify"
```

If multiple test titles contain the matching text, those tests can be selected.

Example titles:

```text
Verify page title
Verify page URL
Verify login
```

A filter such as:

```bash
-g "verify"
```

can match those tests.

---

# 41. Run a Test on a Specific Browser

Use the project option.

Example:

```bash
npx playwright test mytest.spec.ts --project=chromium
```

This runs the test only against the Chromium project.

Similarly:

```bash
npx playwright test mytest.spec.ts --project=firefox
```

or:

```bash
npx playwright test mytest.spec.ts --project=webkit
```

---

# 42. Why Use --project?

Suppose the configuration has:

```text
Chromium
Firefox
WebKit
```

Without project selection:

```bash
npx playwright test
```

the test can run against all configured projects.

With:

```bash
--project=chromium
```

only the Chromium project is selected.

---

# 43. HTML Report

Playwright generates an HTML report after test execution.

The report provides information such as:

- Passed tests
- Failed tests
- Skipped tests
- Flaky tests
- Browser/project
- Execution duration
- Individual test steps

Open the report with:

```bash
npx playwright show-report
```

The report opens as an HTML report served locally.

---

# 44. What the HTML Report Shows

The video demonstrates that the report can show:

```text
Test
 ├── Browser/project
 ├── Status
 ├── Duration
 └── Test steps
```

For example, a test may appear separately for:

```text
Chromium
Firefox
WebKit
```

This makes it easier to identify browser-specific failures.

---

# 45. UI Mode

Playwright provides a UI mode for running and inspecting tests.

Command:

```bash
npx playwright test --ui
```

UI mode provides a visual interface for test execution.

The video highlights that UI mode can provide additional execution information such as:

- Source
- Logs
- Errors
- Console information
- Network information
- Step execution
- Time-travel-style inspection

---

# 46. Time Travel in UI Mode

The video highlights a useful UI mode capability.

You can inspect the test execution and move through the recorded steps to understand what happened.

This can help answer:

- What step executed?
- What was visible at that point?
- What interaction happened?
- Where did the failure occur?

This is especially useful for complex tests.

---

# 47. Debug Mode

Playwright provides a debug mode for step-by-step execution.

Example:

```bash
npx playwright test mytest.spec.ts --debug
```

Debug mode allows you to inspect the test while it executes.

You can move through the steps and observe the browser state.

---

# 48. Step-by-Step Debugging

Conceptually:

```text
Test starts
   ↓
Pause
   ↓
Execute next step
   ↓
Inspect browser
   ↓
Execute next step
   ↓
Continue
```

This is useful for:

- Debugging failed tests
- Understanding test flow
- Inspecting browser state
- Finding incorrect assumptions

---

# 49. Useful Command Summary

| Requirement | Command |
|---|---|
| Install project | `npm init playwright@latest` |
| Check Playwright version | `npx playwright --version` |
| Run all tests | `npx playwright test` |
| Run headed | `npx playwright test --headed` |
| Run UI mode | `npx playwright test --ui` |
| Debug | `npx playwright test --debug` |
| Show report | `npx playwright show-report` |
| Run one file | `npx playwright test mytest.spec.ts` |
| Run multiple files | `npx playwright test file1.spec.ts file2.spec.ts` |
| Filter by title | `npx playwright test -g "verify"` |
| Run Chromium | `npx playwright test --project=chromium` |
| Run Firefox | `npx playwright test --project=firefox` |
| Run WebKit | `npx playwright test --project=webkit` |

---

# 50. Page Title vs Page URL

The video demonstrates both types of validation.

## Title

Retrieve:

```typescript
const title = await page.title();
```

Validate:

```typescript
await expect(page).toHaveTitle('Expected Title');
```

## URL

The current URL can be retrieved:

```typescript
const url = page.url();
console.log(url);
```

For URL validation, Playwright assertions can be used:

```typescript
await expect(page).toHaveURL(/expected-part/);
```

The video demonstrates the idea of checking whether expected text is contained in the URL.

---

# 51. Example — Verify URL

```typescript
import { test, expect } from '@playwright/test';

test('Verify page URL', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveURL(/example/);
});
```

The regular expression allows the expected portion of the URL to be matched rather than requiring a manually constructed exact string.

---

# 52. Multiple Tests in One File

A single `.spec.ts` file can contain multiple test blocks.

Example:

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle('Example Domain');
});

test('Verify page URL', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveURL(/example/);
});
```

---

# 53. Multiple Test Files

A project can contain multiple test files:

```text
tests/
├── login.spec.ts
├── registration.spec.ts
├── search.spec.ts
└── checkout.spec.ts
```

Running:

```bash
npx playwright test
```

runs the configured test suite.

A specific file can be selected when required.

---

# 54. Playwright vs Selenium — Architecture

The video gives an interview-oriented comparison between Playwright and Selenium architecture.

The main point discussed is the communication mechanism.

### Selenium

The video describes Selenium architecture as using:

- Language bindings
- W3C WebDriver protocol
- HTTP communication
- Browser-specific drivers

### Playwright

The video describes Playwright as using:

- Language bindings
- WebSocket-based communication
- Direct browser interaction
- No traditional browser-specific WebDriver drivers

---

# 55. WebSocket Concept

The video explains that WebSocket provides a persistent connection.

Conceptually:

### HTTP-style communication

```text
Request
   ↓
Response
   ↓
Connection ends

Request
   ↓
Response
   ↓
Connection ends
```

A new connection may be established for subsequent communication.

### WebSocket-style communication

```text
Connection established
        ↓
Request
        ↓
Response
        ↓
Request
        ↓
Response
        ↓
Request
        ↓
Response
        ↓
Connection closed
```

The persistent communication model can reduce connection overhead.

---

# 56. Playwright Performance Discussion

The video connects the WebSocket architecture with performance.

The basic idea presented is:

```text
Fewer repeated connection setups
        ↓
Less communication overhead
        ↓
Potentially faster automation
```

This is presented as one of the architectural differences between Selenium and Playwright.

---

# 57. Interview Question — Why Playwright Can Be Faster?

A concise answer based on the video:

> Playwright uses a WebSocket-based communication model with persistent communication, whereas the Selenium architecture discussed in the session uses the W3C WebDriver protocol with HTTP communication. This can reduce repeated connection overhead during browser automation.

---

# 58. Interview Question — What Is a Fixture?

**Answer:**

A fixture is a Playwright-provided resource that can be injected into a test. The video introduces `page` and `browser` as important built-in fixtures.

Example:

```typescript
test('Example', async ({ page }) => {
    await page.goto('https://example.com');
});
```

---

# 59. Interview Question — What Is page?

**Answer:**

`page` is a Playwright fixture representing a browser page/tab. It is used for navigation, interaction, retrieving page information, and performing page-level operations.

Example:

```typescript
await page.goto('https://example.com');
```

---

# 60. Interview Question — What Is the Difference Between npm and npx?

**Answer:**

- `npm` is the Node Package Manager and is primarily used to install/manage packages.
- `npx` is the Node Package Executor and is used to execute Node package commands.

Example:

```bash
npm init playwright@latest
```

and:

```bash
npx playwright test
```

---

# 61. Interview Question — Why Is await Used in Playwright?

**Answer:**

Playwright operations commonly perform asynchronous browser work and return Promises. `await` waits for the Promise to resolve before dependent code continues.

Example:

```typescript
await page.goto('https://example.com');
```

---

# 62. Interview Question — What Happens If await Is Missing?

If an asynchronous operation is not awaited, the code may continue before the operation has completed.

Example:

```typescript
const title = page.title();
```

Here the result can still be a pending Promise.

Correct:

```typescript
const title = await page.title();
```

---

# 63. Interview Question — What Is a Promise?

**Answer:**

A Promise represents the eventual result of an asynchronous operation.

The important states discussed are:

```text
Resolved → operation successful
Rejected → operation unsuccessful
```

---

# 64. Interview Question — What Is the Difference Between Headed and Headless?

### Headless

Browser UI is not displayed.

```bash
npx playwright test
```

### Headed

Browser UI is displayed.

```bash
npx playwright test --headed
```

Headed mode is useful for visual debugging and learning.

Headless mode is commonly useful for automated/CI execution.

---

# 65. Interview Question — How Do You Run Only Chromium?

```bash
npx playwright test --project=chromium
```

The `--project` option selects the configured browser project.

---

# 66. Interview Question — How Do You Run a Specific Test File?

```bash
npx playwright test mytest.spec.ts
```

---

# 67. Interview Question — How Do You Run Tests Matching a Name?

Use the `-g` grep/title filter:

```bash
npx playwright test -g "verify"
```

This selects tests whose titles match the supplied expression.

---

# 68. Interview Question — How Do You Open the HTML Report?

```bash
npx playwright show-report
```

The generated HTML report provides test execution results and details.

---

# 69. Interview Question — How Do You Debug a Playwright Test?

Use:

```bash
npx playwright test mytest.spec.ts --debug
```

This allows step-by-step execution and browser inspection.

---

# 70. Recommended Basic Project

A simple project can look like:

```text
playwright-project/
│
├── tests/
│   ├── mytest.spec.ts
│   └── url.spec.ts
│
├── node_modules/
│
├── package.json
├── package-lock.json
└── playwright.config.ts
```

---

# 71. Recommended Basic Test Template

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    const title = await page.title();
    console.log(`Title: ${title}`);

    await expect(page).toHaveTitle('Example Domain');
});

test('Verify page URL', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveURL(/example/);
});
```

---

# 72. End-to-End Learning Flow

The video's learning flow can be remembered as:

```text
Install Node.js
      ↓
Install VS Code
      ↓
Create project folder
      ↓
Open folder in VS Code
      ↓
npm init playwright@latest
      ↓
Select TypeScript
      ↓
Configure test directory
      ↓
Install browsers
      ↓
Create .spec.ts file
      ↓
Import test and expect
      ↓
Use page fixture
      ↓
Navigate with page.goto()
      ↓
Add assertions
      ↓
Understand async/await
      ↓
Run tests
      ↓
Generate/view report
      ↓
Use headed/UI/debug modes
      ↓
Run specific browser/tests
```

---

# 73. Important Commands to Practice

Practice each of these manually:

```bash
npm init playwright@latest
```

```bash
npx playwright --version
```

```bash
npx playwright test
```

```bash
npx playwright test --headed
```

```bash
npx playwright test --ui
```

```bash
npx playwright test --debug
```

```bash
npx playwright show-report
```

```bash
npx playwright test mytest.spec.ts
```

```bash
npx playwright test --project=chromium
```

```bash
npx playwright test -g "verify"
```

---

# 74. Key Takeaways

1. Playwright can be used with TypeScript through Node.js.
2. Node.js and VS Code are the basic prerequisites discussed.
3. `npm` manages Node.js packages.
4. `npx` executes Node.js package commands.
5. `npm init playwright@latest` initializes a Playwright project.
6. TypeScript can be selected during project setup.
7. Tests are normally placed under the configured test directory.
8. TypeScript Playwright tests use `.spec.ts`.
9. `playwright.config.ts` controls important project/test settings.
10. `package.json` manages Node.js project metadata and dependencies.
11. `test()` creates a test case.
12. `expect()` provides assertions.
13. `page` is a key Playwright fixture.
14. `page.goto()` navigates to a URL.
15. Browser operations are commonly asynchronous.
16. `await` waits for asynchronous operations to complete.
17. Promises can resolve or reject.
18. Chromium, Firefox, and WebKit are the main browser projects demonstrated.
19. `--project` can select a specific browser project.
20. `--headed` displays browser UI.
21. `--ui` opens Playwright UI mode.
22. `--debug` supports step-by-step debugging.
23. `show-report` opens the HTML test report.
24. Playwright's architecture uses WebSocket communication as discussed in the session.
25. Practice the commands and simple tests before moving to advanced topics.

---

# 75. Quick Revision Sheet

### Setup

```bash
npm init playwright@latest
```

### Test

```typescript
import { test, expect } from '@playwright/test';

test('Verify page', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
});
```

### Run

```bash
npx playwright test
```

### Headed

```bash
npx playwright test --headed
```

### UI

```bash
npx playwright test --ui
```

### Debug

```bash
npx playwright test --debug
```

### Report

```bash
npx playwright show-report
```

### Specific browser

```bash
npx playwright test --project=chromium
```

### Specific file

```bash
npx playwright test mytest.spec.ts
```

### Filter test title

```bash
npx playwright test -g "verify"
```

---

# 76. Practice Tasks

- [ ] Install Node.js and verify `node --version`.
- [ ] Verify `npm --version`.
- [ ] Create a new Playwright TypeScript project.
- [ ] Understand `tests/`.
- [ ] Understand `playwright.config.ts`.
- [ ] Understand `package.json`.
- [ ] Create `mytest.spec.ts`.
- [ ] Import `test` and `expect`.
- [ ] Use the `page` fixture.
- [ ] Navigate using `page.goto()`.
- [ ] Retrieve the page title using `page.title()`.
- [ ] Validate the title using `toHaveTitle()`.
- [ ] Validate the URL using `toHaveURL()`.
- [ ] Run all tests.
- [ ] Run tests in headed mode.
- [ ] Run tests in UI mode.
- [ ] Run tests in debug mode.
- [ ] Open the HTML report.
- [ ] Run only Chromium.
- [ ] Run only one test file.
- [ ] Run multiple test files.
- [ ] Filter tests by title.
- [ ] Practice `async` and `await`.
- [ ] Understand Promise resolution/rejection.
- [ ] Review the Selenium vs Playwright architecture discussion.

---

## Final Note

The session is an introductory Playwright automation session. The instructor recommends practicing the installation, basic test, execution commands, UI mode, debug mode, headed/headless execution, reports, multiple tests, and browser-specific execution before moving to the more advanced Playwright topics in subsequent sessions.
