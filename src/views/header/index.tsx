import Logo from '@/imgs/logo.jpg'
import { LikeOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import TopMenu from '@components/top-menu'
import LoginQrcode from '@imgs/personal_qr_code.jpg'
import req from '@utils/request'
import { Button, Dropdown, Input, Modal, Popover, Space, message } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './index.less'

const { Search } = Input

const menuItems = [
  {
    label: '个人中心',
    key: 1,
    icon: <UserOutlined style={{ fontSize: '16px' }} />,
    path: '/user-info'
  },
  // {
  //   label: '我的收藏',
  //   key: 2,
  //   icon: <HeartOutlined style={{ fontSize: '16px' }} />,
  //   path: '/personal-center/0'
  // },
  {
    label: '我的点赞',
    key: 3,
    icon: <LikeOutlined style={{ fontSize: '16px' }} />,
    path: '/personal-center/1'
  },
  {
    type: 'divider'
  },
  {
    label: '退出',
    key: 4,
    icon: <LoginOutlined style={{ fontSize: '16px' }} />
  }
]

const discoverItems = [
  {
    title: '物联网开源技术',
    subTitle: '物联网开源技术社区',
    key: 'iothub',
    path: 'https://iothub.org.cn/'
  },
  {
    title: '中国物联网协会',
    subTitle: '获取最新物联网技术资讯',
    key: 'cniot',
    path: 'http://iot.china.com.cn/'
  },
  {
    title: '我是管理员',
    subTitle: '管理维护入口',
    key: 'admin',
    path: ''
  },
  {
    title: '联系作者',
    subTitle: '共同维护YJ-IoTClub',
    key: 'wechat'
  }
]

const Header = () => {
  const { pathname } = window.location
  const navigate = useNavigate()

  const { userInfo } = useSelector(store => store.userInfo)

  const handleMenuClick = e => {
    const userInfoStorage = localStorage.getItem('userInfo')
    if (!userInfoStorage) {
      return message.info('请登录')
    }
    const { loginId } = JSON.parse(userInfoStorage)
    if (e.key == 4) {
      Modal.confirm({
        title: '退出提示',
        content: '确定退出当前用户登录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          req(
            {
              method: 'get',
              url: '/user/logOut',
              params: {
                userName: loginId
              }
            },
            '/auth'
          ).then(res => {
            if (res.success) {
              localStorage.removeItem('userInfo')
              message.info('退出成功')
              setTimeout(() => {
                navigate('/login')
              }, 500)
            }
          })
        }
      })
    } else {
      navigate(e.item.props.path)
    }
  }

  const handleJump = value => {
    navigate('/search-detail?t=' + value)
  }

  const goPath = item => {
    if (item.path) {
      window.open(item.path, '_blank')
    }
  }

  return (
    <div className='head-navigator-box'>
      <div className='head-navigator'>
        <div className='head-navigator-left'>
          <div className='head-navigator-logo'>
            <img src={Logo} style={{ height: 50 }} />
          </div>
          <TopMenu />
        </div>
        <div className='head-navigator-user-box'>
          <Dropdown
            placement='bottom'
            // trigger={['click']}
            destroyPopupOnHide
            dropdownRender={() => {
              return (
                <div className='drop-down-box'>
                  <Space size='large'>
                    {discoverItems.map(item => {
                      return (
                        <div className='drop-down-item' key={item.key} onClick={() => goPath(item)}>
                          {item.key === 'wechat' ? (
                            <>
                              <Popover
                                zIndex={2000}
                                placement='bottom'
                                content={() => {
                                  return (
                                    <div>
                                      <img src={LoginQrcode} />
                                    </div>
                                  )
                                }}
                              >
                                <div className='drop-down-item-title'>{item.title}</div>
                                <div className='drop-down-item-content'>{item.subTitle}</div>
                              </Popover>
                            </>
                          ) : (
                            <>
                              <div className='drop-down-item-title'>{item.title}</div>
                              <div className='drop-down-item-content'>{item.subTitle}</div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </Space>
                </div>
              )
            }}
          >
            <Button type='link'>更多</Button>
          </Dropdown>
          {'/question-bank' == pathname && (
            <div className='head-navigator-input-box'>
              <Search
                placeholder='请输入感兴趣的内容～'
                onSearch={value => {
                  if (value) {
                    handleJump(value)
                  }
                }}
                style={{ width: 300, borderRadius: '10px' }}
              />
            </div>
          )}
          {'/login' !== pathname && (
            <div className='head-navigator-user-img'>
              <Dropdown
                menu={{
                  items: menuItems,
                  onClick: handleMenuClick
                }}
                placement='bottom'
                trigger={['click']}
                destroyPopupOnHide
                overlayStyle={{
                  width: '150px'
                }}
              >
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} style={{ width: 36, height: 36 }} />
                ) : (
                  <div />
                )}
                {/* <img src={userInfo.avatar || Head} style={{ width: 36, height: 36 }} /> */}
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
