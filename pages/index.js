/**
 * Created by eaTong on 2018/11/12 .
 * Description:
 */

import React, {Component} from 'react'
import Link from 'next/link'
import {Page} from "../website/components";

class IndexPage extends Component {
  render() {
    return (
      <div className={'index-page'}>
        <section className="hero  is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title ">
                不止程序员
              </h1>
              <h2 className="">
                永不停止，不只是一个程序员。
              </h2>
              <h3>
                Never stop , not only a programmer.
              </h3>
            </div>
          </div>
        </section>
        <section className="hero ">
          <div className="hero-body">
            <div className="container">
              <div className="media">
                <div className="media-content">

                  <h1 className="title ">
                    书香
                  </h1>
                  <h2 className="subtitle">
                    记住每一本书的温度，感受每一次的震动。
                  </h2>
                </div>
                <div className="media-left">
                  <a className="button is-primary" href={'/login'}>登录</a>
                </div>

              </div>
            </div>
          </div>
        </section>
        <section className="hero is-warning">
          <div className="hero-body">
            <div className="container">
              <h2 className="title ">
                书香-笔记
              </h2>
              <h3 className="subtitle">
                给自己的触动一个港湾。
              </h3>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Page(IndexPage);
