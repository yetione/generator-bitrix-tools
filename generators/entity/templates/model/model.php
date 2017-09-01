<?

namespace <%= namespace %>;

use Bitrix\Main,
    Bitrix\Main\Entity,
    Bitrix\Main\Entity\DataManager,
    Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

class <%= modelName %>Table extends DataManager
{
    /**
     * @return string
     */
    public static function getTableName()
    {
        return '';
    }

    /**
     * @return array
     */
    public static function getMap()
    {
        return [];
    }
}
