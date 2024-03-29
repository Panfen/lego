export default {
  type: 'RJBreadcrumb',
  title: '面包屑',
  props: {
    data: [
      {
        title: '一级目录',
        href: '#',
        key: 1
      },
      {
        title: '二级目录',
        href: '#',
        key: 2
      }
    ]
  },
  config: {
    data: {
      text: '项目配置',
      enumobject: [{
        key: 1,
        dataIndex: 'title',
        title: '显示文本',
        type: 'String',
      },{
        key: 2,
        dataIndex: 'href',
        title: '链接',
        type: 'String',
      }]
    }
  }
}
