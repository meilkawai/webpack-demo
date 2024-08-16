import React, { useEffect,useState } from 'react';
import { useNavigate, useLocation, Routes, Route,Outlet } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './index.less';
import TableComponent from '../table';
import CalendarComponent from '../calendar';
import HeaderPage from '../../../../components/header';
import ShowImage from '../showImage';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('选择项1', 'sub1', <MailOutlined />, [
        getItem('项目1', 'g1', null, [getItem('信息表', '/about/table'), getItem('日历', '/about/calendar')], 'group'),
        getItem('项目2', 'g2', null, [getItem('展示图片', '/about/showImage'), getItem('子选择项 4', '4')], 'group'),
    ]),
    // 其他项略
];

export default function AboutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    useEffect(() => {
        setSelectedKeys([location.pathname]);
      }, [location.pathname]);
    const onClick: MenuProps['onClick'] = e => {
        navigate(e.key);
    };

    return (
        <div className={styles.aboutContainer}>
            <HeaderPage isShowButton={true} />
            <ShowImage />
            <div className={styles.menuContainer}>
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    selectedKeys={selectedKeys}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className={styles.contentContainer}>
                <Outlet/>
            </div>
        </div>
    );
}