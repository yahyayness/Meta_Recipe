import React, { useState, useEffect } from "react";
import RadarChart from '../components/RadaerByData.js'
import LineChart from './LineChart.js'
import AmountSlider from '../components/AmountsSlider.js'
import ServiceApi from "../services/ServiceApi.js";
import { Collapse, Card, Spinner } from 'react-bootstrap';
import { std } from 'mathjs';

// ------- functions ------------------
import * as helper from './functions/control-functions'

// ------- icons ----------------------
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

// ------- constants ------------------
const DIGIT_AFTER_POINT = 100
const WATER_FACTOR = 0.1


export default function Control(props) {
    const pickedDiet = helper.customDietName(props.diet)
    const [pickedRecipe, setPickedRecipe] = useState(props.recipe);
    const [ingredients, setIngredients] = useState([]);
    const [originalIngredients, setOriginalIngredients] = useState([]);
    const [aromas, setAromas] = useState();
    const [tastes, setTastes] = useState();
    const [openDic, setOpenDic] = useState({});
    const [sustainableScore, setSustainableScore] = useState(0)
    const [aromaScore, setAromaScore] = useState(0)
    const [tasteScore, setTasteScore] = useState(0)
    const [showZeros, setShowZeros] = useState(false);
    const [metaRecipe, setMetaRecipe] = useState()
    const [envImpactAvgMetaReicpe, setEnvImpactAvgMetaReicpe] = useState()
    const [envImpact, setEnvImpact] = useState()

    const getRecipe = () => {
        ServiceApi.retrieveRecipe(pickedRecipe.id).then(data => {
            setMetaRecipe(data)
            setEnvImpactAvgMetaReicpe(data.env_impact_avg)
            setPickedRecipe(data);

            // find the choosed recipe
            for (const recipe of data.recipes) {
                if (recipe.diet === pickedDiet) {
                    setIngredients(helper.cateogryReduce(recipe.ingredients));
                    setOriginalIngredients(recipe.ingredients);


                }
            }
        })
            .catch(err => {
                console.log(err);
            });

    };


    useEffect(() => {
        getRecipe();
        getCategoryTitles();

    }, []);


    /**
     * For each ingredient the function calculate the aroma intesity by catogory (Mint, Woddy , etc.) and the avarage between 
     * all the recipe ingredient . It's build a dictionary with the final catogry avg value for the the Aroma intesity chart
     * And finally it's compute the one number score by standard deviation for Aroma score
     */
    const calculateAromasAvarge = () => {
        let size = Object.keys(ingredients).length;
        
        if (size > 0) {

            const aromasAvg = {};
            const flatIngs = Object.values(ingredients).flat()
            const avgFactor = 1 / flatIngs.length;

            flatIngs.forEach(ing => {
                // if (ing.value > 0) {  // ing == 0 <=> zero the equation
                    let factor = helper.noramlizeValue(ing.value, ing.min, ing.max);

                    // filter out none arome data:
                    let { entity_id, entity_alias_readable, ...aromaVals } = ing.aromas;

                    // analyze avg data
                    for (const [key, val] of Object.entries(aromaVals)) {
                        if (key in aromasAvg) {
                            aromasAvg[key] += helper.computeAromaScore(val, factor) * avgFactor;
                        } else {
                            aromasAvg[key] = helper.computeAromaScore(val, factor) * avgFactor;
                        }
                    }
                // }
            });

            helper.roundDict(aromasAvg);
            setAromaScore(helper.roundNumber(std(Object.values(aromasAvg), 'uncorrected')));
            setAromas(aromasAvg);
        }
    };


    /**
    * For each ingredient the function calculate the Taste intesity by catogory (Salty, Sour, etc.) and the avarage between 
    * all the recipe ingredient . It's build a dictionary with the final catogry avg value for the the Taste intesity chart
    * And finally it's compute the one number score by standard deviation for Taste score
    */
    const calculateTasteAvarge = () => {
        let size = Object.keys(ingredients).length;
        if (size > 0) {

            const tasteAvg = {};
            const flatIngs = Object.values(ingredients).flat()
            const avgFactor = 1 / flatIngs.length;

            flatIngs.forEach(ing => {
                // if (ing.value > 0) { // ing == 0 <=> zero the equation
                    let factor = helper.noramlizeValue(ing.value, ing.min, ing.max);

                    // filter out none arome data:
                    let { entity_id, taste_name, ...tasteVals } = ing.tastes;

                    // analyze avg data
                    for (const [key, val] of Object.entries(tasteVals)) {
                        if (key in tasteAvg) {
                            tasteAvg[key] += (helper.computeTasteScore(val / 10, factor) * avgFactor);
                        } else {
                            tasteAvg[key] = helper.computeTasteScore(val / 10, factor) * avgFactor
                        }
                    }
                // }
            });

            helper.roundDict(tasteAvg);
            setTasteScore(helper.roundNumber(std(Object.values(tasteAvg), 'uncorrected')));
            setTastes(tasteAvg);
        }
    };



    /**
     * For each ingredient the function calculate the Environmental Impact by catogory (land_use, ghg , etc.) and the avarage between 
     * all the recipe ingredient . It's build a dictionary with the final catogry avg value for the  Environmental Impact chart
     */
    const calculateEnvImpact = () => {
        if (envImpactAvgMetaReicpe) {


            // init dict for new Environmental Impact score
            const newEnvImpact = {
                "land_use": 0,
                "ghg": 0,
                "acid": 0,
                "eutrophy": 0,
                "freshwater": 0,
            }

            const flatIngs = Object.values(ingredients).flat()
            // culclate by new value
            flatIngs.forEach(ing => {
                // if (ing.value > 0) {
                    let factor = helper.noramlizeValue(ing.value, ing.min, ing.max);
                    let envImpactData = ing.env_impact;

                    newEnvImpact['land_use'] += helper.computeEnvImpactScore(envImpactData.land_use, factor, ing.unit_convertor_g);
                    newEnvImpact['ghg'] += helper.computeEnvImpactScore(envImpactData.ghg_emissions, factor, ing.unit_convertor_g);
                    newEnvImpact['acid'] += helper.computeEnvImpactScore(envImpactData.acidifying_emissions, factor, ing.unit_convertor_g);
                    newEnvImpact['eutrophy'] += helper.computeEnvImpactScore(envImpactData.eutrophying_emissions, factor, ing.unit_convertor_g);
                    newEnvImpact['freshwater'] += (helper.computeEnvImpactScore(envImpactData.freshwater_withdrawals, factor, ing.unit_convertor_g) * WATER_FACTOR);
                // }
            });

            // round values:
            helper.roundDict(newEnvImpact)

            // send the result
            setEnvImpact(newEnvImpact)

        }

    };

    /**
     *  build a hepler object (dict) with the ingredint's category title, for Show/Hide zere btn
     */

    const getCategoryTitles = () => {
        let categoryDic = {}

        if (ingredients.length !== 0) {
            for (const categoryTitle of Object.keys(ingredients)) {
                categoryDic[categoryTitle] = false;
            }
            setOpenDic(categoryDic);

        }
    }
/**
 * It's compute the one number scorre for Sustiable score by avg of gap between metercipe and dish footprint values
 */
    const calculateSustainbleScore = () => {
        if (envImpactAvgMetaReicpe && envImpact) {
            let sum = 0;
            for (const key of Object.keys(envImpact)) {
                sum += ((envImpact[key] - envImpactAvgMetaReicpe[key]) * 0.2);
            }

            setSustainableScore(Math.round(sum * DIGIT_AFTER_POINT) / DIGIT_AFTER_POINT);
        }
    }



    useEffect(() => {
        calculateAromasAvarge();
        calculateTasteAvarge();
        calculateEnvImpact();
    }, [ingredients, metaRecipe, envImpactAvgMetaReicpe])


    useEffect(() => {
        calculateSustainbleScore()

    }, [envImpactAvgMetaReicpe, envImpact])


    useEffect(() => {
        getCategoryTitles()
    }, []);

/**
 *  update the new value for the ingredient by user request
 * @param {float} val = number in [0,1]
 * @param {int} id = id of ingredient in recipe
 * @param {string} cat = category name
 */
    const handleIngValChange = (val, id, cat) => {
        
        let c = ingredients[cat].map(ing => {
            return (
                ing.id === id
                    ? { ...ing, value: val }
                    : ing
            )
        })
        setIngredients({ ...ingredients, [cat]: c })

    }

    return (
        <div className="container-fluid ">

            {aromas && envImpact && envImpactAvgMetaReicpe && tastes && ingredients ?
                <div>


                    <div className="row">
                        <div className="col-lg-3 ">
                            <div className="row  justify-content-start mb-2" >
                                <div onClick={() => setIngredients(helper.cateogryReduce(originalIngredients))}
                                    className="mr-1 ml-3 my-1 pt-1 px-3 control-btn">Reset
                                    </div>
                                <div className="mx-1 my-1 pt-1 px-3 control-btn"
                                    onClick={() => setShowZeros(!showZeros)}>{showZeros ? 'Hide ' : 'Show '}Zeros
                                </div>
                            </div>
                            <div className="" style={{ height: '62vh', overflowY: 'auto', overflowX: 'hidden' }}>

                                <div className='row mx-0 mt-0'  >
                                    <div className="col-1 px-0 font-weight-bold  align-self-strech side-title">
                                        Ingredients
                                    </div>
                                    <div className="col-11 mx-0 px-0">
                                        {
                                            ingredients && Object.entries(ingredients).map(([cat, val]) => {
                                                return (
                                                    <Card key={cat} className="border-left  rounded-right" >
                                                        <Card.Header className=" list-group-item d-flex border-left-0 rounded-right
                                                    align-items-center justify-content-between text-capitalize "
                                                            style={{
                                                                border: "1px solid var(--secondary)",
                                                                backgroundColor: "var(--light)"
                                                            }}
                                                            onClick={() => setOpenDic(openDic => ({
                                                                ...openDic,
                                                                [cat]: !openDic[cat]
                                                            }))}
                                                            aria-controls={cat}
                                                            aria-expanded={openDic[cat]}>
                                                            <div>
                                                                <img src={helper.matchImg(cat)} alt="logo" style={{ height: '10%', width: '10%' }} />
                                                                <span className='mx-3'>
                                                                    {cat}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                {openDic[cat] ? <RiArrowDropUpLine className="h4" /> : <RiArrowDropDownLine className="h4" />}
                                                            </div>
                                                        </Card.Header >
                                                        <Collapse in={openDic[cat]}>

                                                            <ul id={cat} className="list-group list-group-flush rounded-right">
                                                                {
                                                                    val.map(ing =>
                                                                        <li className={"list-group-item  justify-content-between rounded-right align-items-center text-capitalize  px-0"
                                                                            + (showZeros || ing.value > 0 ? "d-flex" : " d-none")}
                                                                            key={ing.id}
                                                                            style={{
                                                                                borderBottom: "1px solid var(--secondary)",
                                                                                borderRight: "1px solid var(--secondary)",
                                                                            }}
                                                                        >
                                                                            <div className="row px-0 mx-0 justify-content-between  align-items-center">
                                                                                <div className="col-6 px-0 mx-0">
                                                                                    {ing.name}
                                                                                </div>
                                                                                <div className="col-6 px-0 mx-0">
                                                                                    <div className="row px-0 mx-0 justify-content-end  align-items-center">
                                                                                        <div className="col px-0 mx-0   align-items-center">
                                                                                            <div style={{ float: 'right' }}>
                                                                                                <u>{helper.noramlizeValue(ing.value, ing.min, ing.max)}</u>{ing.unit === "g" ? "gr" : ing.unit}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col justify-content-end px-0 mx-0">
                                                                                            <AmountSlider ingredient={ing} val={ing.value}
                                                                                                onChange={(val) => handleIngValChange(val, ing.id, cat) }
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                            </ul>
                                                        </Collapse>



                                                    </Card>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div>
                                <div className="row justify-content-around">
                                    <div className="col-lg-3 ">
                                        <div className=" font-weight-bold my-2  text-center text-break align-self-strech my-title" style={{


                                        }}>Aroma{'\u00A0'}Intensity</div>
                                        <div className=" mx-0 px-0">
                                            < RadarChart data={aromas} title={"Aroma Intensity"} suggestedMax={metaRecipe.aroma_max * 1.5} />
                                        </div>
                                        <div className="col-12  text-center">
                                            <img className="" src={helper.aromaIndication(aromaScore)} style={{ height: "13vh", width: "13vh", }} alt='logo' />
                                            <div className="d-flex justify-content-center">
                                                <p className={"d-flex font-weight-bold px-2 my-1  my-title"}>

                                                    Aroma: {aromaScore}
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col-lg-3 text-center">
                                        <div className=" font-weight-bold my-2  text-center  align-self-strech my-title" >Taste{'\u00A0'}Intensity</div>
                                        <div className=" mx-0 px-0">
                                            < RadarChart data={tastes} title={"Taste Intensity"} suggestedMax={metaRecipe.taste_max * 1.5}  />
                                        </div>
                                        <div className="col-12  text-center">
                                            <img className="" src={helper.tasteIndication(tasteScore)} style={{ height: "13vh", width: "13vh", }} alt='logo' />
                                            <div className="d-flex justify-content-center">
                                                <p className={"d-flex font-weight-bold px-2 my-1 my-title "}>

                                                    Taste: {tasteScore}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 ">
                                        <div className=" font-weight-bold my-2  text-center text-break align-self-strech my-title">
                                            Environmental Impact
                                        </div>
                                        <div className=" mx-0 px-0">
                                            < LineChart
                                                dynamicEnvImpact={envImpact}
                                                envImpactAvg={envImpactAvgMetaReicpe}
                                                suggestedMax = {metaRecipe.env_impact_max * 1.5}
                                            />
                                        </div>
                                        <div className="col-12  align-self-end text-center mt-2">
                                            <img className="" src={helper.sustaibleIndication(sustainableScore)} style={{ height: "17vh", width: "12.5vh", }} alt='logo' />
                                            <div className="d-flex justify-content-center">
                                                <p className={"d-flex font-weight-bold px-2 my-1 my-title "}>

                                                    Sustaible: {sustainableScore}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                :
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>}


        </div >
    );
};