import create from 'zustand'

type EthersType = {
    provider: boolean | any,
    account: [],
    contractAddress: string,
    setProvider: (data) => void,
    setAccount: (data) => void
}

const useEthers = create<EthersType>(set => ({
    contractAddress: '0xfd1DDAaC4A9b5E2A05BBe685A7e2aA446eDeFa83',
    provider: false,
    account: [],
    setProvider: (data) => set({ provider: data }),
    setAccount: (data) => set({ account: data })
}))

export default useEthers;