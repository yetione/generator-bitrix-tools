<?php
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;

if (!Loader::includeModule('digitalwand.admin_helper') || !Loader::includeModule('<%= moduleName %>')) return;

return [];