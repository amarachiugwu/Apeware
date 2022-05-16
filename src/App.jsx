import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Connect from "components/Account/Connect";
import { Header as HeaderContent } from "./components/App/Header";
import { Footer as FooterContent } from "./components/App/Footer";
import Home from "components/App/Home";
import Collection from "components/App/Collection";
import Category from "components/App/Category";
import Asset from "components/App/Asset";
import Item from "components/App/Item";
import NFTTokenIds from "components/NFTTokenIds";

const { Content, Footer } = Layout;
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading }  = useMoralis();

  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout className="layout">
      <Router>
        <header id="topnav" className="defaultscroll sticky">
          <div className="container">
            <HeaderContent />
          </div>
        </header>
        <div>
          <Switch>
            <Content>
              <div style={{ minHeight: "280px" }}>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/connect">
                  <Connect />
                </Route>
                <Route path="/profile">
                  <Connect />
                </Route>
                <Route path="/create">
                  <Connect />
                </Route>
                 <Route path="/profileedit">
                  <Connect />
                </Route>
                <Route path="/settings">
                  <Connect />
                </Route>
                <Route path="/collection/:id">
                  <Collection />
                </Route>
                <Route path="/category/:cat">
                  <Category />
                </Route>
                <Route path="/assets">
                  <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
                </Route>
                <Route path="/asset/:addr">
                  <Asset />
                </Route>
                <Route path="/item/:addr/:id">
                  <Item />
                </Route>
              </div>
            </Content>
          </Switch>
        </div>
        <Footer style={{ padding: "0px" }}>
          <FooterContent />
        </Footer>
      </Router>
    </Layout>
  );
};

export default App;