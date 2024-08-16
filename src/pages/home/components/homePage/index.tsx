import React from 'react';
import HeaderPage from '../../../../components/header';
import styles from './index.less';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form, Input, message, Tooltip } from 'antd';
import axios from 'axios';
import '../../../../mock'

interface HomePageProps { }

const key = 'updatable';
const HomePage: React.FC<HomePageProps> = () => {
  const onFinish = async (values: any) => {
    message.loading({ content: '登录中...', key });

    try {
      const response = await axios.post('/api/login', {
        username: values.username,
        password: values.password
      });

      if (response.data.code === 200) {
        message.success({ content: '登录成功!', key, duration: 2 });
        setTimeout(() => {
          window.location.href = '/about.html'; // 登录成功后跳转
        }, 2000);
      } else {
        message.error({ content: '账号或密码错误', key, duration: 2 });
      }
    } catch (error) {
      message.error({ content: '登录失败，请重试', key, duration: 2 });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.homeContainer}>
      <HeaderPage />
      <div className={styles.contentWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.promoText}>
            <h1>新联络 让世界无界</h1>
            <p>一体化+智能化+国际化 智齿科技品牌战略升级</p>
          </div>
        </div>
        <div className={styles.rightSection}>
          <h2>登录智齿科技</h2>

          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '账号不能为空' }]}
            ><Tooltip placement="topLeft" title="账号：admin 密码：123456">
                <Input placeholder="请输入您的注册邮箱" />
              </Tooltip>
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '登录密码不能为空' }]}
            ><Tooltip placement="topLeft" title="账号：admin 密码：123456">
                <Input.Password placeholder="请输入您的登录密码" />
              </Tooltip>

            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>

            <div className={styles.options}>
              <Checkbox>记住账号</Checkbox>
              <a>忘记密码?</a>
            </div>

            <div className={styles.links}>
              <a>没有账号? 立即注册</a>
            </div>

            <div className={styles.otherLoginOptions}>
              <Button block>外呼机器人独立版登录</Button>
              <Button block>英文国际版登录</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

ReactDOM.render(<HomePage />, document.getElementById('root'));
