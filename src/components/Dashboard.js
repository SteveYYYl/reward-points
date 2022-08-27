import { useEffect, useState } from 'react';
import getTransData from "../api/dataService"
import Accounts from './Accounts';

function DashBoard() {
  const [transDatas, setTransDatas] = useState(null);

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

  //fetch api data
  const fetchData = async () => {
    try {
      const datas = await getTransData().then();
      const newData = setUpDatas(datas);
      setTransDatas(newData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  const renderAccs = transDatas ?
    transDatas.map((data, index) => {
      return <Accounts key={index} data={data} />
    })
    : ""

  return (
      <div className='dashBoard'>
        <header>Reward Program</header>
        {renderAccs}
      </div>
  );
}

export default DashBoard;


