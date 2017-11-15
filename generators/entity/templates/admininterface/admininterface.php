<?php

namespace <%= namespace %>;

use Bitrix\Main\Localization\Loc,
    <%= adminHelperNs %>\AdminHelper\Helper\AdminInterface,
    <%= adminHelperNs %>\AdminHelper\Widget\NumberWidget,
    <%= adminHelperNs %>\AdminHelper\Widget\StringWidget,
    <%= adminHelperNs %>\AdminHelper\Widget\CheckboxWidget,
    <%= adminHelperNs %>\AdminHelper\Widget\FileWidget,
    <%= adminHelperNs %>\AdminHelper\Widget\VisualEditorWidget,
    <%= adminHelperNs %>\AdminHelper\Widget\TextAreaWidget;


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