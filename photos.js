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

const planetsUrls = [
  'https://images-assets.nasa.gov/image/PIA19831/PIA19831~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA18332/PIA18332~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA20056/PIA20056~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA07096/PIA07096~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA10108/PIA10108~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA14883/PIA14883~thumb.jpg'
];

const blackHolesUrls = [
  'https://images-assets.nasa.gov/image/PIA23864/PIA23864~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA19348/PIA19348~thumb.jpg',
  'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e002148/GSFC_20171208_Archive_e002148~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA01884/PIA01884~thumb.jpg',
  'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000608/GSFC_20171208_Archive_e000608~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA17561/PIA17561~thumb.jpg'
];

const starsUrls = [
  'https://images-assets.nasa.gov/image/smoke-ring-for-a-halo_22611665165_o/smoke-ring-for-a-halo_22611665165_o~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA09220/PIA09220~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA12376/PIA12376~thumb.jpg',
  'https://images-assets.nasa.gov/image/hubble-sees-a-dying-stars-final-moments_20149292766_o/hubble-sees-a-dying-stars-final-moments_20149292766_o~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA13100/PIA13100~thumb.jpg',
  'https://images-assets.nasa.gov/image/PIA13959/PIA13959~thumb.jpg'
];

const urls = {
  Liftoff: liftoffUrls,
  Galaxies: galaxiesUrls,
  Planets: planetsUrls,
  BlackHoles: blackHolesUrls,
  Stars: starsUrls
};

function loadPhotos() {
  removePhotos();

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

function removePhotos(){
  let photoContainer = document.getElementById("photo-container");
  while (photoContainer.firstChild){
    photoContainer.removeChild(photoContainer.firstChild);
  }
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
