import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMovie = this.setMovie.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const movie = await movieAPI.getMovie(id);
    this.setMovie(movie);
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie);
    this.setState({ shouldRedirect: true });
  }

  setMovie(movie) {
    this.setState({
      movie,
      status: 'done',
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;

    if (status === 'loading') {
      return <Loading />;
    }
    return (
      shouldRedirect ? <Redirect to="/" />
        : (
          <div data-testid="edit-movie" className="edit-page">
            <div className="edit-form-card">
              <h1>Edit</h1>
              <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
            </div>
          </div>
        )
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default EditMovie;
