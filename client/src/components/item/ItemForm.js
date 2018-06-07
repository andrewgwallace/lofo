import React, {Component} from "react";
import './ItemForm.css'
import axios from 'axios'
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class ItemForm extends Component {

  onSubmit = e => {
    e.preventDefault();
    const {
      id,
      img_link,
      title,
      details,
      last_seen,
      location,
      reward,
      edit_code,
      email,
      phone
    } = this.props.currentItem;
    this.props.editing
      ? axios
          .patch(`/api/items/${id}`, { ...this.props.currentItem })
          .then(result => {
            this.props.updateItems(result.data);
          })
      : axios.post(`/api/items`, {
        img_link,
        title,
        details,
        last_seen,
        location,
        reward,
        edit_code,
        email,
        phone }).then(result => {
          this.props.updateItems(result.data);
        });
  };
  onChange = e => {this.props.updateItem(e.target.name, e.target.value)};

  setDate = (date) => {
    this.setState({
      date: date
    });
  }

  rewardVisibility = (e) => {
    e.target.value === "found" ?
      this.props.foundIsTrue()
      :
      this.props.foundIsFalse()
  }
  
  render() {
    const {
      img_link,
      title,
      details,
      last_seen,
      location,
      reward,
      edit_code,
      returned,
      email,
      phone
    } = this.props.currentItem;

    const {found} = this.props;

    return <div className="row">
        <form className="col s12 Item" onSubmit={this.onSubmit}>
          {/* Form Header */}
          <h5>{this.props.editing ? "Update Item" : "Add Item"}</h5>
          {/* Select Dropdown and Edit Code */}
          <div className="row">
            <div className="input-field">
              <select onChange={this.rewardVisibility}>
                <option defaultValue="" disabled>
                  Choose your option
                </option>
                <option value="lost">LOST</option>
                <option value="found">FOUND</option>
              </select>
              <p>Edit code: {edit_code}</p>
              {/* {
                this.props.currentItem.edit_code && this.props.currentItem.edit_code.length === 3 ?
                edit_code 
                :
                this.props.setEditCode()
              }
              </p> */}
            </div>
          </div>

          {/* TITLE */}

          <label htmlFor="title">What?</label>
          <input type="text" className="validate" name="title" onChange={this.onChange} value={title} required />
          <br />
          {/* DATE MISSING */}
          <label htmlFor="last_seen">When?</label>
          <input type="date" className="validate" name="last_seen" onChange={this.onChange} value={last_seen} required />
          <br />
          {/* <DatePicker selected={this.state.date} onSelect={this.handleSelect} onChange={this.setDate} isClearable={true} /> */}

          {/* LOCATION FOUND/LOST */}
          <label htmlFor="location">Where?</label>
          <input type="text" name="location" value={location} onChange={this.onChange} required />
          <br />

          {/* EMAIL */}
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={this.onChange} value={email} required />
          <br />

          {/* PHONE (optional) */}
          <label htmlFor="phone">Phone (optional)</label>
          <input type="text" name="phone" onChange={this.onChange} value={phone} />
          <br />

          {/* REWARD (conditionally displayed) */}
          {!this.props.found && <div>
              <label htmlFor="reward">Reward</label>
              <input type="text" name="reward" onChange={this.onChange} value={reward} />
              <br />
            </div>}

          {/* IMAGE LINK */}
          <label htmlFor="img_link">Image Link</label>
          <input type="text" name="img_link" onChange={this.onChange} value={img_link} placeholder="http://" />
          <br />

          {/* DETAILS */}
          <label htmlFor="details">Details</label>
          <textarea type="text" name="details" onChange={this.onChange} value={details} />
          <br />

          {/* BUTTONS (conditionally displayed) */}
          {this.props.editing ? 
          <div>
            <button type="submit">Update</button>
            <button type="submit">Delete</button>
            <button type="submit">Cancel</button>
          </div> 
          : 
          <div>
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
          }
        </form>
      </div>;
  }
}

export default ItemForm
