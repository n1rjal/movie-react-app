import React from 'react';

class Recommendations extends React.Component {

    state = {
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
        loaded: false,

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


    render() {
        let imgsrc = '';
        let overview = '';

        if (this.props.movie !== undefined) {
            imgsrc = this.props.movie.poster_path === undefined
                ? 'https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pink-geometric-movie-poster-background-image_162261.jpg'
                : `https://image.tmdb.org/t/p/w300${this.props.movie.poster_path}`;
            if (this.props.movie.overview !== undefined && this.props.movie.overview !== '') {
                overview = this.props.movie.overview.slice(0, 200);
            } else {
                overview = 'No overview provided';
            }
        }
        return (

            <div className="movie-card">
                <img className="poster" src={imgsrc} alt="photototo" />

                <div className="info">
                    <h1>
                        {this.props.movie.title}
                    </h1>

                    <p className="rdate">
                        - {this.props.movie.release_date}<br />
                        <span>
                            {this.getTags(
                                this.props.movie.genre_ids,
                            )}
                        </span>
                    </p>

                    <div>
                        <h2>OverView</h2>
                        <p>
                            {overview}....

                        </p>
                    </div>
                    <div className="inner-info">
                        <span>
                            {this.props.movie.original_language}
                        </span>
                        <span className="rate">
                            {this.props.movie.vote_average}
                        </span>
                        <span>
                            MV
                        </span>

                    </div>
                    <a className="clickme" href={`/${this.props.movie.id}`}>Click me</a>

                </div>
            </div >


        );
    }


}


export default Recommendations;
