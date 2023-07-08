/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useGchainPlayer() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.GchainPlayer.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryReadPlayerStatus = (address: string,  options: any) => {
    const key = { type: 'QueryReadPlayerStatus',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.GchainPlayer.query.queryReadPlayerStatus(address).then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QueryReadPlayerStatus,
  }
}