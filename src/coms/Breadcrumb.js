export default {
  type: 'Breadcrumb',
  title: '面包屑',
  props: {
    routes: [
      {
        breadcrumbName: '一级目录',
        path: '#',
        key: 1
      },
      {
        breadcrumbName: '二级目录',
        path: '#',
        key: 2
      }
    ]
  },
  config: {
    routes: {
      text: '项目配置',
      enumobject: [
        {
          key: 1,
          dataIndex: 'breadcrumbName',
          title: '显示文本',
          type: 'String',
        }, 
        {
          key: 2,
          dataIndex: 'path',
          title: '链接',
          type: 'String',
        }
      ]
    }
  }
}
