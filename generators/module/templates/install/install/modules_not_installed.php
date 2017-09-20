<form action="<?echo $APPLICATION->GetCurPage();?>">
    <?echo bitrix_sessid_post(); ?>
    <p>Не установлены следующие зависимости модуля: <b><?= implode(', ', $arVariables['modules'])?></b></p>
    <p>Вернитесь на страницу установки, установите требуемые зависимости и попробуйте сначала.</p>
</form>
