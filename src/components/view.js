import React from "react";
import { connect } from "react-redux";
import { getQuery } from "../actions/index";
import { dataRef } from "../config/firebase";
import _ from "lodash";

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.redaMore = this.redaMore.bind(this);
        this.readLess = this.readLess.bind(this);
    }

    componentDidMount = () => {
        dataRef.on("value",snap=>{
            console.log(snap.val());
        this.setState(state => {
            return {
                items: snap.val()
            }
        })
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
                endIndex = this.props.data.length;
                break;
            default:
                endIndex = 2;
                break;
        }
        let items = this.props.data.slice(0, endIndex);
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
        let items = this.props.data.slice(0, endIndex);
        this.setState(state => {
            return {
                items: items
            }
        })
    }

    render() {
        const data = this.state.items;
        const items = _.orderBy(_.map(data, (val, key) => {
            return val;
        }),['id'],['desc']);
        if (items.length > 0) {
            return (
                <section className="container view">
                    {items.map((item, key) => {
                        return (
                            <div className="card bg-light mb-3" key={key}>
                                <div className="card-header">
                                    <h5 className="text-success">Query {key + 1}</h5>
                                    {item.description}<span className="float-right text-success"><i className="fa fa-eye" aria-hidden="true"></i> {item.Views}</span></div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.query}</h5>
                                    <div className="card-text solution">{item.project}</div>
                                    <div className="card-text">{item.technology}</div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            )
        }
        //else if(items.length === 0){
        //     return(
        //         <div className="container text-center text-info">
        //             <h3>There are no queries to show.</h3>
        //         </div>
        //     )
        // }
        else {
            return (
                <div className="container text-success text-center loader">
                    <h3>Loading .........</h3>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.initialData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getQuery("GET_QUERY_DATA"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);