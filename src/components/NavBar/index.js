import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import NavHeader from './NavHeader';
import 'antd/lib/layout/style';
import styles from './index.less';
// import { parse } from 'query-string';
const { Header, Sider, Content } = Layout;
import { withRouter } from 'react-router-dom';
// import App from '../../containers/app';


class NavBar extends Component {
  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object
  };
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const pathname = this.props.location.pathname;
    return (
      <Layout className={styles.layout}>
        <Sider trigger={null} collapsible style={{ background: '#fff' }} collapsed={this.state.collapsed}>
          <div className={styles.logo}></div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname]} style={{ height: '100%' }}>
            <Menu.Item key="/home">
              <Link to="/home">
                <Icon type="video-camera" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/article_list">
              <Link to="/article_list">
                <Icon type="profile" />
                <span>文章列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/article">
              <Link to="/article">
                <Icon type="form" />
                <span>新增文章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/artifact">
              <Link to="/artifact">
                <Icon type="rocket" />
                <span>装逼神器</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/artifact_list">
              <Link to="/artifact_list">
                <Icon type="profile" />
                <span>神器列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/font_list">
              <Link to="/font_list">
                <Icon type="profile" />
                <span>字体列表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <NavHeader />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(NavBar);
