import React, { useState, useEffect } from "react";
import Menu from '../components/Menu.js';
import DietRestriction from '../components/DietRestriction.js';
import Control from '../components/Control.js';
import ServiceApi from "../services/ServiceApi.js";
import { Spinner } from 'react-bootstrap';
import TopPanel from "../components/TopPanel.js";


export default function RecipePreferences() {
    const [title, setTitle] = useState("Menu");
    const [choosedRecipe, setchoosedRecipe] = useState(null);
    const [choosedDiet, setChoosedDiet] = useState(null);
    const [menu, setMenu] = useState();
    const [step, setStep] = useState("menu");


    useEffect(() => {
        const getMenu = async () => {
            ServiceApi.retrieveMenu().then(data => {
                setMenu(data);
            })
                .catch(err => {
                    console.log(err);
                });

        };
        getMenu();
    }, []);


    const pickRecipe = (recipe) => {
        setchoosedRecipe(recipe);
        setTitle("Diet");
        setStep("diet")
    }

    const dietCLick = (diet) => {
        setChoosedDiet(diet);
        setTitle("Dish");
        setStep("dish")

    }

    const restart = () => {
        setchoosedRecipe(null);
        setChoosedDiet(null)
        setTitle("Menu");
        setStep("menu");

    }

    const replaceDiet = () => {
        if (choosedRecipe) {
            setChoosedDiet(null);
            setTitle("Diet");
            setStep("diet")
        }

    }


    return (
        <div>
            <TopPanel restart={restart} replaceDiet={replaceDiet} step={step} />
            <div className="container-fluid">

                <header className={"text-center mt-3 " + (title !== 'Dish' ? 'mb-md-1 mb-sm-1 ' : '') } >

                    <div
                        className={"display-4   align-self-center   text-uppercase font-weight-bold  " }
                        style={{ color: "var(--secondary)" }}>
                        {title}
                    </div>
                    <div style={{ color: "var(--secondary)" }}>
                        <h3>
                            {choosedRecipe && choosedRecipe.name}  {choosedDiet && '\u0026'} {choosedDiet && choosedDiet}
                        </h3>

                    </div>
                </header>


            </div>
            <div>
                {!menu && <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>}
                {!choosedRecipe && menu &&
                    <Menu data={menu} pickRecipe={pickRecipe} />
                }
                {choosedRecipe && menu && !choosedDiet && <DietRestriction dietCLick={dietCLick} />}
                {choosedRecipe && menu && choosedDiet && <Control recipe={choosedRecipe} diet={choosedDiet} />}
            </div>
        </div>

    )
}
