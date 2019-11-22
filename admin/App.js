/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
import React, {Component, Fragment} from 'react';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AdminLayout from './components/AdminLayout';
import {Provider} from 'mobx-react';
import '~/utils/prototype';
import stores from '~/stores';
import componentsMapping from "./componentsMapping";

import './styles/app.less';
import './styles/components.less';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/login/LoginPage';

function renderRoutes() {
  const routes = [];
  for (const key of Object.keys(componentsMapping)) {
    routes.push(<Route path={key} key={key} component={componentsMapping[key]}/>);
  }
  return routes;
}

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider {...stores}>
          <BrowserRouter>
            <Fragment>
              <Route path="/" component={HomePage} exact/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/admin" render={(props) => {
                const Component = componentsMapping[props.location.pathname];
                return <AdminLayout {...props}><Component {...props}/></AdminLayout>
              }}/>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    )
  }
}
