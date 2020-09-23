import React from "react";
import { EditorState, Modifier } from 'draft-js';

export default class MarkupDropdown extends React.Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 'html'
        };
    }

    handleChange(event) {
        const { editorState, onChange } = this.props;
        // const contentState = Modifier.replaceText(
        //     editorState.getCurrentContent(),
        //     editorState.getSelection(),
        //     '⭐',
        //     editorState.getCurrentInlineStyle(),
        // );
        console.log(`onMarkupChange: ${event.target.value}`)

        this.setState({value: event.target.value});

        // onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };



    render(){
        const {value} = this.state;
        return(
            <label>
                Markup:
                <select className={"rdw-dropdown-wrapper rdw-block-dropdown"}
                        value={value}
                        onChange={this.handleChange}>
                    <option value="markdown">Markdown</option>
                    <option value="rst">reStructuredText</option>
                    <option value="html">HTML</option>
                </select>
            </label>

        );
    }

}