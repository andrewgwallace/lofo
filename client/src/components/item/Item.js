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
      location
    } = this.props.item;
    return (
      <div className="card">
        <a href={img_link} target="_blank"><img className="card-img-top" src={img_link} alt={title}/></a>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Last Seen:<br/>{last_seen}</li>
            <li className="list-group-item">Location:<br />{location}</li>
              <li className="list-group-item">Reward:<br />${reward}</li>
              <li className="list-group-item">{details}</li>
            </ul>
            <input className="editCodeBox" placeholder="Edit code" onChange={this.codeChecker} /><br/>
            {edit_code}
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
          </div>
</div>
    )
  }

  onClick = id => {
    axios.delete(`/api/items/${id}`).then(result => {
      this.props.updateItems(result.data);
    });
  };

  codeChecker = e => {
    if (e.target.value === this.props.item.edit_code) {
      this.props.editItem(this.props.item.id);
    }
  }
}

export default Item