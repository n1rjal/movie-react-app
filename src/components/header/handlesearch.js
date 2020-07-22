import React from 'react';
import Card from '../body/moviecard';

class HandleSearch extends React.Component {

    state = {
        results: {},
        language: 'en-US',
        gotResult: false,
        api_key: 'bab9fceb21a5537965a06763798905f9',
    };


    componentDidMount() {
        console.log(this.props);
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${this.state.api_key}&language=${this.state.language}&query=${this.props.match.params.query}&page=${this.props.match.params.page}`;
        fetch(url)
            .then(resp => resp.json())
            .then((response) => {
                this.setState({ results: response, gotResult: true });
            });
    }

    render() {
        console.log('handling');
        return (
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


            </div>);
    }
}

export default HandleSearch;
