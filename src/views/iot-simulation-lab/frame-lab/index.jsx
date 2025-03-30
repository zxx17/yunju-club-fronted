import './index.less'
import { Button, Dropdown, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import req from '@utils/request'

const discoverItems = [
  {
    title: '已完成',
    key: 1
  }
]

function IoTSimLabFrame() {
  // 获取路径参数
  const [search] = useSearchParams()
  const projectUrl = search.get('projectUrl')
  const projectDesc = search.get('projectDesc')
  // 声明返回跳转
  const navigate = useNavigate()
  const goIotSimLab = () => {
    navigate('/iotSimulationLab')
  }
  // 已完成按键请求
  const setRecord = async key => {
    const response = await req(
      {
        method: 'post',
        url: '/simLab/record',
        data: {
          projectUrl: projectUrl,
          isFinished: key
        }
      },
      '/iot'
    )
    if (response.success && response.data) {
      // TODO 回显问题, 无点击触发问题
      return message.success('保存实验记录成功')
    } else {
      message.error('设置实验记录失败')
    }
  }

  // 界面部分
  return (
    <div>
      {/* 返回按钮 */}
      <Button onClick={goIotSimLab} type='link'>
        {'>>>'}返回
      </Button>
      {/* 实验头部 */}
      <div>
        {/* 下拉框项目操作 */}
        <Dropdown
          placement='bottom'
          destroyPopupOnHide
          dropdownRender={() => (
            <div className='drop-down-box'>
              <Space size='middle'>
                {discoverItems.map(item => (
                  <div className='drop-down-item' key={item.key} onClick={setRecord(item.key)}>
                    <div className='drop-down-item-title'>{item.title}</div>
                  </div>
                ))}
              </Space>
            </div>
          )}
        >
          <Button type='link'>是否完成实验</Button>
        </Dropdown>
        {/* 项目介绍 */}
        <span className='simulation-desc'>项目介绍：{projectDesc}</span>
      </div>
      {/* 实验界面 */}
      <div className='iframe-container'>
        <iframe 
          src={`https://wokwi.com/projects/${projectUrl}`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
          loading="lazy"
          style={{ border: 0 }}
        />
        <div className='overlay-header' />
      </div>
    </div>
  )
}

export default IoTSimLabFrame
