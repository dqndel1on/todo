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
    getTotalItemsInList: () => void
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
            set(prev => ({ tasks: [...prev.tasks, data], totalItemsInList: get().totalItemsInList + 1 }))
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
    }
}))

export default useToDo;