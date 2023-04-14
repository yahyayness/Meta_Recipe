import React from "react";
import lettuceWrapIcon from '../images/lettuce-wrap.png';
import stirFryIcon from '../images/stir-fry.png';
import carrotCakeIcon from '../images/carrot-cake.png';



export default function Menu({data , pickRecipe}) {

    const matchImg = (dish_name) => {
        if (dish_name.startsWith('Lettuce')) {
            return lettuceWrapIcon;
        } else if (dish_name.startsWith('Stir')) {
            return stirFryIcon;
        } else {//  == carrot 
            return carrotCakeIcon;
        }
    }

    return (
        <div className="container my-md-5 my-sm-1">

            <div className="card-deck justify-content-around">

                {

                    data.map(item =>
                        <div className="col-lg-3 offset-lg-0 col-md-4 offset-md-0 col-sm-8  offset-sm-1 " key={item.id} >
                            <div className="card my-3 text-center choice-card"  >
                                <div className="card-body p-1">
                                    <h5 className="card-title font-weight-bold m-1 my-purple" >{item.name}</h5>

                                    <small className="text-muted">
                                        <button type="button" className="btn p-1 " onClick={() => pickRecipe(item)}>
                                            <img src={matchImg(item.name)} alt="dish icon" style={{ height: "50%", width: "50%" }} />
                                        </button>
                                    </small>
                                </div>
                            </div>
                        </div>

                    )


                }
            </div>

        </div>
    )
}
