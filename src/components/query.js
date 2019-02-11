import React from "react";

const solutionData = require('../utils/solutions.json')

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            items: []
        }
        this.redaMore = this.redaMore.bind(this);
        this.readLess = this.readLess.bind(this);
    }
    componentDidMount = () => {
        let id = new Date();
        id = id.toLocaleString();
        id = id.replace(/[/,: ]/g, "");
        let items = solutionData.slice(0, 2)
        this.setState(state => {
            return {
                id: id,
                items: items
            }
        })
    }

    redaMore = () => {
        let endIndex = this.state.items.length;
        switch (endIndex) {
            case 2:
                endIndex = 10;
                break;
            case 10:
                endIndex = 20;
                break;
            case 20:
                endIndex = 50;
                break;
            case 50:
                endIndex = 100;
                break;
            case 100:
                endIndex = 200;
                break;
            case 200:
                endIndex = solutionData.length;
                break;
            default:
                endIndex = 2;
                break;
        }
        let items = solutionData.slice(0, endIndex);
        this.setState(state => {
            return {
                items: items
            }
        })
    }

    readLess = () => {
        let endIndex = this.state.items.length;
        if (endIndex <= 10 && endIndex > 2)
            endIndex = 2;
        else if (endIndex <= 20 && endIndex > 10)
            endIndex = 10;
        else if (endIndex <= 50 && endIndex > 20)
            endIndex = 20;
        else if (endIndex <= 100 && endIndex > 50)
            endIndex = 50;
        else if (endIndex <= 200 && endIndex > 100)
            endIndex = 100;
        else if (endIndex >= 200)
            endIndex = 200;
        else {
            endIndex = 2;
        }
        let items = solutionData.slice(0, endIndex);
        this.setState(state => {
            return {
                items: items
            }
        })
    }

    render() {
        const data = this.state.items;
        return (
            <section className="container">
                <div className="question-section">
                    <form>
                        <h2>My Query</h2>
                        <h4>1. Query Id - <span className="badge badge-secondary">{this.state.id}</span> </h4>
                        <div>
                            <p className="text-danger">How to align div horizontally and vertically center of the screen?</p>
                        </div>
                        {data.map((item, key) => {
                            return (
                                <div className="card bg-light mb-3" key={key}>
                                    <div className="card-header">
                                        <h5 className="text-success">Solution {key + 1}</h5>
                                        {item.Name}<span className="float-right text-success"><i className="fa fa-eye" aria-hidden="true"></i> {item.Views}</span></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.Descrption}</h5>
                                        <div className="card-text solution">{item.Solution}</div>
                                        <div className="card-text">{item.Suggestions}</div>
                                    </div>
                                </div>
                            )
                        })}
                        {data.length === solutionData.length ? null : <span onClick={this.redaMore} className="text-success float-right"> <i className="fa fa-angle-double-down" aria-hidden="true"></i> show more ...</span>}
                        {data.length > 2 ? <span onClick={this.readLess} className="text-danger float-left"> <i className="fa fa-angle-double-up" aria-hidden="true"></i> show less ...</span> : null}
                    </form>
                </div>
            </section>
        )
    }
}

export default Query;