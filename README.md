# generator-bitrix-tools [![NPM version][npm-image]][npm-url]
> Генератор для элементов 1с битрикс

## Установка

Установите [Yeoman](http://yeoman.io) и generator-bitrix-tools с помощью [npm](https://www.npmjs.com/) (надеюсь, у Вас уже установлен [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-bitrix-tools
```

Затем создайте проект:

```bash
yo bitrix-tools
```
## Описание
Данный генератор позволяет создавать каркасы модулей, сущностей, компонентов. 
Все генераторы должны запускаться в той папке, в которой необходимо создать тот или иной элемент.


### bitrix-tools:module
Генератор для создания каркаса модуля.

Рекомендуемый каталог запуска:
```bash
<project_root>/local/modules
<project_root>/bitrix/modules
```

### bitrix-tool:entity
Генератор для создания каркаса сущности.

Рекомендуемый каталог запуска:
```bash
<project_root>/local/modules/<module_id>/lib
<project_root>/bitrix/modules/<module_id>/lib
```

### bitrix-tools:component
Генератор для создания каркаса компонента.

Поддерживает создания компонента с использованием имени вендора.
```bash
<vendor_name>:<component_name>
yo bitrix-tools:component bitrix:news.list
```
Создаст компонент в **bitrix/news.list** относительно каталога запуска.

Рекомендуемый каталог запуска:
```bash
<project_root>/local/components
<project_root>/bitrix/components
```



## Лицензия

MIT © [Aleksandr Romanov]()


[npm-image]: https://badge.fury.io/js/generator-bitrix-tools.svg
[npm-url]: https://npmjs.org/package/generator-bitrix-tools
[travis-image]: https://travis-ci.org//generator-bitrix-tools.svg?branch=master
[travis-url]: https://travis-ci.org//generator-bitrix-tools
[daviddm-image]: https://david-dm.org//generator-bitrix-tools.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-bitrix-tools
