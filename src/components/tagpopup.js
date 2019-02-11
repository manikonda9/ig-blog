import React from "react";

class Tagpopup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            data : this.props.data,
            searchValue : '',
            items : [],
        }
        this.search = this.search.bind(this);
    }

    search = (event) =>{
        let value = event.target.value;
        let data = this.state.data;
        let items = [];
        data.forEach((d)=>{
            if(d.name.indexOf(value) > -1){
                items.push(d);
            }
        })

        if(value===""){
            items=[]
        }

        this.setState(state =>{
            return {
                ...state,
                items : items,
                searchValue : value
            }
        })
    }

    render() {
        const items = this.state.items;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="p-3 m-3">
                        <input type="text" onChange={this.search} value={this.state.searchValue} />
                    </div>
                    {items.length>0?<div className="popup_body">
                    {items.map((item,index)=>{
                        return(
                            <div key={index} className="tag_inner" onClick={this.props.tag.bind(this,item)}>{item.name}</div>
                        )
                    })}
                    </div>:null}
                    <button className="btn btn-danger m-1 pull-right" onClick={this.props.toggle}>Close</button>
                </div>
            </div>
        );
    }
}

export default Tagpopup;