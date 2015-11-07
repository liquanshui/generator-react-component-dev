'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the superior ' + chalk.red('ReactComponentDev') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'your react component name ?',
            default: this.appname
        }, {
            type: 'input',
            name: 'version',
            message: 'your react component version ?',
            default: '0.0.1'
        }, {
            type: 'input',
            name: 'desc',
            message: 'your react component description ?',
            default: ''
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var data = {
                name: this.props.name,
                version: this.props.version,
                desc: this.props.desc
            };
            data.variableName = data.name.replace(/(^\w|\-\w)/g,function(word){
                return word.replace(/\-/,'').toUpperCase();
            });

            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('assets/index.less'),
                this.destinationPath('assets/index.less'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('assets/component.less'),
                this.destinationPath('assets/'+ data.name+'.less')
            );
            this.fs.copyTpl(
                this.templatePath('examples/simple.jsx'),
                this.destinationPath('examples/simple.jsx'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('examples/simple.md'),
                this.destinationPath('examples/simple.md'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('src/component.js'),
                this.destinationPath('src/'+data.name+'.js'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('index.js'),
                this.destinationPath('index.js'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('readme.md'),
                this.destinationPath('readme.md'),
                data
            );
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        }
    },

    install: function () {
        this.installDependencies({
            npm: true,
            bower: false,
            callback: (function () {
                this.log('\ngenerate success \n\n       run "npm run dev" to start server \n\n');
            }).bind(this)
        });
    }
});
