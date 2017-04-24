const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      senderName: '@cname',
      senderMobile: /^1[34578]\d{9}$/,
      receiverName: '@cname',
      receiverMobile: /^1[34578]\d{9}$/,
      receiverAddress: '@county(true)',
      'trackingNumber|1000000000-9999999999': 1,
      'type|1': [ '普通件', '刷单件' ],
      'orderNumber|1000000000-9999999999': 1,
      content: '@csentence',
      time: '@datetime'
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

const userPermission = {
  DEFAULT: [
    'dashboard', 'chart',
  ],
  ADMIN: [
    'dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart',
  ],
  DEVELOPER: [ 'dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart' ],
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

module.exports = {

  [`POST ${apiPrefix}/user/login`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter((item) => item.username === username)

    if (user[ 0 ] && user[ 0 ].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[ 0 ].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).send({ message: 'Bad Request' })
    }
  },

  [`GET ${apiPrefix}/user/logout`] (req, res) {
    res.clearCookie('token')
    res.status(200).send({ message: 'OK' })
  },

  [`GET ${apiPrefix}/userInfo`] (req, res) {
    const cookies = qs.parse(req.headers.cookie, { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[ 0 ].permissions
        user.username = userItem[ 0 ].username
        user.id = userItem[ 0 ].id
      }
    }
    response.user = user
    res.json(response)
  },

  [`GET ${apiPrefix}/records`] (req, res) {
    const page = req.query
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = usersListData.data.concat()
    if (page.keyword || page.timeRange) {
      const d = newData.filter((item) => {
        let result1 = item[ 'senderName' ].indexOf(decodeURI(page.keyword));
        let result2 = item[ 'senderMobile' ].toString().indexOf(decodeURI(page.keyword));
        let result3 = item[ 'receiverName' ].indexOf(decodeURI(page.keyword));
        let result4 = item[ 'receiverMobile' ].toString().indexOf(decodeURI(page.keyword));
        let result5 = item[ 'trackingNumber' ].toString().indexOf(decodeURI(page.keyword));
        let result6 = item[ 'orderNumber' ].toString().indexOf(decodeURI(page.keyword));
        return result1 > -1 || result2 > -1 || result3 > -1 || result4 > -1 || result5 > -1 || result6 > -1;
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = usersListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      usersListData.page.current = currentPage * 1
      newPage = usersListData.page
    }
    res.json({
      success: true,
      data,
      page: {
        ...newPage,
        pageSize: Number(pageSize),
      },
    })
  },

  [`POST ${apiPrefix}/records`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = usersListData.data.length + 1
    usersListData.data.unshift(newData)

    usersListData.page.total = usersListData.data.length
    usersListData.page.current = 1

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  [`DELETE ${apiPrefix}/records`] (req, res) {
    const deleteItem = req.body

    usersListData.data = usersListData.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  [`PUT ${apiPrefix}/records`] (req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },
}
