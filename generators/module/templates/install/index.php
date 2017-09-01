<?php
use Bitrix\Main\Application;
use Bitrix\Main\ModuleManager;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Loader;

IncludeModuleLangFile(__FILE__);

class <%= installClass %> extends CModule
{
    var $MODULE_ID = '<%= moduleName %>';
    protected $installPath = '';

    function __construct()
    {
        $arModuleVersion = array();
        $this->installPath = $_SERVER['DOCUMENT_ROOT']
            . '/local/modules/'.$this->MODULE_ID.'/install/';
        include(__DIR__ . '/version.php');

        if (is_array($arModuleVersion) && array_key_exists('VERSION', $arModuleVersion))
        {
            $this->MODULE_VERSION = $arModuleVersion['VERSION'];
            $this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
        }
    }

    public function DoInstall()
    {
        ModuleManager::registerModule($this->MODULE_ID);
        Loader::includeModule($this->MODULE_ID);


        $this->installFiles();
    }

    public function DoUninstall()
    {
        Loader::includeModule($this->MODULE_ID);



        $this->unInstallFiles();

        ModuleManager::unRegisterModule($this->MODULE_ID);
    }

    public function installFiles()
    {

    }

    public function unInstallFiles()
    {

    }
}