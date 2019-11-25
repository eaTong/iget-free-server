/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */
/**
 * Created by 7wingsfish on 2016/4/1.
 */
import React from 'react';
import {Icon, Button} from "antd";

const ButtonGroup = Button.Group;

class HomePage extends React.Component {
  state = {
    pictures: [],
    previewIndex: -1,
    previewImage: false,
    scaleValue: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
  };

  componentDidMount() {
    window.previewImage = this.previewImage.bind(this);
  }

  previewImage(previewIndex, pictures) {
    pictures = pictures ? pictures : this.state.pictures;
    const originVisible = this.state.previewImage;
    this.setState({
      previewIndex,
      pictures,
      previewImage: true,
      scaleValue: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0
    }, () => {
      if (!originVisible) {
        this.mouseMoving = this.mouseMoving.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.onMouseScroll = this.onMouseScroll.bind(this);

        this.previewContainer.addEventListener("mousewheel", this.onMouseScroll, true);
        this.previewContainer.addEventListener("DOMMouseScroll", this.onMouseScroll, true);

        this.imageInstance.addEventListener("mousedown", this.startDrag, true);
      }
    });


  }

  startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    this.startX = event.clientX - this.state.translateX;
    this.startY = event.clientY - this.state.translateY;

    this.imageInstance.addEventListener('mousemove', this.mouseMoving, true);
    this.imageInstance.addEventListener('mouseup', this.endDrag, true);
  }

  mouseMoving(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      translateX: event.clientX - this.startX,
      translateY: event.clientY - this.startY
    });
  }

  endDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    this.imageInstance.removeEventListener('mousemove', this.mouseMoving, true);
    this.imageInstance.removeEventListener('mouseup', this.endDrag, true);
  }

  onMouseScroll({deltaY}) {
    if (deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    this.setState({scaleValue: Math.min(this.state.scaleValue + 0.1, 2)})
  }

  zoomOut() {
    this.setState({scaleValue: Math.max(this.state.scaleValue - 0.1, 0.5)})
  }

  rotate() {
    this.setState({rotate: this.state.rotate === 360 ? 90 : (this.state.rotate + 90)})
  }

  rotateReverse() {
    this.setState({rotate: this.state.rotate - 90})
  }

  hidePreview() {
    this.previewContainer.removeEventListener("mousewheel", this.onMouseScroll, true);
    this.previewContainer.removeEventListener("DOMMouseScroll", this.onMouseScroll, true);
    this.setState({previewImage: false, pictures: []});
  }

  last() {
    const {previewIndex} = this.state;
    if (previewIndex > 0) {
      this.previewImage(previewIndex - 1);
    }
  }

  next() {
    const {previewIndex, pictures} = this.state;
    if (previewIndex < pictures.length - 1) {
      this.previewImage((previewIndex + 1));
    }
  }

  renderPreviewImage() {
    const {previewImage, previewIndex, pictures, scaleValue, translateX, translateY, rotate} = this.state;

    const imageTransform = {
      transform: `scale(${scaleValue}) rotate(${rotate}deg) `,
      top: `${translateY}px`,
      left: `${translateX}px`
    };
    return (
      <div className="et-pictures-preview-container"
           ref={(previewContainer) => this.previewContainer = previewContainer}>
        <div className="shadow"/>

        <Icon type='close' className='close-button' onClick={() => this.hidePreview()}/>

        <div
          className={`navigator-icon left ${previewIndex === 0 ? 'disabled' : ''}`}
          onClick={(event) => this.last(event)}
        >
          <Icon type='left'/>
        </div>
        <div
          className={`navigator-icon right ${previewIndex === pictures.length - 1 ? 'disabled' : ''}`}
          onClick={(event) => this.next(event)}
        >
          <Icon type='right'/>
        </div>
        <div className="preview-container">

          <div className="image-container">
            <img
              src={pictures[previewIndex]}
              alt=""
              style={imageTransform}
              draggable={false}
              ref={(imageInstance) => this.imageInstance = imageInstance}
            />
          </div>

          <div className="toolbar-line">

            <ButtonGroup>
              <Button icon='left' onClick={() => this.last()} disabled={previewIndex === 0}/>
              <Button icon='reload' onClick={() => this.rotate()}/>
              <Button icon='reload' className='reverse' onClick={() => this.rotateReverse()}/>
              <span className="progress">{`${previewIndex + 1}/${pictures.length}`}</span>
              <Button icon='zoom-in' onClick={() => this.zoomIn()}/>
              <Button icon='zoom-out' onClick={() => this.zoomOut()}/>
              <Button icon='right' onClick={() => this.next()} disabled={previewIndex === pictures.length - 1}/>
            </ButtonGroup>

          </div>
        </div>

      </div>
    )
  }

  render() {
    const {previewImage} = this.state;
    if (previewImage) {
      return this.renderPreviewImage();
    }
    return <div className={'home-page'}/>
  }
}

export default HomePage;
