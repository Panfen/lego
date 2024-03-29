import Layout from './Layout';
import Layout_Header from './Layout.Header';
import Layout_Sider from './Layout.Sider';
import Layout_Content from './Layout.Content';
import Breadcrumb from './Breadcrumb';
import Form from './Form';
import Form_Item from './Form.Item';
import Form_Item_Inline from './Form.Item.Inline';
import Form_Item_Submit from './Form.Item.Submit';
import Button from './Button';
import Input from './Input';
import DatePicker from './DatePicker';
import Radio_Group from './Radio.Group';
import Badge from './Badge';
import Calendar from './Calendar';
import Tag from './Tag';
import Table from './Table';
import Table_Data from './Table_Data';
import InputNumber from './InputNumber';
import Switch from './Switch';
import Row2 from './Row2';
import Row4 from './Row4';
import Row8 from './Row8';
import Table_Column from './Table.Column';
import Modal from './Modal';
import div from './div';

import RJImageUploader from './RJImgUploader';
import RJMenu from './RJMenu';
import RJPagination from './RJPagination';
import RJSelect from './RJSelect';

var _ = require('lodash');

export default [
  {
    group_title: '栅格组件（横向百分比）',
    coms: [Row2, Row4, Row8]
  },
  {
    group_title: '布局容器组件',
    coms: [
      div,
      Layout,
      Layout_Header,
      Layout_Sider,
      Layout_Content,
      {
        type: 'div',
        title: '分割线',
        is_native: true,
        props: {
          style: {
            backgroundColor: '#bbb',
            height: '1px'
          }
        },
        config: {
          backgroundColor: {
            text: '背景色',
          },
          margin: {
            text: '外边距',
            type: '4-value'
          },
        }
      },
    ]
  },
  {
    group_title: '导引组件',
    coms: [
      Breadcrumb,
      RJMenu,
      {
        type: 'Tabs',
        title: 'Tabs',
        can_place: true,
        props: {},
        childrens: [
          {
            type: 'Tabs.TabPane',
            title: 'tab项',
            props: {
              tab: '测试',
              key: 1
            }
          }
        ]
      },
      {
        type: 'Tabs.TabPane',
        title: 'tab项',
        props: {
          tab: '测试'
        }
      }
    ]
  },
  {
    group_title: '表单容器和表单项',
    coms: [
      Form,
      Form_Item,
      Form_Item_Submit,
      (() => {
        var inlineForm = _.cloneDeep(Form);
        inlineForm.title = '内联的表单容器'
        inlineForm.props.layout = 'inline'
        return inlineForm
      })(),
      Form_Item_Inline,
      Button,
      Input,
      InputNumber,
      RJSelect,
      Radio_Group,
      DatePicker,
      {
        type: 'DatePicker.MonthPicker',
        title: '月份选择器',
      },
      {
        type: 'DatePicker.RangePicker',
        title: '日期范围选择器',
      },
      {
        type: 'TimePicker',
        title: '时间选择器',
      },
      Switch,
      RJImageUploader
    ]
  },
  {
    group_title: '数据组件/图片/标签',
    coms: [
      Table,
      Table_Data,
      Badge,
      Calendar,
      Tag,
      RJPagination,
      {
        type: 'img',
        title: '图片',
        is_native: true,
        props: {
          src: 'http://dummyimage.com/200x100/894FC4/FFF.png&text=!',
          style: {
            width: 50,
            height: 50
          }
        },
        config: {
          style: {
            width: {
              text: '宽度'
            },
            height: {
              text: '高度'
            },
            margin: {
              text: '外边距',
              type: '4-value'
            }
          }
        }
      }
    ]
  },
  {
    group_title: '弹窗',
    coms: [
      Modal
    ]
  }, 
  {
    group_title: '文本组件/标题',
    coms: [
      {
        type: 'a',
        title: '链接',
        is_native: true,
        props: {
          content: '链接',
          style: {
            marginLeft: '10px'
          }
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            marginLeft: {
              text: '左边距'
            },
            lineHeight: {
              text: '行高'
            },
            fontSize: {
              text: '字体大小'
            },
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'h1',
        title: '标题H1',
        is_native: true,
        props: {
          content: '标题',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'h2',
        title: '标题H2',
        is_native: true,
        props: {
          content: '标题',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'h3',
        title: '标题H3',
        is_native: true,
        props: {
          content: '标题',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'h4',
        title: '标题H4',
        is_native: true,
        props: {
          content: '标题',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'h5',
        title: '标题H5',
        is_native: true,
        props: {
          content: '标题',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'span',
        title: '内联文本',
        is_native: true,
        props: {
          content: '文本',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            lineHeight: {
              text: '行高'
            },
            fontSize: {
              text: '字体大小'
            },
            color: {
              text: '字体颜色',
              type: 'color'
            },
          }
        }
      },
      {
        type: 'div',
        title: '块状文本',
        is_native: true,
        props: {
          content: '文本',
          style: {}
        },
        config: {
          content: {
            text: '文本内容'
          },
          style: {
            fontSize: {
              text: '字体大小'
            },
            lineHeight: {
              text: '行高'
            },
            background: {
              text: '背景色',
              type: 'color'
            },
            color: {
              text: '字体颜色',
              type: 'color'
            },
            margin: {
              text: '外边距',
              type: '4-value'
            },
            padding: {
              text: '内边距',
              type: '4-value'
            }
          }
        }
      }
    ]
  }
]
