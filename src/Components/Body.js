import React, { useEffect, useState } from 'react';
import Shimmer from "./Shimmer";
import logo from "../media/logo.png"
import {data} from './constants';



// Search--------------------------------------------------------->


const Search=({onSearch})=>{
    const [text, setText] = useState("");
    const textHandler =(e)=>{
        const searchText=e.target.value;
        setText(searchText);
        onSearch(searchText);
    }
    
    return(
        <div className="search">
            <input type="search" placeholder="Search Anything..." value={text} onChange={textHandler}></input>
            
        </div>
    );
}



// Header---------------------------------------------------------------->



const Header=({handleSearch})=>{
    return(
        <div className="header-container">
        <div className="header">
            <div className="logo">
                <img
                  src={logo}
                  alt="FoodApp logo"
                >
                </img>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">|</a></li>
                    <li><a href="/">Food Items</a></li>
                    <li><a href="/">|</a></li>
                    <li><a href="/">Favourites</a></li>
                </ul>
            </div>
            
            <div className="nav-items">
                <Search onSearch={handleSearch} />
                <ul>
                    <li>|</li>
                    <li><a href="/"><i className="fa-solid fa-cart-shopping"></i></a></li>
                </ul>
            </div>
        </div>
        </div>
    );
}






// Card---------------------------------------------------------------->




const Card = ({ info }) => {
    return (
        <div className="card">
            <div className="img-container">
                <img className="card-img" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + info.cloudinaryImageId} alt="card image" />
            </div>
            <div className="img-des">
                <h3 className="name">{info.name}</h3>
                <p className="cuisines"><i>{info.cuisines.join(", ")}</i></p>
                <p>Price: {info.costForTwo}</p>
                <p>Ratings: {info.avgRating}</p>
                <div className="cartBtn">
                    <p>Area: {info.locality}</p>
                    <button><i className="fa-regular fa-heart"></i></button>
                </div>
                
            </div>
        </div>
    );
};



// Body----------------------------------------------------------------------->




function Body() {
    const [dataArray, setDataArray] = useState([]);
    const [searchArray, setSearchArray] = useState([]);
    useEffect(() => {
                const dataArr = data;
                setDataArray(dataArr);
                setSearchArray(dataArr);
    }, []);

    const handleSearch = (searchText) => {
        const filteredArray = dataArray.filter((item) => item.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchArray(filteredArray);
    }


    return (
        <div className="body">
            <Header handleSearch={handleSearch}/>
            <div className="heading">
            <h1>Restaurants</h1>
            <hr width="84%"></hr>
            </div>
            
            {(searchArray && searchArray.length)? (
                <div className="cards">
                    {searchArray.map((item) => <Card key={item.info.name} {...item} />)}
                </div>
     ): (
     <Shimmer/>
     ) }
        </div>
     )}

export default Body;

