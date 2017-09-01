'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('cwd', {type: String, description: 'directory where create entities', required: false, default: ''});
    this.option('showGreeting', {type: Boolean, description: 'show greeting', required: false, default: true, hide: true});
    this.option('componentname', {type: String, description: 'comma separated list of entities', required: false, hide: true});
    this.argument('componentname', {type: String, description: 'comma separated list of components', required: false, optional: true});
    this.nameRegExp = /^([a-z]+:)?([a-z]+[a-z0-9]*\.?)+[^.]$/;
    this.params = {
      templateFiles: [
        '.description.php',
        '.parameters.php',
        'component_epilog.php',
        'result_modifier.php',
        'template.php'
      ]
    };
  }

  prompting() {
    if (this.options.showGreeting) {
      this.log(yosay(
            'Welcome to the striking ' + chalk.red('generator-bitrix-component') + ' generator!'
        ));
    }
    let self = this;
    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Please enter component name',
      default: this.options.componentname,
      validate: function (answer) {
        return answer === '' || self.nameRegExp.test(answer) ?
                true :
                'Component name is not valid.';
      }
    },
    {
      type: 'input',
      name: 'componentClassName',
      message: 'Please enter component class name',
      default: function (answers) {
        return _.upperFirst(_.camelCase(answers.componentName)) + 'Component';
        //return answers.componentName.replace(/\.|:/g, '_') + 'Component';
      },
      when: function (answers) {
        return answers.componentName !== '';
      }
    }, {
      type: 'confirm',
      name: 'isBexBbc',
      message: 'Use bex.bbc module',
      default: true,
      when: function (answers) {
        return answers.componentName !== '';
      }
    },
    {
      type: 'input',
      name: 'componentTemplates',
      message: 'Enter templates, that will be use in component(comma separated)',
      default: '.default',
      filter: data => {
        return data.split(',').map(item => {
          return item.trim();
        });
      }, when: function (answers) {
        return answers.componentName !== '';
      }

    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  paths() {
    this.destinationRoot(this.options.cwd ? this.options.cwd + '/' + this.props.componentName.replace(':', '/') : this.props.componentName.replace(':', '/'));
  }

  _createTemplate(name) {
    for (let i = 0; i < this.params.templateFiles.length; ++i) {
      this.fs.copy(
            this.templatePath('template/' + this.params.templateFiles[i]),
            this.destinationPath('templates/' + name + '/' + this.params.templateFiles[i])
        );
    }
  }

  writing() {
    if (this.props.componentName !== ''){
        this.fs.copy(
            this.templatePath('.description.php'),
            this.destinationPath('.description.php')
        );
        this.fs.copy(
            this.templatePath('.parameters.php'),
            this.destinationPath('.parameters.php')
        );
        this.fs.copy(
            this.templatePath('component.php'),
            this.destinationPath('component.php')
        );
        this.fs.copyTpl(
            this.templatePath('class.php'),
            this.destinationPath('class.php'),
            {isBexBbc: this.props.isBexBbc,
                componentClass: this.props.componentClassName,
                componentParentClass: this.props.isBexBbc ? 'Basis' : 'CBitrixComponent'}
        );
        for (let i = 0; i < this.props.componentTemplates.length; ++i) {
            this._createTemplate(this.props.componentTemplates[i]);
        }
    }

  }

  install() {}
};
