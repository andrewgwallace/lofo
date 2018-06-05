import React, {Component} from "react";
import './ItemForm.css'
import axios from 'axios'
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class ItemForm extends Component {
    state = {
    date: moment()
  };

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
      returned,
      found,
      email,
      phone
    } = this.props.currentItem;
    this.props.editing
      ? axios
          .patch(`/api/items/${id}`, { ...this.props.currentItem })
          .then(result => {
            this.props.updateItems(result.data);
          })
      : axios.post(`/api/items`, { ...this.props.currentItem }).then(result => {
          this.props.updateItems(result.data);
        });
  };
  onChange = (e) => {
    this.props.editItem(e.target.name, e.target.value);
  };

  setDate = (date) => {
    this.setState({
      date: date
    });
  }
  
  render() {
    console.log(this.props.currentItem)
    const {
      img_link,
      title,
      details,
      last_seen,
      location,
      reward,
      edit_code,
      returned,
      found,
      email,
      phone
    } = this.props.currentItem;

    return <div className="row">
        <form className="col s12 Item" onSubmit={this.onSubmit}>
          {/* Form Header */}
          <h5>{this.props.editing ? "Update Item" : "Add Item"}</h5>
          {/* Select Dropdown and Edit Code */}
          <div className="row">
            <div className="input-field">
              <select>
                <option defaultValue="" disabled>
                  Choose your option
                </option>
                <option value="1">LOST</option>
                <option value="2">FOUND</option>
              </select>
            </div>
          </div>

          {/* TITLE */}

          <label htmlFor="title">What?</label>
          <input type="text" className="validate" onChange={this.onChange} value={title} required />
          <br />
          {/* DATE MISSING */}
          <label htmlFor="last_seen">When?</label>
          <DatePicker selected={this.state.date} onSelect={this.handleSelect} onChange={this.setDate} isClearable={true} />

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
          <label htmlFor="reward">Reward</label>
          <input type="text" name="reward" onChange={this.onChange} value={reward} />
          <br />
          {/* IMAGE LINK */}
          <label htmlFor="img_link">Image Link</label>
          <input type="text" name="img_link" onChange={this.onChange} value={img_link} placeholder="http://" required />
          <br />

          {/* DETAILS */}
        <label htmlFor="details">Details</label>
          <input type="text" name="details" onChange={this.onChange} value={details}/>
          <br />

          {/* BUTTONS (conditionally displayed) */}
          {this.props.editing ? <div>
              <button>Update</button>
              <button>Delete</button>
              <button>Cancel</button>
            </div> : <div>
              <button>Submit</button>
            </div>}
        </form>
      </div>;
  }
}

export default ItemForm
