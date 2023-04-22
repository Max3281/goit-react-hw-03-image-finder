import { Oval } from 'react-loader-spinner';
import React, { Component } from 'react';

import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    data: null,
    query: '',
    page: 1,
    showModal: false,
    fetchLoading: false,
  };

  // async componentDidMount() {
  //   const fetchQuery = await fetch(
  //     `https://pixabay.com/api/?key=34283172-0b08d30ba6284ca73fa07bc1d&&image_type=photo&per_page=12`
  //   );
  //   const parseQuery = fetchQuery.json();
  //   parseQuery.then(({ hits }) => {
  //     this.setState({ data: hits });
  //   });
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const fetchQuery = await fetch(
        `https://pixabay.com/api/?key=34283172-0b08d30ba6284ca73fa07bc1d&q=${this.state.query}&image_type=photo&page=${this.state.page}&per_page=12`
      );
      const parseQuery = fetchQuery.json();
      parseQuery
        .then(({ hits }) => {
          this.setState(state => ({ data: [...state.data, ...hits] }));
        })
        .finally(e => {
          this.toggleLoading();
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  toggleLoading = () => {
    this.setState(({ fetchLoading }) => ({
      fetchLoading: !fetchLoading,
    }));
  };

  receiveSubmit = ({ query }) => {
    this.setState({ query });
    this.toggleLoading();
    this.reset();
  };

  receivePage = ({ page }) => {
    this.setState({ page });
    this.toggleLoading();
  };

  reset = () => {
    this.setState({ data: [], page: 1 });
  };

  render() {
    const { fetchLoading, data, showModal } = this.state;

    return (
      <div className="container">
        <SearchBar submit={this.receiveSubmit} />

        {data && <ImageGallery data={data} />}

        {fetchLoading && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}

        {data && <Loader click={this.receivePage} dis={fetchLoading} />}

        {showModal && <Modal data={data} />}
      </div>
    );
  }
}

export default App;
