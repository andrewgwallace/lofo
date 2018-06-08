import React, { Component } from "react";
import './Item.css'
import axios from 'axios'

class Item extends Component {
  render() {
    const {
      id,
      email,
      phone,
      details,
      title,
      img_link,
      reward,
      last_seen,
      edit_code,
      location
    } = this.props.item;
    return <div className="card card-block">
        <a href={img_link} target="_blank">
          <img className="card-img-top" src={img_link} alt={title} />
        </a>
        <h5 className="card-title">{title}</h5>
        <button className="collapsed d-block" role="button" data-toggle="collapse" id={`details_${id}`} href={`#details_${id}`} aria-expanded="false" aria-controls={`details_${id}`} id="heading-collapsed">
          Details
        </button>
        <div className="collapse" id={`details_${id}`} aria-labelledby="heading-collapsed">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Last Seen:<br />
                {last_seen}
              </li>
              <li className="list-group-item">
                Location:<br />
                {location}
              </li>
              <li className="list-group-item">
                Reward:<br />${reward}
              </li>
              <li className="list-group-item">
                Contact:<br />
                {email}
                <br />
                {phone}
              </li>
              <li className="list-group-item">{details}</li>
            </ul>
            <input className="editCodeBox" placeholder="Edit code" onChange={this.codeChecker} />
            <br />
            {edit_code}
          </div>
        </div>
      </div>;
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