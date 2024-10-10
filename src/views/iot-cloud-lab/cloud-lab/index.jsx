import { useEffect, useState } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, Progress, Modal, Form, Input, Button, Steps, Carousel } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'; // 导入图标
import './index.less';

const { Sider, Content } = Layout;
const { Text } = Typography;
const { Step } = Steps;

// 模拟菜单数据
const mockMenuItems = [
  {
    key: 'current',
    label: '电流检测实验',
  },
  {
    key: 'upcoming',
    label: '敬请期待',
  },
];

const IoTCloudLabPage = () => {
  const [menuItems, setMenuItems] = useState([]); // 菜单
  const [selectedKey, setSelectedKey] = useState('current'); // 菜单选择
  const [currentData, setCurrentData] = useState(0); // 电流数据
  const [isModalVisible, setIsModalVisible] = useState(false); // 环境参数表单
  const [isConnected, setIsConnected] = useState(false); // 设备连接状态，初始为已连接

  // 初始化
  useEffect(() => {
    // 初始化菜单数据
    const fetchMenuItems = () => {
      setMenuItems(mockMenuItems);
    };
    fetchMenuItems();
  }, []);

  // 切换实验菜单点击方法
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  // 环境参数表单
  const handleModalOpen = () => {
    setIsModalVisible(true); // Open modal
  };
  
  const handleModalClose = () => {
    setIsModalVisible(false); // Close modal
  };
  
  const handleSubmit = (values) => {
    console.log('Received values:', values); // Handle form submission
    handleModalClose(); // Close modal after submit
  };

  // 跳转到阿里云物联网平台
  const handleGoToAliyunIOT = () => {
    window.open('https://www.aliyun.com/product/iot/iot_instc_public_cn', '_blank');
  }

  // 发送通知按钮点击事件
  const handleSendNotification = () => {
    console.log('通知设备当前电流符合要求，发送数据...');
  };

  // 右侧页面内容
  const renderContent = () => {
    switch (selectedKey) {
      case 'current':
        return (
          <Row gutter={16} style={{ padding: '24px', marginLeft: '0', marginRight: '0' }}>
            {/* Top Row */}
            <Col span={12}>
              <Card title="视频教程" bordered={false} style={{ height: '100%' }}>
                <Carousel autoplay>
                  <div>
                    <video width="100%" controls>
                      <source src="https://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/d/ud/362468186312.mp4" type="video/mp4" />
                      您的浏览器不支持视频标签。
                    </video>
                  </div>
                  <div>
                    <video width="100%" controls>
                      <source src="https://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/d/ud/361406080584.mp4" type="video/mp4" />
                      您的浏览器不支持视频标签。
                    </video>
                  </div>
                </Carousel>
                
              </Card>
            </Col>
            <Col span={12}>
              <Card title="实验描述" bordered={false} style={{ height: '100%' }}>
                <p>你有一个设备，需要保证其输入电流≥85mA，当电流符合要求时，可以点击发送按钮给设备发送数据，通知设备可以进行下一步操作。</p>
                <br/>
                <p>你需要借助阿里云物联网平台将电流传感器的电流数据上传，再通过本平台接收(首次实验需要填写环境参数)，实现平台对电流数据的监测。完成此实验你将体验到借助云平台进行软硬结合开发的流程。</p>
              </Card>
            </Col>

            {/* Bottom Row */}
            <Col span={12} style={{ marginTop: 40 }}>
              <Card title="设备连接状态" bordered={false} style={{ height: '100%' }}>
                <Row align="middle">
                  <Col span={6}>
                    {isConnected ? (
                      <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: 'red', fontSize: '24px' }} />
                    )}
                  </Col>
                  <Col span={18}>
                    <Text>设备连接状态：{isConnected ? '已连接' : '未连接'}</Text>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12} style={{ marginTop: 40 }}>
              <Card title="接收到的数据" bordered={false} style={{ height: '100%' }}>
                <p>当前电流：{currentData} mA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预期电流：≥85mA</p>
                <Progress 
                  percent={currentData >= 100 ? 100 : (currentData / 100) * 100} // Ensure 100% for exactly 100 mA
                  status={currentData >= 85 ? 'normal' : 'exception'} // Red if < 85
                  strokeColor={currentData >= 85 ? `rgba(0, 255, 0, ${(100 + currentData) / 100})` : `rgba(255, 0, 0, ${(100 - currentData) / 100})`} // Color based on current value
                />
                <Button 
                  type="primary" 
                  disabled={currentData < 85} // Disable button if current < 85 mA
                  onClick={handleSendNotification}
                  style={{ marginTop: 20 }}
                >
                  发送通知
                </Button>
              </Card>
            </Col>

            {/* click */}
            <Col span={24} style={{ marginTop: 10, textAlign: 'left' }}>
              <Button type="link" onClick={handleGoToAliyunIOT}>
                {'>>>>>'}点击这里前往阿里云物联网平台
              </Button>
              <Button type="link" onClick={handleModalOpen}>
                {'>>>>>'}设置环境参数连接设备并接收数据
              </Button>
            </Col>
          </Row>
        );
      case 'upcoming':
        return (
          <div>
            <p>正在努力开发中......</p>
          </div>
        );
      default:
        return <div>请选择一个实验。</div>;
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        style={{
          background: '#fff',
          width: 200,
          overflow: 'auto',
        }}
      >
        <Menu
          style={{
            width: '100%',
          }}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={menuItems.map(item => ({
            ...item,
            onClick: handleMenuClick,
          }))}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: '0', // Resetting padding for consistency with Row's padding
            margin: 0,
            overflow: 'auto',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 横向流程图 */}
            <Steps
              direction="horizontal"
              size="small"
              current={-1}
              style={{ margin: '20px 0'}}
            >
              <Step title="查看教程" />
              <Step title="平台实践" />
              <Step title="数据上云" />
              <Step title="消费数据" />
              <Step title="数据交互" />
            </Steps>
            {renderContent()}
          </div>
        </Content>
      </Layout>

      {/* Modal for form submission */}
      <Modal
  title="环境参数"
  visible={isModalVisible}
  onCancel={handleModalClose}
  footer={null} // No footer for now
