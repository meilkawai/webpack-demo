import React from 'react';
import styles from './index.less';
import { Button } from 'antd';

interface HeaderPageProps {
  isShowButton?: boolean;
}

const HeaderPage: React.FC<HeaderPageProps> = (props) => {
  const { isShowButton } = props;
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>Test</div>
        <div className={styles.menu}>
          <ul>
            <li onClick={() => {
              window.location.href = '/index.html';
            }}>首页</li>
            <li>产品</li>
            <li>方案</li>
            <li>案例</li>
            <li>服务支持</li>
            <li>关于智齿</li>
            <li className={styles.dropdown}>
              内容中心
              <ul className={styles.dropdownMenu}>
                <li>博客</li>
                <li>报告</li>
                <li>图谱</li>
              </ul>
            </li>
          </ul>
        </div>
        {isShowButton ? null : <div className={styles.btn}>
          <Button type="primary" onClick={() => {
            window.location.href = '/about.html';
          }}>登录</Button>
          <Button>注册</Button>
        </div>}
      </div>
    </div>
  );
};

export default HeaderPage;
