import { useLocation } from 'react-router-dom'
import './index.less'
import { Button, Dropdown, Space } from 'antd'
import Search from 'antd/es/transfer/search'
import { useNavigate } from 'react-router-dom'

const discoverItems = [
  {
    title: '是',
    key: 'yes'
  },
  {
    title: '否',
    key: 'no'
  }
]

function IoTSimLabFrame() {
  const location = useLocation()
  const vmurl = typeof location.state?.vmurl === 'string' ? location.state.vmurl : ''
  const navigate = useNavigate()

  const goIotSimLab = () => {
    navigate('/iot-vm')
  }
  return (
    <div>
      <Button onClick={goIotSimLab} type='link'>
        {'>>>'}返回
      </Button>
      <div>
        <Dropdown
          placement='bottom'
          destroyPopupOnHide
          dropdownRender={() => (
            <div className='drop-down-box'>
              <Space size='middle'>
                {discoverItems.map(item => (
                  <div className='drop-down-item' key={item.key}>
                    <div className='drop-down-item-title'>{item.title}</div>
                  </div>
                ))}
              </Space>
            </div>
          )}
        >
          <Button type='link'>是否完成实验</Button>
        </Dropdown>
        <span className='simulation-desc'>
          这个实验项目的描述这个实验项目的描述这个实验项目的描述这个实验项目的描述
          这个实验项目的描述这个实验项目的描述这个实验项目的描述
        </span>
      </div>
      <div className='iframe-container'>
        <iframe src={vmurl || 'https://wokwi.com/projects/new/arduino-uno'} />
        <div className='overlay-header' />
      </div>
    </div>
  )
}

export default IoTSimLabFrame
