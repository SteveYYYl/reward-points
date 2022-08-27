import React, { useEffect, useState } from 'react'
import DailyTrans from './DailyTrans';

function MothlyTrans({ month, dailyTransList }) {

    const [toogle, setToogle] = useState(false);
    const [spentTotal,setSpentTotal] = useState(0);
    const [rewardTotal,setRewardTotal] = useState(0);


    useEffect(()=>{
        let newSpentTotal = 0;
        let newrewardTotal = 0;
        dailyTransList.forEach(element => {
            newSpentTotal += element.amount;
            newrewardTotal += element.point;
        });
        setSpentTotal(newSpentTotal);
        setRewardTotal(newrewardTotal);
    },[dailyTransList])

    const handleToogle = () => {
        setToogle(!toogle)
    }

    const renderDailyTrans = dailyTransList ?
        dailyTransList.map((daliyTrans) => {
            return <DailyTrans key={daliyTrans.id} daliyTrans={daliyTrans} />
        }) : ""
    
    

    return (
        <div className={`monthly-c`}>
            <span>{month}</span>
            <button onClick={() => handleToogle()}>Expand</button>
            <table className={`daily-wrapper ${toogle ? "active" : ""}`}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Spent</th>
                        <th>Reward Point</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDailyTrans}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="total">Total</th>
                        <td >${spentTotal}</td>
                        <td >{rewardTotal}</td>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default MothlyTrans