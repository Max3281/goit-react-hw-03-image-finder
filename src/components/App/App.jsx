import { Oval } from 'react-loader-spinner';
import React, { Component } from 'react';

import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

class App extends Component {
  state = {
    data: [],
    query: '',
    page: 1,
    modalData: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      try {
        const fetchQuery = await fetch(
          `https://pixabay.com/api/?key=34283172-0b08d30ba6284ca73fa07bc1d&q=${this.state.query}&image_type=photo&page=${this.state.page}&per_page=12`
        );

        const parseQuery = fetchQuery.json();
        parseQuery
          .then(({ hits }) => {
            this.setState(state => ({
              data: [...state.data, ...hits],
              status: 'resolve',
            }));
          })
          .catch(error => console.log(error));
      } catch (error) {
        console.log(error);
      }
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

    this.reset();
  };

  pageIncrement = () => {
    this.setState(val => {
      return { page: val.page + 1 };
    });
  };

  reset = () => {
    this.setState({ data: [], page: 1 });
  };

  getModalData = () => {
    this.setState({
      modalData: null,
    });
  };

  receiveImage = e => {
    const { data } = this.state;

    if (e.target.nodeName !== 'IMG') {
      return;
    }

    const fil = data.filter(i => i.webformatURL === e.target.src);

    this.setState({
      modalData: {
        src: fil[0].largeImageURL,
        alt: fil[0].tags,
      },
    });

    console.log(this.state.modalData);
  };

  render() {
    const { modalData, status, data } = this.state;

    return (
      <div className="container">
        <SearchBar submit={this.receiveSubmit} />

        {status === 'resolve' || status === 'pending' ? (
          <ImageGallery data={data} onClick={this.receiveImage} />
        ) : null}

        {status === 'pending' ? (
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
        ) : null}

        {status === 'resolve' && data.length >= 12 ? (
          <Loader onClick={this.pageIncrement} />
        ) : null}

        {modalData && <Modal data={modalData} onClose={this.getModalData} />}
      </div>
    );
  }
}

export default App;

// const status = {
//   mount: 'MNT',
//   fetch: 'F',
//   pending: 'P',
//   load: 'L',
//   modal: 'MDL',
// };
