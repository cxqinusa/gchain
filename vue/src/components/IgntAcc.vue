<template>
  <div class="sp-acc">
    <div
      v-if="wallet"
      class="shadow-std acc-dd-btn flex items-center p-3 rounded-lg mr-3 hover:bg-gray-100 text-sm font-bold"
      :class="[state.accountDropdown ? 'active' : '']"
      style="display: flex; align-items: center"
      @click="state.accountDropdown = !state.accountDropdown"
    >
      <div class="flex items-center">
        <IgntProfileIcon :address="state.keplrParams?.bech32Address" />
        <span class="mx-2">
          {{ getAccName() }}
        </span>
      </div>
    </div>
    <IgntButton
      v-else
      aria-label="Connect wallet"
      type="primary"
      @click="state.connectWalletModal = true"
      :disabled="!enableIgniteConnectKelpr"
    >
      Connect wallet
    </IgntButton>
    <IgntAccDropdown
      v-if="state.accountDropdown && wallet"
      :wallet="wallet"
      :acc-name="getAccName()"
      @disconnect="disconnect"
      @close="state.accountDropdown = false"
    />
    <IgntModal
      :visible="state.connectWalletModal"
      :close-icon="false"
      :cancel-button="false"
      :submit-button="false"
      style="text-align: center"
      @close="state.connectWalletModal = false"
      @submit="state.connectWalletModal = false"
    >
      <template #header>
        <div
          v-if="state.modalPage === 'connect'"
          class="flex items-center flex-col my-3"
        >
          <IgntKeplrIcon class="text-[48px]" />
          <h3 v-if="isKeplrAvailable" class="text-2xl font-bold">
            Connect your wallet
          </h3>
          <h3 v-else>Install Keplr</h3>
        </div>
        <div v-else-if="state.modalPage === 'connecting'">
          <div class="description-grey">Opening Keplr</div>
          <h3>Connecting</h3>
        </div>
        <div v-else-if="state.modalPage === 'error'">
          <IgntWarningIcon style="margin-bottom: 20px" />
          <h3>Keplr cannot launch</h3>
        </div>
      </template>
      <template #body>
        <div class="max-w-xs text-center text-sm my-4 mx-auto">
          <div v-if="state.modalPage === 'connect'">
            <p v-if="isKeplrAvailable">
              Connect your Keplr wallet via the Keplr browser extension to use
              this app.
            </p>
            <p v-else>
              Install & connect your Keplr wallet via the Keplr browser
              extension to use this app.
            </p>
          </div>
          <div v-else-if="state.modalPage === 'connecting'">
            <div class="mt-8">
              <IgntSpinner />
            </div>
            <IgntButton
              aria-label="Cancel"
              type="secondary"
              style="margin-top: 3rem"
              @click="state.modalPage = 'connect'"
            >
              Cancel
            </IgntButton>
            <div class="external-link mt-8">Having trouble opening Keplr?</div>
          </div>
          <div v-else-if="state.modalPage === 'error'" style="padding: 20px 0">
            <div class="external-link">
              <span>Keplr troubleshooting</span>
              <IgntExternalArrowIcon style="margin-left: 0.5rem" />
            </div>
          </div>
        </div>
      </template>
      <template v-if="isKeplrAvailable" #footer>
        <div v-if="state.modalPage === 'connect'" class="my-3">
          <IgntButton
            aria-label="Connect Keplr"
            type="primary"
            @click="tryToConnectToKeplr"
          >
            Connect Keplr
          </IgntButton>
        </div>
        <div
          v-if="state.modalPage === 'error'"
          style="gap: 10px; display: flex; justify-content: center"
        >
          <IgntButton
            aria-label="Connect Keplr"
            type="secondary"
            @click="state.connectWalletModal = false"
          >
            Cancel
          </IgntButton>
          <IgntButton
            aria-label="Connect Keplr"
            type="primary"
            @click="state.modalPage = 'connect'"
          >
            Try again
          </IgntButton>
        </div>
      </template>
    </IgntModal>
  </div>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
import useKeplr from "@/def-composables/useKeplr";
import IgntAccDropdown from "./IgntAccDropdown.vue";
import { IgntButton } from "@ignt/vue-library";
import { IgntExternalArrowIcon } from "@ignt/vue-library";
import { IgntKeplrIcon } from "@ignt/vue-library";
import { IgntModal } from "@ignt/vue-library";
import { IgntProfileIcon } from "@ignt/vue-library";
import { IgntSpinner } from "@ignt/vue-library";
import { IgntWarningIcon } from "@ignt/vue-library";
import { useClient } from "@/composables/useClient";
import { useWalletStore } from "@/stores/useWalletStore";
import useCosmosBaseTendermintV1Beta1 from "@/composables/useCosmosBaseTendermintV1Beta1";

