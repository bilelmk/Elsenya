import React from "react";
import "./SoilType.scss"
import Zoom from "react-reveal/Zoom";

function SoilType() {
    return <div>
            <Zoom>
                <div className={"soil-content"}>
                    <h2>
                        نوع التربة</h2>
                    <p>
                        هنالك بعض العناصر الأساسية لتغذية النباتات, و أهمها جودة التربة التي يجب أن تكون غنية بالمغذيات و لا تمثل عائقا لنمو الجذور
                    </p>
                    <p>
                        <span>أنواع التربة المتوفرة هي</span>
                    </p>
                    <table className={"soil-table"}>
                        <tr className="soil-tr">
                            <th className="soil-th">السلبيات</th>
                            <th className="soil-th">الايجابيات</th>
                            <th className="soil-th">النوع</th>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td"> يمكن أن يصبحا متماسكا بعد ري النبتة بالمياه و بالتالي يمنع الجذور من النمو</td>
                            <td className="soil-td">غنية بالمغذيات اللازمة للنبتة</td>
                            <td className="soil-td">التربة الطينية (التراب الأحمر)</td>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td"> لا يحتوي على المغذيات الكافية لنمو النبتة </td>
                            <td className="soil-td">  لا يمثل عائقا أمام الجذور</td>
                            <td className="soil-td">الرمل</td>
                        </tr>
                    </table>

                    <p>
                        و بالإضافة للتربة و الرمل, استعمال السماد الطبيعي سواء كان منزلي و الا من مصدر حيواني ضروري لتغذية النبتة.
                        لذلك, بعض الخلطات تساهم في توفير التربة الملائمة لنمو النبتة من خلال استغلال إيجابيات كل نوع
                    </p>
                    <p>
                        <span>الخلطة الأولى</span>
                    </p>

                    <table className={"soil-table"}>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                تربة طينية (تراب أحمر)
                            </td>
                            <td className="soil-td">
                                1/3
                            </td>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                رمل
                            </td>
                            <td className="soil-td">
                                1/3
                            </td>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                سماد نباتي
                            </td>
                            <td className="soil-td">
                                1/3
                            </td>
                        </tr>
                    </table>

                    <p>
                        <span> الخلطة الثانية: خاصة بالنباتات التي يتم استهلاك جذورها (بطاطا, بصل, ثوم...)</span>
                    </p>

                    <table className={"soil-table"}>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                تربة طينية (تراب أحمر)
                            </td>
                            <td className="soil-td">
                                1/5
                            </td>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                رمل
                            </td>
                            <td className="soil-td">
                                2/5
                            </td>
                        </tr>
                        <tr className="soil-tr">
                            <td className="soil-td">
                                سماد نباتي
                            </td>
                            <td className="soil-td">
                                2/5
                            </td>
                        </tr>
                    </table>
                </div>
                <img src="/assets/soil type.jpg" className="rec-img" />
            </Zoom>

        </div>
}

export default SoilType ;
