// import { ContactsOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenId = (addr, id) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  var NFTImage = "";
  const [NFTTokenId, setNFTTokenId] = useState([]);
//   const [totalNFTs, setTotalNFTs] = useState();
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
    chain: chainId,
    address: addr,
    limit: id+1,
  });

  useEffect( () => {
    if (data?.result) {
      const NFT = data.result[id];
    //   setTotalNFTs(data.total);
      setFetchSuccess(true);
    //   for (let NFT of NFTs) {
        if (NFT?.metadata) {
          
          NFTImage = resolveLink(JSON.parse(NFT.metadata)["image"]);
          NFTImage = resolveLink(NFT.image);
            
        } else if (NFT?.token_uri) {
          try {
             fetch(NFT.token_uri)
              .then((response) => response.json())
              .then((data) => {
                NFTImage = resolveLink(data.image);
              });
          } catch (error) {
            setFetchSuccess(false);
              
          }
        }
    //   }
      setNFTTokenId(NFT);
    }
  }, [data, resolveLink]);

  return {
    getNFTTokenIds,
    NFTImage,
    NFTTokenId,
    // totalNFTs,
    fetchSuccess,
    error,
    isLoading,
  };
};
