import React from 'react'

function DailyTrans({ daliyTrans }) {

    return (
        <tr className={`daily-c`}>
            <td className='date'>{daliyTrans.date}</td>
            <td className='amount'>${daliyTrans.amount}</td>
            <td className='point'>{daliyTrans.point}</td>
        </tr>

    )
}

export default DailyTrans