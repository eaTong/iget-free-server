/**
 * Created by eatong on 2020/1/31.
 */


import React, {Component} from 'react';
import {Page} from "../website/components";

class Download extends Component {
  state = {insideWechat: false};

  componentDidMount() {
    this.setState({insideWechat: /MicroMessenger/i.test(navigator.userAgent)}, () => this.download());
  }

  download() {

    var ua = navigator.userAgent.toLowerCase();
    if (/MicroMessenger/i.test(ua)) {
      const iOSLink = 'https://apps.apple.com/cn/app/%E4%B9%A6%E9%A6%99-%E5%BE%97%E5%AF%B8%E8%BF%9B%E5%B0%BA/id1493162230?from=singlemessage';
      const androidLink = 'https://iget.eatong.cn/app-release.apk';

      function checkIsAndroid() {
        const ua = navigator.userAgent.toLowerCase();
        return /android/.test(ua);
      }
      window.open(checkIsAndroid() ? androidLink : iOSLink);
    }


  }

  render() {
    const {insideWechat} = this.state;
    return (
      <div className="download-page">
        {insideWechat && (
          <img src={require('../website/images/open-in-browser.png')} className={'open-in-browser'}/>
        )}
        <div className="container content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                专注个人精进，助你「得寸进尺」
              </div>
            </div>
            <div className="card-content">
              <p><b>"管他什么真理无穷，进一寸有进一寸的欢喜"</b>，APP取名灵感来源于这句名言，我们都是凡人，没法跟无穷的真理抗衡，但是我们"进一寸有进一寸的欢喜"</p>
              <p>致力于打造一个帮助个人成长的APP，主打个人成长工具，希望每一个用这个APP的人可以见证自己的成长，见证自己的追寻真理的路上，每天都能够<b>得寸进尺</b>。</p>
            </div>
          </div>

          <p className="button is-primary is-fullwidth" onClick={() => this.download()}>立即下载</p>
        </div>

      </div>
    )
  }
}

export default Page(Download)
