import React, { useState } from 'react'

function AddData({addData}) {

    const [date, setDate] = useState("");
    const [accNum, setAccNum] = useState("");
    const [name, setName] = useState("");
    const [spent, setSpent] = useState(0);

    const handleDate = (value) => {
        setDate(value);
    }

    const handleSpent = (value) => {    
        let newValue = 0;
        if(value.length > 1 && value[0] === "0") {
            // console.log("value");
            newValue = value.substring(1);
            setSpent(newValue);
            
        } else {
            setSpent(value);
        }
    }

    const handleName = (value) => {
        const numbers = /^[0-9]+$/;
        if(!value.match(numbers)) {
            setName(value);
        }
    }

    const handleAcc = (value) => {
        const numbers = /^[0-9]+$/;
        if(value.match(numbers) || value ==="") {
            setAccNum(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //formate the date
        const [year, month, day] = date.split('-');
        const newDate = [month,day,year].join("-")
        const id = new Date().getTime();
        if(date && accNum && name && spent) {
            addData({
                id:id,
                accountNum : Number(accNum),
               date: newDate,
                name :name,
                amount : Number(spent)});
        } else {
            addData("");
        }
    }

    return (
        <div>
            <form className='addForm' onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="date">Transaction date:</label>
                <input type={"date"} value={date} id="date" onChange={(e) => handleDate(e.target.value)} />
                <label htmlFor="amount">Spent Amount</label>
                <input type={"number"}
                    id="amount"
                    min={0}
                    value={spent}
                    onChange={(e) => { handleSpent(e.target.value) }}
                />
                <label htmlFor="name">User Name</label>
                <input id="name"
                    value={name}
                    onChange={(e) => { handleName(e.target.value) }}
                />
                <label htmlFor="acc">Account Number</label>
                <input id="acc" value={accNum}
                    onChange={(e) => { handleAcc(e.target.value) }}
                />
                 <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default AddData