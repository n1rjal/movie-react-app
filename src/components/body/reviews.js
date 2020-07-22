import React from 'react';

class Review extends React.Component {
    state = {
        reviews: [],
    }
    componentWillMount() {
        // for reviews
        const url = `https://api.themoviedb.org/3/movie/${this.props.movieid}/reviews?api_key=${this.props.api_key}&language=en-US&page=1`;
        fetch(url)
            .then(resp => resp.json())
            .then((res) => {
                this.setState({ reviews: res.results });
            });
    }
    render() {
        if (this.state.reviews) {
            return (
                <div className="review-container">
                    {this.state.reviews.map(review => (
                        <div key={review.id} className="review" >
                            <p>
                                {review.content}
                            </p>
                            <span> - {review.author}</span>

                        </div>
                    ))}
                </div>
            );
        }
        return ('  ');
    }
}

export default Review;
