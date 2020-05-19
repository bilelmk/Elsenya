import React from "react";
import "./VegetablesChoice.scss"
import Zoom from "react-reveal/Zoom";

const content = [
    ["Choux", "كرمب", "01-janv", "31-janv"],
    ["Haricots",	"لوبيا",	"15-janv",	"31-janv"],
    ["Pomme de terre",	"بطاطا"	,"15-janv",	"28-févr"],
    ["Tomate"	,"طماطم",	"15-janv"	,"28-févr"],
    ["Piment",	"فلفل" ,	"15-janv"	, "15-mars"],
    ["Aubergine"	,"بدنجان",	"01-févr" ,	"15-févr"],
    ["Laitue"	,"خس"	,"01-févr",	"28-févr"],
    ["Haricots",	"لوبيا",	"15-févr"	,"15-avr"],
    ["Courgette"	, "قرع  بوطزينة",	"15-févr",	"30-avr"],
    ["Melon",	"بطيخ",	"01-mars"	,"15-avr"],
    ["Choux"	,"كرمب",	"01-mars"	,"30-avr"],
    ["Concombre"	,"خيار"	,"01-mars"	,"30-avr"],
    ["Courge"	,"قرع",	"15-mars"	,"15-avr"],
    ["Pastéque" ,	"دلاع",	"15-mars"	,"15-avr"],
    ["Choux",	"كرمب"	,"01-mai"	,"30-juin"],
    ["Artichaut"	,"قنارية",	"15-juil",	"15-août"],
    ["Courgette",	"قرع بوطزينة",	"15-juil",	"15-août"],
    [ "Laitue",	"خس"	,"15-juil"	,"15-août"],
    ["Tomate"	,"طماطم"	,"15-juil",	"15-août"],
    ["Fenouil",	"بسباس"	,"15-juil",	"15-sept"],
    ["Concombre",	"خيار",	"01-août"	, "30-sept"],
    [ "Aubergine"	,"بدنجان",	"01-août",	"15-nov"],
    ["Pomme de terre",	"بطاطا" ,	"15-août"	,"15-oct"],
    ["Piment"	,"فلفل" ,	"15-août"	,"31-oct"],
    [ "Haricots"	,"لوبيا"	,"01-sept"	,"15-oct"],
    [ "Oignon",	"بصل"	,"01-sept"	,"15-oct"],
    [ "Choux",	"كرمب"	,"01-sept",	"31-oct"],
    [ "Epinard",	"سبناخ",	"01-sept",	"30-nov"],
    [ "Ail",	"ثوم",	"15-sept"	,"15-nov"],
    [ "Tomate",	"طماطم",	"15-sept",	"30-nov"],
    [ "Pois"	,"جلبانة",	"15-sept",	"15-déc"],
    [ "Concombre"	,"خيار",	"01-oct",	"31-janv"],
    [ "Fraises"	,"فراولة"	,"15-oct",	"15-déc"],
    [ "Courgette"	,"قرع بوطزينة"	,"15-nov",	"15-janv"],
    [  "Pomme de terre",	"بطاطا",	"15-nov",	"15-janv"],
    [  "Melon",	"بطيخ"	,"15-déc"	,"15-févr"],
];




function VegetablesChoice() {
    return <Zoom>
                <div className={"choice-content"}>
                    <h2>اختيار الخضر</h2>
                    <p>لتنجح في زراعة الخضر, لا بد من احترام أوقات الزراعة ليكون الطقس مناسبا للنباتات, و فيما يلي جدول أوقات زراعة بعض الخضر و الغلال في تونس على امتداد السنة</p>
                    <p className={"center"}><span>جدول أوقات زراعة بعض الخضر و الغلال في تونس</span></p>

                    <table className="choice-table">
                        <tr className="choice-tr">
                            <th className="choice-th">Fruits et légumes</th>
                            <th className="choice-th">De</th>
                            <th className="choice-th">à</th>
                        </tr>
                        {content.map( ligne => {
                            return <tr className="choice-tr">
                                <td className="choice-td">
                                    {ligne[0]}
                                    <span className={"margin-left"}>{ligne[1]} </span>
                                </td>
                                <td className="choice-td">
                                    {ligne[2]}
                                </td>
                                <td className="choice-td ">
                                    {ligne[3]}
                                </td>
                            </tr>
                        })}
                    </table>
                </div>
            </Zoom>
}

export default VegetablesChoice ;
