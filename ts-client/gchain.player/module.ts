// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgTransferPlayerStatus } from "./types/gchain/player/tx";
import { MsgUpdatePlayerStatus } from "./types/gchain/player/tx";
import { MsgBuyPlayerStatus } from "./types/gchain/player/tx";

import { Lhcdata as typeLhcdata} from "./types"
import { Params as typeParams} from "./types"
import { Snowdata as typeSnowdata} from "./types"

export { MsgTransferPlayerStatus, MsgUpdatePlayerStatus, MsgBuyPlayerStatus };

type sendMsgTransferPlayerStatusParams = {
  value: MsgTransferPlayerStatus,
  fee?: StdFee,
  memo?: string
};

type sendMsgUpdatePlayerStatusParams = {
  value: MsgUpdatePlayerStatus,
  fee?: StdFee,
  memo?: string
};

type sendMsgBuyPlayerStatusParams = {
  value: MsgBuyPlayerStatus,
  fee?: StdFee,
  memo?: string
};


type msgTransferPlayerStatusParams = {
  value: MsgTransferPlayerStatus,
};

type msgUpdatePlayerStatusParams = {
  value: MsgUpdatePlayerStatus,
};

type msgBuyPlayerStatusParams = {
  value: MsgBuyPlayerStatus,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgTransferPlayerStatus({ value, fee, memo }: sendMsgTransferPlayerStatusParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgTransferPlayerStatus: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgTransferPlayerStatus({ value: MsgTransferPlayerStatus.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgTransferPlayerStatus: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgUpdatePlayerStatus({ value, fee, memo }: sendMsgUpdatePlayerStatusParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgUpdatePlayerStatus: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgUpdatePlayerStatus({ value: MsgUpdatePlayerStatus.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgUpdatePlayerStatus: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgBuyPlayerStatus({ value, fee, memo }: sendMsgBuyPlayerStatusParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgBuyPlayerStatus: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgBuyPlayerStatus({ value: MsgBuyPlayerStatus.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgBuyPlayerStatus: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgTransferPlayerStatus({ value }: msgTransferPlayerStatusParams): EncodeObject {
			try {
				return { typeUrl: "/gchain.player.MsgTransferPlayerStatus", value: MsgTransferPlayerStatus.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgTransferPlayerStatus: Could not create message: ' + e.message)
			}
		},
		
		msgUpdatePlayerStatus({ value }: msgUpdatePlayerStatusParams): EncodeObject {
			try {
				return { typeUrl: "/gchain.player.MsgUpdatePlayerStatus", value: MsgUpdatePlayerStatus.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgUpdatePlayerStatus: Could not create message: ' + e.message)
			}
		},
		
		msgBuyPlayerStatus({ value }: msgBuyPlayerStatusParams): EncodeObject {
			try {
				return { typeUrl: "/gchain.player.MsgBuyPlayerStatus", value: MsgBuyPlayerStatus.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgBuyPlayerStatus: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Lhcdata: getStructure(typeLhcdata.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						Snowdata: getStructure(typeSnowdata.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			GchainPlayer: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;