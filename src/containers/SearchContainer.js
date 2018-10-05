import React, { Component } from 'react';
import SelectComponent from '../components/SelectComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import RepoCard from '../components/RepoCard';
import { searchRepos } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import langs from '../configs/langs';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../scss/search-container.scss';

class SearchContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                language: null,
                keyword: null,
                star: 10
            },
            repos: []
        }
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.getReposList = this.getReposList.bind(this);
        this.onLangChange = this.onLangChange.bind(this);
        this.renderRepoCards = this.renderRepoCards.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
    };

    onKeywordChange(event) {
        const filter = { ...this.state.filter };
        filter.keyword = event.target.value;
        this.setState({
            filter
        });
    }

    onLangChange(event) {
        const filter = { ...this.state.filter };
        filter.language = event.target.textContent;
        this.setState({
            filter
        });
    }

    onStartChange(star) {
        const filter = { ...this.state.filter };
        filter.star = star;
        this.setState({
            filter
        });
    }

    getReposList() {
        const params = {
            q: null,
            sort: 'stars',
            order: 'desc'
        };
        params.q = `${this.state.filter.keyword}language:${this.state.filter.language}stars:>=${this.state.filter.star}`;
        this.props.searchRepos(params);
    }

    renderRepoCards() {
        return (!!this.props.repos && !!this.props.repos.items ?
            <div className="row">
                {
                    this.props.repos.items.map((item, $index) => <RepoCard key={$index} repo={item} />)
                }
            </div>
            : null);
    }

    render() {
        console.log(this.props);
        return (
            <div className="search-container">
                <div className="filter-container container">
                    <div className="row">
                        <div className="col-md-3">
                            <SelectComponent onChange={this.onLangChange} selected={this.state.filter.language} options={langs} />
                        </div>
                        <div className="col-md-3">
                            <TextBoxComponent onChange={this.onKeywordChange} />
                        </div>
                        <div className="col-md-3">
                        <div className="range-title">Select minimum start</div>
                            <InputRange maxValue={10000} minValue={0} value={this.state.filter.star} onChange={this.onStartChange} />
                        </div>
                        <div className="col-md-3">
                            <ButtonComponent onClick={this.getReposList} />
                        </div>
                    </div>
                </div>
                <div className="card-details-container">
                    <div className="card-list-container container">
                        <div>{this.renderRepoCards()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    return {
        repos: state.reposData.repos
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        searchRepos
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);