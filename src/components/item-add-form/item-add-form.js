import React, { Component } from "react";
import './item-add-form.css';

export default class ItemAddForm extends Component {

    render() {
        return (
            <div className="item-add-form">
                <button
                    className='bnt btn-outline-secondary'
                    onClick={() => this.props.onItemAdded('Hello world!')}>
                    Add element
                </button>
            </div>
        )
    }
}