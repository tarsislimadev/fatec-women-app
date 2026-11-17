package br.gov.sp.fatec.women

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTextInput
import androidx.test.espresso.Espresso
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.isDisplayed
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class MainDashboardJourneyTest {

    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun appLaunchesAndDisplaysReportForm() {
        onView(withId(android.R.id.content)).check(matches(isDisplayed()))

        composeTestRule.onNodeWithText("Enviar Relato").assertIsDisplayed()
        composeTestRule.onNodeWithText("Enviar").performScrollTo().assertIsDisplayed()
    }

    @Test
    fun navigationSwitchesBetweenReportAndListSections() {
        composeTestRule.onNodeWithText("Relatos").performClick()

        composeTestRule
            .onNodeWithText("Lista de Relatos (Em desenvolvimento)")
            .assertIsDisplayed()

        composeTestRule.onNodeWithText("Relatar").performClick()

        composeTestRule.onNodeWithText("Enviar Relato").assertIsDisplayed()
    }

    @Test
    fun submitWithoutDetailsShowsValidationMessage() {
        composeTestRule.onNodeWithText("Enviar").performScrollTo().performClick()

        composeTestRule
            .onNodeWithText("Os detalhes são obrigatórios.")
            .performScrollTo()
            .assertIsDisplayed()
    }

    @Test
    fun formAcceptsInputAndDismissesSoftKeyboard() {
        val details = "Relato de teste automatizado"

        composeTestRule
            .onNode(hasText("Detalhes (Obrigatório)") and hasSetTextAction())
            .performTextInput(details)

        Espresso.closeSoftKeyboard()

        composeTestRule.onNodeWithText(details).assertIsDisplayed()
    }
}