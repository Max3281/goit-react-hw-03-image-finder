import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    console.log(this.props.data);

    const { src, alt } = this.props.data;

    return (
      <div className="overlay" onClick={this.onOverlayClick}>
        <div className="modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
