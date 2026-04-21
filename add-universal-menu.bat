@echo off
echo Adding Universal Menu System to all HTML files...
echo.

REM List of HTML files to update
set files=about-north-east.html admin-login.html ai-risk-predictions.html anomaly-detection.html "Arunchal pradhesh.html" ask-india-gov-ai.html Assam.html awards.html contact.html dashhboard.html department-tourism.html departments.html digital-id-verification.html digital-tourist-id.html e-fir-generation.html evidence-logs.html family-tracking.html geo-fencing.html help-support.html helpline-access.html inactivity-alert.html incident-analytics.html incident-details.html kyc-verification.html last-known-location.html live-alerts.html live-location.html logout.html Manipur.html Meghalaya.html ministers-officers.html missing-tourist.html Mizoram.html multilingual-selection.html Nagaland.html news.html notices.html panic-button.html police-dashboard.html police-login.html police-reports.html qr-generator.html qr-scanner.html qr-tourist-id.html risk-zone-management.html route-deviation-alert.html services.html Sikkim.html terms-privacy.html tourism-advisories.html tourism-dashboard.html tourism-login.html tourism-reports.html tourist-cluster-map.html tourist-dashboard.html tourist-feedback.html tourist-heatmap.html tourist-login.html tourist-lookup.html tourist-notifications.html tourist-register.html tourist-safety-score.html tourist-statistics.html tripura.html voice-sos.html wearable-device-monitoring.html wearable-device-status.html whatsapp-chatbot-access.html

for %%f in (%files%) do (
    if exist "%%f" (
        echo Processing %%f...
        
        REM Create backup
        copy "%%f" "%%f.backup" >nul 2>&1
        
        REM Add universal menu script reference before closing body tag
        powershell -Command "(Get-Content '%%f') -replace '</body>', '    <!-- Universal Menu Script -->`n    <script src=\"universal-menu.js\"></script>`n</body>' | Set-Content '%%f'"
        
        echo   - Added universal menu to %%f
    ) else (
        echo   - File %%f not found, skipping...
    )
)

echo.
echo Universal Menu System has been added to all existing HTML files!
echo Backup files created with .backup extension.
echo.
pause