import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import apiService from "../services/Api"
import ProductCard from '../components/ProductCard/ProductCard';


class Index extends Component {

    state = {
        allProducts: "",
        searchfield: ""
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }

    async componentDidMount() {
        const allProducts = await apiService.getAllProducts()
        const { data } = allProducts
        this.setState({ allProducts: data })
    }

    render() {
        const { allProducts } = this.state


        let filteredProducts = allProducts;

        if (allProducts) {
            filteredProducts = this.state.allProducts.filter(products => {
                return products.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })
            //console.log(filteredProducts);
        }

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 14px 28px rgba(219, 236, 255, 0.25), 0 10px 10px rgba(185, 175, 175, 0.22)", margin: "25px", height: "40px", alignItems: "center" }}>
                    <img width="30px" src="images/lupa.png" style={{ width: "10%" }} />
                    <input
                        style={{ textAlign: "center", fontSize: "17px", width: "74%", height: "31px", background: "white", border: "0", outline: "none" }}
                        type='search'
                        placeholder='search products'
                        onChange={this.onSearchChange}
                    />
                </div>
                <h1>Products</h1>
                <section style={{ display: "flex", flexDirection: "column" }}>
                    {filteredProducts ?
                        filteredProducts.map((product, index) => {
                            return <ProductCard key={index} product={product}>{product.title}</ProductCard>
                        })
                        : <p>Loading...</p>}
                </section>

            </div>
        )
    }
}

export default withAuth(Index)

