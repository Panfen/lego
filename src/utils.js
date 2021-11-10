import antd from './components/index';


export const getComponent = (types) => {
  if (types.length == 1) {
    return antd[types[0]];
  } else {
    var lastT = types.pop();
    var com = getComponent(types)[lastT];
    return com;
  }
}


export const renderJSONtoJSX = (dependComponents, data) => {

  return `import React, { Component } from 'react';

  /*
   * 这里声明要引入的组件
   */
  import { ${_.uniq(dependComponents).join(', ')} } from '../components/index.jsx';

  /**
   * Index 一般是当前页面名称 index.html
   */
  class Index extends Component {
    constructor () {
      super();
    }
    render() {
      return ${renderElementtoJSX(data).replace(/\n    /, '')}
    }
  }
  export default Index;
  `
}

const renderElementtoJSX = (data) => {
  var result = '';
  data.forEach(d => {
    if (d.hasDelete) return;
    result += `
      <${d.type}${renderProps(d.props, d)}>${d.props.content ? [d.props.content] : (d.childrens ? renderElementtoJSX(d.childrens) : '')}</${d.type}>
    `
  })
  return result;
}

const renderProps = (props, d) => {
  var result = '';
  var props = _.cloneDeep(props);
  for (var i in props) {
    if (!(/^on[A-Z]/.test(i) || /draggable/.test(i) || /content/.test(i))) {
      if (/^event_(.*?)/.test(i)) {
        result += ` ${i.replace('event_', '')}={()=>{ }}`
      } else if (typeof (props[i]) == 'object' && props[i].type == 'relative') {
        result += ` ${i}={${JSON.stringify(props[props[i].target] ? props[i].true : props[i].false)}}`
      } else if (d.sub_type == "table_container" && i == 'columns') {
        var renderCache = {}
        props[i].forEach((p, pi) => {
          if (p.childrens) {
            renderCache['$$' + pi + '$$'] = `()=>{ return ${renderElementtoJSX(p.childrens).replace(/\n    /, '')}}`
            p.render = '$$' + pi + '$$'
            delete p.childrens;
          }
        });
        var noindent = JSON.stringify(props[i])
        var indent = JSON.stringify(props[i], null, 2);
        var r = noindent.length > 100 ? indent : noindent;
        for (var m in renderCache) {
          r = r.replace(`"${m}"`, renderCache[m])
        }
        result += ` ${i}={${r}}`
      } else {
        var noindent = JSON.stringify(props[i])
        var indent = JSON.stringify(props[i], null, 2);
        result += ` ${i}={${noindent.length > 100 ? indent : noindent}}`
      }
    }
  }
  return result;
}