<form action="<?echo $APPLICATION->GetCurPage();?>">
    <?echo bitrix_sessid_post(); ?>
    <input type="hidden" name="lang" value="<?echo LANGUAGE_ID ?>">
    <input type="hidden" name="id" value="<?= $module_id;?>">
    <input type="hidden" name="uninstall" value="Y">
    <input type="hidden" name="step" value="2">
    <?echo CAdminMessage::ShowMessage(GetMessage("MOD_UNINST_WARN")); ?>
    <p><?echo GetMessage("MOD_UNINST_SAVE"); ?></p>
    <p>
        <input type="checkbox" name="delete_tables" id="delete_tables" value="Y">
        <label for="delete_tables"><?= 'Удалить таблицы?'; ?></label>
    </p>
    <input type="submit" name="inst" value="<?echo GetMessage("MOD_UNINST_DEL"); ?>">
</form>
