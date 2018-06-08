import React, {Component} from "react";
import './ItemForm.css'
import axios from 'axios'

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
      phone,
      returned
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
      id,
      img_link,
      title,
      details,
      last_seen,
      location,
      reward,
      edit_code,
      email,
      phone,
      returned
    } = this.props.currentItem;

    return <div>
        <form className="col s12 Item" onSubmit={this.onSubmit}>
          {/* Form Header */}
          <h5>{this.props.editing ? "Update Item" : "Add Item"}</h5>
          {/* Select Dropdown and Edit Code */}
        <div className="form-group">
            <div className="input-field">
              <select onChange={this.rewardVisibility}>
                <option defaultValue="" disabled>
                  Choose your option
                </option>
                <option value="lost">LOST</option>
                <option value="found">FOUND</option>
              </select>
              <p>Edit code: {edit_code}</p>
            </div>
         </div>

          {/* TITLE */}
          <div className="form-group">
            <label htmlFor="title">What?</label>
            <input type="text" className="validate" name="title" onChange={this.onChange} value={title} required />
          </div>
          <br />
          {/* DATE MISSING */}
        <div className="form-group">
          <label htmlFor="last_seen">When?</label>
          <input type="date" className="validate" name="last_seen" onChange={this.onChange} value={last_seen} required />
          <br />
        </div>

          {/* LOCATION FOUND/LOST */}
        <div className="form-group">
          <label htmlFor="location">Where?</label>
          <input type="text" name="location" value={location} onChange={this.onChange} required />
          <br />
        </div>

          {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={this.onChange} value={email} required />
          <br />
        </div>

          {/* PHONE (optional) */}
        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input type="text" name="phone" onChange={this.onChange} value={phone} />
          <br />
        </div>

          {/* REWARD (conditionally displayed) */}
          {!this.props.found && <div>
            <div className="form-group">
              <label htmlFor="reward">Reward</label>
              <input type="text" name="reward" onChange={this.onChange} value={reward} />
              <br />
            </div>
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
          {this.props.editing ? <div>
          <button style={{ marginRight: ".5em" }} onClick={this.props.itemReturned} className="btn btn-success">Returned</button>
          <button style={{ marginRight: ".5em" }} type="submit" value="Update" className="btn btn-primary">Update</button>
          <button style={{ marginRight: ".5em" }} onClick={() => this.onClick(id)} className="btn btn-danger">Delete</button>
          <button style={{ marginRight: ".5em" }} onClick={this.props.cancelEdit} className="btn btn-default">Cancel</button>
             
            </div> : <div>
              <input type="submit" value="Add" className="btn btn-primary" />
            </div>}
        </form>
      </div>;
  }
  onClick = id => {
    axios.delete(`/api/items/${id}`)
      .then((result) => { this.props.updateItems(result.data) }
      )
  }
}

export default ItemForm
