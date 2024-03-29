export default {
  type: 'Row',
  title: '2列栅格',
  childrens: [
    {
      type: 'Col',
      title: '栅格单元',
      can_place: true,
      props: {
        span: 4,
        style: {
          minHeight: 30,
        },
      },
      config: {
        span: {
          text: '栅格',
          enum: [2,4,6,8,10,12,14,16,18,20,22,24]
        }
      }
    },
    {
      type: 'Col',
      title: '栅格单元',
      can_place: true,
      props: {
        span: 20,
        style: {
          minHeight: 30,
        },
      },
      config: {
        span: {
          text: '栅格',
          enum: [2,4,6,8,10,12,14,16,18,20,22,24]
        }
      }
    }
  ],
  props: {},
}
