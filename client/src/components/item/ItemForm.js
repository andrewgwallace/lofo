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
          <h3>{this.props.editing ? "Update Item" : "Add Item"}</h3>
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
            {/* <label htmlFor="title">What?</label> */}
            <input type="text" placeholder="What?" className="validate form-control" name="title" onChange={this.onChange} value={title} required />
          </div>

          {/* DATE MISSING */}
          <div className="form-group">
            {/* <label htmlFor="last_seen">When?</label> */}
            <input type="date" className="validate form-control" name="last_seen" onChange={this.onChange} value={last_seen} required />
          </div>

          {/* LOCATION FOUND/LOST */}
          <div className="form-group">
            {/* <label htmlFor="location">Where?</label> */}
            <input className="validate form-control" placeholder="Where?" type="text" name="location" value={location} onChange={this.onChange} required />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input className="validate form-control" placeholder="Email" type="email" name="email" onChange={this.onChange} value={email} required />
          </div>

          {/* PHONE (optional) */}
          <div className="form-group">
            {/* <label htmlFor="phone">Phone (optional)</label> */}
            <input className="validate form-control" placeholder="Contact Number (optional)" type="text" name="phone" onChange={this.onChange} value={phone} />
          </div>

          {/* REWARD (conditionally displayed) */}
          {!this.props.found && <div>
              <div className="form-group">
                <input className="validate form-control" placeholder="Reward (optional)" type="text" name="reward" onChange={this.onChange} value={reward} />
              </div>
            </div>}

          {/* IMAGE LINK */}
          <label htmlFor="img_link">Image Link</label>
          <input className="validate form-control" type="text" name="img_link" onChange={this.onChange} value={img_link} placeholder="http://" />

          {/* DETAILS */}
          {/* <label htmlFor="details">Details</label> */}
          <textarea className="validate form-control" placeholder="Details" type="text" name="details" onChange={this.onChange} value={details} />

          {/* BUTTONS (conditionally displayed) */}
          {this.props.editing ? <div>
              <button onClick={this.props.itemReturned} className="btn btn-lg btn-space btn-success">
                Returned
              </button>
              <button type="submit" value="Update" className="btn btn-lg btn-space btn-primary">
                Update
              </button>
              <button onClick={() => this.onClick(id)} className="btn btn-lg btn-space btn-danger">
                Delete
              </button>
              <button onClick={this.props.cancelEdit} className="btn btn-lg btn-space btn-default">
                Cancel
              </button>
            </div> : <div>
            <button type="submit" value="Add" className="btn btn-lg btn-space btn-primary">Add</button>
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
