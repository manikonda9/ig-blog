import React from "react";
import Editor from "./editor";
import { connect } from "react-redux";
import { getQuery, addQuery } from "../actions/index";
import Tagpopup from "./tagpopup";
//import { dataRef } from "../config/firebase";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            query: "",
            title: "",
            project: "",
            technology: "",
            phone: "",
            formNumber: "",
            isEmpDisplay : false,
            isTechDisplay : false,
            employees : require("../utils/employees.json"),
            technologies : require("../utils/technologies.json"),
            searchValue : '',
            searchTechValue:'',
            items : [],
            taggedEmployees: [],
            unTaggedEmployees : [],
            techItems : [],
            taggedTech:[],
            unTaggedTech : []
        }

        this.onhandleChange = this.onhandleChange.bind(this);
        this.postQueryData = this.postQueryData.bind(this);
        this.getEditordata = this.getEditordata.bind(this);
        this.tagPerson = this.tagPerson.bind(this);
        this.unTagPerson = this.unTagPerson.bind(this);
        this.search = this.search.bind(this);
        this.props.getData();
    }

    tagPerson = (item,tag,untag,display) => {
        let data = this.state[untag];
        let taggedEmployees = this.state[tag];
        let currentIndex;
        data.forEach((i, index) => {
            if (i.id === item.id) {
                taggedEmployees.push(i);
                currentIndex = index;
            }
        });
        data.splice(currentIndex, 1);
        this.setState(state => {
            return {
                ...state,
                [untag]: data,
                [tag]: taggedEmployees,
                searchValue :'',
                searchTechValue : '',
                [display]:false
            }
        })
    }

    unTagPerson = (item,tag,untag) => {
        let data = this.state[tag];
        let unTaggedEmployees = this.state[untag];
        let currentIndex;
        data.forEach((i, index) => {
            if (i.id === item.id) {
                unTaggedEmployees.push(i);
                currentIndex = index;
            }
        });
        data.splice(currentIndex, 1);
        this.setState(state => {
            return {
                ...state,
                [untag]: unTaggedEmployees,
                [tag]: data
            }
        })
    }

    onhandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getEditordata = (data) => {
        this.setState({
            query: data
        });
    }

    // togglePopup = () => {
    //     this.setState({
    //         isopen: !isopen
    //     })
    // }

    postQueryData = (event) => {
        //event.preventDefault();
        let id = new Date();
        id = id.toLocaleString();
        id = id.replace(/[/,: ]/g, "");

        let data = {
            answers: [],
            id: id,
            title: this.state.title,
            question: this.state.description,
            code: this.state.query,
            created_at: new Date(),
            project: this.state.project,
            tags: this.state.taggedTech.map(t=>t.name),
            status: 1,
            tagged_people: this.state.taggedEmployees,
            views: 0
        }

        console.log(this.state.query);
        //dataRef.push().set(data);
        //addQuery(data);
        //this.props.history.push("/dashboard");

    }

    componentDidMount = () => {
        this.setState(state => {
            return {
                ...state,
                unTaggedEmployees: state.employees,
                unTaggedTech : state.technologies
            }
        })
    }

    search = (event,untag,display,search,item) =>{
        let value = event.target.value;
        let data = this.state[untag];
        let items = [];
        data.forEach((d)=>{
            if(d.name.toLowerCase().indexOf(value) > -1){
                items.push(d);
            }
        })
        if(value===""){
            items=[]
        }

        this.setState(state =>{
            return {
                ...state,
                [item] : items,
                [search] : value,
                [display] : items.length>0?true:false
            }
        })
    }

    render() {
        const {items,isTechDisplay,isEmpDisplay,techItems} = this.state;
        return (
            <section className="container">
                <div className="post-section">
                    
                        <h2>Post Query</h2>
                        <div>
                            <input type="text" placeholder="Title" name="title"
                                value={this.state.title}
                                onChange={this.onhandleChange} />
                        </div>
                        <div>
                            <textarea cols="80" rows="2"
                                name="description"
                                value={this.state.description}
                                onChange={this.onhandleChange}
                                placeholder="Write description here ............."></textarea>
                        </div>
                        <Editor className="editor"
                            content={this.state.query}
                            change={this.getEditordata}
                        />
                        <div>
                            <select name="project"
                                value={this.state.project}
                                onChange={this.onhandleChange}
                            >
                                <option value="Select Project">Select Project</option>
                                <option value="Project1">Project 1</option>
                                <option value="project2">Project 2</option>
                                <option value="project3">Project 3</option>
                                <option value="project4">Project 4</option>
                                <option value="project5">Project 5</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" placeholder="Search Technology for tagging" onChange={(e)=>this.search(e,"unTaggedTech","isTechDisplay","searchTechValue","techItems")} value={this.state.searchTechValue} />
                            {techItems.length > 0 && isTechDisplay ? <div className="popup_body">
                                {techItems.map((item, index) => {
                                    return (
                                        <div key={index} className="tag_inner" onClick={this.tagPerson.bind(this, item,"taggedTech","unTaggedTech","isTechDisplay")}>{item.name}</div>
                                    )
                                })}
                            </div> : null}
                            <div>Tag Technology : {
                                this.state.taggedTech.map((emp, index) => {
                                    return (
                                        <span key={index} className="tag text-success p-1 m-1">{emp.name} <i className="fa fa-times-circle-o" onClick={this.unTagPerson.bind(this, emp,"taggedTech","unTaggedTech")} aria-hidden="true"></i></span>
                                    )
                                })
                            }</div>
                        </div>
                        <div>
                            <input type="text" placeholder="Search employee for tagging" onChange={(e)=>this.search(e,"unTaggedEmployees","isEmpDisplay","searchValue","items")} value={this.state.searchValue} />
                            {items.length > 0 && isEmpDisplay ? <div className="popup_body">
                                {items.map((item, index) => {
                                    return (
                                        <div key={index} className="tag_inner" onClick={this.tagPerson.bind(this, item,"taggedEmployees","unTaggedEmployees","isEmpDisplay")}>{item.name}</div>
                                    )
                                })}
                            </div> : null}
                            <div>Tag Peoples : {
                                this.state.taggedEmployees.map((emp, index) => {
                                    return (
                                        <span key={index} className="tag text-success p-1 m-1">{emp.name} <i className="fa fa-times-circle-o" onClick={this.unTagPerson.bind(this, emp,"taggedEmployees","unTaggedEmployees")} aria-hidden="true"></i></span>
                                    )
                                })
                            }</div>
                        </div>
                        <div>
                            <input type="file" />
                        </div>
                        <div className="action-btn">
                            <button type="reset" className="btn btn-secondary">Reset</button>
                            <button type="submit" className="btn btn-success" onClick={this.postQueryData}>Submit</button>
                        </div>
                </div>
                {this.state.isopen ? <Tagpopup toggle={this.togglePopup} tag={this.tagPerson} data={this.state.unTaggedEmployees} /> : null}
            </section>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);