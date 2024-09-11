import { useEffect, useState } from 'react'
import { Layout, Menu, theme, message, Col, Row, Statistic, Divider } from 'antd'
import CountUp from 'react-countup'
import req from '@utils/request'
import './index.less'
import { useNavigate } from 'react-router-dom'

const formatter = value => <CountUp end={value} separator=',' />
const { Content, Sider } = Layout

// 左侧菜单
const menuApiName = '/simLab/menu'
const getLeftMenu = async () => {
  const response = await req(
    {
      method: 'get',
      url: menuApiName
    },
    '/iot'
  )

  if (response.success && response.data) {
    return response.data
  } else {
    message.error('获取数据失败')
  }
}

// 头部数据展示
const simCountApiName = '/simLab/count'
const getSimCount = async () => {
  const response = await req(
    {
      method: 'get',
      url: simCountApiName
    },
    '/iot'
  )
  if (response.success && response.data) {
    return response.data
  } else {
    message.error('获取数据失败')
  }
}

/**
 * 找出对应的projectUrl
 * @param {菜单数组} items
 * @param {key} key
 * @returns 实验支持地址projectUrl
 */
const findItemByKey = (items, key) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.key === key) {
      return item.projectUrl
    }
    if (item.children) {
      const found = findItemByKey(item.children, key)
      if (found) {
        return found
      }
    }
  }
  return null
}
/**
 * IoTSimLab虚拟仿真实验室
 * @returns IoTSimLab
 */
const IoTSimLab = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const navigate = useNavigate()

  const [menuItems, setMenuItems] = useState([])
  const [simCount, setSimCount] = useState({})
  useEffect(() => {
    /**请求菜单 */
    const fetchMenuItems = async () => {
      const data = await getLeftMenu()
      setMenuItems(data || [])
    }
    fetchMenuItems()

    /**请求计数 */
    const fetchSimCount = async () => {
      const data = await getSimCount()
      console.log(data)
      setSimCount(data || [])
    }
    fetchSimCount()
  }, [])

  /*点击跳转到具体实验室 */
  const onClick = e => {
    const keyValue = e.key
    const itemValue = findItemByKey(menuItems, keyValue)
    console.log('click ', keyValue, ' with url ', itemValue)
    navigate('/iotsimulation-lab-frame')
  }

  return (
    <Layout>
      <Content
        style={{
          padding: '0 48px'
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Sider
            style={{
              background: colorBgContainer
            }}
            width={200}
          >
            <Menu
              onClick={onClick}
              style={{
                width: 256
              }}
              defaultSelectedKeys={['recommend', 'device']}
              defaultOpenKeys={['recommend', 'device']}
              mode='inline'
              items={menuItems}
            />
          </Sider>
          <Content
            style={{
              padding: '0 100px',
              minHeight: 280
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title='IOT仿真实验项目总数'
                  value={simCount.projectCount}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title='累计完成仿真实验总数'
                  value={simCount.finishedCount}
                  precision={2}
                  formatter={formatter}
                />
              </Col>
            </Row>
            <Divider />
            <div>
              <div className='introduction-container'>
                <p>
                  在仿真实验室，点击开发板列表您可以体验到 Arduino、ESP32、STM32
                  以及树莓派等多种开发板的模拟环境。我们的平台为 IoT
                  开发者提供了一个安全且易于使用的环境，在这里您可以自由地测试和验证您的想法，无需担心硬件损坏的风险。
                </p>

                <h2>仿真实验的好处</h2>
                <div className='benefits'>
                  <ul>
                    <li>
                      <span className='highlight'>✨无风险学习：</span>{' '}
                      在虚拟环境中尝试各种设置，不用担心损坏实际设备。
                    </li>
                    <li>
                      <span className='highlight'>🎊成本节约：</span>{' '}
                      您无需购买昂贵的硬件即可开始学习和实验。
                    </li>
                    <li>
                      <span className='highlight'>🎨随时随地：</span>{' '}
                      只需一台连接互联网的电脑，您就可以随时随地进行实验。
                    </li>
                    <li>
                      <span className='highlight'>🎡高效迭代：</span>{' '}
                      快速迭代您的设计，立即查看更改效果，加速开发流程。
                    </li>
                    <li>
                      <span className='highlight'>👓全面兼容：</span>{' '}
                      支持多种主流开发板，让您能够在不同平台上无缝迁移。
                    </li>
                  </ul>
                </div>

                <h2>新手指南</h2>
                <p>
                  如果您是第一次使用仿真实验室，我们强烈推荐您从“推荐的项目”(Quick Start) 开始,
                  里面包含了每个项目的所有代码。随着您技能的增长，您可以逐步探索更复杂的项目，从开发板选择开始，甚至可以从空白模板开始进行您的模拟实验。
                </p>
              </div>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
export default IoTSimLab
