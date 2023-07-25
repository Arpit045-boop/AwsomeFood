import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import { useState } from "react";
import { useEffect } from "react";
import loadingImage from './images/loading.svg';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const loadData = async () => {
    let response = await fetch(
      "https://foodappapi-arpit045-boop.onrender.com/api/foodData"
    );
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItem(response[0]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: 3 }}>
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/407041/pancakes-maple-syrup-sweet-407041.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/8616836/pexels-photo-8616836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {foodCat.length > 0
        ? foodCat.map((data) => {
            return (
              <div key={data._id} className="row mb-3 mx-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem !== [] &&
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItem) => {
                      return (
                        <div
                          key={filterItem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItem}
                            options={filterItem.options[0]}
                          />
                        </div>
                      );
                    })}
              </div>
            );
          })
        :
          <div className="row justify-content-center">
           <img className="loadingImage" style={{width: "200px"}} src={loadingImage}/>
          </div>
        }

      <Footer />
    </div>
  );
}

export default Home;
