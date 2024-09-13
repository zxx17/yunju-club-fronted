import { message } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.less'
// 顶部tab
const MENULIST = [
  {
    key: 'questionBank',
    title: '资源库',
    route: '/questionBank',
    finished: true
  },
  {
    key: 'prictiseQuestion',
    title: '理论练习',
    route: '/practiseQuestions',
    finished: true
  },
  {
    key: 'practiceQuestions',
    title: '交流圈子',
    route: '/yunjuClub',
    finished: true
  },
  {
    key: 'iotSimulationLab',
    title: '仿真实验室',
    route: '/iotSimulationLab',
    finished: true
  },
  {
    key: 'interList',
    title: '云端实验室',
    route: '/inter-list',
    finished: false
  }
]

// 顶部tab映射
const mapMenu = {
  '/questionBank': 'questionBank'
}

const TopMenu = () => {
  const [currentKey, setCurrentKey] = useState('questionBank')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const cur = MENULIST.filter(t => t.route === location.pathname)
    if (cur.length) {
      setCurrentKey(cur[0].key)
    } else {
      setCurrentKey('')
    }
  }, [location.pathname])

  /**
   * 切换item
   * @param {*} item
   * @returns
   */
  const changeMenu = item => () => {
    const userInfoStorage = localStorage.getItem('userInfo')
    if (!userInfoStorage) {
      return message.info('请登录')
    }
    if (item.finished) {
      if (location.pathname === item.route) return
      setCurrentKey(item.key)
      navigate(item.route)
    } else {
      return message.info('敬请期待')
    }
  }

  return (
    <div className='top-menu-list'>
      {MENULIST.map((item, index) => {
        return (
          <div
            className={`top-menu-item ${currentKey === item.key ? 'top-menu-item-active' : ''}`}
            key={item.key + index}
            onClick={changeMenu(item)}
          >
            <div className='top-menu-text'>{item.title}</div>
            <div
              className={`top-menu-line ${currentKey === item.key ? 'top-menu-line-active' : ''}`}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(TopMenu)
