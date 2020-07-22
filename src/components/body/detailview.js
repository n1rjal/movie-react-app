import React from 'react';
import Review from './reviews';
import Recommendations from './recomendations';

class DetailView extends React.Component {
    state = {
        api_key: 'bab9fceb21a5537965a06763798905f9',
        loaded: false,
        detail: {},
        recomendations: [],
        genres:
        {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Science Fiction',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western',
        },

    }


    getTags = (ids) => {
        let tags = '';
        let tag = '';
        if (ids !== undefined) {
            ids.forEach((id) => {
                tag = this.state.genres[id];
                if (tag !== undefined) {
                    tags = `${tags + tag} `;
                }
            });
        }

        return tags;
    }

    componentWillMount() {
        // for item info
        let url = '';

        const movieid = this.props.match.params.id;

        // for recomendation
        url = `https://api.themoviedb.org/3/movie/${movieid}/recommendations?api_key=${this.state.api_key}&language=en-US&page=1`;
        console.log(url);
        fetch(url)
            .then(resp => resp.json())
            .then((res) => {
                console.log(res);
                this.setState({ recomendations: res.results });
            });

        url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${this.state.api_key}&language=en-US&append_to_response=videos`;
        fetch(url)
            .then(resp => resp.json())
            .then((res) => {
                this.setState({ detail: res });
            });


        this.setState({
            loaded: true,
        });
    }

    render() {
        const postersrc = this.state.detail.poster_path === null
            ? 'https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pink-geometric-movie-poster-background-image_162261.jpg'
            : `https://image.tmdb.org/t/p/w300${this.state.detail.poster_path}`;

        const backdropsrc = this.state.detail.backdrop_path === null
            ? 'https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pink-geometric-movie-poster-background-image_162261.jpg'
            : `https://image.tmdb.org/t/p/w1280${this.state.detail.backdrop_path}`;

        let profit = 0;
        if (this.state.detail.revenue > 0 && this.state.detail.budget > 0) {
            profit = this.state.detail.revenue - this.state.detail.budget;
        }
        console.log(this.state.recomendations);
        if (this.state.loaded === true && this.state.detail.videos !== undefined && this.state.recomendations) {
            return (
                <div>
                    <div className="detail">
                        <img className="backdrop" src={backdropsrc} alt="backdrop" />
                        <div className="movie-intro">
                            <div className="profile">
                                <div>
                                    <img src={postersrc} alt="poster" className="poster" />

                                    <h1>
                                        {this.state.detail.original_title}
                                    </h1>
                                    <p>{() => this.getTags(this.state.detail.ids)}</p>
                                    <p>Rating : {this.state.detail.vote_average}/10
                                        of {this.state.detail.vote_count} votes</p>
                                    <p>Release Date : {this.state.detail.release_date}</p>
                                    <p>Runtime : {this.state.detail.runtime} mins</p>
                                    {this.state.detail.revenue > 0
                                        ? (<p>Renevue : {this.state.detail.revenue}$</p>)
                                        : ' '}
                                    {this.state.detail.budget > 0
                                        ? (<p>Budget : {this.state.detail.budget}$</p>)
                                        : ' '}
                                    {profit !== 0
                                        ? (<p>Profit : {profit}$</p>)
                                        : ' '}

                                    <p>Status : {this.state.detail.status}</p>
                                </div>
                            </div>

                            <div className="movie-main">
                                <div className="overview">
                                    <h3>Overview</h3>
                                    <blockquote>{this.state.detail.tagline}</blockquote>
                                    <p>{this.state.detail.overview}</p>
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />

                                <div >

                                    <div className="blackbg">
                                        <h3>Videos</h3>
                                        <div className="youtube-vids">
                                            {this.state.detail.videos.results.slice(0, 6).map(vid =>
                                                (
                                                    <iframe
                                                        width="400"
                                                        title={vid.name}
                                                        key={vid.id}
                                                        height="300"
                                                        src={`https://www.youtube.com/embed/${vid.key}`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen />
                                                ),
                                            )}

                                        </div>
                                    </div>

                                    <Review movieid={this.props.match.params.id} api_key={this.state.api_key} />


                                </div>
                            </div>
                        </div>

                    </div>
                    <h3>SIMILAR MOVIES</h3>
                    <div className="movie-holder mt-10">


                        {this.state.recomendations.map(movie =>
                            (<Recommendations
                                key={movie.id}
                                movie={movie}
                                api_key={this.state.api_key} />),
                        )}
                    </div>

                </div>
            );
        }
        return (<div>Loading</div>);
    }
}

export default DetailView;
