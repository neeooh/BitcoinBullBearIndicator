import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './BullBearIndicator.css';
import NeedleGauge from './NeedleGauge'

interface ApiDataItem {
    value: string, 
    value_classification: string, 
    timestamp: string, 
    time_until_update: string 
}

interface ApiData {
    data: Array<ApiDataItem>
}

function BullBearIndicator() {

    const [score, setScore] = useState(0); // Score is between 0 (most bearish) and 100 (most bullish).
    const [timeframe, setTimeframe] = useState(1); // 1 day default


    function fetchData(limit:number=1) {
        fetch(`https://api.alternative.me/fng/?limit=${limit}`, {
            method: "GET"
        }).then(response => {

            if(response.ok)
                return response.json();

            throw new Error(`Could not get data from the API. HTTP response: ${response.status}`);
        }).then(responseData => {

            // debugger;
            // if(data == null)
            //     throw new Error(data.metadata.error)

            calculateScore(responseData);


            console.log(responseData);
        }).catch( error => {
            console.log(error);
        });
    }

    function calculateScore(responseData:ApiData) {

        let totalSum:number = responseData.data.reduce((acc, ittr) => acc + parseInt(ittr.value), 0);

        let score = Math.round(totalSum / timeframe);

        setScore(score);

        console.log("totalSum: " + totalSum)
    }

    useEffect(()=>{
        console.log(`timeframe changed to: ${timeframe}, calling  fetch!`);

        fetchData(timeframe);

        // Dev purposed only
        // setTimeout(() => {
        //     setScore(33);
        // }, 2000)

   }, [timeframe])

    return (
        <div className='bull-bear-indicator'>
            

            <h2>Bull vs Bear Indicator</h2>

            <div className="timescale">
                <button className={timeframe == 1 ? 'active' : ''} onClick={() => setTimeframe(1)}>1 day</button>
                <button className={timeframe == 3 ? 'active' : ''}  onClick={() => setTimeframe(3)}>3 days</button>
                <button className={timeframe == 7 ? 'active' : ''} onClick={() => setTimeframe(7)}>1 week</button>
                <button className={timeframe == 30 ? 'active' : ''} onClick={() => setTimeframe(30)}>1 month</button>
            </div>   

            <NeedleGauge inputValue={score}/>


            <div className="dev-tools">
                <small>Dev Tools</small>
                <label htmlFor="valueDevInput">Score Manual Input</label>
                <input id="valueDevInput" type="number" onChange={ (e) => {setScore(parseInt(e.target.value)) }} value={score}/>
            </div>

        </div>
    );
}

export default BullBearIndicator;
