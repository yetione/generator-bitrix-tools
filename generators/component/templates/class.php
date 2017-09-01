<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

<% if (isBexBbc) {%>
use Bitrix\Main\Loader;
use Bex\Bbc\Basis;
if (!Loader::includeModule('bex.bbc')) {
    return false;
}
<% } %>
class <%= componentClass %> extends <%= componentParentClass %>{
    public function executeMain(){

    }
}