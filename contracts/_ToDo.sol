// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ToDo {
    struct ToDoList{
        uint256 id;
        string date;
        string toDoItem;
        bool completed;
    }

    ToDoList[] public ToDos;

// calldata saves gas, use calldata instead of memory
    function create(string calldata _text,uint256 _id, string calldata _date) external {
        ToDos.push(ToDoList({
        id: _id,
        date: _date,
        toDoItem: _text,
        completed:false
        }));
    }

    function updateToDoItem(uint _index, string calldata _text) external {
        // use for single variable update --> saves gas for single update
        // ToDos[_index].text = _text;

        //use for multiple variables update --> saves gas for multiple variable update
        // we use this because we have to update multiple variables
        ToDoList storage todo = ToDos[_index];
        todo.toDoItem = _text;
    }

    function get(uint _index) external view  returns(string memory,uint256, string memory, bool){
        ToDoList storage todo = ToDos[_index];
        return (todo.toDoItem, todo.id, todo.date, todo.completed);
    }

    function toggleCompleted(uint _index) external {
        ToDos[_index].completed = !ToDos[_index].completed;
    }
}