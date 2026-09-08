# Use Eclipse Temurin for a stable, supported JDK 17 environment
FROM eclipse-temurin:17-jdk-jammy

# Set environment variables for Android SDK
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Android SDK Command-line Tools
# We download the tools and place them in the specific directory structure 
# required by the sdkmanager (cmdline-tools/latest)
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdline-tools.zip && \
    unzip /tmp/cmdline-tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/latest && \
    rm /tmp/cmdline-tools.zip

# Accept licenses and install required SDK components
# Matching your project's compileSdk 36
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" \
               "platforms;android-36" \
               "build-tools;36.0.0"

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . .

# Ensure the gradle wrapper is executable
RUN chmod +x ./gradlew

# Compile the APK (Debug build)
# --no-daemon is critical for Docker to prevent the JVM from hanging 
CMD ["./gradlew", "assembleDebug", "--no-daemon"]
