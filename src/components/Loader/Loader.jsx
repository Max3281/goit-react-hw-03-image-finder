import React, { Component } from 'react';

class Loader extends Component {
  state = {
    page: 2,
  };

  pageIncrement = () => {
    const { page } = this.state;

    this.setState({ page: page + 1 });
    this.props.click({ page });
  };

  render() {
    return (
      <button
        type="button"
        className="load-more"
        onClick={this.pageIncrement}
        disabled={this.props.dis}
      >
        Load more
      </button>
    );
  }
}

export default Loader;
