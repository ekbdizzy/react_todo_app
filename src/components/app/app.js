import React, { Component } from "react";
import ReactDOM from 'react-dom';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ToDoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    constructor() {
        super();
        this.maxId = 100;
        this.state = {
            todoData: [
                {label: 'Drink Coffee', important: false, id: 1},
                {label: 'Make awesome App', important: true, id: 2},
                {label: 'Have a lunch', important: false, id: 3}
            ]
        };

        this.deleteItem = (id) => {
            this.setState(({todoData}) => {
                const index = todoData.findIndex((el) => el.id === id);
                const newArray = [
                    ...todoData.slice(0, index),
                    ...todoData.slice(index + 1)
                ];
                return {todoData: newArray}
            })
        };

        this.AddItem = (text) => {
            const newItem = {
                label: text,
                important: false,
                id: this.maxId++
            };

            this.setState(({todoData}) => {
                const newArray = [...todoData, newItem];
                return {todoData: newArray}
            });
        };
    }

    render() {
        return (
            <div className='todo-app'>
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <ToDoList todos={this.state.todoData}
                          onDeleted={(id) => this.deleteItem(id)}/>
                <ItemAddForm onItemAdded={this.AddItem}/>
            </div>
        );
    }

}
;