import Common_Style from './common/style.config';

export default {
  type: 'Layout',
  title: '外层布局块',
  can_place: true,
  props: {
    style: {
      minHeight: 20,
      padding: '20px',
      backgroundColor: '#fff'
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
        type: '4-value'
      },
      ...Common_Style
    }
  }
}
