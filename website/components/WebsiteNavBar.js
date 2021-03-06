import React, {Component} from 'react';
import Link from 'next/link';
import ColorPicker from "./ColorPicker";

export default class WebsiteNavBar extends Component {
  state = {
    color: '#209CEE'
  };

  componentDidMount() {
    const color = window.localStorage.getItem('selected-color');
    if (color) {
      this.setState({color});
      window.replaceStyleVariable && window.replaceStyleVariable({main: color});
    }
  }

  onChangeColor(color) {
    this.setState({color});
    window.localStorage.setItem('selected-color', color);
    window.replaceStyleVariable && window.replaceStyleVariable({main: color});
  }

  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item" href="https://eatong.cn">
                <img src={require('../images/logo-eaTong.png')}/>
                <strong className={'has-text-primary'}>书香-得寸进尺</strong>
              </a>
            </Link>

          </div>
          <div className="navbar-menu">
            <Link href="/">
              <a className="navbar-item">
                首页
              </a>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
