<?php

namespace <%= namespace %>;

use Bitrix\Main\Localization\Loc,
    DigitalWand\AdminHelper\Helper\AdminInterface,
    DigitalWand\AdminHelper\Widget\NumberWidget,
    DigitalWand\AdminHelper\Widget\StringWidget,
    DigitalWand\AdminHelper\Widget\CheckboxWidget,
    DigitalWand\AdminHelper\Widget\FileWidget,
    DigitalWand\AdminHelper\Widget\VisualEditorWidget,
    DigitalWand\AdminHelper\Widget\TextAreaWidget;


Loc::loadMessages(__FILE__);


class <%= interfaceName %>AdminInterface extends AdminInterface
{

    /**
     * {@inheritdoc}
     */
    public function fields(){

        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function helpers()
    {
        return array(
            '\<%= namespace %>\<%= interfaceName %>ListHelper',
            '\<%= namespace %>\<%= interfaceName %>EditHelper',
        );
    }
}