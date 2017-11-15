<?php
namespace <%= namespace %>;

use <%= adminHelperNs %>\AdminHelper\Helper\AdminListHelper;

class <%= interfaceName %>ListHelper extends AdminListHelper
{
    protected static $model = '\<%= modelClass %>';
}

