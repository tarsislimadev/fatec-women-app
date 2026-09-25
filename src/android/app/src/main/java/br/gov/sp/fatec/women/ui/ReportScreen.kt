package br.gov.sp.fatec.women.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ReportScreen() {
    var name by remember { mutableStateOf("") }
    var imageUrl by remember { mutableStateOf("") }
    var location by remember { mutableStateOf("") }
    var details by remember { mutableStateOf("") }
    var isSubmitting by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(text = "Enviar Relato", style = MaterialTheme.typography.headlineMedium)

        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Nome (Opcional)") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = imageUrl,
            onValueChange = { imageUrl = it },
            label = { Text("URL da Imagem (Opcional)") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = location,
            onValueChange = { location = it },
            label = { Text("Localização/Geolocalização (Opcional)") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = details,
            onValueChange = { details = it },
            label = { Text("Detalhes (Obrigatório)") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 5
        )

        Button(
            onClick = { 
                if (details.isNotBlank()) {
                    isSubmitting = true
                    // API integration will happen in the next step
                    message = "Enviando..."
                } else {
                    message = "Os detalhes são obrigatórios."
                }
            },
            modifier = Modifier.fillMaxWidth(),
            enabled = !isSubmitting
        ) {
            Text("Enviar")
        }

        if (message.isNotEmpty()) {
            Text(text = message, style = MaterialTheme.typography.bodyMedium)
        }
    }
}
