import React from 'react';
import PropTypes from 'prop-types';

const TextBoxComponent = (props) => {
    return (
        <div>
            <input id="keyword-input" type="text" onChange={(event) => props.onChange(event)} placeholder="Enter Keywords" />
        </div>
    );
}

TextBoxComponent.prototype = {
    onChange: PropTypes.func.isRequired
};

export default TextBoxComponent;