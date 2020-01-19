import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ToDoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    createTodoItem = (label) => {
        return {
            label,
            important: false,
            id: this.maxId++
        }
    };

    toggleProperty = (array, id, propName) => {
        const index = array.findIndex((el) => el.id === id);
        const oldItem = array[index];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...array.slice(0, index),
            newItem, ...array.slice(index + 1)
        ];
    };

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome App'),
            this.createTodoItem('Learn ML')
        ],
        term: '',
        filter: 'all'
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];
            return {todoData: newArray}
        })
    };

    AddItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];
            return {todoData: newArray}
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'done')}
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'important')}
        })
    };

    search(items, term) {
        if (term === '') {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onSearchChange = (term) => {
        this.setState({term})
    };

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    render() {

        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <ToDoList todos={visibleItems}
                          onDeleted={(id) => this.deleteItem(id)}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.AddItem}/>
            </div>
        );
    }
}
;