'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    initializing(){
      this.avaliableGenerators = [{name:'Module', value: '../module'}, {name:'Component', value: '../component'}, {name:'Entity', value: '../entity'}];
    }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('generator-bitrix') + ' generator!'
    ));
    const prompts = [{
      type: 'list',
      name: 'generator',
      message: 'What do you want to create?',
      choices: this.avaliableGenerators
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.composeWith(require.resolve(props.generator), {showGreeting: false});

    });
  }
};
