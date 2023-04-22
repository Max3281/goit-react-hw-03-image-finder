import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    inputQuery: '',
  };

  handleChange = e => {
    this.setState({
      inputQuery: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { inputQuery } = this.state;

    if (inputQuery !== '') {
      this.props.submit({ query: inputQuery });
      return;
    }

    alert('Enter a search query');
  };

  render() {
    return (
      <header className="searchbar">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <button type="submit" className="search-form__button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="search-form__input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
