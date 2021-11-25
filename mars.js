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


async function initializeContent(){
    let photos = [];

    let url = '';
    const urlBase = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";
    let dateParam = "earth_date=";
    let keyParam = "api_key=yDwshnAeUYiWS209gU0i8Ly1C6fZz2560sv5M8OZ";

    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; //getMonth() returns 0-11, need to add 1
    let day = date.getDate();

    dateParam = buildDateParam(year, month, day);
    url = buildUrl(urlBase, dateParam, keyParam);

    photos = await fetchPhotos(url);
    while (photos.length === 0){
        console.log("NO PHOTOS TODAY, FINDING DIFFERENT DAY");
        day -= 1;
        dateParam = buildDateParam(year, month, day);
        url = buildUrl(urlBase, dateParam, keyParam);
        photos = await fetchPhotos(url);
    }
    ReactDOM.render(React.createElement(RoverControl, {photos: photos}), document.querySelector("#rover-control"));
    ReactDOM.render(React.createElement(RoverImage, {url: photos[0].img_src}), document.querySelector("#rover-image"));
}

function buildDateParam(year, month, day){
    let date = year + "-" + month + "-" + day;
    let dateParam = "earth_date=";
    dateParam = dateParam + date;
    return dateParam;
}

function buildUrl(urlBase, dateParam, keyParam){
    return urlBase + dateParam + "&" + keyParam;
}

async function fetchPhotos(url){
    let photos = [];

    try{
        let response = await fetch(url);
        response = await response.json();
        photos = await response.photos;
    } 
    catch (error){
        console.log(error);
    }

    return photos;
}