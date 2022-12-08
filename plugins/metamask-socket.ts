import { metamaskInformations } from "@/stores/metamask-info";
import { useCryptoStore } from "@/stores/crypto";
import detectEthereumProvider from "@metamask/detect-provider";

export default defineNuxtPlugin(async (nuxtApp) => {
  const user = metamaskInformations();
  const crypto = useCryptoStore();
  const config = useRuntimeConfig();

  const { ready, start } = useTimeout(2500, { controls: true });
  watch(ready, (currentValue) => {
    user.ready = currentValue;
  });

  nuxtApp.vueApp.directive("metamask", {
    async created(el: Element) {
      try {
        await crypto.myPrice(); // add the price in crypto store
        const provider = await detectEthereumProvider();
        if (!provider) { // check if he have metamask installed
          user.isMetamaskSupported = false;
          user.loadingButtonConnect = false;
          crypto.loading_menu = false;
          return;
        } else {
          user.isMetamaskSupported = true;
        }

        const eth_chainId = await (window as any).ethereum.request({
          method: "eth_chainId",
        });

        if (eth_chainId != config.public.chainId) { // check if he is on the right chain ID and try to switch on the right one
          user.networkMetamask = false;
          await (window as any).ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: config.public.chainId }],
            })
            .then((response: any) => {
              user.networkMetamask = true;
            })
            .catch(() => {
              user.address = undefined;
              user.isLoggedIn = false;
            });
        } else {
          user.networkMetamask = true;
        }

        await (window as any).ethereum // check the address of the user and if it's logged
          .request({ method: "eth_accounts" })
          .then(async(response: any) => {
            if (response.length) {
              user.address = response[0];
              user.isLoggedIn = true;
            }
          })
          .catch((err: any) => {
            console.log("ERROR :", err);
          });

        user.loadingButtonConnect = false; // display the connect - wallet ... when everything is loaded

        provider.on("accountsChanged", async (accounts: any) => {
          // when the account has changed
          const addr = accounts[0];
          if (!addr) {
            user.isLoggedIn = false;
            user.errorMessage = "You have disconnected, please reconnect.";
            start();
            user.address = undefined;
          } else {
            user.address = addr;
            await crypto.balanceTokenLedgity(user.address);
            await crypto.balanceTokenUSDC(user.address);
            await crypto.checkAllowance(user.address);
          }
        });

        provider.on("chainChanged", (chainId: string) => {
          // when you change the network
          window.location.reload();
        });

        if (user.isMetamaskSupported) {
          if (user.address) {
            await crypto.balanceTokenLedgity(user.address);
            await crypto.balanceTokenUSDC(user.address);
            await crypto.checkAllowance(user.address);
            const body = {
              address: user.address,
            };
            let res = await $fetch(
              "/api/months_performance/getMonthsPerformance",
              {
                method: "POST",
                body: body,
              }
            );
            let i = 0;
            const month = ["January","February","March","April","May","June","July","August","September","October","November","December",];
            for (const result in res) {
              user.perfAllTime += res[result].purcentage;
              user.totalProfit += res[result].performance;
              user.monthly_revenue[i] = {
                performance: res[result].performance,
                purcentage: res[result].purcentage,
                month: month[res[result].month],
                year: res[result].year,
              };
              i++;
            }
            res = await $fetch("/api/stats/getStats", {
              method: "POST",
              body: body,
            });
            i = 0;

            let timeFormat: any;
            const today: any = new Date();
            const oneDayAgo: any = today - 1000 * 60 * 60 * 24;
            const oneWeekAgo: any = today - 1000 * 60 * 60 * 24 * 7;
            const oneMonthAgo: any = today - 1000 * 60 * 60 * 24 * 30;
            const threeMonthsAgo: any = today - 1000 * 60 * 60 * 24 * 30 * 3;
            const sixMonthsAgo: any = today - 1000 * 60 * 60 * 24 * 30 * 6;
            // CALCUL TO HAVE THE GRAPH on the analytics page for day week ....
            for (const result in res) {
              let hours = new Date(
                res[result].created.seconds * 1000
              ).getHours();
              let day = new Date(res[result].created.seconds * 1000).getDay();

              if (res[result].created.seconds * 1000 >= oneDayAgo) { // history of price and timestamp for 1 days
                user.stats.day.price.push(res[result].token_price / 10 ** 6);
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats.day.timestamp.push(timeFormat);
              }
              if (res[result].created.seconds * 1000 >= oneWeekAgo) { // history of price and timestamp for 1 week
                user.stats.week.price.push(res[result].token_price / 10 ** 6);
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats.week.timestamp.push(timeFormat);
              }
              if (res[result].created.seconds * 1000 >= oneMonthAgo) { // history of price and timestamp for 1 month
                user.stats._month.price.push(res[result].token_price / 10 ** 6);
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats._month.timestamp.push(timeFormat);
              }
              if (
                res[result].created.seconds * 1000 >= threeMonthsAgo &&
                hours % 3 == 0
              ) { // history of price and timestamp for 3 months
                user.stats._3months.price.push(
                  res[result].token_price / 10 ** 6
                );
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats._3months.timestamp.push(timeFormat);
              }
              if (
                res[result].created.seconds * 1000 >= sixMonthsAgo &&
                hours % 6 == 0
              ) { // history of price and timestamp for 6 months
                user.stats._6months.price.push(
                  res[result].token_price / 10 ** 6
                );
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats._6months.timestamp.push(timeFormat);
              }
              if (hours % 8 === 0) {
                user.stats.all.price.push(res[result].token_price / 10 ** 6);
                timeFormat = new Date(res[result].created.seconds * 1000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");
                user.stats.all.timestamp.push(timeFormat);
              }
            }
          }
        }
        crypto.loading_menu = false;
      } catch (err: any) {
        crypto.loading_menu = false;
        console.log("ERROR :", err);
      }
    },
  });
});
