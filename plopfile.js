module.exports = function (plop) {

  /* Helpers */
  // plop.addHelper('upperCase', function (text) {
  //   return text.toUpperCase();
  // });

  var files = {
    less: 'plop-templates/index.less',
    es6comp: 'plop-templates/es6comp.js',
    sfcomp: 'plop-templates/sfcomp.js',
    sfhoc: 'plop-templates/sfhoc.js',
    es6hoc: 'plop-templates/es6hoc.js',
    store: 'plop-templates/store.js',
    containerIndex: 'plop-templates/containerIndex.js',
    containerComp: 'plop-templates/containerComp.js',
    api: 'plop-templates/api.js',
  }
  var createContainerIndex = {
    type: 'add',
    path: 'src/containers/{{directory}}/index.js',
    templateFile: files.containerIndex
  };
  var createContainerComp = {
    type: 'add',
    path: 'src/containers/{{directory}}/{{pascalCase directory}}.js',
    templateFile: files.containerComp
  };
  var createContainer2Index = {
    type: 'add',
    path: 'src/containers/report/{{directory}}/index.js',
    templateFile: files.containerIndex
  };
  var createContainer2Comp = {
    type: 'add',
    path: 'src/containers/report/{{directory}}/{{pascalCase directory}}.js',
    templateFile: files.containerComp
  };
  var createLess = {
    type: 'add',
    path: 'src/components/{{directory}}/{{pascalCase name}}/index.less',
    templateFile: files.less
  };

  var createES6Comp = {
    type: 'add',
    path: 'src/components/{{directory}}/{{pascalCase name}}/index.js',
    templateFile: files.es6comp
  };

  var createSfComp = {
    type: 'add',
    path: 'src/components/{{directory}}/{{pascalCase name}}/index.js',
    templateFile: files.sfcomp
  };
  var createSfHoc = {
    type: 'add',
    path: 'src/components/hoc/{{pascalCase name}}/index.js',
    templateFile: files.sfhoc
  };
  var createApi = {
    type: 'add',
    path: 'src/api/{{name}}.js',
    templateFile: files.api
  };
  var createES6Hoc = {
    type: 'add',
    path: 'src/components/hoc/{{pascalCase name}}/index.js',
    templateFile: files.es6hoc
  };
  var createStore = {
    type: 'add',
    path: 'src/stores{{directory}}/{{name}}.js',
    templateFile: files.store
  };
  var modifySfCompLess = {
    type: 'modify',
    path: 'src/components/{{directory}}/{{pascalCase name}}/index.js',
    pattern: /(import { observer } from 'mobx-react';)/gi,
    template: 'import { observer } from \'mobx-react\';\r\nimport styles from \'./index.less\';'
  };
  var modifyES6CompLess = {
    type: 'modify',
    path: 'src/components/{{directory}}/{{pascalCase name}}/index.js',
    pattern: /(import { observer } from 'mobx-react';)/gi,
    template: 'import { observer } from \'mobx-react\';\r\nimport styles from \'./index.less\';'
  };
  var modifyStoreIndex = {
    type: 'modify',
    path: 'src/stores/index.js',
    pattern: /(\/\/ append here from plop)/gi,
    template: 'export {{name}}Store from \'.{{directory}}{{name}}\';\n// append here from plop'
  };
  var modifyHocIndex = {
    type: 'modify',
    path: 'src/components/hoc/index.js',
    pattern: /(\/\/ append here from plop)/gi,
    template: 'export {{camelCase name}} from \'./{{pascalCase name}}\';\n// append here from plop'
  };
  var modifyApiIndex = {
    type: 'modify',
    path: 'src/api/index.js',
    pattern: /(\/\/ append here from plop)/gi,
    template: 'export * as {{name}}Api from \'./{{name}}\';\n// append here from plop'
  };
  var modifyContainerIndex = {
    type: 'modify',
    path: 'src/containers/index.js',
    pattern: /(\/\/ append here from plop)/gi,
    template: 'export {{pascalCase directory}} from \'./{{directory}}\';\n// append here from plop'
  };
  var modifyContainer2Index = {
    type: 'modify',
    path: 'src/containers/index.js',
    pattern: /(\/\/ append here from plop)/gi,
    template: 'export {{pascalCase directory}} from \'./report/{{directory}}\';\n// append here from plop'
  };
  var modifyRoute1 = {
    type: 'modify',
    path: 'src/routes.js',
    pattern: /(\/\/ first append here from plop)/gi,
    template: '    {{pascalCase directory}},\n// first append here from plop'
  };
  var modifyRoute2 = {
    type: 'modify',
    path: 'src/routes.js',
    pattern: /({\/\* second append here from plop \*\/})/gi,
    template: '      <Route path="{{directory}}" component={ {{pascalCase directory}} } />\n{/* second append here from plop */}'
  };
  var modifyRoute3 = {
    type: 'modify',
    path: 'src/routes.js',
    pattern: /({\/\* third append here from plop \*\/})/gi,
    template: '        <Route path="{{directory}}" component={ {{pascalCase directory}} } />\n{/* third append here from plop */}'
  };
  /* Questions */
  var getDirectory = {
    type: 'input',
    name: 'directory',
    message: 'What is the directory?',
    validate: function (value) {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'directory is required';
    }
  };
  var getStoreDirectory = {
    type: 'input',
    name: 'directory',
    message: 'What is the directory? eg: / or /report',
    validate: function (value) {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'directory is required';
    }
  };
  var getApiName = {
    type: 'input',
    name: 'name',
    message: 'What is the api name? eg: login',
    validate: function (value) {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  };
  var getComponentName = {
    type: 'input',
    name: 'name',
    message: 'What is the component name?',
    validate: function (value) {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  };
  var getStoreName = {
    type: 'input',
    name: 'name',
    message: 'What is the store name? eg: login',
    validate: function (value) {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  };

  /* Options */
  plop.setGenerator('Component sf less', {
    description: '无状态Component, 有less',
    prompts: [getDirectory, getComponentName],
    actions: [createSfComp, modifySfCompLess, createLess]
  });
  plop.setGenerator('Component sf', {
    description: '无状态Component',
    prompts: [getDirectory, getComponentName],
    actions: [createSfComp]
  });
  plop.setGenerator('Component es6 less', {
    description: 'es6类型Component, 有less',
    prompts: [getDirectory, getComponentName],
    actions: [createES6Comp, modifyES6CompLess, createLess]
  });
  plop.setGenerator('Component es6', {
    description: 'es6类型Component',
    prompts: [getDirectory, getComponentName],
    actions: [createES6Comp]
  });
  plop.setGenerator('Container default', {
    description: '一级路由Container',
    prompts: [getDirectory],
    actions: [createContainerIndex, createContainerComp, modifyContainerIndex, modifyRoute1, modifyRoute2]
  });
  plop.setGenerator('Container for report module', {
    description: '二级路由Container',
    prompts: [getDirectory],
    actions: [createContainer2Index, createContainer2Comp, modifyContainer2Index, modifyRoute1, modifyRoute3]
  });
  plop.setGenerator('Store', {
    description: 'Store',
    prompts: [getStoreDirectory, getStoreName],
    actions: [createStore, modifyStoreIndex]
  });
  plop.setGenerator('hoc sf', {
    description: '无状态高阶组件',
    prompts: [getComponentName],
    actions: [createSfHoc, modifyHocIndex]
  });
  plop.setGenerator('hoc es6', {
    description: 'es6类型高阶组件',
    prompts: [getComponentName],
    actions: [createES6Hoc, modifyHocIndex]
  });
  plop.setGenerator('api', {
    description: 'api接口',
    prompts: [getApiName],
    actions: [createApi, modifyApiIndex]
  });
};

