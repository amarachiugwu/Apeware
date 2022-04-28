import React from 'react';
import {Link} from "react-router-dom";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
const Shuffle = window.Shuffle;

//=========================================//
/*              03) Shuffle JS             */
//=========================================//

export const BrowseByCategory = () => {

    const fallbackImg = "data:image/png;base64,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";

        try {
        // var Shuffle = window.Shuffle;

        class BrowseByCategory {
            constructor(element) {
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
            * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
            * for them like you normally would (with jQuery for example).
            */
            addShuffleEventListeners() {
                this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
                    console.log('layout. data:', data);
                });
                this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
                    console.log('removed. data:', data);
                });
            }

            addFilterButtons() {
                const options = document.querySelector('.filter-options');
                if (!options) {
                    return;
                }

                const filterButtons = Array.from(options.children);
                const onClick = this._handleFilterClick.bind(this);
                filterButtons.forEach((button) => {
                    button.addEventListener('click', onClick, false);
                });
            }

            _handleFilterClick(evt) {
                const btn = evt.currentTarget;
                const isActive = btn.classList.contains('active');
                const btnGroup = btn.getAttribute('data-group');

                this._removeActiveClassFromChildren(btn.parentNode);

                let filterGroup;
                if (isActive) {
                    btn.classList.remove('active');
                    filterGroup = Shuffle.ALL_ITEMS;
                } else {
                    btn.classList.add('active');
                    filterGroup = btnGroup;
                }

                this.shuffle.filter(filterGroup);
            }

            _removeActiveClassFromChildren(parent) {
                const { children } = parent;
                for (let i = children.length - 1; i >= 0; i--) {
                    children[i].classList.remove('active');
                }
            }


            _fetchCollection() {
                // const NFTCollections = getCollectionsByChain(chainId);
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(getCollectionsByChain(chainId));
                  }, 300);
                });
              }
        }

        document.addEventListener('DOMContentLoaded', () => {
            window.demo = new BrowseByCategory (document.getElementById('grid'));
        });
    } catch (err) {
        console.log(err);
    }

    const { chainId } = "0x1";
    
    const NFTCollections = getCollectionsByChain(chainId);

    return (
        <>
            <div className="row justify-content-center mt-4 mb-5">
                <div className="col filters-group-wrap">
                    <div className="filters-group">
                        <ul className="container-filter mb-0 categories-filter text-center list-unstyled filter-options">
                            <li className="list-inline-item categories position-relative text-dark active" data-group="all"><i className="uil uil-browser"></i> All</li>
                            <li className="list-inline-item categories position-relative text-dark" data-group="sports"><i className="uil uil-volleyball"></i> sports</li>
                            <li className="list-inline-item categories position-relative text-dark" data-group="art"><i className="uil uil-chart-pie-alt"></i> Art</li>
                            <li className="list-inline-item categories position-relative text-dark" data-group="music"><i className="uil uil-music"></i> Music</li>
                            <li className="list-inline-item categories position-relative text-dark" data-group="photography"><i className="uil uil-camera-plus"></i> Photography</li>
                            <li className="list-inline-item categories position-relative text-dark" data-group="collectibles"><i className="uil uil-rocket"></i> Collectibles</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4" id="grid">

                { NFTCollections?.map((nft, index) => (

                    <div className="col picture-item" data-groups={"["+nft?.category+"]"} key={index}>
                        <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                            

                            <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                                <Link to={"/collection/"+index}><img  style={{ width:"100%", height: "auto" }} src={nft?.image || "error"} fallback={fallbackImg} alt="" className="img-fluid" /></Link>
                            </div>

                            <div className="card-body content position-relative p-0 mt-3">
                                <Link to={"/collection/"+index} className="title text-dark h6" style={{ textAlign: "center" }}>{nft.name}<img style={{ display:"inline", width: "20px", margin:'0 0 5px 2px', height: "20px"}}  src="images/verify.png" alt="Verified Collection" title="Verified Collection" /></Link>

                                <div className="d-flex justify-content-between mt-2">
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
        
            </div>
        </>
    );
}