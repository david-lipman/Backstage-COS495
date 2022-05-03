//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";

contract Backstage is ERC721, Ownable, PullPayment {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //Store token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor() public ERC721("Backstage", "NFT") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        require(msg.value >= price);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function withdrawPayments(address payable payee)
        public
        virtual
        override
        onlyOwner
    {
        super.withdrawPayments(payee);
    }
}
