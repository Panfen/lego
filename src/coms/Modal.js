export default {
  type: 'Modal',
  title: '模态窗口',
  can_place: true,
  wrap: true,
  props: {
    visible: true,
    title: '标题',
    width: 500,
    event_onOk: '',
    event_onCancel: ''
  },
  config: {
    visible: {
      text: '是否可见',
      type: 'Boolean'
    },
    title: {
      text: '标题'
    },
    width: {
      text: '宽度'
    }
  }
}
