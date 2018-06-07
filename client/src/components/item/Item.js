import React, { Component } from "react";
import './Item.css'
import axios from 'axios'

class Item extends Component {
  render() {
    const {
      details,
      title,
      img_link,
      reward,
      last_seen,
      edit_code,
      location,
      id
    } = this.props.item;
    return (
      <div className="Item">
        <span
          onClick={() => this.onClick(id)}
          className="glyphicon glyphicon-remove-sign Item-Delete"
        />
        <input
          className="editCodeBox"
          placeholder="Edit code"
          onChange={this.codeChecker}
        />
        {/* <span onClick={() => this.props.editItem(id)} className="glyphicon glyphicon-pencil Item-Edit" /> */}
        <img className="item_image" src={img_link} />
        <p>
          {title} | {last_seen} | {location} | {reward}
        </p>
        <div>
          <p>
            {details}
            {edit_code}
          </p>
        </div>
      </div>
    );
  }
  onClick = id => {
    axios.delete(`/api/items/${id}`).then(result => {
      this.props.updateItems(result.data);
    });
  };

  codeChecker = e => {
    if (e.target.value === this.props.item.edit_code) {
      this.props.unlockEdit();
    }
  }
}





export default Item