>
  <Form
    onFinish={handleSubmit}
    labelCol={{ span: 7 }} // 控制label对齐的宽度
    wrapperCol={{ span: 15 }} // 控制输入框的宽度
  >
   <Form.Item
      label="host"
      name="host"
      rules={[{ required: true, message: '请输入您的host!' }]}
      extra="请输入IoT实例的连接地址"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="accessKey"
      name="accessKey"
      rules={[{ required: true, message: '请输入您的accessKey!' }]}
      extra="此accessKey用于设备接入的身份验证"
    >
      <Input />
    </Form.Item>
    
    <Form.Item
      label="accessSecret"
      name="accessSecret"
      rules={[{ required: true, message: '请输入您的accessSecret!' }]}
      extra="请确保您的accessSecret安全，不要随意透露"
    >
      <Input />
    </Form.Item>
    
    <Form.Item
      label="consumerGroupId"
      name="consumerGroupId"
      initialValue="DEFAULT_GROUP" 
      rules={[{ required: true, message: '请输入您的consumerGroupId!' }]}
      extra="consumerGroupId用于标识设备的消费组"
    >
      <Input/>
    </Form.Item>
    
    <Form.Item
      label="iotInstanceId"
      name="iotInstanceId"
      rules={[{ required: true, message: '请输入您的iotInstanceId!' }]}
      extra="这是IoT实例的唯一标识"
    >
      <Input />
    </Form.Item>
    
    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form.Item>
  </Form>
</Modal>

    </Layout>
  );
};

export default IoTCloudLabPage;
