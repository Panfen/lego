import Common_Style from './common/style.config';
export default {
  type: 'Form',
  title: '表单容器',
  can_place: true,
  props: {
    layout: 'horizontal',
    style: {
      padding: '20px',
      margin: '0px'
    }
  },
  config: {
    layout: {
      text: '布局方式',
      enum: ['inline', 'horizontal', 'vertical']
    },
    style: {
      width: {
        text: '宽度'
      },
      padding: {
        text: '内边距',
        type: '4-value'
      },
      margin: {
        text: '外边距',
        type: '4-value'
      },
      ...Common_Style
    }
  }
}
