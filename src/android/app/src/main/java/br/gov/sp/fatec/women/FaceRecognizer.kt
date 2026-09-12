package br.gov.sp.fatec.women

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import org.tensorflow.lite.support.image.ImageProcessor
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.image.ops.ResizeOp

class FaceRecognizer(context: Context) {
    private var interpreter: Interpreter? = null
    private val modelPath = "mobile_face_net.tflite"

    init {
        try {
            val model = FileUtil.loadMappedFile(context, modelPath)
            interpreter = Interpreter(model)
            Log.d("FaceRecognizer", "TFLite model loaded successfully")
        } catch (e: Exception) {
            Log.e("FaceRecognizer", "Error loading TFLite model: ${e.message}")
        }
    }

    fun getEmbedding(bitmap: Bitmap): FloatArray? {
        if (interpreter == null) return null

        return try {
            val imageProcessor = ImageProcessor.Builder()
                .add(ResizeOp(112, 112, ResizeOp.ResizeMethod.BILINEAR))
                .build()

            var tensorImage = TensorImage(org.tensorflow.lite.DataType.UINT8)
            tensorImage.load(bitmap)
            tensorImage = imageProcessor.process(tensorImage)

            val output = Array(1) { FloatArray(128) }
            interpreter?.run(tensorImage.buffer, output)
            
            output[0]
        } catch (e: Exception) {
            Log.e("FaceRecognizer", "Error extracting embedding: ${e.message}")
            null
        }
    }

    fun close() {
        interpreter?.close()
    }
}
