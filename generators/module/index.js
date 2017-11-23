'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const dateFormat = require('dateformat');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('showGreeting', {type: Boolean, description: 'show greeting', required: false, default: true, hide: true});
    this.argument('modulename', {type: String, description: 'Name of your bitrix module', required: false, optional: true});
    this.langFiles = [];
    this.moduleNameRegExp = /^([a-z][a-z0-9]+)(\.[a-z][a-z0-9]*)?$/;
    this.props = {};
  }

  prompting() {
        // Have Yeoman greet the user.
    if (this.options.showGreeting) {
      this.log(yosay(
              'Welcome to the stellar ' + chalk.red('generator-bitrix-module') + ' generator!'
          ));
    }

    let date = new Date();
    let self = this;
    let prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Please enter name of your module:',
      validate: function (answer) {
        return self.moduleNameRegExp.test(answer) ?
              true :
              'Module name must be in a lower case, use only letters and numbers, contain zero or one dot, doesn\'t start with number.';
      },
      default: this.options.modulename
    }, {
      type: 'input',
      name: 'moduleVersion',
      message: 'Module version:',
      default: '1.0'
    }, {
      type: 'input',
      name: 'moduleVersionDate',
      message: 'Module date (YYYY-MM-DD):',
      default: dateFormat(date, 'yyyy-mm-dd')
    }, {
      type: 'input',
      name: 'moduleRequire',
      message: 'Module dependencies (comma separated):',
      default: ''
    },
    {
      type: 'input',
      name: 'moduleNamespace',
      message: 'Module base namespace',
      default: function (answers) {
        return answers.moduleName.split('.').map(item => {
          return _.upperFirst(item);
        }).join('\\');
      }
    },
    {
      type: 'input',
      name: 'entities',
      message: 'Please enter entities, that you\'ll be use (comma separated)'
    }, {
      type: 'input',
      name: 'components',
      message: 'Please enter components, that you\'ll be use (comma separated)'
    }, {
      type: 'input',
      name: 'languages',
      message: 'Please enter supported languages (comma separated)',
      default: 'ru,en',
      filter: data => {
        return data.split(',').map(item => {
          return item.trim();
        });
      }
    }];
    return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
      this.props = _.extend(this.props, props);
    });
  }

  paths() {
    this.destinationRoot(this.props.moduleName);
  }

  _createLangFiles(languageId) {
    for (let i = 0; i < this.langFiles.length; i++) {
      this.fs.copyTpl(
                this.templatePath('lang/base.php'),
                this.destinationPath('lang/' + languageId + '/' + this.langFiles[i]),
                {filePath: this.langFiles[i]}
            );
    }
  }

  writing() {
    this.composeWith(require.resolve('../entity'), {ns: this.props.moduleNamespace, cwd: this.destinationPath('lib'), showGreeting: false, entity: this.props.entities, showNs: false, showEntities: false});
    let components = this.props.components.trim() === '' ? [] : this.props.components.split(',');
    for (let i = 0; i < components.length; ++i) {
      this.composeWith(require.resolve('../component'), {cwd: this.destinationPath('install/components'), showGreeting: false, componentname: components[i]});
    }

    this.langFiles = [];
    /*
    For (let i = 0; i < this.props.tables.length; i++) {
      if (!this.props.tables[i].fileName || this.props.tables[i].className === 'undefined') {
        continue;
      }
      this._createModel(this.props.tables[i]);
    }
    */
    this.fs.copyTpl(
            this.templatePath('admin/menu.php'),
            this.destinationPath('admin/menu.php'),
            {moduleName: this.props.moduleName}
        );
    this.langFiles.push('admin/menu.php');
    this.fs.copyTpl(
            this.templatePath('install/index.php'),
            this.destinationPath('install/index.php'),
            {moduleName: this.props.moduleName, installClass: this.props.moduleName.toLowerCase().replace(/\./g, '_')}
        );
    this.langFiles.push('install/index.php');

    this.fs.copyTpl(
          this.templatePath('install/uninstall/step1.php'),
          this.destinationPath('install/uninstall/step1.php'),
          {moduleName: this.props.moduleName, installClass: this.props.moduleName.toLowerCase().replace(/\./g, '_')}
      );
    this.langFiles.push('install/uninstall/step1.php');

    this.props.moduleRequire = this.props.moduleRequire.split(',').map(item => {
      return '\'' + item.trim() + '\'';
    }).join(',');
    if (this.props.moduleRequire == '\'\'') {
      this.props.moduleRequire = '';
    }
    this.fs.copyTpl(
          this.templatePath('install/require.php'),
          this.destinationPath('install/require.php'),
          {modules: this.props.moduleRequire}
      );

    this.fs.copy(
          this.templatePath('install/install/modules_not_installed.php'),
          this.destinationPath('install/install/modules_not_installed.php')
      );

    this.fs.copyTpl(
            this.templatePath('install/version.php'),
            this.destinationPath('install/version.php'),
            {moduleVersion: this.props.moduleVersion, moduleVersionDate: this.props.moduleVersionDate}
        );
    this.fs.copyTpl(
            this.templatePath('include.php'),
            this.destinationPath('include.php'),
            {moduleName: this.props.moduleName}
        );
    for (let i = 0; i < this.props.languages.length; ++i) {
      this._createLangFiles(this.props.languages[i]);
      // This.log('Language ' + this.props.languages[i] + ' created');
    }

        /* Not need
        this.fs.copy(
          this.templatePath('dummyfile.txt'),
          this.destinationPath('dummyfile.txt')
        );
        */
  }

  install() {
        /* I dont want install bower and nmp
        this.installDependencies({bower: false, npm: true});
        */
  }
};
