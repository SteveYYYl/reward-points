import React, { useEffect, useState } from 'react'
import DailyTrans from './DailyTrans';

function MothlyTrans({ month, dailyTransList,monthlyPoint,monthlySpent }) {

    const [toogle, setToogle] = useState(false);

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
                        <td >${monthlySpent}</td>
                        <td >{monthlyPoint}</td>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default MothlyTrans