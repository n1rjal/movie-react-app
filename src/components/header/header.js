import React from 'react';
import SearchBar from './searchbar';
import Card from '../body/moviecard';

class Header extends React.Component {
    state = {
        loaded: false,
        result: {},
        api_key: 'bab9fceb21a5537965a06763798905f9',
    };

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${this.state.api_key}`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => this.setState({ result: data, loaded: true }));
    }

    changeLoaded = (pass) => {
        if (pass === true) {
            this.setState({ loaded: false });
        }
        if (pass === false) {
            this.setState({ loaded: true });
        }
    }

    render() {
        console.log(this.state);
        return (<div>
            <div>
                <SearchBar api_key={this.state.api_key} changeLoaded={this.changeLoaded} />
            </div>
            {this.state.loaded === true
                ? (
                    <div className="movie-trend-holder">
                        <h3>Trending</h3>
                        <div className="movie-trend-container">

                            {this.state.result.results.slice(0, 9).map(
                                movie => <Card key={movie.id} movie={movie} />,
                            )}
                        </div>
                    </div>
                )
                : 'Loading......'}
            <div />

        </div>
        );
    }
}

export default Header;
