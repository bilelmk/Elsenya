import React from "react";
import "./CultivationPlace.scss"
import Zoom from "react-reveal/Zoom";

function CultivationPlace() {
    return <div>
                <Zoom>
                    <table className="cult-table">
                        <tr className="cult-tr">
                            <th className="cult-th">الشرفة – البلكون</th>
                            <th className="cult-th">السطح</th>
                            <th className="cult-th">الحديقة</th>
                        </tr>
                        <tr className="cult-tr">
                            <td className="cult-td">
                                يمكن تحويل الشرفة لحديقة صغيرة, يكفي أن توفر قليلا من الوقت و بعض النظام
                                <br/>
                                <span>الإيجابيات</span>: سهولة التحكم في النباتات
                                <br/>
                                <span>السلبيات</span>: صغر المساحة
                            </td>
                            <td className="cult-td">
                                الزراعة فوق المباني هو تقليد جديد يمكن من استغلال أكبر مساحة ممكنة للزراعة في المدن
                                <br/>
                                <span>الإيجابيات</span>: توفر المساحة
                                <br/>
                                <span>السلبيات</span>: ضرورة توفير بعض المعدات
                            </td>
                            <td className="cult-td">
                                يمكن استغلال الحديقة لزراعة الخضروات و الفواكه, و من المهم تقليب التربية و تغذيتها لضمان جودة أكبر
                                زراعة البقول (حمص, لوبيا, جلبانة, عدس...) في البداية تساهم في تغذية التربة من خلال تخزين النتروجين في التربة
                                <br/>
                                <span>الإيجابيات</span>: قدرة إنتاجية أكبر مع إمكانية تحضير الأسمدة النباتية (كومبوست)
                                <br/>
                                <span>السلبيات</span>: ضرورة إيلاء وقت أكبر للعناية بالنباتات

                            </td>
                        </tr>
                    </table>
                    <img src="/assets/cultivation place.jpg" className="cult-img" />
                </Zoom>
            </div>
}

export default CultivationPlace ;
