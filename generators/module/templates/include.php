<?php
$requiredModules = include(__DIR__.'/install/require.php');
foreach ($requiredModules as $module){
    \Bitrix\Main\Loader::includeModule($module);
}
CModule::AddAutoloadClasses('<%= moduleName %>', array(
));