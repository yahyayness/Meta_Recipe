import React, { Component } from 'react';
import '../css/apts.css';
// import Chart from './BasicChart.js';

import { FaTimes } from 'react-icons/fa';
//import Moment from 'react-moment'


// css if apts.css only on ingerdientLost
// date format using react-moment


class IngredientList extends Component {



    render() {



        return (
            <div>
                <div className="appointment-list item-list mb-3">
                    {
                        Object.entries(this.props.ingredients_aroma)
                            .filter(([key, value]) =>
                                value.entity_alias_readable.toLowerCase().match(this.props.filter.toLowerCase()) && true)
                            .map(([key, value]) =>
                                <div className="pet-item col media py-3" key={value.entity_id}>
                                    <div className="mr-3">
                                        <button className="pet-delete btn btn-sm btn-danger"><FaTimes /></button>
                                    </div>

                                    <div className="pet-info media-body">
                                        <div className="pet-head d-flex">
                                            <span className="pet-name">{value.entity_id} -- {value.entity_alias_readable}  </span>
                                        </div>

                                        <div className="owner-name container">
                                            Citrus: {value.Citrus}
                                           
                                             {/* <Chart urlData= {value.url.slice(-10)}  /> */}
                                        </div>

                                    </div>
                                </div>
                            )}
                </div>
            </div>
        )
    }
}


export default IngredientList;