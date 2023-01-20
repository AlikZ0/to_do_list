import React, { useEffect, useMemo, useState } from "react";
import "./style.css"
import icons from "../img/icons.png"

const ToDOList = () => {

    const Filtr=(e)=>{
        console.log(e);
        setTitle(title.filter(el=>e!==el.Title))
    }

    const [state, setState] = useState({
        Title: '',
        Date: "",
    })
    const [flag, setFlag] = useState(true)
    const [title, setTitle] = useState([])
    console.log(title)
    const [get, set] = useState([])
    // const arry = []
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const foo = () => {


        set([...get, state])

    }

    const TOFlag = () => {
        setFlag(!flag)
    }

    const gropued = useMemo(() => {
        const gropuedArr = [];

        get.map(item => {

            let group = gropuedArr.find(g => g.date === item.Date);

            if (!group) {
                group = { date: item.Date, items: [] }
                gropuedArr.push(group)
            }

            group.items.push(item)
        })

        return gropuedArr
    }, [get])

    console.log(gropued)
    const ofTo = (e) => {
        console.log(e.items);
        setTitle(e.items)
        setFlag(!flag)

    }

    useEffect(() => {
        // console.log(gropued.items[0].Title)
        // console.log(state, get);
        console.log(title);
    }, [state, get, title])

    return <div>



        <div className="P-marginTop">
            <h1>To Do List</h1>
            <input type="text" name="Title" onChange={handleChange} />
            <input
                type="date"
                name="Date"
                onChange={handleChange}
                format="YYYY-MM-DD"
                placeholder="Start Date"
            />
            <button className="G-button" onClick={foo}>ADD</button>

        </div>


        {flag ? gropued.map((el, index) => {
            return <div className="P-date" key={index}>
                <div className="G-flex G-j" >
                    <h3 onClick={() => ofTo(el)}>{el.date}</h3>
                    <p>({el.items.length})</p>
                </div>

            </div>
        }) : ""}



        {!flag ? <div className="G-Title">
            <button className="P-absolute G-button" onClick={TOFlag}>Back</button>

            <div className=" G-j" >
                {title.map((el ,index) => {
                    return <div className="G-flex  G-j" key={index}>

                        <p className="P-Title-text">{el.Title}</p>
                        <img src={icons} alt="#" className="G-img"   onClick={()=>Filtr(el.Title)}/>


                    </div>
                })}
            </div>

        </div> : ""}


    </div>
}
export default ToDOList