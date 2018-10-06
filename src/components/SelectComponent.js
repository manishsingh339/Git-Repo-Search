import React from 'react';
import PropTypes from 'prop-types';

const SelectComponent = (props) => {
    const getOptions = () => {
        return (props.options && props.options.length ?
            props.options.map((item, $index) => <a className="dropdown-item" key={$index} onClick={(event) => props.onChange(event)} href="#">{item}</a>)
            : null);
    }
    return (
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" 
                id="langDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" 
                aria-expanded="false">
                {!!props.selected ? props.selected : 'Select Language'}
            </a>
            <div className="dropdown-menu" aria-labelledby="langDropdownMenuLink">
                {getOptions()}
            </div>
        </div>
    )
};

SelectComponent.prototype = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};

export default SelectComponent;