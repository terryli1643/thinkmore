module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
  },
  {
    key: 'record',
    name: '发件录入',
    icon: 'api',
  },
  {
    key: 'records',
    name: '面单查询',
    icon: 'api',
  },
  {
    key: 'myaccount',
    name: '用户中心',
    icon: 'user',
    child: [
      {
        key: 'userInfo',
        name: '个人信息',
        icon: 'heart-o',
      },
      {
        key: 'password',
        name: '修改密码',
        icon: 'database',
      },
    ],
  },
  // {
  //   key: 'users',
  //   name: 'User Manage',
  //   icon: 'user',
  // },
  // {
  //   key: 'request',
  //   name: 'Request',
  //   icon: 'api',
  // },
  // {
  //   key: 'UIElement',
  //   name: 'UI Element',
  //   icon: 'camera-o',
  //   clickable: false,
  //   child: [
  //     {
  //       key: 'iconfont',
  //       name: 'IconFont',
  //       icon: 'heart-o',
  //     },
  //     {
  //       key: 'dataTable',
  //       name: 'DataTable',
  //       icon: 'database',
  //     },
  //     {
  //       key: 'dropOption',
  //       name: 'DropOption',
  //       icon: 'bars',
  //     },
  //     {
  //       key: 'search',
  //       name: 'Search',
  //       icon: 'search',
  //     },
  //     {
  //       key: 'editor',
  //       name: 'Editor',
  //       icon: 'edit',
  //     },
  //     {
  //       key: 'layer',
  //       name: 'layer (Function)',
  //       icon: 'credit-card',
  //     },
  //   ],
  // },
  // {
  //   key: 'chart',
  //   name: 'Recharts',
  //   icon: 'code-o',
  //   child: [
  //     {
  //       key: 'lineChart',
  //       name: 'LineChart',
  //       icon: 'line-chart',
  //     },
  //     {
  //       key: 'barChart',
  //       name: 'BarChart',
  //       icon: 'bar-chart',
  //     },
  //     {
  //       key: 'areaChart',
  //       name: 'AreaChart',
  //       icon: 'area-chart',
  //     },
  //   ],
  // },
  // {
  //   key: 'navigation',
  //   name: 'Test Navigation',
  //   icon: 'setting',
  //   child: [
  //     {
  //       key: 'navigation1',
  //       name: 'Test Navigation1',
  //     },
  //     {
  //       key: 'navigation2',
  //       name: 'Test Navigation2',
  //       child: [
  //         {
  //           key: 'navigation21',
  //           name: 'Test Navigation21',
  //         },
  //         {
  //           key: 'navigation22',
  //           name: 'Test Navigation22',
  //         },
  //       ],
  //     },
  //   ],
  // },
]
