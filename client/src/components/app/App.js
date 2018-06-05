import React, { Component } from 'react';
import Item from '../item/Item'
import ItemForm from '../item/ItemForm'
import './App.css';

class App extends Component {
  state = {
    items: [],
    editing: false,
    currentItem: {
      id: null,
      title: "",
      details: "",
      edit_code: "",
      reward: "",
      last_seen: "",
      location: "",
      found: false,
      returned: false,
      phone: "",
      img_link: ""
    }
  }

  updateItems = items => {
    this.setState({
      items: items,
      editing: false,
      currentItem: {
        id: null,
        title: "",
        details: "",
        edit_code: "",
        reward: "",
        last_seen: "",
        location: "",
        found: false,
        returned: false,
        phone: "",
        img_link: ""
      }
    });
  }

  updateItem = (attr, value) => {
    this.setState(
      { currentItem: { ...this.state.currentItem, [attr]: value } }
    )
  }
  editItem = id => {
    const item = this.state.items.find(i => i.id === id)
    this.setState({editing: true, currentItem: item})
  }

  componentWillMount = async () => {
    const response = await fetch('/api/items')
    const json = await response.json()
    if(json.items) this.setState({items: json.items})
  }

  

  render() {
    const items = this.state.items.map(item => {
      return (
        <Item 
        key={item.id}
        item={item} 
        updateItems={this.updateItems} 
        editItem={this.editItem}/>
      )
    });
    return <div className="App">
      <div className="container">
        <div className="row ItemForm">
          <ItemForm 
          editItem={this.editItem}
          updateItems={this.updateItems}
          currentItem={this.state.currentItem}
          editing={this.state.editing} />
        </div>
        <div className="row ItemsList">
          {items}
        </div>
      </div>
    </div>
  }
}

export default App;
