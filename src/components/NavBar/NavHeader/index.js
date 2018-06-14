// Dead simple component for the hello world (hi mom!)

import React from 'react';
import {observer} from 'mobx-react';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import img from 'imgs/BiazfanxmamNRoxxVxka.png';
import styles from './index.less';

function Nav() {
  const menu = (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        <span className={styles.text}>个人中心</span>
      </Menu.Item>
      <Menu.Item>
        <Icon type="setting" />
        <span className={styles.text}>系统设置</span>
      </Menu.Item>
      <Menu.Item>
        <Icon type="disconnect" />
        <span className={styles.text}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <ul className={styles.nav_box}>
      <li>
        <Dropdown overlay={menu} placement="bottomRight">
          <div>
            <span className={styles.img_box}>
              <img src={img} />
            </span>
            <span>Serati Ma</span>
          </div>
        </Dropdown>
      </li>
    </ul>
  );
}
export default observer(Nav);
