# Publish Android APK to GitHub Releases

$tag = "l" + (Get-Date -Format "yyyyMMddHHmm")

Write-Host "Creating release $tag..."

gh release create $tag "src/android/app/build/**/**/**/*.apk" --title $tag --notes "Automated APK build publish"

Write-Host "Successfully published APK to GitHub Releases!"
