import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import AddressInput from "./AddressInput";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import Address from "./Address/Address";

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    width: "100%",
    gap: "10px",
  },
};

function NFTBalance() {
  const { data: NFTBalances } = useNFTBalances();
  const { Moralis, chainId } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();

  const fallbackImg =
    "data:image/png;base64,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";
  

  async function transfer(nft, amount, receiver) {
    console.log(nft, amount, receiver);
    const options = {
      type: nft?.contract_type?.toLowerCase(),
      tokenId: nft?.token_id,
      receiver,
      contractAddress: nft?.token_address,
    };

    if (options.type === "erc1155") {
      options.amount = amount ?? nft.amount;
    }

    setIsPending(true);

    try {
      const tx = await Moralis.transfer(options);
      console.log(tx);
      setIsPending(false);
    } catch (e) {
      alert(e.message);
      setIsPending(false);
    }
  }

  const handleTransferClick = (nft) => {
    setNftToSend(nft);
    setVisibility(true);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  console.log("NFTBalances", NFTBalances);
  return (

    <section className="bg-creator-profile">
      <div className="container">
          <div className="profile-banner">
              <input id="pro-banner" name="profile-banner" type="file" className="d-none" onchange="loadFile(event)" />
              <div className="position-relative d-inline-block">
                  <img src="images/blog/single.jpg" className="rounded-md shadow-sm img-fluid" id="profile-banner" alt="" />
                  <label className="icons position-absolute bottom-0 end-0" for="pro-banner"><span className="btn btn-icon btn-sm btn-pills btn-primary"><i data-feather="camera" className="icons"></i></span></label>
              </div>
          </div>

          <div className="row justify-content-center">
              <div className="col">
                  <div className="text-center mt-n80">
                      <div className="profile-pic">
                          <input id="pro-img" name="profile-image" type="file" className="d-none" onchange="loadFile(event)" />
                          <div className="position-relative d-inline-block">
                              <img src="images/client/01.jpg" className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm" id="profile-image" alt="" />
                              <label className="icons position-absolute bottom-0 end-0" for="pro-img"><span className="btn btn-icon btn-sm btn-pills btn-primary"><i data-feather="camera" className="icons"></i></span></label>
                          </div>
                      </div>

                      <div className="content mt-3">
                          <h5 className="mb-3">streetboyyy</h5>
                          <small className="text-muted px-2 py-1 rounded-lg shadow">
                            <Address
                              avatar="left"
                              size={6}
                              copyable
                              style={{ fontSize: "16px", textAlign : "center" }}
                            /></small>
                          
                          
                          <h6 className="mt-3 mb-0">Artist, UX / UI designer, and Entrepreneur</h6>

                          <div className="mt-4">
                              <Link to="/profileedit" className="btn btn-pills btn-outline-primary mx-1">Edit Profile</Link>
                              <Link to="/Create" className="btn btn-pills btn-icon btn-outline-primary mx-1"><i className="uil uil-folder-upload"></i></Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <div className="container mt-100 mt-60">
          <div className="row">
              <div className="col-12">
                  <ul className="nav nav-tabs border-bottom" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="Create-tab" data-bs-toggle="tab" data-bs-target="#CreateItem" type="button" role="tab" aria-controls="CreateItem" aria-selected="true">Collected</button>
                      </li>
                      
                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="Liked-tab" data-bs-toggle="tab" data-bs-target="#Liked" type="button" role="tab" aria-controls="Liked" aria-selected="false">Liked</button>
                      </li>

                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="Sale-tab" data-bs-toggle="tab" data-bs-target="#Sale" type="button" role="tab" aria-controls="Sale" aria-selected="false">On Sale</button>
                      </li>

                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="Collection-tab" data-bs-toggle="tab" data-bs-target="#Collection" type="button" role="tab" aria-controls="Collection" aria-selected="false">Collection</button>
                      </li>

                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="Activites-tab" data-bs-toggle="tab" data-bs-target="#Activites" type="button" role="tab" aria-controls="Activites" aria-selected="false">Activites</button>
                      </li>

                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="Followers-tab" data-bs-toggle="tab" data-bs-target="#Followers" type="button" role="tab" aria-controls="Followers" aria-selected="false">Followers</button>
                      </li>

                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="About-tab" data-bs-toggle="tab" data-bs-target="#About" type="button" role="tab" aria-controls="About" aria-selected="false">About</button>
                      </li>
                  </ul>

                  <div className="tab-content mt-4 pt-2" id="myTabContent">
                      <div className="tab-pane fade show active" id="CreateItem" role="tabpanel" aria-labelledby="Create-tab">
                          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                            
                          <Skeleton loading={!NFTBalances?.result}>
                            {NFTBalances?.result &&
                              NFTBalances.result.map((nft, index) => {
                                //Verify Metadata
                                nft = verifyMetadata(nft);
                                return (
                                  <div className="col" key={index}>
                                    <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                        
                                        <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                                            <Link to={"/item/"+nft.token_address+"/0"}><img src={nft?.image || fallbackImg } className="img-fluid" alt="" /></Link>
                                        </div>

                                        <div className="card-body content position-relative p-0 mt-3">
                                            <Link to={"/item/"+nft.token_address+"/0"} className="title text-dark h6">{nft.name}</Link>

                                          <div className="d-flex justify-content-between mt-2">
                                              {/* <small className="rate fw-bold">20.5 ETH</small> */}
                                              {/* <small className="text-dark fw-bold">1 out of 10</small> */}

                                              <Tooltip title="View On Blockexplorer">
                                              <FileSearchOutlined
                                                onClick={() =>
                                                  window.open(
                                                    `${getExplorer(chainId)}address/${
                                                      nft.token_address
                                                    }`,
                                                    "_blank",
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                            <Tooltip title="Transfer NFT">
                                              <SendOutlined onClick={() => handleTransferClick(nft)} />
                                            </Tooltip>
                                            <Tooltip title="Sel">
                                              <ShoppingCartOutlined
                                                onClick={() => alert("SELL INTEGRATION COMING!")}
                                              />
                                            </Tooltip>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                );
                              })}
                          </Skeleton>
                          </div>

                          <Modal
                            title={`Transfer ${nftToSend?.name || "NFT"}`}
                            visible={visible}
                            onCancel={() => setVisibility(false)}
                            onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
                            confirmLoading={isPending}
                            okText="Send"
                          >
                            <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
                            {nftToSend && nftToSend.contract_type === "erc1155" && (
                              <Input
                                placeholder="amount to send"
                                onChange={(e) => handleChange(e)}
                              />
                            )}
                          </Modal>
                      </div>

                      <div className="tab-pane fade" id="Liked" role="tabpanel" aria-labelledby="Liked-tab">
                          <div className="row justify-content-center">
                              <div className="col-lg-5 col-md-8 text-center">
                                  <img src="images/svg/office-desk.svg" className="img-fluid" alt="" />

                                  <div className="content">
                                      <h5 className="mb-4">No Items</h5>
                                      <p className="text-muted">Show your appreciation for other's work by liking the shots you love. We'll collect all of your likes here for you to revisit anytime.</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="tab-pane fade" id="Sale" role="tabpanel" aria-labelledby="Sale-tab">
                          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                              <div className="col">
                                  <div className="card nft-items nft-primary nft-auction rounded-md shadow overflow-hidden mb-1 p-3">
                                      <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                              <img src="images/client/01.jpg" alt="user" className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle" />
                                              <a href="javascript:void(0)" className="text-dark small creator-name h6 mb-0 ms-2">@StreetBoyyy</a>
                                          </div>
                                      </div>
          
                                      <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                                          <a href="item-detail-one.html"><img src="images/gif/4.gif" className="img-fluid" alt="" /></a>
                                          <div className="position-absolute top-0 start-0 m-2">
                                              <a href="javascript:void(0)" className="badge badge-link bg-primary">GIFs</a>
                                          </div>
                                          <div className="position-absolute top-0 end-0 m-2">
                                              <span className="like-icon shadow-sm"><a href="javascript:void(0)" className="text-muted icon"><i className="mdi mdi-18px mdi-heart mb-0"></i></a></span>
                                          </div>                                
                                      </div>
          
                                      <div className="card-body content position-relative p-0 mt-3">
                                          <a href="item-detail-one.html" className="title text-dark h6">Deep Sea Phantasy</a>
          
                                          <div className="d-flex align-items-center justify-content-between mt-3">
                                              <div className="">
                                                  <small className="mb-0 d-block fw-semibold">Current Bid:</small>
                                                  <small className="rate fw-bold">20.5 ETH</small>
                                              </div>
                                              <a href="item-detail-one.html" className="btn btn-icon btn-pills btn-primary"><i className="uil uil-shopping-bag"></i></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
          
                              <div className="col">
                                  <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                                      <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                              <img src="images/client/01.jpg" alt="user" className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle" />
                                              <a href="javascript:void(0)" className="text-dark small creator-name h6 mb-0 ms-2">@StreetBoyyy</a>
                                          </div>
                                      </div>
          
                                      <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                                          <a href="item-detail-one.html"><img src="images/items/5.jpg" className="img-fluid" alt="" /></a>
                                          <div className="position-absolute top-0 start-0 m-2">
                                              <a href="javascript:void(0)" className="badge badge-link bg-primary">Arts</a>
                                          </div>
                                          <div className="position-absolute top-0 end-0 m-2">
                                              <span className="like-icon shadow-sm"><a href="javascript:void(0)" className="text-muted icon"><i className="mdi mdi-18px mdi-heart mb-0"></i></a></span>
                                          </div>                                
                                      </div>
          
                                      <div className="card-body content position-relative p-0 mt-3">
                                          <a href="item-detail-one.html" className="title text-dark h6">CyberPrimal 042 LAN</a>
          
                                          <div className="d-flex align-items-center justify-content-between mt-3">
                                              <div className="">
                                                  <small className="mb-0 d-block fw-semibold">Current Bid:</small>
                                                  <small className="rate fw-bold">20.5 ETH</small>
                                              </div>
                                              <a href="item-detail-one.html" className="btn btn-icon btn-pills btn-primary"><i className="uil uil-shopping-bag"></i></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col">
                                  <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                                      <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                              <img src="images/client/01.jpg" alt="user" className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle" />
                                              <a href="javascript:void(0)" className="text-dark small creator-name h6 mb-0 ms-2">@StreetBoyyy</a>
                                          </div>
                                      </div>
          
                                      <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                                          <a href="item-detail-one.html"><img src="images/gif/3.gif" className="img-fluid" alt="" /></a>
                                          <div className="position-absolute top-0 start-0 m-2">
                                              <a href="javascript:void(0)" className="badge badge-link bg-primary">GIFs</a>
                                          </div>
                                          <div className="position-absolute top-0 end-0 m-2">
                                              <span className="like-icon shadow-sm"><a href="javascript:void(0)" className="text-muted icon"><i className="mdi mdi-18px mdi-heart mb-0"></i></a></span>
                                          </div>                                
                                      </div>
          
                                      <div className="card-body content position-relative p-0 mt-3">
                                          <a href="item-detail-one.html" className="title text-dark h6">Crypto Egg Stamp #5</a>
          
                                          <div className="d-flex align-items-center justify-content-between mt-3">
                                              <div className="">
                                                  <small className="mb-0 d-block fw-semibold">Current Bid:</small>
                                                  <small className="rate fw-bold">20.5 ETH</small>
                                              </div>
                                              <a href="item-detail-one.html" className="btn btn-icon btn-pills btn-primary"><i className="uil uil-shopping-bag"></i></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="tab-pane fade" id="Collection" role="tabpanel" aria-labelledby="Collection-tab">
                          <div className="row justify-content-center">
                              <div className="col-lg-5 col-md-8 text-center">
                                  <img src="images/svg/products-to-cart-or-basket.svg" className="img-fluid" alt="" />

                                  <div className="content mt-4">
                                      <h5 className="mb-4">No Collection</h5>
                                      <p className="text-muted">Save interesting shots into personalized collections, and discover new and interesting recommendations along the way.</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="tab-pane fade" id="Activites" role="tabpanel" aria-labelledby="Activites-tab">
                          <div className="row g-4">
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/items/1.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-0 h6 d-block">Digital Art Collection</a>
                                              <small className="text-muted d-block mt-1">Started Following <a href="javascript:void(0)" className="link fw-bold">@Panda</a></small>
                                              
                                              <small className="text-muted d-block mt-1">1 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/gif/1.gif" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Skrrt Cobain Official</a>
                                              <small className="text-muted d-block mt-1">Liked by <a href="javascript:void(0)" className="link fw-bold">@ButterFly</a></small>
                                              
                                              <small className="text-muted d-block mt-1">2 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/items/2.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Wow! That Brain Is Floating</a>
                                              <small className="text-muted d-block mt-1">Liked by <a href="javascript:void(0)" className="link fw-bold">@ButterFly</a></small>
                                              
                                              <small className="text-muted d-block mt-1">2 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/items/3.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Our Journey Start</a>
                                              <small className="text-muted d-block mt-1">Listed by <a href="javascript:void(0)" className="link fw-bold">@CalvinCarlo</a></small>
                                              
                                              <small className="text-muted d-block mt-1">5 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/gif/2.gif" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">BitBears</a>
                                              <small className="text-muted d-block mt-1">Liked by <a href="javascript:void(0)" className="link fw-bold">@ButterFly</a></small>
                                              
                                              <small className="text-muted d-block mt-1">8 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/items/4.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Little Kokeshi #13</a>
                                              <small className="text-muted d-block mt-1">Liked by <a href="javascript:void(0)" className="link fw-bold">@ButterFly</a></small>
                                              
                                              <small className="text-muted d-block mt-1">1 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/gif/3.gif" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">EVOL Floater</a>
                                              <small className="text-muted d-block mt-1">Started Following <a href="javascript:void(0)" className="link fw-bold">@CutieGirl</a></small>
                                              
                                              <small className="text-muted d-block mt-1">13 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/gif/4.gif" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Smart Ape Club (SAC) - Limited Edition</a>
                                              <small className="text-muted d-block mt-1">Listed by <a href="javascript:void(0)" className="link fw-bold">@CalvinCarlo</a></small>
                                              
                                              <small className="text-muted d-block mt-1">18 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/gif/5.gif" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">THE SECRET SOCIETY XX #775</a>
                                              <small className="text-muted d-block mt-1">Listed by <a href="javascript:void(0)" className="link fw-bold">@CalvinCarlo</a></small>
                                              
                                              <small className="text-muted d-block mt-1">23 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-12">
                                  <div className="card activity activity-primary rounded-md shadow p-4">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/items/5.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                                              <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                                  <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                              </div>
                                          </div>
                                              
                                          <span className="content ms-3">
                                              <a href="javascript:void(0)" className="text-dark title mb-1 h6 d-block">Create Your Own World</a>
                                              <small className="text-muted d-block mt-1">Liked by <a href="javascript:void(0)" className="link fw-bold">@ButterFly</a></small>
                                              
                                              <small className="text-muted d-block mt-1">24 hours ago</small>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-12 text-center mt-4">
                                  <a href="javascript:void(0)" className="btn btn-link primary text-dark">Load More <i className="uil uil-arrow-right"></i></a>
                              </div>
                          </div>
                      </div>

                      <div className="tab-pane fade" id="Followers" role="tabpanel" aria-labelledby="Followers-tab">
                          <h5 className="mb-4">6 Followers</h5>
                          <div className="row g-4">
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/02.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">CutieGirl</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/1.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/2.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/3.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/4.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/5.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/4.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/13.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">FunnyGuy</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/3.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/1.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/9.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/6.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/1.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/2.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/03.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">NorseQueen</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/5.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/2.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/gif/6.gif" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/4.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/5.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/04.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">BigBull</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/7.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/8.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/9.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/10.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/10.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">KristyHoney</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/1.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/2.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/3.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/4.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/5.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/6.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="col-md-6">
                                  <div className="p-4 rounded-md shadow users user-primary">
                                      <div className="d-flex align-items-center">
                                          <div className="position-relative">
                                              <img src="images/client/12.jpg" className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail" alt="" />
                                              <div className="position-absolute bottom-0 end-0">
                                                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-sm btn-primary"><i className="uil uil-plus"></i></a>
                                              </div>
                                          </div>

                                          <div className="content ms-3">
                                              <h6 className="mb-0"><a href="creator-profile.html" className="text-dark name">Princess</a></h6>
                                              <small className="text-muted d-flex align-items-center"><i className="uil uil-map-marker fs-5 me-1"></i> Brookfield, WI</small>
                                          </div>
                                      </div>

                                      <div className="border-top my-4"></div>
                                      <div className="row row-cols-xl-6 g-3">
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/5.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/8.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/4.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/7.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/5.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                          
                                          <div className="col">
                                              <a href="item-detail-one.html" className="user-item"><img src="images/items/10.jpg" className="img-fluid rounded-md shadow-sm" alt="" /></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="tab-pane fade" id="About" role="tabpanel" aria-labelledby="About-tab">
                          <h5 className="mb-4">Calvin Carlo</h5>

                          <p className="text-muted mb-0">I have started my career as a trainee and prove my self and achieve all the milestone with good guidance and reach up to the project manager. In this journey, I understand all the procedure which make me a good developer, team leader, and a project manager.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  );
}

export default NFTBalance;
