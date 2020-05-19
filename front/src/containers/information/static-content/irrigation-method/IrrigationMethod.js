import React from "react";
import "./IrrigationMethod.scss"
import Zoom from "react-reveal/Zoom";

function IrrigationMethod() {
    return <div>
            <Zoom>
                <div className="irr-content">
                <h2>طريقة الري</h2>
                <p>
                    تتأكد من احتياج النبتة للري عند لمس التربة في الاناء. اذا التصقت التربة باصبعك فهي رطبة و لا تحتاج للري, و اذا لم تلتصق فهي جافة و بحاجة للري. الوقت المثالي للري هو المساء (بعد الظهيرة) أو في الصباح الباكر.
                    <br/>
                    لا بد من تجنب ري النبتة عندما تكون معرضة للشمس أو عند ارتفاع درجة الحرارة لأن ذلك قد يسبب اتلاف أوراقها.


                </p>
                </div>
                <img src="/assets/irrigation method.jpg" className="irr-img" />
            </Zoom>
        </div>
}
export default IrrigationMethod ;
