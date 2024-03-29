export default {
  type: 'div',
  title: '通用布局块',
  is_native: true,
  can_place: true,
  props: {
    style: {
      minHeight: 20,
      padding: '20px',
    }
  },
  config: {
    style: {
      padding: {
        text: '内间距',
        type: '4-value'
      },
      margin: {
        text: '外边距',
        type:'4-value'
      },
      backgroundColor: {
        text: '背景色',
        type: 'color'
      },
    }
  }
}