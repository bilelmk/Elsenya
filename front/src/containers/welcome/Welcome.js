import React from "react";
import Carousel from "./carousel/Carousel";
import Zoom from 'react-reveal/Zoom';
import "./Welcome.scss" ;

function Welcome()  {

    return (
        <div >
            <Carousel/>
            <div className={"welcome"}>

                    <div className={"site"}>
                        <Zoom>
                            <div className={"site-description"}>
                                <h2>وصف الموقع</h2>
                                <p> تم انجاز هذا الموقع في اطار مشروع "السانية" لجمعية حماية البيئة بقصيبة المديوني بالشراكة مع منظمة</p>
                                <p className={"bold"}>Heinrich-Böl-Stiftung, Tunisie Tunis</p>
                                <p>و نهدف من خلاله الى التعريف بالزراعة الحضرية و انعكاساتها البيئية و الاقتصادية و المساهمة في تكريسها كتقليد جديد بمختلف المدن التونسية</p>
                                <img className={"hbs-image"} src="/assets/hbs.png" alt="hbs logo" />
                            </div>
                        </Zoom>

                    </div>

                    <div className={"elsenya"}>
                        <div className={"elsenya-image"}>
                            <Zoom><img className={"image"} src="/assets/senia logo.png" alt="senia logo" /></Zoom>
                        </div>
                        <div className={"elsenya-description"}>
                            <Zoom>
                                <h2>مشروع السانية</h2>
                                <p>
                                    هو تحد على الانترنات بين المواطنين لتشجيعهم على الزراعة في منازلهم (في الحديقة،على الاسطح، في الشرفة...).
                                    نهدف من خلال هذا المشروع إلى إنشاء شبكة لتبادل الأفكار والخبرات بين المواطنين خاصة في مجال الزراعة في المنازل لتحقيق ثقافة وعادات بيئية جديدة  ، كذلك رفع مستوى الوعي بأهمية الزراعة الحضرية و التنمية المستدامة على البيئة والاقتصاد والصحة.
                                    يمكنكم المشاركة في مجموعة السانية على الفايسبوك لتبادل الأفكار و التجارب

                                </p>
                            </Zoom>
                        </div>
                    </div>

                    <div className={"apek"}>

                        <div className={"apek-description"}>
                            <Zoom>
                                <h2>جمعية حماية البيئة بقصيبة المديوني</h2>
                                <p>
                                    جمعية حماية البيئة بقصيبة المديوني هي جمعية بيئية, ثقافية و شبابية.
                                    تاسست الجمعية سنة 2014 و تضم مجموعة من الشباب تتراوح اعمارهم بين 16 و 27 سنة . عنوان المقر الرئيسي للجمعية هو المحل الكائن بالساحة الداخلية لمقام سيدي عبد الله المديوني, قصيبة المديوني, 5031 – المنستير
                                    . تسعى الجمعية لنشر الوعي البيئي للانسجام مع الطبيعة و مهمتها تكوين و تأطير الشباب من أجل انجاز مشاريع و أنشطة ذات تأثير ايجابي على المدينة و على الوضعية البيئية محليا, جهويا و وطنيا

                                </p>
                            </Zoom>
                        </div>

                        <div className={"apek-image"}>
                            <Zoom><img className={"image"} src="/assets/gris.png" alt="apek logo" /></Zoom>
                        </div>
                    </div>

                    <div className={"elsenya"}>
                        <div className={"elsenya-image"}>
                            <Zoom><img className={"image"} src="/assets/but.png" alt="senia logo" /></Zoom>
                        </div>
                        <div className={"elsenya-description"}>
                            <Zoom>
                                <h2>أهداف الجمعية</h2>
                                <ul>
                                    <li>توعية المواطنين و خاصة الأطفال و الشباب</li>
                                    <li>التكثيف من المناطق الخضراء</li>
                                    <li>إدخال تقاليد بيئية جديدة في المدينة, مثل فرز و رسكلة النفايات و استعمال الطاقات البديلة</li>
                                    <li>                                        القيام بدراسات في المناطق الملوثة و حث الدولة على القيام بردة فعل إزاء المشاكل البيئية على غرار كارثة خليج المنستير</li>
                                    <li> مراقبة مؤسسات الدولة المعنية بالوضعية البيئية للمدينة و المنطقة</li>
                                    <li>التشبيك و العمل الجماعي مع ناشطين من مختلف أنحاء العالم من أجل الوصول لأهداف التنمية المستدامة</li>
                                    <li>تكريس التعليم, الثقافة و الفن من أجل التوعية و حماية البيئة</li>
                                    <li>تطوير قدرات الشباب من خلال الدورات التكوينية و العمل التطوعي</li>
                                </ul>
                            </Zoom>
                        </div>
                    </div>
            </div>



        </div>
    );

}


export default Welcome ;
