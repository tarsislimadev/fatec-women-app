# End-to-End (E2E) UI Tests

This document explains how the Android E2E instrumentation tests in this module are
written, why they are structured this way, and how to run and extend them.

## What E2E tests cover here

An E2E test exercises the application the same way a user would: it launches the real
`MainActivity` on a device or emulator, interacts with the visible UI, and asserts the
resulting state. Unlike unit tests, it runs against the Android framework, the real
`NavigationSuiteScaffold`, and the real Compose runtime.

The current suite lives in:

```
src/android/app/src/androidTest/java/br/gov/sp/fatec/women/MainDashboardJourneyTest.kt
```

It covers four user-facing flows:

| Test | Workflow |
| --- | --- |
| `appLaunchesAndDisplaysReportForm` | App starts and the report form is rendered |
| `navigationSwitchesBetweenReportAndListSections` | Bottom navigation switches between "Relatar" and "Relatos" |
| `submitWithoutDetailsShowsValidationMessage` | Submitting an empty form shows the required-field message |
| `formAcceptsInputAndDismissesSoftKeyboard` | A text field accepts input and the IME is dismissed |

## Why Espresso and Compose test APIs are mixed

`MainActivity` uses `setContent { WomenApp(...) }`, so the UI is a Compose tree, not a
hierarchy of XML views. Espresso's `onView(withId(...))` matchers can only see Android
`View` objects; they cannot match Compose nodes such as a `Text` or `OutlinedTextField`.

Therefore the suite uses the following split:

- **Compose UI Test APIs** (`createAndroidComposeRule`, `onNodeWithText`,
  `performClick`, `performTextInput`, `assertIsDisplayed`) for all Compose content.
- **Espresso APIs** for concerns that live at the activity/window level, such as
  asserting the activity content root is displayed and closing the soft keyboard with
  `Espresso.closeSoftKeyboard()`.

`createAndroidComposeRule<MainActivity>()` launches the activity and exposes both the
Compose test rule and the underlying activity. This is the recommended way to test a
single-activity Compose app.

## Test anatomy

```kotlin
@get:Rule
val composeTestRule = createAndroidComposeRule<MainActivity>()
```

The rule starts `MainActivity` before each test and tears it down afterwards. Each
`@Test` method is independent.

A typical interaction follows three steps:

```kotlin
composeTestRule.onNodeWithText("Enviar").performScrollTo().performClick()

composeTestRule
    .onNodeWithText("Os detalhes são obrigatórios.")
    .performScrollTo()
    .assertIsDisplayed()
```

1. **Find** a node by text, content description, or a semantic matcher.
2. **Act** with `performClick`, `performTextInput`, `performScrollTo`, etc.
3. **Assert** with `assertIsDisplayed`, `assertExists`, or a matcher.

`performScrollTo()` is important because `ReportScreen` is a vertically scrolling
`Column`; elements such as the submit button and validation message may be below the
fold.

Text fields are matched with both a text matcher and `hasSetTextAction()` so the test
targets the editable field rather than only its label:

```kotlin
composeTestRule
    .onNode(hasText("Detalhes (Obrigatório)") and hasSetTextAction())
    .performTextInput(details)
```

## Test dependencies

The instrumentation dependencies are declared in `app/build.gradle.kts` and versioned
in `gradle/libs.versions.toml`:

```kotlin
androidTestImplementation(libs.androidx.espresso.core)
androidTestImplementation(libs.androidx.espresso.contrib)
androidTestImplementation(libs.androidx.test.runner)
androidTestImplementation(libs.androidx.test.rules)
androidTestImplementation(libs.androidx.junit)
androidTestImplementation(libs.androidx.compose.ui.test.junit4)
```

- `espresso-core`: Espresso view matching and actions.
- `espresso-contrib`: `RecyclerViewActions` and `DrawerActions`. The current Compose UI
  does not need it yet, but it is available for list or drawer-based screens.
- `androidx.test:runner`: `AndroidJUnitRunner`, configured as
  `testInstrumentationRunner` in `defaultConfig`.
- `androidx.test:rules`: Activity and service test rules.
- `androidx.test.ext:junit`: `AndroidJUnit4` and `ActivityScenarioRule`.
- `compose ui-test-junit4`: `createAndroidComposeRule` and Compose assertions.

## Running the tests

From the repository root:

```powershell
cd src/android
.\gradlew.bat connectedDebugAndroidTest
```

Run a single class:

```powershell
.\gradlew.bat connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=br.gov.sp.fatec.women.MainDashboardJourneyTest
```

A connected device or emulator must be running (`adb devices`). In Android Studio, open
the test class and use the green run arrow next to a test method or the class.

Compile-only check (no device required):

```powershell
.\gradlew.bat :app:compileDebugAndroidTestKotlin
```

## What is intentionally not tested

- **Report submission over the network.** `ReportApi.submitReport` performs a real
  `HttpURLConnection` request. The E2E suite validates the empty-form path only, so it
  never depends on a live backend or writes production data.
- **Camera and face recognition.** `FaceRecognitionScreen` requires a camera,
  CameraX, ML Kit, and a model; it is not part of the current navigation flow.
- **Non-deterministic content.** Assertions use stable labels and messages from
  `ReportScreen.kt` instead of dynamic server content.

If network submission must be covered, add a test double or a local mock server and
register an `IdlingResource`/Compose wait condition for the request. Do not point the
default E2E suite at the production API.

## Best practices for new tests

1. Prefer stable selectors: resource IDs, `contentDescription`, or exact visible text.
2. Keep one behavior per test method and name it after the workflow.
3. Use `performScrollTo()` before interacting with content below the fold.
4. Never assert on production data returned by the live API.
5. Use Compose test APIs for Compose nodes and reserve Espresso for activity-level
   concerns.
6. Keep tests independent; the rule recreates the activity for each test.
