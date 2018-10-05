import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = (props) => {
    return (
        <div>
            <button type="button" className="btn btn-secondary" onClick={props.onClick}>Search</button>
        </div>
    )
}

ButtonComponent.prototype = {
    onClick: PropTypes.func.isRequired
};

export default ButtonComponent;
