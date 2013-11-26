
:: remove git data (if any)
rmdir .git /s /q

:: remove node modules (be careful of symlinks if on a unix network share !!!)
rmdir  node_modules /s /q
rmdir "incubator\base-objects.js\test_runner\node_modules" /s /q
rmdir "incubator\extended-exceptions.js\test_runner\node_modules" /s /q
rmdir "incubator\generic_store.js\test_runner\node_modules" /s /q
rmdir "incubator\network-constants.js\test_runner\node_modules" /s /q
rmdir "incubator\offirmo_app.js\test_runner\node_modules" /s /q
rmdir "incubator\restlink.js\test_runner\node_modules" /s /q

:: remove bower components (be careful of symlinks if on a unix network share !!!)
rmdir  app\bower_components /s /q
rmdir "incubator\base-objects.js\test_runner\bower_components" /s /q
rmdir "incubator\extended-exceptions.js\test_runner\bower_components" /s /q
rmdir "incubator\generic_store.js\test_runner\bower_components" /s /q
rmdir "incubator\network-constants.js\test_runner\bower_components" /s /q
rmdir "incubator\offirmo_app.js\test_runner\bower_components" /s /q
rmdir "incubator\restlink.js\test_runner\bower_components" /s /q

:: done
pause
