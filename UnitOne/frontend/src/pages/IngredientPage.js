import React, { Component } from 'react';
import IngredientList from '../components/IngredientList.js'
import { FaUndo } from 'react-icons/fa'

class IngredientPage extends Component {

  constructor() {
    super();
    this.state = {
      myName: 'Noam',
      ingredients_aroma: [],
      searchQuery: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);

  }


  async componentDidMount() {
    fetch('/aromas/')
    .then(response => response.json())
    .then(data => this.setState({ ingredients_aroma: data }));

    // const path = '../../data/aromas_up_to_1050.json';
    // const response = await fetch(path);
    // const data = await response.json();
    // this.setState({ ingredients_aroma: data });
  }


  handleChange(e) {

    const itemName = e.target.name;
    const itemVal = e.target.value;

    this.setState({ [itemName]: itemVal });

  }


  resetQuery() {
    this.setState({
      searchQuery: ''
    });
  }

  render() {


    return (
      <div>
        <div className="display-4 text-primary mt-3 mb-2">
          Ingredient Page
                </div>
        <div className="card bg-light mb-4">
          <div className="card-body text-center">
            <div className="input-group input-group=lg">
              <input type="text" name="searchQuery" placeholder=" Search ingerdient name ..."
                className="form-control" value={this.state.searchQuery} onChange={this.handleChange} />
              <div className="input-group-append">
                <button className="btn btn-sm btn-outline-info" title="Reset search" onClick={() => this.resetQuery()}>
                  <FaUndo />
                </button>
              </div>
            </div>
          </div>
        </div>
        <IngredientList ingredients_aroma={this.state.ingredients_aroma} filter={this.state.searchQuery} />

      </div>

    )
  }
}

export default IngredientPage;



