import React from "react";
import CultivationPlace from "./cultivation-place/CultivationPlace";
import Recycling from "./recycling/Recycling";
import SoilType from "./soil-type/SoilType";
import Fertilizer from "./fertilizer/Fertilizer";
import VegetablesChoice from "./vegetables-choice/VegetablesChoice";
import IrrigationMethod from "./irrigation-method/IrrigationMethod";

function StaticContent(props) {
    return <div>
                { props.id ? (
                    props.id === 9 ? <CultivationPlace/> :
                    props.id === 10 ? <Recycling/> :
                    props.id === 11 ? <SoilType/> :
                    props.id === 12 ? <Fertilizer/> :
                    props.id === 13 ? <VegetablesChoice/> :
                    props.id === 14 ? <IrrigationMethod/> : ""
                ) : "" }
        </div>
}

export default StaticContent ;
