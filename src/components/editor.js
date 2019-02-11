import React from "react";
import CKEditor from "react-ckeditor-component";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '<section>Welcome here ..</section>',
        }
    }

    updateContent = (newContent) => {
        this.setState({
            content: newContent
        })
    }

    onChange = (evt) => {
        //console.log(evt.editor.getData());
        var newContent = evt.editor.getData();
        this.props.change(newContent);
        this.setState({
            content: newContent
        })
    }

    onBlur = (evt) => {
        //console.log("onBlur event called with event info: ", evt);
    }

    afterPaste = (evt) => {
        //console.log("afterPaste event called with event info: ", evt);
    }

    render() {
        const content = this.props.content;
        return (
            <CKEditor
                activeClass="p10"
                content={content} 
                events={{
                    "blur": this.onBlur,
                    "afterPaste": this.afterPaste,
                    "change": this.onChange
                }}
            />
        )
    }
}

export default Editor;