package br.gov.sp.fatec.women

import kotlin.math.sqrt

data class UserEmbedding(val name: String, val embedding: FloatArray)

object UserDatabase {
    // Mock database of known users and their embeddings
    private val knownUsers = mutableListOf<UserEmbedding>()

    fun addUser(name: String, embedding: FloatArray) {
        knownUsers.add(UserEmbedding(name, embedding))
    }

    fun findMatch(embedding: FloatArray): String {
        var bestMatch = "Unknown"
        var minDistance = Float.MAX_VALUE
        
        // L2 Distance threshold (Adjust based on model, e.g., 0.9 for MobileFaceNet)
        val threshold = 1.0f 

        for (user in knownUsers) {
            val distance = l2Norm(embedding, user.embedding)
            if (distance < threshold && distance < minDistance) {
                minDistance = distance
                bestMatch = user.name
            }
        }
        return bestMatch
    }

    private fun l2Norm(v1: FloatArray, v2: FloatArray): Float {
        var sum = 0.0f
        for (i in v1.indices) {
            val diff = v1[i] - v2[i]
            sum += diff * diff
        }
        return sqrt(sum)
    }
}
