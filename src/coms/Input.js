export default {
  type: 'Input',
  title: '输入框',
  props: {
    placeholder: '这是一个输入框',
    type: 'text',
    style: {}
  },
  config: {
    placeholder: {
      text: '默认提醒'
    },
    type: {
      text: '是否多行文本',
      enum: ['textarea', 'text']
    },
    style: {
      width: {
        text: '宽度'
      }
    }
  }
}
