import React, { useEffect, useState } from 'react'
import MothlyTrans from './MothlyTrans';

function Accounts({ data }) {

    const [monthlyTrans, setMonthlyTrans] = useState([]);
    const [toogle, setToogle] = useState(false);

    //conver data into array structure
    useEffect(() => {
        let newMonthlytrans = [];
        for (let monthOfYear in data.month) {
            newMonthlytrans.push({
                monthOfYear: monthOfYear,
                dailyTransList: data.month[monthOfYear]
            })
        }
        setMonthlyTrans(newMonthlytrans)
    }, [data.month])

    const handleToogle = () => {
        setToogle(!toogle);
    }

    const renderMonthlyTrans = monthlyTrans
        ? monthlyTrans.map((month, index) => {
            return <MothlyTrans key={index} month={month.monthOfYear}
                dailyTransList={month.dailyTransList} />
        }) : ""

    return (
        <div className='account-c'>
            <span className='name'>{data.name}</span>
            <span className='acc-num'> Acc#: {data.accNum}</span>
            <button className="account-bnt" onClick={() => handleToogle()}>More Info</button>
            <div className={`monthly-wrapper ${toogle ? "active" : ""}`}>
                {renderMonthlyTrans}
            </div>
        </div>
    )
}

export default Accounts