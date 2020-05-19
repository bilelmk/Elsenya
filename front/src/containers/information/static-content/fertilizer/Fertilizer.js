import React from "react";
import "./Fertilizer.scss"
import Zoom from "react-reveal/Zoom";

function Fertilizer() {
    return <div>
            <Zoom>
                <div className="fer-content">
                    <h2> طريقة عمل سماد طبيعي في المنزل</h2>
                    <p>
                        توفير اناء مثقوب من الأسفل و من المحيط لتوفير التهوية اللازمة و تستعمل الفضلات التالية حسب الترتيب الموضح في الصورة
                    </p>
                    <table className={"fer-table"}>
                        <tr className={"fer-tr"}>
                            <th className={"fer-th"}>أمثلة</th>
                            <th className={"fer-th"}>الفضلات</th>
                        </tr>
                        <tr className={"fer-tr"}>
                            <td  className={"fer-td"}>قشور موز مجففة, أوراق أشجار ميتة, ورق جرائد...</td>
                            <td className={"fer-td"}>فضلات بنية غنية بالكربون ( البقايا الميتة )</td>
                        </tr>
                        <tr className={"fer-tr"}>
                            <td className={"fer-td"}>أوراق البصل, أوراق السلق و المعدنوس, قشرة البيض...</td>
                            <td className={"fer-td"}>فضلات خضراء غنية بالنيتروجين (بقايا الطعام)</td>
                        </tr>
                    </table>
                    <p>
                        ثم ترتب الفضلات في الوعاء على طبقات مع ضرورة أن تكون الطبقتين العلوية و السفلية مكونة من فضلات بنية
                    </p>
                    <table className={"fer-table"}>
                        <tr><td  className={"fer-td"} >نجارة الخشب (قشار)</td></tr>
                        <tr><td  className={"fer-td"}>قشور الغلال</td></tr>
                        <tr><td  className={"fer-td"}>كرتون (كرادن)</td></tr>
                        <tr><td  className={"fer-td"}>قشور البيض </td></tr>
                        <tr><td  className={"fer-td"}>تبن (قرط)</td></tr>
                        <tr><td  className={"fer-td"}>بقايا الخضر </td></tr>
                        <tr><td className={"fer-td"} >ورق الجرائد</td></tr>
                    </table>
                    <p>
                        ثم تقوم بتقليب الخلطة كل 3 أيام و رشها بالمياه للمحافظة على رطوبتها لتحصل على سماد طبيعي خلال بضعة أسابيع
                    </p>
                </div>
                <img src="/assets/fertilizer.png" className="fer-img" />
            </Zoom>
    </div>
}


export default Fertilizer ;
