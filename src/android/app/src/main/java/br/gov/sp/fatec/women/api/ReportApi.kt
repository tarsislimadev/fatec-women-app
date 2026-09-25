package br.gov.sp.fatec.women.api

import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL
import java.io.OutputStreamWriter
import java.io.BufferedReader
import java.io.InputStreamReader

object ReportApi {
    private const val BASE_URL = "http://10.0.2.2:3000" // Android Emulator loopback to host

    suspend fun submitReport(name: String?, imageUrl: String?, location: String?, details: String): Result<String> {
        return withContext(Dispatchers.IO) {
            try {
                val url = URL("$BASE_URL/reports")
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json; utf-8")
                connection.doOutput = true

                val json = """
                    {
                        "name": ${if (name.isNullOrBlank()) "null" else "\"$name\""},
                        "image_url": ${if (imageUrl.isNullOrBlank()) "null" else "\"$imageUrl\""},
                        "details": "$details"
                    }
                """.trimIndent()
                // Note: location is simplified here as a string for the prototype, 
                // in a real app we'd parse it to lat/long.

                OutputStreamWriter(connection.outputStream).use { it.write(json) }

                if (connection.responseCode == 201) {
                    Result.success("Relato enviado com sucesso!")
                } else {
                    val error = connection.errorStream?.bufferedReader()?.readText() ?: "Erro desconhecido"
                    Result.failure(Exception("Erro ${connection.responseCode}: $error"))
                }
            } catch (e: Exception) {
                Log.e("ReportApi", "Erro ao enviar relato", e)
                Result.failure(e)
            }
        }
    }
}
