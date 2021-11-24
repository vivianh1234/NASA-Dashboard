"use strict";
class RoverControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY",
            photos: [],
            photoToDisplay: {}
        };
    }

    componentDidMount(){
        fetch(this.state.url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({photos: data.photos});
                console.log(this.state.photos);
                this.setState({photoToDisplay: this.state.photos[0]});
            })
            .catch((error) => console.log(error));
    }

    render(){
        return React.createElement(
            'button',
            { className: "btn btn-light", onClick: () => {
                ReactDOM.render(React.createElement(RoverImage, {url: this.state.photoToDisplay.img_src}), document.querySelector("#rover-image"));
            }},
            'Switch Rover Image'
        );
    }
}

class RoverImage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return React.createElement(
            'img',
            {src: `${this.props.url}`, alt: 'Mars Rover Image', className: 'img-fluid'},
            null
        );
    }
}

ReactDOM.render(React.createElement(RoverControl), document.querySelector("#rover-control"));