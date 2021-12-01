"use strict";

class RoverControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cameras: {
                'FHAZ': [], 
                'RHAZ': [], 
                'MAST': [], 
                'CHEMCAM': [], 
                'MAHLI': [], 
                'MARDI': [], 
                'NAVCAM': []
            },
            availableCameras: [],
            currentCameraIndex: 1
        };
    }

    componentDidMount(){
        this.props.photos.forEach((photo) => {
            if (photo.rover.name !== "Curiosity"){
                return;
            }

            let camera_name = photo.camera.name;
            let camera_copy = Object.assign({}, this.state.cameras);
            camera_copy[camera_name].push(photo);
            this.setState({cameras: camera_copy});
        });

        for (let [key, value] of Object.entries(this.state.cameras)){
            if (value.length === 0){
                continue;
            }
            
            if (this.state.availableCameras.includes(key) == false){
                this.state.availableCameras.push(key);
            }
        }

        console.log(this.props.photos);
        console.log(this.state.cameras);
        console.log(this.state.availableCameras);
    }

    handleOnClick(){
        let currentCameraName = this.state.availableCameras[this.state.currentCameraIndex];
        let photo = this.state.cameras[currentCameraName][0];
        let image_url = photo.img_src; 

        if (this.state.currentCameraIndex >= this.state.availableCameras.length-1){
            this.setState({currentCameraIndex: 0});
        }
        else{
            this.setState({currentCameraIndex: this.state.currentCameraIndex + 1});
        }
        ReactDOM.render(React.createElement(RoverImage, {url: image_url}), document.querySelector("#rover-image-container"));
        ReactDOM.render(React.createElement(RoverCameraName, {name: photo.camera.full_name}), document.querySelector("#camera-name"));
    }

    render(){
        return React.createElement(
            'button',
            { className: "btn btn-light", onClick: () => {
                this.handleOnClick();
            }},
            'Switch Rover Camera'
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
            {src: `${this.props.url}`, alt: 'Mars Rover Image', className: 'img-fluid', id: 'rover-image'},
            null
        );
    }
}

class RoverCameraName extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return React.createElement(
            'p',
            {},
            this.props.name
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
        // get the previous day
        if (day === 1){
            day = 30;
            if (month == 1){
                month = 12;
            }
            else{
                month -= 1;
            }
        }
        else{
            day -= 1;
        }
        dateParam = buildDateParam(year, month, day);
        url = buildUrl(urlBase, dateParam, keyParam);
        photos = await fetchPhotos(url);
    }
    ReactDOM.render(React.createElement(RoverControl, {photos: photos}), document.querySelector("#rover-control"));
    ReactDOM.render(React.createElement(RoverImage, {url: photos[0].img_src}), document.querySelector("#rover-image-container"));
    ReactDOM.render(React.createElement(RoverCameraName, {name: photos[0].camera.full_name}), document.querySelector("#camera-name"));
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