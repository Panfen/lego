import React, { Component, Fragment } from 'react';
import { Collapse, Modal, Form, Table, Button, Tag, Input, InputNumber, Alert, Select, Checkbox, message } from 'antd';
import { CopyOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import NativeListener from 'react-native-listener';
import ColorPicker from 'rc-color-picker';
import copy from 'copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import com_div from '../../coms/div';
import antd from '../../components/index';
import antComponents from '../../coms/ant-coms';
import PreviewModal from './components/PreviewModal'
import { renderJSONtoJSX, getComponent } from '../../utils';
import 'rc-color-picker/assets/index.css';
import './index.scss';

const Panel = Collapse.Panel;

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      dependComponents: [],
      draggingData: null,
      modal_visible: true,
      resultJSX: '',
      editCom: {},
      value4EditResult: {}, // 属性编辑器中4值编辑的临时存储
      comNowIndex: 1, // 用来给每个组件唯一编号
      activeCom: {
        props: {
          style: {}
        }
      },
      editTarget: null,
      showAddList: false,
      hasBeginEdit: false,
      isDragLayer: false,
      addListData: {},
      mouse_x: 0,
      mouse_y: 0,
      dragdiv_x: 0,
      dragdiv_y: 0,
      layer_x: 0,
      layer_y: 0,
      layer_show: false,
      layer_w: 0,
      layer_h: 0,
      layer_isTop: true,
      data: [
        (function () {
          var div = _.cloneDeep(com_div);
          div.props.style.height = 200;
          return div;
        })()
      ],
      previewVisible: false, // 预览modal
    };
    // var v = localStorage.getItem('cache_data');
    // if (v) {
    //   this.state.data = JSON.parse(v);
    // }

    setTimeout(() => {
      this.setState({
        hasBeginEdit: true
      })
    }, 3000)
  }

  findCanDropTarget (target) {
    return target.className.indexOf('draggable') != -1 ? target : this.findCanDropTarget(target.parentNode);
  }

  renderJSON (json) {
    const { draggingData, comNowIndex, isDragLayer, editCom } = this.state;
    return (
      json.map((d, i) => {
        d.id = d.id || this.state.comNowIndex++;
        if (d.hasDelete) return;

        var component;
        if (d.is_native) {
          component = d.type;
        } else {
          component = getComponent(d.type.split('.'));
          this.state.dependComponents.push(d.type.split('.')[0]);
        }

        var props = {};
        if (d.can_place) {
          props.className = 'draggable';
          props.onDragOver = (e) => {
            e.preventDefault();
          }
          props.onDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.findCanDropTarget(e.target).className = this.findCanDropTarget(e.target).className.replace('isdroping', '')
            d.childrens = d.childrens ? d.childrens : [];
            d.childrens.push(_.cloneDeep(draggingData));
            this.forceUpdate();
          }
          props.onDragOver = (e) => {
            e.preventDefault();
            if (this.findCanDropTarget(e.target).className.indexOf('isdroping') == -1) {
              this.findCanDropTarget(e.target).className += (' isdroping')
            }
          }
          props.onDragLeave = (e) => {
            e.preventDefault();
            this.findCanDropTarget(e.target).className = this.findCanDropTarget(e.target).className.replace('isdroping', '')
          }
        }

        var outerProps = {};
        outerProps.onMouseOver = (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.showLayer(e.target, d);
        }
        outerProps.onMouseLeave = (e) => {
          e.stopPropagation();
          if (!isDragLayer) {
            this.setState({ layer_show: false });
          }
        }
        outerProps.onClick = (e) => {
          e.stopPropagation();
          this.setState({ editCom: d });
          this.forceUpdate();
        }
        d.props = d.props || {};
        var realProps = Object.assign({}, d.props);
        for (var i in realProps) {
          if (typeof (realProps[i]) == 'object' && realProps[i].type == 'relative') {
            realProps[i] = realProps[realProps[i].target] ? realProps[i].true : realProps[i].false;
          }
        }
        if (d.sub_type == 'table_container') {
          realProps.columns.forEach(c => {
            if (c.childrens) {
              c.render = () => {
                return this.renderJSON(c.childrens)
              }
            } else if (c.type == '图文') {
              c.render = () => {
                return <div>
                  <img src={'http://img.souche.com/20170406/jpg/9f9728decb009c757729c4fb712c0a6e.jpg'} style={{ width: 53, height: 40, verticalAlign: 'top' }} />
                  <span style={{ verticalAlign: 'top', lineHeight: '40px', display: 'inline-block', marginLeft: 10 }}>{c.title}</span>
                </div>
              }
            } else if (c.type == '图片') {
              c.render = () => {
                return <img src={'http://img.souche.com/20170406/jpg/9f9728decb009c757729c4fb712c0a6e.jpg'} style={{ width: 53, height: 40, verticalAlign: 'top' }} />
              }
            } else if (c.type == '链接') {
              c.render = () => {
                return <a>动作</a>
              }
            }
          })
        }

        if (d.wrap_inner) {
          return <NativeListener {...outerProps}>
            {React.createElement(
              component,
              realProps,
              [<div {...props} style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
                {d.props.content ? [d.props.content] : (d.childrens ? this.renderJSON(d.childrens) : null)}
              </div>]
            )}
          </NativeListener>
        } else if (d.wrap) {
          return <NativeListener {...outerProps}>
            <div {...props} style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
              {React.createElement(
                component,
                realProps,
                d.props.content ? [d.props.content] : (d.childrens ? this.renderJSON(d.childrens) : null)
              )}
            </div>
          </NativeListener>
        } else {
          Object.assign(realProps, props);
          return <NativeListener {...outerProps}>
            {React.createElement(
              component,
              realProps,
              d.props.content ? [d.props.content] : (d.childrens ? this.renderJSON(d.childrens) : null)
            )}
          </NativeListener>
        }
      })
    )
  }

  showLayer(target, d) {
    const { isDragLayer } = this.state;
    if (isDragLayer) {
      return;
    }
    const { x, y } = this.getDomPos(target);
    this.setState({
      activeCom: d,
      layer_x: x,
      layer_y: y,
      layer_w: target.offsetWidth,
      layer_h: target.offsetHeight,
      layer_show: true,
      layer_isTop: true,
      dragdiv_x: target.offsetWidth + x,
      dragdiv_y: target.offsetHeight + y
    });
    document.getElementById("dragdiv").style.left = (target.offsetWidth + x - 10) + 'px';
    document.getElementById("dragdiv").style.top = (target.offsetHeight + y - 10) + 'px';
  }

  getDomPos(target) {
    var actualLeft = target.offsetLeft;
    var current = target.offsetParent;
    while (current) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    var actualTop = target.offsetTop;
    var current = target.offsetParent;
    while (current) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return {
      x: actualLeft,
      y: actualTop
    }
  }

  /**
   * 编辑属性，设置增加一项的值
   */  
  setAddListData = (index, v, type) => {
    const { addListData,  } = this.state;
    addListData[index] = ['Number', 'Boolean'].includes(type) ? v : v.target.value + "";
    this.setState({ addListData });
  }

  renderEnumObject(key) {
    const { editCom, showAddList, addListData } = this.state;
    var props = editCom.props[key];
    var config = editCom.config[key].enumobject;
    if (config.type == 'relative_props_object') {
      config = editCom.props[config.target];
    }
    return <div>
      <div className="enum-title">{editCom.config[key].text}</div>
      <Table
        dataSource={props}
        pagination={false}
        bordered={true}
        size="small"
        columns={config.concat([{
          key: 'xx',
          dataIndex: "xx",
          title: "操作",
          render: (text, record, index) => {
            return <DeleteOutlined onClick={() => {
              props.splice(index, 1);
              editCom.props[key] = _.cloneDeep(props);
              this.forceUpdate();
            }} />
          }
        }])}
      />
      <Button className="mt10" onClick={() => {
        this.setState({
          addListData: {},
          showAddList: true
        })
      }}>添加一项</Button>
      {
        showAddList && <Form layout="horizontal" >
          {config.map(c => {
            return <Form.Item label={c.title} className="mb5">
              {
                (() => {
                  if (c.type == 'String')
                    return <Input placeholder={c.title} onInput={v => this.setAddListData(c.dataIndex, v, c.type)} />
                  if (c.type == 'Number')
                    return <InputNumber onChange={v => this.setAddListData(c.dataIndex, v, c.type)} />
                  if (c.type == 'Boolean')
                    return <Checkbox onChange={v => this.setAddListData(c.dataIndex, v, c.type)} />
                  else
                    return <Input placeholder={c.title} onInput={v => this.setAddListData(c.dataIndex, v, c.type)} />
                })()
              }
            </Form.Item>
          })}
          <Form.Item label="" className="mb5">
            <Button type="primary" onClick={() => {
              if (editCom.sub_type == 'table_container') {
                addListData.childrens = [com_div];
              }
              props.push(addListData);
              editCom.props[key] = _.cloneDeep(props);
              this.setState({
                showAddList: false,
                addListData: {}
              });
              this.forceUpdate();
            }}>提交</Button>
          </Form.Item>
        </Form>
      }
    </div>
  }

  findIdFromComs(id, coms, parent) {
    var result = null;
    for (var i = 0; i < coms.length; i++) {
      var com = coms[i];
      if (com.id == id) {
        result = {
          com: com,
          parent: parent
        }
      } else if (com.childrens) {
        result = this.findIdFromComs(id, com.childrens, com);
      }
    }
    return result;
  }

  copyCom (com) {
    const { data, comNowIndex } = this.state;
    var id = com.id;
    var { com, parent } = this.findIdFromComs(id, data);
    var cloneCom = _.cloneDeep(com);
    cloneCom.id = (comNowIndex + 1);
    parent.childrens.push(cloneCom);
    this.setState({ comNowIndex: comNowIndex + 1 });
    this.forceUpdate();
  }

  /**
   * 修改样式的上、右、下、左
   */ 
  update4Value = (s, index, v) => {
    const { value4EditResult, editCom, comNowIndex, activeCom } = this.state;
    const values = value4EditResult[s];
    values[index] = v.target.value;
    const newEditCom = _.cloneDeep(editCom);
    newEditCom.props.style[s] = values.join(' ');
    this.renderAfterEdit(newEditCom);
  }

  /**
   * 更新data、重新渲染
   */ 
  renderAfterEdit = (newEditCom) => {
    const { data } = this.state;
    this.setState({
      editCom: newEditCom
    }, () => {
      this.setState({ 
        data: this.updateDom(data, 'editCom')
      }, () => {
        this.renderJSON(data);
      });
    });
  }

  /**
   * 拖动元素，宽高变更后重新渲染
   */ 
  renderAfterDrag = () => {
    const { data } = this.state;
    this.setState({ 
      data: this.updateDom(data, 'activeCom'),
    }, () => {
      this.renderJSON(data);
    })
  }

  updateDom = (doms, type) => {
    const com = this.state[type];
    doms.forEach(d => {
      if (d.id === com.id) {
        d.props = com.props;
      }
      if (d.childrens) {
        this.updateDom(d.childrens, type);
      }
    });
    return doms;
  }

  /**
   * 根节点监听鼠标拖动
   */ 
  onEditorMouseMove = (e) => {
    const { isDragLayer, activeCom, layer_x, layer_y } = this.state;
    if (isDragLayer) {
      e.stopPropagation();
      document.getElementById("dragdiv").style.left = e.clientX - 5 + 'px';
      document.getElementById("dragdiv").style.top = e.clientY - 5 + 'px';

      const newActiveCom = _.cloneDeep(activeCom);
      newActiveCom.props.style.width = e.clientX + 5 - layer_x;
      newActiveCom.props.style.height = e.clientY + 5 - layer_y;

      this.setState({
        mouse_x: e.clientX,
        mouse_y: e.clientY,
        dragdiv_x: e.clientX,
        dragdiv_y: e.clientY,
        layer_w: e.clientX + 5 - layer_x,
        layer_h: e.clientY + 5 - layer_y,
        activeCom: newActiveCom
      }, () => {
        this.renderAfterDrag();
      })
    }
  }

  render() {
    const { dependComponents, data, hasBeginEdit, value4EditResult, editCom, activeCom, isDragLayer, layer_isTop, layer_show,
    layer_w, layer_h, layer_x, layer_y, previewVisible } = this.state;
    // localStorage.setItem('cache_data', JSON.stringify(this.state.data));
      
    const layerStyle = {
      zIndex: layer_isTop ? 1000 : -10,
      display: layer_show ? 'block' : 'none',
      width: layer_w,
      height: layer_h,
      left: layer_x, 
      top: layer_y
    }

    return (
      <div className="editor" onMouseMove={this.onEditorMouseMove.bind(this)} onMouseUp={() => this.setState({ isDragLayer: false })}>
        <div className="edit_layer" style={layerStyle}>
          <div color="#f50">{activeCom.title}</div>
        </div>
        <NativeListener onMouseDown={e => {
          e.stopPropagation();
          this.setState({ isDragLayer: true });
        }}>
          <div id="dragdiv"></div>
        </NativeListener>

        {/* 左侧组件选择区*/}
        <div className="side-panel left">
          <Collapse defaultActiveKey={[3]}>
            {antComponents.map((group, i) => {
              return <Panel header={`${group.group_title} (${group.coms.length})`} key={i}>
                {group.coms.map((com, i2) => {
                  return <Tag
                    key={i + '' + i2}
                    draggable={true}
                    onDragStart={() => {
                      this.setState({ 
                        hasBeginEdit: true,
                        draggingData: com
                      });
                    }}
                  >
                    {com.type} {com.title}
                  </Tag>
                })}
              </Panel>
            })}
          </Collapse>
        </div>

        {/* 中间页面展示区 */}
        <div className="container center">
          {!hasBeginEdit && <div className="edit-tip">设计板，拖拽元素到此，点击元素可以编辑属性，红色虚线区域可以放置子组件</div>}
          {this.renderJSON(data)}
        </div>

        {/* 右侧属性编辑区 */}
        <div className="side-panel right">
          <Collapse defaultActiveKey={['0', 'output']}>
            <Panel header={'属性编辑区 ' + (editCom.title ? `（${editCom.title}）` : '')} key={0}>
              <div className="edit-props-wrap">
                {editCom.type && <Button onClick={() => {
                    this.state.editCom.hasDelete = true;
                    this.forceUpdate();
                  }}>删除此元素</Button>
                }
                {editCom.type && <Button onClick={() => this.copyCom(editCom)}>复制此元素</Button>}
                <Button onClick={() => {
                  // localStorage.setItem('cache_data', '');
                  window.location.reload();
                }}>清空并重新开始</Button>
                {
                  (editCom && editCom.config) ? Object.keys(editCom.config).map(key => {
                    if (key == 'style') {
                      var style = editCom.config.style;

                      return Object.keys(style).map((s) => {
                        if (style[s].type == 'color') {
                          return <Form.Item label={editCom.config[key][s].text} className="mb5">
                            <ColorPicker
                              placement="topRight"
                              color={editCom.props.style[s] || '#fff'}
                              onChange={c => {
                                const newEditCom = _.cloneDeep(editCom);
                                newEditCom.props.style[s] = c.color;
                                this.renderAfterEdit(newEditCom);
                              }}
                            />
                          </Form.Item>
                        } else if (style[s].type == '4-value') {
                          var defaultValue = editCom.props.style[s] || "0";
                          if (defaultValue.toString().indexOf(' ') == -1) {
                            this.state.value4EditResult[s] = [defaultValue, defaultValue, defaultValue, defaultValue];
                          } else {
                            this.state.value4EditResult[s] = defaultValue.split(' ')
                          }
                          return <Form.Item label={editCom.config.style[s].text} className="four-value-form-item">
                            {['上', '右', '下', '左'].map((pos, index) => {
                              return <Fragment key={index}>
                                {pos}：<Input defaultValue={value4EditResult[s][index]} onChange={v => this.update4Value(s, index, v)} />
                              </Fragment>
                            })}
                          </Form.Item>
                        } else {
                          return <Form.Item label={editCom.config[key][s].text} className="mb5">
                            <Input defaultValue={editCom.props[key][s]} onChange={v => {
                              const newEditCom = _.cloneDeep(editCom);
                              newEditCom.props[key][s] = v.target.value;
                              this.renderAfterEdit(newEditCom);
                            }}></Input>
                          </Form.Item>
                        }
                      })
                    } else if (editCom.config[key].enumobject) {
                      return this.renderEnumObject(key);
                    } else {
                      return <Form.Item label={editCom.config[key].text} className="mb5">
                        {
                          (() => {
                            if (editCom.config[key].enum) {
                              return <Select
                                defaultValue={editCom.props[key]}
                                onChange={v => {
                                  this.state.editCom.props[key] = (v == 'true' ? true : (v === 'false' ? false : v));
                                  this.forceUpdate();
                                }}>
                                {editCom.config[key].enum.map(n => <Select.Option value={n}>{n}</Select.Option>)}
                              </Select>
                            } else if (editCom.config[key].type == "Boolean") {
                              return <Checkbox
                                checked={editCom.props[key]}
                                onChange={v => {
                                  this.state.editCom.props[key] = v.target.checked;
                                  this.forceUpdate();
                                }} />
                            } else if (key == 'content') {
                              return <Input defaultValue={editCom.props[key]} onChange={v => {
                                this.state.editCom.props[key] = v.target.value;
                                this.forceUpdate()
                              }} />
                            } else {
                              return <Input defaultValue={editCom.props[key]} onChange={v => {
                                this.state.editCom.props[key] = v.target.value;
                                this.forceUpdate()
                              }} />
                            }
                          })()
                        }
                      </Form.Item>
                    }
                  }) : (
                    <Alert message="此组件无可编辑属性" type="warning" className="mt20"></Alert>
                  )
                }
              </div>
            </Panel>
            
            <Panel className="code-wrap" header="最终代码 (自动更新)" key="output">
              <CopyOutlined onClick={() => {
                copy(renderJSONtoJSX(dependComponents, data));
                message.success('复制成功');
              }} />
              <EyeOutlined onClick={() => {
                this.setState({ previewVisible: true })
              }} />
              <SyntaxHighlighter language="javascript" style={docco}>
                {renderJSONtoJSX(dependComponents, data)}
              </SyntaxHighlighter>
            </Panel>
          </Collapse>
        </div>

        <PreviewModal visible={previewVisible} data={data} onClose={() => this.setState({ previewVisible: false })}/>
      </div>
    );
  }
  
}
export default Editor;
