import { ethers } from "ethers";
import contractABI from "./smart-contract/artifacts/contracts/contract.sol/ldgSwap.json";
import tokenLedgityABI from "./smart-contract/artifacts/contracts/erc20token.sol/LDG_Defi.json";
import tokenUsdcABI from "./smart-contract/artifacts/contracts/erc20usdtoken.sol/usd.json";

export const useCryptoStore = defineStore("crypto", () => {
  const config = useRuntimeConfig();

  const loading = ref(false);
  const loading_menu = ref(true);
  const usdcBalance = ref(0);
  const ledgityBalance = ref(0);
  const ledgityTokenPrice = ref(0);

  const usdcTokenAllowance = ref();
  const ledgityTokenAllowance = ref();

  const contractAddress = config.public.ldgContractAddress;
  const ledgityTokenAddress = config.public.ldgTokenAddress;
  const usdcTokenAddress = config.public.usdcTokenAddress;

  async function myPrice() {
    try {
      const provider = new ethers.providers.WebSocketProvider(
        config.public.providerWebsocket
      );
      const ldgContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        provider
      );
      const count = await ldgContract.myPrice();
      ledgityTokenPrice.value = parseInt(count._hex, 16) / 1000000;
    } catch (e) {
      console.log("e", e);
      return;
    }
  }

  async function balanceTokenLedgity(address: string) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const erc20ldg = new ethers.Contract(
          ledgityTokenAddress,
          tokenLedgityABI.abi,
          signer
        );
        const count = await erc20ldg.balanceOf(address);
        ledgityBalance.value = parseInt(count._hex, 16);
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
  }

  async function balanceTokenUSDC(address: string) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const usdcToken = new ethers.Contract(
          usdcTokenAddress,
          tokenUsdcABI.abi,
          signer
        );
        const count = await usdcToken.balanceOf(address);
        usdcBalance.value = parseInt(count._hex, 16);
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
  }

  async function checkAllowance(address: string) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const usdcToken = new ethers.Contract(
          usdcTokenAddress,
          tokenUsdcABI.abi,
          signer
        );
        let res = await usdcToken.allowance(address, contractAddress);
        usdcTokenAllowance.value = parseInt(res._hex, 16);
      }
    } catch (e: any) {
      console.log("e", e);
      return;
    }

    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ledgityToken = new ethers.Contract(
          ledgityTokenAddress,
          tokenLedgityABI.abi,
          signer
        );
        let res = await ledgityToken.allowance(address, contractAddress);
        ledgityTokenAllowance.value = parseInt(res._hex, 16);
      }
    } catch (e: any) {
      console.log("e", e);
      return;
    }
  }

  async function approveUsdc(address: string, amount: number) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        loading.value = true;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const usdcContract = new ethers.Contract(
          usdcTokenAddress,
          tokenUsdcABI.abi,
          signer
        );
        const approveTxn = await usdcContract.approve(
          contractAddress,
          amount * 10 ** 6
        );
        await approveTxn.wait();
        await checkAllowance(address);
        loading.value = false;
      }
    } catch (e) {
      loading.value = false;
      console.log("e", e);
      return;
    }
  }

  async function approveLedgity(address: string, amount: number) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        loading.value = true;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ledgityTokenContract = new ethers.Contract(
          ledgityTokenAddress,
          tokenLedgityABI.abi,
          signer
        );
        const approveTxn = await ledgityTokenContract.approve(
          contractAddress,
          amount * 10 ** 6
        );
        await approveTxn.wait();
        await checkAllowance(address);
        loading.value = false;
      }
    } catch (e) {
      loading.value = false;
      console.log("e", e);
      return;
    }
  }

  async function depositUSDC(address: string, amount: number) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        loading.value = true;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ledgityContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );
        const overrides = {
          gasLimit: 750000,
        };
        const approveTxn = await ledgityContract.deposit(
          amount * 10 ** 6,
          overrides
        );
        await approveTxn.wait();
        await checkAllowance(address);
        await balanceTokenLedgity(address);
        await balanceTokenUSDC(address);
        loading.value = false;
        const body = {
          address: address,
          balance: ledgityBalance.value,
        };
        await $fetch("/api/transactions/addTrx", {
          method: "POST",
          body: body,
        });
      }
    } catch (e) {
      loading.value = false;
      console.log("e", e);
      return;
    }
  }

  async function withdrawLEDGITY(address: string, amount: number) {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        loading.value = true;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ledgityContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );
        const overrides = {
          gasLimit: 750000,
        };
        const approveTxn = await ledgityContract.withdraw(
          amount * 10 ** 6,
          overrides
        );
        await approveTxn.wait();
        await checkAllowance(address);
        await balanceTokenLedgity(address);
        await balanceTokenUSDC(address);
        loading.value = false;
        const body = {
          address: address,
          balance: ledgityBalance.value,
        };
        await $fetch("/api/transactions/addTrx", {
          method: "POST",
          body: body,
        });
      }
    } catch (e) {
      loading.value = false;
      console.log("e", e);
      return;
    }
  }

  async function addUsdcTokenOnMetamask() {
    const tokenSymbol = "USD";
    const tokenDecimals = 6;
    const tokenImage = "";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const { ethereum } = window as any;

      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: usdcTokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addLDGTokenOnMetamask() {
    const tokenSymbol = "LDG01";
    const tokenDecimals = 6;
    const tokenImage = "";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const { ethereum } = window as any;

      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: ledgityTokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function changeNetwork() {
    try {
      const { ethereum } = window as any;

      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: config.public.CHAIN_ID }],
      })
    } catch (e) {
      console.log("e", e);
      return;
    }
}

  async function mintUSDC(address: string, amount: number) {
    // A DELETE APRES
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        loading.value = true;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const usdcContract = new ethers.Contract(
          usdcTokenAddress,
          tokenUsdcABI.abi,
          signer
        );
        const approveTxn = await usdcContract.mint(address, amount * 10 ** 6);
        console.log("mining :", approveTxn.hash);
        await approveTxn.wait();
        console.log("mined :", approveTxn.hash);
        loading.value = false;
      }
    } catch (e) {
      loading.value = false;
      console.log("e", e);
      return;
    }
  }

  return {
    loading,
    loading_menu,
    ledgityTokenPrice,
    usdcBalance,
    ledgityBalance,
    usdcTokenAllowance,
    ledgityTokenAllowance,
    myPrice,
    balanceTokenLedgity,
    balanceTokenUSDC,
    checkAllowance,
    approveUsdc,
    approveLedgity,
    depositUSDC,
    withdrawLEDGITY,
    addUsdcTokenOnMetamask,
    addLDGTokenOnMetamask,
    changeNetwork,
    mintUSDC, // A DELETE APRES
  };
});
