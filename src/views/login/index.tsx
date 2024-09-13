import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Space, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUserInfo } from '@features/userInfoSlice';
import LoginQrcode from '@imgs/login_qrcode.jpg';
import req from '@utils/request';

import './index.less'; // 假设你有一个CSS文件来定义样式

const loginApiName = '/user/doLogin';

const Login = () => {
  const [validCode, setValidCode] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isAccountLogin, setIsAccountLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeCode = e => {
    setValidCode(e.target.value);
  };

  const getUserInfo = async loginId => {
    try {
      const response = await req({
        method: 'post',
        url: '/user/getUserInfo',
        data: { userName: loginId }
      }, '/auth');

      if (response.success && response.data) {
        dispatch(saveUserInfo(response.data));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const doLogin = () => {
    if (!validCode) return;

    req({
      method: 'get',
      url: loginApiName,
      params: { validCode }
    }, '/auth').then(async res => {
      if (res.success && res.data) {
        message.success('登录成功');
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        await getUserInfo(res.data.loginId);
        setTimeout(() => {
          navigate('/question-bank');
        }, 500);
      } else {
        message.error('登录失败，请重试');
      }
    });
  };

  /**
   * 使用账号和密码进行登录
   * @returns
   */
  const doLoginByAccount = async () => {
    if (!account || !password) return;
    const response = await req({
      method: 'post',
      url: loginApiName + "?validCode=#",
      data: { userName: account, password: password }
    }, '/auth');

    if (response.success && response.data) {
      message.success('登录成功');
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      await getUserInfo(response.data.loginId);
      setTimeout(() => {
        navigate('/questionBank');
      }, 500);
    } else {
      message.error('登录失败，请重试');
    }
  };

  return (
    <div className='login-box'>
      <div className='login-container-inner'>
        <div className='notes'></div>
        <div className='qrcode-box'>
          {!isAccountLogin && (
            <>
              <div className='qrcode-desc'>
                <p>首次登录须微信扫码关注公众号</p>
                <p>公众号发送 “验证码”开启IoT技术学习之路！</p>
              </div>
              <div className='qrcode-img'>
                <img src={LoginQrcode} alt='Login QR Code' />
              </div>
            </>
          )}
          {!isAccountLogin ? (
            <div className='qrcode-form'>
              <Space direction="vertical">
                <Input
                  maxLength={4}
                  placeholder='验证码'
                  onChange={changeCode}
                  value={validCode}
                />
                <Button size='small' type='primary' ghost onClick={doLogin}>
                  登录
                </Button>
              </Space>
              <div style={{ marginTop: 10 }}>
                <Button onClick={() => setIsAccountLogin(true)} type="link">
                  {'>>'}使用账号密码登录
                </Button>
              </div>
            </div>
          ) : (
            <Form layout="vertical">
              <div className='qrcode-desc'>
                <p>公众号验证码登录后前往个人中心</p>
                <p>设置密码后，即可使用账号密码登录</p>
              </div>
              <div style={{ marginTop: 30 }}>
                <Form.Item label="账号" required>
                  <Input value={account} onChange={e => setAccount(e.target.value)} />
                </Form.Item>
                <Form.Item label="密码" required>
                  <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>
              </div>
              <Space>
                <Button size='small' type='primary' ghost onClick={doLoginByAccount}>
                  登录
                </Button>
              </Space>
              <div style={{ marginTop: 10 }}>
                <Button onClick={() => setIsAccountLogin(false)} type="link">
                  {'>>'}切换到验证码登录
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
