/**
 * Created by eatong on 18-10-8.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';

class Pictures extends Component {
  state = {
    pictureErrorIndex: [],
    preview: false,
    previewIndex: -1
  };

  previewImage(index, event) {
    event && event.stopPropagation();
    window.previewImage(index, this.props.pictures);
  }

  renderChildren() {
    const pictures = this.props.pictures || [];
    const {renderChildren, childrenAsNumber, additionalItemRender, text} = this.props;
    if (childrenAsNumber) {
      if (childrenAsNumber === 'text') {
        return (
          <div onClick={() => pictures.length > 0 && this.previewImage(0)} className="childrenAs-number-content">
            <span>{text}</span>
          </div>
        );
      } else {
        return (
          <div onClick={() => pictures.length > 0 && this.previewImage(0)}
               className="childrenAs-number-content">
            <Icon type={'picture'}/>
            <span>{`X${pictures.length}`}</span>
          </div>
        );
      }
    } else if (renderChildren) {
      return renderChildren({previewImage: (index) => this.previewImage(index), pictures})
    } else {
      return pictures.map((pic, index) => {
        return (
          <div className="et-picture-item" key={pic}>
            <div
              className="img-box"
              onClick={(event) => this.previewImage(index, event)}
              style={{background: `url(${pic})no-repeat center center `, backgroundSize: 'cover'}}
            />
            {additionalItemRender && additionalItemRender(pic, index)}
          </div>
        )
      })
    }
  }

  render() {
    const {video} = this.props;
    return (
      <div className="et-pictures-container">
        {this.renderChildren()}
      </div>
    )
  }

}

Pictures.propTypes = {
  pictures: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  video: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderChildren: PropTypes.func,
  additionalItemRender: PropTypes.func,
  childrenAsNumber: PropTypes.bool
};

export default Pictures;
