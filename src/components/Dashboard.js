import { useEffect, useState } from 'react';
import getTransData from "../api/dataService"
import Accounts from './Accounts';
import AddData from './AddData';

function DashBoard() {
  const [transDatas, setTransDatas] = useState(null);
  const [data, setData] = useState(null);
  const [error,setError] = useState({
    isError:false,
    message: ""
  });
  

  // conver amount into points
  const calcPoint = (amt) => {
    const point = amt > 100
      ? (2 * (amt - 100) + 50)
      : amt > 50
        ? amt - 50
        : 0
    return point;
  }


  //convert data into structure
  //sort data corresponing with name, account and month
  //  data = [
  //   {
  //     accNum : string,
  //     name : string,
  //     month: {
  //       monthOfYear:  [
  //        {
  //         amount : string,
  //         date : "xx-xx-xxxx",
  //         id : int,
  //         point : int
  //        }
  //        ...
  //        ...
  //        ]
  //       ...
  //       ...
  //       ...
  //     }
  //   }
  // ]

  const setUpDatas = (datas) => {
    let transSheets = {};
    let accountInfos = [];
    datas.forEach(({ id, accountNum, date, name, amount }) => {
      const newDate = new Date(date);
      const monthOfYear = newDate.toLocaleDateString("en-us", { month: "long" });
      const dailyTrans = {
        id: id,
        date: date,
        amount: amount,
        point: calcPoint(amount)
      }
      if (accountNum in transSheets) {
        if(transSheets[accountNum].name !== name) {
          const newMessage = "Name does not match Account Number"
          setError({
            isError: true,
            message: newMessage
          })
          const newData = datas.filter((data)=>{
              return data.id !== id
          })
          setData(newData);
          return;
        }
        transSheets[accountNum].month[monthOfYear]
          ? transSheets[accountNum].month[monthOfYear].push(dailyTrans)
          : transSheets[accountNum].month[monthOfYear] = [dailyTrans]
      } else {
        transSheets[accountNum] = {
          accNum: accountNum,
          name: name,
          month: {
            [monthOfYear]: [dailyTrans]
          }
        }
      }
    });

    for (let sheet in transSheets) {
      accountInfos.push(transSheets[sheet]);
    }
    return accountInfos;
  }



  const addData = (newData) => {
    if (newData) {
      setError({
        isError:false,
        message:""
      })
      setData([...data,newData])
    } else {
      const newMessage = "Please entery all corresponding data"
      setError({
        isError: true,
        message: newMessage
      })
    }
    
  }

  useEffect(() => {
    if (!data) {
      //fetch api data
      let initData = [];
      const fetchData = async () => {
        initData = await getTransData().then();
        setData(initData);
        const newTransData = setUpDatas(initData);
        setTransDatas(newTransData);
      }
      fetchData().catch(console.error);
    } else {
      const newTransData = setUpDatas(data);
      setTransDatas(newTransData);
    }
    // eslint-disable-next-line
  }, [data])



  const renderAccs = transDatas ?
    transDatas.map((data, index) => {
      return <Accounts key={index} data={data} />
    })
    : ""

  return (
    <>
      <div className='dashBoard'>
        <header>Reward Program</header>
        {renderAccs}
      </div>
      
      <div>
        <AddData addData={addData} />
      </div>
      <div>
      {error.isError ? <div>{error.message}</div> : ""}
      </div>
    </>
  );
}

export default DashBoard;


