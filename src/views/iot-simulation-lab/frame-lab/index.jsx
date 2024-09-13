import './index.less'
import { Button, Dropdown, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const discoverItems = [
  {
    title: '已完成',
    key: 'yes'
  }
]

function IoTSimLabFrame() {
  const navigate = useNavigate()
  const goIotSimLab = () => {
    navigate('/iotSimulationLab')
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
        <iframe src={'https://wokwi.com/projects/new/arduino-uno'} />
        <div className='overlay-header' />
      </div>
    </div>
  )
}

export default IoTSimLabFrame
