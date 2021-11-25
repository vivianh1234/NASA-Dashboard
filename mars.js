"use strict";

class RoverControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photoToDisplay: {}
        };
    }

    componentDidMount(){
        this.setState({photoToDisplay: this.props.photos[0]});
        console.log(this.props.photos);
    }

    render(){
        return React.createElement(
            'button',
            { className: "btn btn-light", onClick: () => {
                ReactDOM.render(React.createElement(RoverImage, {url: this.state.photoToDisplay.img_src}), document.querySelector("#rover-image"));
                console.log('clicked');
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


function initializeContent(){
    let testurl = 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG';

    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY";
    let photos = [];

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            photos = data.photos;
            ReactDOM.render(React.createElement(RoverControl, {photos: photos}), document.querySelector("#rover-control"));
        })
        .catch((error) => console.log(error));

    ReactDOM.render(React.createElement(RoverImage, {url: testurl}), document.querySelector("#rover-image"));
}