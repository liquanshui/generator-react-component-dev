import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import <%= variableName %> from '../src/<%= name %>';

import '../assets/index.less';

class Example extends React.Component {

    render() {
        return (
            <div></div>
        )
    }

}


ReactDOM.render(<Example />, document.getElementById('component-example-simple'));