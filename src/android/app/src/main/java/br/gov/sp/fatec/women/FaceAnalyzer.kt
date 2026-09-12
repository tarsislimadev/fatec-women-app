package br.gov.sp.fatec.women

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.FaceDetection
import com.google.mlkit.vision.face.FaceDetectorOptions
import com.google.mlkit.vision.face.FaceLandmark

class FaceAnalyzer(
    private val context: Context,
    private val recognizer: FaceRecognizer
) : ImageAnalysis.Analyzer {
    private val detector = FaceDetection.getClient(
        FaceDetectorOptions.Builder()
            .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_FAST)
            .setLandmarkMode(FaceDetectorOptions.LANDMARK_MODE_ALL)
            .setClassificationMode(FaceDetectorOptions.CLASSIFICATION_MODE_ALL)
            .build()
    )

    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image ?: return
        val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)

        detector.process(image)
            .addOnSuccessListener { faces ->
                for (face in faces) {
                    // In a real implementation, we would crop the face from the imageProxy 
                    // based on face.boundingBox and pass it to recognizer.getEmbedding()
                    
                    // Since cropping ImageProxy to Bitmap is complex in a snippet, 
                    // we log the detection and simulate the recognition flow.
                    
                    val smileProb = face.smilingProbability
                    Log.d("FaceAnalyzer", "Face detected! Smile: $smileProb")
                    
                    // Simulated Flow:
                    // val faceBitmap = cropFace(imageProxy, face.boundingBox)
                    // val embedding = recognizer.getEmbedding(faceBitmap)
                    // if (embedding != null) {
                    //     val identity = UserDatabase.findMatch(embedding)
                    //     Log.d("FaceAnalyzer", "Recognized Identity: $identity")
                    // }
                }
            }
            .addOnCompleteListener { 
                imageProxy.close() 
            }
    }
}
