import ToDo from '../artifacts/contracts/_ToDo.sol/ToDo.json';
import create from 'zustand'
import { ethers } from 'ethers';

declare let window: any;
type DataTypes = {
    id: number;
    date: string;
    toDoItem: string;
}
type ToDoTypes = {
    contractAddress: string;
    createTask: (data: DataTypes) => void;
    tasks: DataTypes[];
    getTasks: (id: number) => void;
    totalItemsInList: number;
    getTotalItemsInList: () => void;
    sendComplete: (index: number) => void
}

const useToDo = create<ToDoTypes>((set, get) => ({
    contractAddress: '0xfd1DDAaC4A9b5E2A05BBe685A7e2aA446eDeFa83',
    tasks: [],
    totalItemsInList: 0,
    createTask: async (data: DataTypes) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, ToDo.abi, signer)
            const transaction = await contract.create(data.toDoItem, data.id, data.date)
            await transaction.wait()
            set({ tasks: [], totalItemsInList: get().totalItemsInList + 1 })
        }
    },
    getTasks: async (id) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, ToDo.abi, provider)
            try {
                const data = await contract.get(id)
                set(prev => ({ tasks: [...prev.tasks, data] }))
            } catch (err) {
                throw new Error("Could not get data.")
            }
        }
    },
    getTotalItemsInList: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, ToDo.abi, provider)
            try {
                const data = await contract.totalItemsInList()
                set({ totalItemsInList: data.toNumber() })
            } catch (err) {
                throw new Error("Could not get data.")
            }
        }
    },
    sendComplete: async (index) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, ToDo.abi, signer)
            try {
                const transaction = await contract.toggleCompleted(index)
                await transaction.wait()
                set({ tasks: [], totalItemsInList: get().totalItemsInList - 1 })
            } catch (err) {
                throw new Error("Could not update data.")
            }
        }
    }
}))

export default useToDo;