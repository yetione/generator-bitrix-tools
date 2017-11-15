'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('ns', {type: String, description: 'namespace of entity', required: false, alias: 'n', default: ''});
    this.option('cwd', {type: String, description: 'directory where create entities', required: false, default: ''});
    this.option('showGreeting', {type: Boolean, description: 'show greeting', required: false, default: true, hide: true});
    this.option('entity', {type: String, description: 'comma separated list of entities', required: false, optional: true, hide: true, default: ''});
    this.option('showNs', {type: Boolean, description: 'show namespace question', required: false, optional: true, hide: true, default: true});
    this.option('showEntities', {type: Boolean, description: 'show entities question', required: false, optional: true, hide: true, default: true});

    this.argument('entity', {type: String, description: 'comma separated list of entities', required: false, optional: true});

    if (this.options.cwd.length > 0 && this.options.cwd[this.options.cwd.length - 1] !== '/') {
      this.options.cwd += '/';
    }
    this.props = {
      entity: this.options.entity,
      namespace: this.options.ns

    };
    // This.log(this.options.cwd);
  }

  prompting() {
    if (this.options.showGreeting) {
      this.log(yosay(
            'Welcome to the great ' + chalk.red('generator-bitrix') + ' generator!'
        ));
    }

    let self = this;
    let prompts = [];
    prompts.push({
      type: 'input',
      name: 'entity',
      message: 'Enter entities, that you want to create (comma separated):',
      default: this.options.entity,
      when: function (answers) {
        return self.options.showEntities;
      }
    });
    prompts.push({
      type: 'input',
      name: 'namespace',
      message: 'Base namespace of entities: ',
      default: this.options.ns,
      when: function (answers) {
        return self.options.ns == '' || self.options.showNs;
      }
    });

    return this.prompt(prompts).then(props => {
      this.props = _.extend(this.props, props);
      if (this.props.entity.trim().length) {
        this.props.entity = this.props.entity.split(',').map(item => {
          return {
            fileName: item.trim().toLowerCase(),
            className: item.trim(),
            adminHelperNs: 'Kelnik'
          };
        });

        let askInterfaces = [];
        for (let i = 0; i < this.props.entity.length; ++i) {
          askInterfaces.push({
            type: 'confirm',
            name: this.props.entity[i].className,
            message: 'Create interface for entity ' + this.props.entity[i].className
          });

          askInterfaces.push({
            type: 'input',
            name: this.props.entity[i].adminHelperNs,
            default: this.props.entity[i].adminHelperNs,
            message: 'Base admin helper namespace ' + this.props.entity[i].className
          });
        }
        return this.prompt(askInterfaces).then(interfaces => {
          this.props.interfaces = interfaces;
        });
      }
    });
  }

  paths() {
    this.destinationRoot(this.options.cwd ? this.options.cwd : '.');
  }

  writing() {
    let model, tplParams;
    for (let i = 0; i < this.props.entity.length; ++i) {
      model = this.props.entity[i];
      tplParams = {
        namespace: this.props.namespace + '\\' + model.className,
        modelName: model.className
      };
      this.fs.copyTpl(
            this.templatePath('model/model.php'),
            this.destinationPath(model.fileName + '/' + model.fileName + '.php'),
            tplParams
        );
      if (this.props.interfaces[model.className]) {
        tplParams = {
          namespace: this.props.namespace + '\\' + model.className + '\\AdminInterface',
          interfaceName: model.className,
          modelClass: this.props.namespace + '\\' + model.className + '\\' + model.className + 'Table',
          adminHelperNs: model.adminHelperNs
        };
        this.fs.copyTpl(
                this.templatePath('admininterface/admininterface.php'),
                this.destinationPath(model.fileName + '/admininterface/' + model.fileName + 'admininterface.php'),
                tplParams
            );
        this.fs.copyTpl(
                this.templatePath('admininterface/edithelper.php'),
                this.destinationPath(model.fileName + '/admininterface/' + model.fileName + 'edithelper.php'),
                tplParams
            );
        this.fs.copyTpl(
                this.templatePath('admininterface/listhelper.php'),
                this.destinationPath(model.fileName + '/admininterface/' + model.fileName + 'listhelper.php'),
                tplParams
            );
      }
    }
  }
};
