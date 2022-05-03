import { Dialog } from "@headlessui/react";
import { useMetaMask } from "metamask-react";

import { ButtonMedium } from "@common/components/Button";

export const ConnectMetaMaskButton = () => {
  const { connect } = useMetaMask();

  return (
    <>
      <Dialog.Title>
        Please connect your MetaMask wallet before purchasing this NFT{" "}
      </Dialog.Title>
      <Dialog.Description>
        Click the button below to connect:
      </Dialog.Description>
      <br />
      <ButtonMedium onClick={connect}>Connect MetaMask 🦊</ButtonMedium>
    </>
  );
};
