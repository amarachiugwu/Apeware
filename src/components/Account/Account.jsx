import React from 'react';
import {Link} from "react-router-dom";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  // console.log(isAuthenticated);
  // console.log(account);
  // console.log(chainId);
  // console.log(authenticate);




  if (!isAuthenticated || !account) {
    return (
      <>

        <li className="list-inline-item mb-0" style={{ margin: "20px 10px" }}>
          <div className="dropdown dropdown-primary">
              <Link to="/connect" type="button" className="btn btn-pills p-0"> <span class="btn-icon-dark"><span class="btn btn-icon btn-pills btn-primary"><i class="uil uil-user fs-6"></i></span></span></Link>
              {/* <div className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 pb-3 pt-0 overflow-hidden rounded" style={{ minWidth: "200px" }}>
                  
                  <div className="mt-2">
                      <a className="dropdown-item small fw-semibold text-dark d-flex align-items-center" href="creator-profile.html"><span className="mb-0 d-inline-block me-1"><i className="uil uil-user align-middle h6 mb-0 me-1"></i></span> Profile</a>
                      <a className="dropdown-item small fw-semibold text-dark d-flex align-items-center" href="creator-profile-edit.html"><span className="mb-0 d-inline-block me-1"><i className="uil uil-cog align-middle h6 mb-0 me-1"></i></span> Settings</a>
                      <div className="dropdown-divider border-top"></div>
                  </div>
              </div> */}
          </div>
        </li>

        <li className="list-inline-item mb-0 me-1" onClick={() => setIsAuthModalVisible(true)} style={{ margin: "20px 10px" }}>
          <a id="connectWallet"  style={{ paddingTop: "3px"}}>
              <span className="btn-icon-dark"><span className="btn btn-icon btn-pills btn-primary"><i className="uil uil-wallet fs-6"></i></span></span>
          </a>
        </li>

        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
        <li className="list-inline-item mb-0" style={{ margin: "20px 10px" }}>
          <div className="dropdown dropdown-primary">
              <button type="button" className="btn btn-pills dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/client/01.jpg" className="rounded-pill avatar avatar-sm-sm" alt="" /></button>
              <div className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 pb-3 pt-0 overflow-hidden rounded" style={{ minWidth: "200px" }}>
                  <div className="position-relative">
                      <div className="pt-5 pb-3 bg-gradient-primary"></div>
                      <div className="px-3">
                          <div className="d-flex align-items-end mt-n4">
                              <img src="images/client/01.jpg" className="rounded-pill avatar avatar-md-sm img-thumbnail shadow-md" alt="" />
                              <h6 className="text-dark fw-bold mb-0 ms-1">Calvin Carlo</h6>
                          </div>
                          <div className="mt-2">
                              <small className="text-start text-dark d-block fw-bold">Address:</small>
                              <div className="d-flex justify-content-between align-items-center">
                              <Address
                                avatar="left"
                                size={6}
                                copyable
                                style={{ fontSize: "16px" }}
                              />
                                  {/* <small id="myPublicAddress" className="text-muted">{getEllipsisTxt(account, 6)}</small> */}
                                  {/* <a href="#" className="text-primary"><span className="uil uil-copy"></span></a> */}
                              </div>
                          </div>
                          
                          {/* <div className="mt-2">
                              <small className="text-dark">Balance: <span className="text-primary fw-bold">0.00045ETH</span></small>
                          </div> */}
                      </div>
                  </div>
                  <div className="mt-2">
                      <Link className="dropdown-item small fw-semibold text-dark d-flex align-items-center" to="/profile"><span className="mb-0 d-inline-block me-1"><i className="uil uil-user align-middle h6 mb-0 me-1"></i></span> Profile</Link>
                      <Link className="dropdown-item small fw-semibold text-dark d-flex align-items-center" to="/setting"><span className="mb-0 d-inline-block me-1"><i className="uil uil-cog align-middle h6 mb-0 me-1"></i></span> Settings</Link>
                      <div className="dropdown-divider border-top"></div>
                      <a className="dropdown-item small fw-semibold text-dark d-flex align-items-center" href="lock-screen.html"><span className="mb-0 d-inline-block me-1"><i className="uil uil-sign-out-alt align-middle h6 mb-0 me-1"></i></span> Logout</a>
                  </div>
              </div>
          </div>
        </li>

      <div style={{ margin: "20px 10px", paddingTop: "3px" }} onClick={() => setIsModalVisible(true)}>
        {/* <p style={{ marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(account, 6)}
        </p> */}
        <Blockie currentWallet scale={4} style={{ width: "36px", height: "36px" }} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
