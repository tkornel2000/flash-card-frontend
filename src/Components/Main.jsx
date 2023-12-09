import React, { useEffect, useState } from "react";
import { dotnetApi } from "../api/axios";
//import change from "./Images/change.jpg";
import tick from "./Images/tick.png";
import x from "./Images/x.png";
import "./Main.css";
import Speech from "./Speech";

function Main() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [end, setEnd] = useState(null);
  const [germanToHungary, setGermanToHungary] = useState(true);
  const [actualCard, setActualCard] = useState(null);

  const fetchData = async () => {
    try {
      const response = await dotnetApi.get("card");
      const data = response.data;
      setEnd(false);
      setApiData(data);
      setLoading(false);
      if (data.length > 0) {
        setActualCard(data[0]);
      }

    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])  // Ez a useEffect csak a komponens betöltésekor fut le


  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleTickClick = () => {
    if (apiData.length > 1) {
      setFlipped(false);
      setTimeout(function () {
        apiData.shift(); // Csak az első elem nélküli rész visszahozása
        setActualCard(apiData[0])
        console.log(apiData)
        console.log(actualCard)
      }, 300);
    } else {
      setApiData([]);
      setEnd(true);
    }
  };
  const handleXClick = () => {
    if (apiData.length >= 1) {
      apiData.push(apiData[0]);
      setFlipped(false);
      setTimeout(function () {
        apiData.shift(); // Csak az első elem nélküli rész visszahozása
        setActualCard(apiData[0])
        console.log(apiData)
        console.log(actualCard)
      }, 300);
    } else {
      setEnd(true);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="d-flex flex-column min-vh-80 justify-content-center align-items-center"
          style={{ flex: "1", fontSize: "36px" }}
        >
          Tölt
        </div>
      );
    }

    return (
      <div>
        <div
          className={`border border-dark border-3 myCard ${
            flipped ? "flipped" : ""
          }`}
          onClick={handleCardClick}
        >
          <div className="card__face card__face--front">
            {actualCard && (
              <div>
                {germanToHungary ? actualCard.german : actualCard.hungary}
              </div>
            )}
          </div>
          <div className="card__face card__face--back">
            {actualCard && (
              <div>
                {germanToHungary ? actualCard.hungary : actualCard.german}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <p>
            <a href="http://localhost:3000/addnew">add new</a>
          </p>
        </div>
        {!loading && (
          <div className="col-6 text-center">
            Karten nummer: {apiData.length}
          </div>
        )}
        <div className="col-3 text-center">
          <button onClick={fetchData}>Újra</button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <button
            className={`border border-dark rounded btn ${
              germanToHungary ? "" : "btn-secondary"
            }`}
            onClick={() => setGermanToHungary(false)}
          >
            Magyar-Deutsch
          </button>
          <button
            className={`border border-dark btn ${
              germanToHungary ? "btn-secondary" : ""
            }`}
            onClick={() => setGermanToHungary(true)}
          >
            Deutsch-Magyar
          </button>
        </div>
      </div>
      <div className="row mt-2 justify-content-start">
        <div className="col-3 text-center">
          <div
            className="d-flex flex-column min-vh-80 justify-content-center align-items-center"
            style={{ height: "100%", fontSize: "36px" }}
          >
            <button
              type="text"
              className="p-0"
              style={{ borderRadius: "20%" }}
              onClick={handleXClick}
            >
              <img
                src={x}
                alt="x"
                width="100px"
                height="100px"
                style={{ borderRadius: "20%" }}
              ></img>
            </button>
          </div>
        </div>
        <div className="col-6 align-middle">
          {end ? <div className="myCard">(das) Ende</div> : renderContent()}
        </div>
        <div className="col-3  text-center">
          <div
            className="d-flex flex-column min-vh-80 justify-content-center align-items-center"
            style={{ height: "100%", fontSize: "36px" }}
          >
            <button
              type="text"
              className="p-0"
              style={{ borderRadius: "20%" }}
              onClick={handleTickClick}
            >
              <img
                src={tick}
                alt="tick"
                width="100px"
                height="100px"
                style={{ borderRadius: "20%" }}
              ></img>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mt-4 text-center">
          {/* <button 
            type="text" 
            className="p-0" 
            style={{ borderRadius: "20%" }}
            onClick={handleSpeech}
          >
            <img
              src={change}
              alt="speech"
              width="50px"
              height="50px"
              style={{ borderRadius: "20%" }}
            ></img>
          </button> */}
          {
            actualCard &&
            <Speech text={actualCard.german}></Speech>
          }
        </div>
      </div>
    </div>
  );
}

export default Main;
