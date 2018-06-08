import React, { Component } from 'react';
import Item from '../item/Item'
import ItemForm from '../item/ItemForm'
import './App.css';
import Header from '../header/Header'



class App extends Component {
  state = {
    items: [],
    editing: false,
    found: false,
    currentItem: {
      id: null,
      title: "",
      details: "",
      edit_code: Math.random()
        .toString(36)
        .slice(2, 5)
        .toUpperCase(),
      reward: "",
      last_seen: "",
      location: "",
      returned: false,
      phone: "",
      img_link: ""
    }
  };

  updateItems = items => {
    this.setState({
      items: items,
      editing: false,
      found: false,
      currentItem: {
        id: null,
        title: "",
        details: "",
        edit_code: Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase(),
        reward: "",
        last_seen: "",
        location: "",
        phone: "",
        img_link: ""
      }
    });
  };

  cancelEdit = () => {
    this.setState({
      editing: false,
      currentItem: {
        id: null,
        title: "",
        details: "",
        edit_code: Math.random()
          .toString(36)
          .slice(2, 5)
          .toUpperCase(),
        reward: "",
        last_seen: "",
        location: "",
        returned: false,
        phone: "",
        img_link: ""
      }
    });
  };

  // isChecked = e => {
  //   if (e.target.checked) {
  //     this.itemReturned;
  //   }
  // };

  updateItem = (attr, value) => {
    this.setState({
      currentItem: { ...this.state.currentItem, [attr]: value }
    });
  };
  editItem = id => {
    const item = this.state.items.find(i => i.id === id);
    this.setState({ editing: true, currentItem: item });
  };

  componentWillMount = async () => {
    const response = await fetch("/api/items");
    const json = await response.json();
    if (json.items) this.setState({ items: json.items });
  };

  foundIsFalse = () => {
    this.setState({ found: false });
  };
  foundIsTrue = () => {
    this.setState({ found: true });
  };

  itemReturned = e => {
    e.preventDefault();
    console.log(`Current Item id is ${this.state.currentItem.id}`);
    const itemIndex = this.state.items.findIndex(itm => {
      console.log(itm);
      return itm.id === this.state.currentItem.id;
    });
    const newCurrentItem = { ...this.state.currentItem, returned: true };
    let newItems = [...this.state.items];
    newItems[itemIndex] = newCurrentItem;
    console.log(`The index is ${itemIndex}`);
    this.setState({
      currentItem: newCurrentItem,
      items: newItems
    });
  };

  render() {
    const items = this.state.items.map(item => {
      return (
        <Item
          key={item.id}
          item={item}
          editItem={this.editItem}
          updateItems={this.updateItems}
          unlockEdit={this.unlockEdit}
        />
      );
    });

    return (
      <div className="App">
        <Header />
        {/* // MAIN CONTENT AREA */}
        <div className="container-fluid">
          <div className="row">
            {/* ITEM FORM COLUMN */}
            <div className="col d-flex flex-column">
              <ItemForm
                editItem={this.editItem}
                updateItems={this.updateItems}
                updateItem={this.updateItem}
                currentItem={this.state.currentItem}
                editing={this.state.editing}
                foundIsFalse={this.foundIsFalse}
                foundIsTrue={this.foundIsTrue}
                cancelEdit={this.cancelEdit}
                itemReturned={this.itemReturned}
                found={this.state.found}
                isChecked={this.isChecked}
              />
            </div>{" "}
            {/* form */}
            {/* ITEMS LIST COLUMN */}
            <div className="col-8 justify-content-bottom">{items}</div>{" "}
            {/* items */}
          </div>{" "}
          {/* row */}
        </div>{" "}
        {/* container */}
      </div>
    );
  }
}

export default App;
