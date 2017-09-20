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

    public $requiredModules = [];

    function __construct()
    {
        $arModuleVersion = array();
        $this->installPath = __DIR__;
        include(__DIR__ . '/version.php');
        $this->requiredModules = include(__DIR__.'/require.php');
        if (is_array($arModuleVersion) && array_key_exists('VERSION', $arModuleVersion))
        {
            $this->MODULE_VERSION = $arModuleVersion['VERSION'];
            $this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
        }
    }

    public function DoInstall()
    {
        $this->checkDependencies();
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

    protected function checkDependencies(){
        $result = [];
        foreach ($this->requiredModules as $module){
            if (!Loader::includeModule($module)){
                $result[] = $module;
            }
        }
        if (!empty($result)){
            $this->showError($this->installPath . '/install/modules_not_installed.php', ['modules'=>$result]);
        }
        return true;
    }

    protected function showError($file, $arVariables, $strTitle=''){
        //define all global vars
        $keys = array_keys($GLOBALS);
        $keys_count = count($keys);
        for($i=0; $i<$keys_count; $i++)
            if($keys[$i]!="i" && $keys[$i]!="GLOBALS" && $keys[$i]!="strTitle" && $keys[$i]!="filepath")
                global ${$keys[$i]};

        //title
        $APPLICATION->SetTitle($strTitle);
        include($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/include/prolog_admin_after.php");
        include($file);
        include($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/include/epilog_admin.php");
        die();
    }
}