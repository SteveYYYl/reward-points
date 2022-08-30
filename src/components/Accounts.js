import React, { useEffect, useState } from 'react'
import MothlyTrans from './MothlyTrans';

function Accounts({ data }) {

    const [monthlyTrans, setMonthlyTrans] = useState([]);
    const [toogle, setToogle] = useState(false);
    const [totalReward,setTotalReward]= useState(0);
    const [totalSpent, setTotalSpent]= useState(0);


    //calc total monthly point and spent 
    //and total point and spent
    const calMonthlyPoint = (data) => {
        let newMonthlyPoint = 0;
        let newMonthlySpent = 0;
        data.forEach(({point,amount})=>{
            newMonthlyPoint+=point
            newMonthlySpent+=amount;
        })
        return [newMonthlyPoint,newMonthlySpent];
    }

    //conver data into array structure
    useEffect(() => {
        let newMonthlytrans = [];
        let newTotalPoint = 0;
        let newTotalSpent = 0;
        for (let monthOfYear in data.month) {
            const [monthlyPoint,mothlySpent] = calMonthlyPoint(data.month[monthOfYear]);
            newMonthlytrans.push({
                monthOfYear: monthOfYear,
                dailyTransList: data.month[monthOfYear],
                monthlyPoint : monthlyPoint,
                mothlySpent : mothlySpent
            })
            newTotalPoint+=monthlyPoint
            newTotalSpent+=mothlySpent
        }
        setTotalReward(newTotalPoint);
        setTotalSpent(newTotalSpent);
        setMonthlyTrans(newMonthlytrans)
    }, [data.month])

    const handleToogle = () => {
        setToogle(!toogle);
    }



    const renderMonthlyTrans = monthlyTrans
        ? monthlyTrans.map((month, index) => {
            return <MothlyTrans key={index} 
            month={month.monthOfYear}
                dailyTransList={month.dailyTransList} 
                monthlyPoint={month.monthlyPoint}
                monthlySpent={month.mothlySpent}/>
        }) : ""

    return (
        <div className='account-c'>
            <span className='name'>{data.name}</span>
            <span className='acc-num'> Acc#: {data.accNum}</span>
            <button className="account-bnt" onClick={() => handleToogle()}>More Info</button>
            <div className={`monthly-wrapper ${toogle ? "active" : ""}`}>
                {renderMonthlyTrans}
                <div>Total Spent: 
                    <span>${totalSpent}</span>
                </div>
                <div>Total Reward: 
                    <span>${totalReward}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Accounts