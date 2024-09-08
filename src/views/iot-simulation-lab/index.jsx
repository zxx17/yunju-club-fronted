import React from 'react'
import { Layout, Menu, theme } from 'antd'
import { Divider } from 'antd'
import { Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'
import './index.less'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const formatter = value => <CountUp end={value} separator=',' />
const { Content, Sider } = Layout
const items = [
  {
    key: 'iot-vm-2',
    label: '推荐的项目(Quick Start)',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
        vmurl: 'https://wokwi.com/arduino'
      },
      {
        key: '10',
        label: 'Option 10'
      },
      {
        key: '11',
        label: 'Option 11'
      },
      {
        key: '12',
        label: 'Option 12'
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    key: 'iot-vm-1',
    label: '开发板列表',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '1',
        label: 'Arduino',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      },
      {
        key: '2',
        label: 'ESP 32',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      },
      {
        key: '3',
        label: 'STM32',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      },
      {
        key: '4',
        label: 'Pi Pico',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' }
        ]
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    key: 'rank',
    label: '实验完成数排行榜'
  }
]

// 找出对应的url
const findItemByKey = (items, key) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.key === key) {
      return item.vmurl
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
const IoTSimLab = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const navigate = useNavigate()

  const onClick = e => {
    const keyValue = e.key
    const itemValue = findItemByKey(items, keyValue)
    console.log('click ', keyValue, ' with url ', itemValue)
    navigate('/iot-vm-frame', { state: { vmurl: itemValue } })
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
              defaultSelectedKeys={['iot-vm-2']}
              defaultOpenKeys={['iot-vm-2']}
              mode='inline'
              items={items}
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
                <Statistic title='IOT仿真实验访问人次' value={102} formatter={formatter} />
              </Col>
              <Col span={12}>
                <Statistic
                  title='累计完成仿真实验总数'
                  value={368}
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
