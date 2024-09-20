// TODO 有个bug，当1s隐藏之后球会消失
import React, { Component } from 'react'
import { Modal, Input, Button, List } from 'antd'
import req from '@utils/request' // 假设这是一个封装好的请求工具函数
import './index.less' // 假设这是样式文件路径

function getLastDataPart(str) {
  // 使用 "data:" 分割字符串，并过滤掉可能产生的空字符串
  var parts = str.split('data:').filter(Boolean)
  // 获取并返回最后一个元素
  return parts[parts.length - 1]
}

class SuspendButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oLeft: 0, // 初始左边距
      oTop: 200, // 初始上边距
      isHidden: false, // 是否靠边隐藏
      visible: false, // 对话框是否可见
      messages: [], // 消息列表
      inputMessage: '' // 输入框消息
    }
    this.$vm = null // 悬浮按钮
    this.moving = false // 是否正在移动
    this.oW = 0 // 悬钮相对点击点的水平距离
    this.oH = 0 // 悬钮相对点击点的垂直距离
    this.htmlWidth = 0 // 页面宽度
    this.htmlHeight = 0 // 页面高度
    this.bWidth = 0 // 悬钮宽度
    this.bHeight = 0 // 悬钮高度
    this.click = false // 是否是点击
    this.autoHideTimer = null // 自动隐藏定时器
  }

  startAutoHideTimer() {
    this.clearAutoHideTimer() // 清除已有定时器
    this.autoHideTimer = setTimeout(() => {
      this.setState({ isHidden: true })
    }, 90000000) // 1秒不操作后自动隐藏
  }

  clearAutoHideTimer() {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer)
      this.autoHideTimer = null
    }
  }

  onMouseEnter() {
    this.setState({ isHidden: false }) // 鼠标移上时显示按钮
    this.clearAutoHideTimer() // 停止自动吸附
  }

  onMouseLeave() {
    this.startAutoHideTimer() // 鼠标移开后重新启动5秒计时
  }

  onMouseDown(e) {
    this.clearAutoHideTimer() // 用户操作时，取消定时器
    this.click = true
    this.oW = e.clientX - this.$vm.getBoundingClientRect().left
    this.oH = e.clientY - this.$vm.getBoundingClientRect().top
    this.htmlWidth = document.documentElement.clientWidth
    this.htmlHeight = document.documentElement.clientHeight
    this.bWidth = this.$vm.offsetWidth
    this.bHeight = this.$vm.offsetHeight

    this.setState({
      oLeft: e.clientX - this.oW,
      oTop: e.clientY - this.oH
    })

    this.moving = true
  }

  onMouseMove(e) {
    if (this.moving) {
      e.preventDefault()
      let oLeft = e.clientX - this.oW
      let oTop = e.clientY - this.oH

      if (oLeft < 0) oLeft = 0
      if (oLeft > this.htmlWidth - this.bWidth) oLeft = this.htmlWidth - this.bWidth
      if (oTop < 0) oTop = 0
      if (oTop > this.htmlHeight - this.bHeight) oTop = this.htmlHeight - this.bHeight

      this.setState({
        oLeft,
        oTop
      })
    }
  }

  onMouseUp() {
    if (this.moving) {
      this.moving = false
      let oLeft = this.state.oLeft
      if (oLeft < (this.htmlWidth - this.bWidth) / 2) {
        oLeft = 0 // 吸附到左边
      } else {
        oLeft = this.htmlWidth - this.bWidth // 吸附到右边
      }

      this.setState({
        oLeft
      })

      if (this.click && this.props.onClick) {
        this.props.onClick()
      }

      this.startAutoHideTimer() // 拖动结束后启动1秒计时
    }
    // 确保点击不会导致悬浮按钮消失
    this.setState({ isHidden: false })
  }

  openDialog = () => {
    this.setState({ visible: true })
  }

  closeDialog = () => {
    // 修改这里，确保按钮不隐藏
    this.setState({ visible: false })
  }

  handleInputChange = e => {
    this.setState({ inputMessage: e.target.value })
  }

  sendMessage = async () => {
    const { inputMessage, messages } = this.state
    if (!inputMessage.trim()) return

    // 添加用户消息
    const userMessage = { role: 'user', content: inputMessage }
    this.setState({
      messages: [...messages, userMessage],
      inputMessage: ''
    })

    // 调用后端 GPT 接口获取回复
    const response = await this.fetchGPTResponse(inputMessage)

    // 添加 GPT 回复消息
    const gptMessage = { role: 'gpt', content: response }
    this.setState({
      messages: [...this.state.messages, gptMessage]
    })
  }

  fetchGPTResponse = async message => {
    const response = await req(
      {
        method: 'post',
        url: '/aiModel/send',
        data: JSON.stringify({ context: message, useHistoryData: false })
      },
      '/ai'
    )

    // 模拟后端返回消息
    return getLastDataPart(response)
  }

  render() {
    const { img, style } = this.props
    const { oLeft, oTop, isHidden, visible, messages, inputMessage } = this.state

    const buttonStyle = {
      position: 'fixed',
      left: isHidden
        ? oLeft === 0
          ? '-3rem'
          : `${this.htmlWidth - this.bWidth + 3}rem`
        : `${oLeft}px`,
      top: `${oTop}px`,
      ...style
    }

    return (
      <>
        <span
          className='t-suspend-button'
          ref={vm => (this.$vm = vm)}
          onMouseDown={e => this.onMouseDown(e)}
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
          style={buttonStyle}
          onClick={this.openDialog}
        >
          {img ? <img src={img} alt='' /> : this.props.children}
        </span>

        {/* 对话框 */}
        <Modal
          width={1300}
          title='AI学习助手'
          visible={visible}
          onCancel={this.closeDialog}
          footer={null}
        >
          {/* 消息列表 */}
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item
                style={{
                  justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    background: item.role === 'user' ? '#1890ff' : '#52c41a',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '10px',
                    maxWidth: '60%',
                    wordBreak: 'break-word'
                  }}
                >
                  {item.content}
                </div>
              </List.Item>
            )}
          />

          {/* 输入框和发送按钮 */}
          <Input
            value={inputMessage}
            onChange={this.handleInputChange}
            onPressEnter={this.sendMessage}
            placeholder='请输入您的问题'
            style={{ marginTop: 10 }}
          />
          <Button type='primary' onClick={this.sendMessage} style={{ marginTop: 10 }}>
            发送
          </Button>
        </Modal>
      </>
    )
  }
}

export default SuspendButton
