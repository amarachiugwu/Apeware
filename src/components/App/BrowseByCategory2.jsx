// Normally you would import these like `import React, { Component } from 'react';`
import {Link} from "react-router-dom";
import { getCollectionsByChain } from "helpers/collections";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
const React = window.React;
const ReactDOM = window.ReactDOM;
const Component = React.Component;
const Shuffle = window.Shuffle;


// A very simple app with one component.
class App extends Component {
  render() {
    return (
      <div className="container">
        <PhotoGrid />
      </div>
    );
  }
}

// Create the component which will use Shuffle.
class PhotoGrid extends Component {
  constructor(element) {
    super(element);

    // Initialize with some "photos" that are cached (or none at all). Maybe you
    // have a service worker that cached the last API response and you can
    // use that here while waiting on a network request.
  
  
    // const grayPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    // const blackPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    // const greenPixel =
    //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02Vz4HwAE9AJhcLBN6AAAAABJRU5ErkJggg==';

    // this.state = {
    //   photos: [
    //     { id: 1, src: grayPixel },
    //     { id: 2, src: blackPixel },
    //     { id: 3, src: greenPixel },
    //   ],
    // };

    // this.element = React.createRef();
    // this.sizer = React.createRef();

    const { chainId } = useMoralisDapp();

    this.state = {
        NFTCollections : {
                image:
                "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130",
                name: "Bored Ape Yacht Club",
                addrs: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
                category: "art",
            }
    }

    if(element){
        this.element = element;
        this.shuffle = new Shuffle(element, {
            itemSelector: '.picture-item',
            sizer: element.querySelector('.my-sizer-element'),
        });

        // Log events.
        this.addShuffleEventListeners();
        this._activeFilters = [];
        this.addFilterButtons();
    }
  }



  /**
   * Fake and API request for a set of images.
   * @return {Promise<Object[]>} A promise which resolves with an array of objects.
   */
  _fetchCollection() {
    // const NFTCollections = getCollectionsByChain(chainId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getCollectionsByChain(chainId));
      }, 300);
    });
  }

  /**
   * Resolve a promise when all the photos in an array have loaded.
   * @param {Object[]} photos Photos to load.
   * @return {Promise<Object[]>} Loaded images.
   */
  _whenPhotosLoaded(photos) {
    return Promise.all(
      photos.map(
        (photo) =>
          new Promise((resolve) => {
            const image = document.createElement('img');
            image.src = photo.src;

            if (image.naturalWidth > 0 || image.complete) {
              resolve(photo);
            } else {
              image.onload = () => {
                resolve(photo);
              };
            }
          }),
      ),
    );
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.element.current, {
      itemSelector: '.photo-item',
      sizer: this.sizer.current,
    });

    // Kick off the network request and update the state once it returns.
    this._fetchCollection()
      .then(this._whenPhotosLoaded.bind(this))
      .then((photos) => {
        this.setState({ photos });
      });
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  render() {
    return (
      <div ref={this.element} className="row my-shuffle">
        {this.state.photos.map((image) => (
          <PhotoItem {...image} />
        ))}
        <div ref={this.sizer} className="col-1@xs col-1@sm photo-grid__sizer"></div>
      </div>
    );
  }
}

/**
 * A grid item for a photo.
 * @param {{ id: number, username: string, src: string, name: string }} props Component props.
 * @return {JSX.Element}
 */
function PhotoItem({ id, username, src, name }) {
  return (
    <div key={id} className="col-3@xs col-4@sm photo-item">
      <div className="aspect aspect--4x3">
        <div className="aspect__inner">
          <img src={src} />
          <PhotoAttribution username={username} name={name} />
        </div>
      </div>
    </div>
  );
}

/**
 * A small badge with a link to the author of the photo's profile.
 * @param {{ username: string, name: string }} props Component props.
 * @return {JSX.Element}
 */
function PhotoAttribution({ username, name }) {
  if (!username) {
    return null;
  }

  const href = `https://unsplash.com/${username}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`;
  const title = `Download free do whatever you want high-resolution photos from ${name}`;
  return (
    <a className="photo-attribution" href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <span>
        <svg viewBox="0 0 32 32">
          <path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path>
        </svg>
      </span>
      <span>{name}</span>
    </a>
  );
}

// Render our "App" into the #root element.
ReactDOM.render(<App />, document.getElementById('root'));