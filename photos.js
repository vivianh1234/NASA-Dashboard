const liftoffUrls = [
  "https://images-assets.nasa.gov/image/KSC01pp0436/KSC01pp0436~thumb.jpg",
  "https://images-assets.nasa.gov/image/KSC-20191205-PH-AWG07_0002/KSC-20191205-PH-AWG07_0002~thumb.jpg",
  "https://images-assets.nasa.gov/image/KSC-314D-0549_0070/KSC-314D-0549_0070~thumb.jpg",
  "https://images-assets.nasa.gov/image/KSC-2015-1255/KSC-2015-1255~thumb.jpg",
  "https://images-assets.nasa.gov/image/s66-42751/s66-42751~thumb.jpg",
  "https://images-assets.nasa.gov/image/KSC-08pd3696/KSC-08pd3696~thumb.jpg",
];

const galaxiesUrls = [
  'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000848/GSFC_20171208_Archive_e000848~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA10115/PIA10115~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA13117/PIA13117~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA07907/PIA07907~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA04634/PIA04634~thumb.jpg',
  'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000677/GSFC_20171208_Archive_e000677~thumb.jpg'
];

const urls = {
  Liftoff: liftoffUrls,
  Galaxies: galaxiesUrls
};

function loadPhotos() {
  let photoCategory = document.getElementById("photo-select").value;
  let urlList = urls[photoCategory];

  let photoContainer = document.getElementById("photo-container");
  let count = 0;

  urlList.forEach((url) => {
    let newPhoto = document.createElement("div");
    newPhoto.id = photoCategory + "-image-" + count.toString();
    newPhoto.className = "container photo";
    photoContainer.append(newPhoto);

    ReactDOM.render(
      React.createElement(Photo, {
        url: url,
        photoCategory: photoCategory,
      }),
      document.getElementById(newPhoto.id)
    );

    ++count;
  });
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let alt = this.props.photoCategory + " Image";

    return React.createElement(
      "img",
      { src: `${this.props.url}`, alt: alt, className: "img-fluid" },
      null
    );
  }
}
