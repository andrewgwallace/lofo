import React, { Component } from "react";
import './Item.css'
import axios from 'axios'

class Item extends Component {
  render() {
    const {details, title, img_link, reward, last_seen, edit_code, location} = this.props.item
    return (
    <div className="Item">
      <img src={img_link}/>
      <p>{title} | {last_seen} | {location} | {reward}</p>
        <div>
          <p>{details}</p>{edit_code}
        </div>
      </div>
    )
  }
}

export default Item