/**
 * Created by eaTong on 2018/11/25 .
 * Description:
 */
import axios from 'axios';
import {message, notification} from 'antd';
import {LogicalError} from '~/utils/errors'
import store from '~/stores';

message.config({maxCount: 1, top: 28});

export default function ajax(config) {
  return new Promise(resolve => {
    const {url, data, headers} = config;

    let result;
    store.app.ajaxStart(url);
    const hideLoading = message.loading(config.loadingText || 'loading...', 0);
    axios.post(url, data, {headers: headers}).then(result => {
      hideLoading();
      if (!result.data.success) {
        notification.warning({message: result.data.message});
        throw new LogicalError(result);
      }
      store.app.ajaxEnd(url);
      resolve(JSON.parse(JSON.stringify(result.data.data || {}).replace(/:null/g, ':""')));
    }).catch(ex => {
      hideLoading();
      if (ex instanceof LogicalError) {
        throw new LogicalError(ex);
      } else {

        store.app.ajaxEnd(url);
        const status = ex.response.status;
        if (status === 401) {
          window.localStorage.setItem('lastUrl', window.location.pathname);
          window.location.href = '/login'
        }

        notification.error({message: ex.response.data.message || ex.message});
        return {success: false, data: {}, message: ex.response.data.message}
      }
    });
  });

};
