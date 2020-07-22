import React from 'react';
import Card from '../body/moviecard';

class SearchBar extends React.Component {
    state = {
        query: '',
        results: {},
        language: 'en-US',
        include_adult: false,
        gotResult: false,
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        if (event.target.value.length === 0) {
            this.setState({ gotResult: false });
            this.props.changeLoaded(false);
        }
    };

    searchSubmit = (event) => {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${this.props.api_key}&language=${this.state.language}&query=${this.state.query}`;
        event.preventDefault();
        console.log(url);
        this.props.changeLoaded(true);
        fetch(url)
            .then(resp => resp.json())
            .then((response) => {
                this.setState({ results: response, gotResult: true });
            });
    };

    render() {
        return (
            <div className="">
                <form className="search" onSubmit={this.searchSubmit}>
                    <input
                        minLength="2"
                        required
                        placeholder="Enter your fav movie"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleChange}
                        name="query" />
                    <input type="submit" name="query" />
                </form>
                <div>
                    {(this.state.gotResult === true)
                        ? (
                            <div>
                                <p>Page {this.state.results.page} of {this.state.results.total_pages}</p>
                                <br />
                                <div className="movie-holder">
                                    {this.state.results.results.map(movie =>
                                        <Card key={movie.id.toString()} movie={movie} />)}
                                </div>
                            </div>

                        )
                        : 'Please enter a movie name'
                    }


                </div>
            </div>

        );
    }
}

export default SearchBar;
