"use strict";
class RoverControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY",
            photos: []
        };
    }

    componentDidMount(){
        fetch(this.state.url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({photos: data.photos});
                console.log(this.state.photos);
            })
            .catch((error) => console.log(error));
    }

    render(){
        return React.createElement(
            'button',
            { className: "btn btn-light", onClick: () => console.log("clicked")},
            'Switch Rover Image'
        );
    }
}

ReactDOM.render(React.createElement(RoverControl), document.querySelector("#rover-control"));