export interface State {
  modalPage: string;
  connectWalletModal: boolean;
  accountDropdown: boolean;
  keplrParams: { name: string; bech32Address: string };
}

const initialState: State = {
  modalPage: "connect",
  connectWalletModal: false,
  accountDropdown: false,
  keplrParams: { name: "", bech32Address: "" },
};

// state
const enableIgniteConnectKelpr = ref(true);
const state = reactive(initialState);

// composables
const { connectToKeplr, isKeplrAvailable, getKeplrAccParams } = useKeplr();

const client = useClient();
const walletStore = useWalletStore();
// methods
const wallet = computed(() => walletStore.getWallet);
const query = useCosmosBaseTendermintV1Beta1();
const nodeInfo = query.ServiceGetNodeInfo({});
const chainId = computed(
  () => nodeInfo.data?.value?.default_node_info?.network ?? ""
);
watch(
  () => chainId.value,
  async (newVal) => {
    if (newVal != "") {
      let { name, bech32Address } = await getKeplrAccParams(newVal);
      state.keplrParams.name = name;
      state.keplrParams.bech32Address = bech32Address;

      console.log('ignite acc chainId:'+newVal);
      console.log('ignite acc name:'+name);
      console.log('ignite acc bech32Address:'+bech32Address);
    }
  }
);

let tryToConnectToKeplr = (): void => {
  state.modalPage = "connecting";

  let onKeplrConnect = async () => {
    state.connectWalletModal = false;
    state.modalPage = "connect";
    let { name, bech32Address } = await getKeplrAccParams(chainId.value);
    state.keplrParams.name = name;
    state.keplrParams.bech32Address = bech32Address;
  };

  let onKeplrError = (): void => {
    state.modalPage = "error";
  };

  connectToKeplr(onKeplrConnect, onKeplrError);
};
let getAccName = (): string => {
  if (client.signer) {
    return state.keplrParams.name;
  } else {
    return "";
  }
};
let disconnect = (): void => {
  state.accountDropdown = false;
  walletStore.signOut();
};


async function updatePlayStatusByLhcTx(json:string) {
  console.log('begin updatePlayStatusByLhcTx:'+json);
  const fee = {
    amount: [{ denom: "cgt", amount: "0" }], // 手续费的币种和数量
    gas: "200000", // 指定的 gas 数量
  };
  let memo = '';

  const jsondata = JSON.parse(json);
  let payload = {
    creator: jsondata.address,
    lhc: {
      address: jsondata.address,
      health: jsondata.health,
      intelligence: jsondata.intelligence,
      fighting: jsondata.fighting,
    },
  };

  try {
    let updateStatus = () =>
        client.GchainPlayer.tx.sendMsgUpdatePlayerStatus({
          value: payload,
          fee: fee,
          memo,
        });

    const txResult = await updateStatus();
    if (txResult.code) {
      console.dir("updateStatus:"+JSON.stringify(txResult));
      throw new Error();
    }
  } catch (e) {
    console.error(e);
  }
}


// check if already connected
onMounted(async () => {
  console.log("client.signer:"+client.signer);
  if (client.signer) {
    try {
      await tryToConnectToKeplr();
    } catch (e) {
      console.warn("Keplr not connected");
    }
  }
  
  // TODO check
  // connet wallet automaticlly
  // a workaround for demo , and should not use it in prodution
  window.setInterval(async ()=>{
      console.log('check wallet', client.signer)
     //if (client.signer) {
      try {
        await tryToConnectToKeplr();
      } catch (e) {
        console.warn("Keplr not connected");
      }
    //}
  }, 2000)


  const instance = getCurrentInstance();
  if (instance) {
    const { appContext } = instance;
    const { eventBus } = appContext.config.globalProperties;
    //在Vue组件的<script>标签中，不能使用箭头函数 (=>)，箭头函数是ES6语法，在一些旧的浏览器或环境中可能不被支持，导致抛出语法错误
    // eventBus.on('updatePlayStatus', (boolValue:boolean) => {
    //   console.log('eventBus updatePlayStatus:', boolValue);
    // });
    eventBus.on('updatePlayStatus', async function (json:string) {
      //console.log('eventBus updatePlayStatus:', json);
      await updatePlayStatusByLhcTx(json);
    });
  }
});
</script>
