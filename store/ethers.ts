import create from 'zustand'

type EthersType = {
    provider: boolean | any,
    account: [],
    setProvider: (data) => void,
    setAccount: (data) => void
}

const useEthers = create<EthersType>(set => ({
    provider: false,
    account: [],
    setProvider: (data) => set({ provider: data }),
    setAccount: (data) => set({ account: data })
}))

export default useEthers;