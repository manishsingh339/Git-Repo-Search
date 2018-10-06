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
import Pagination from 'react-js-pagination'

class SearchContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                language: null,
                keyword: null,
                star: 0
            },
            repos: [],
            activePage: 1,
            perPageResultCount: 9
        }
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.getReposList = this.getReposList.bind(this);
        this.onLangChange = this.onLangChange.bind(this);
        this.renderRepoCards = this.renderRepoCards.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
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

    getReposList(pageNob) {
        this.setState({
            activePage: pageNob || 1 
        });
        const params = {
            q: null,
            sort: 'stars',
            order: 'desc',
            per_page: this.state.perPageResultCount,
            page: this.state.activePage,
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

    handlePageChange(pageNumber) {
        this.getReposList(pageNumber)
    }

    render() {
        console.log(this.props);
        return (
            <div className="search-container">
                <div className="filter-container container">
                    <div className="filter-header row">
                        Git Repo Search Filter
                    </div>
                    <div className="row filter-items-container">
                        <div className="col-md-3 filter-item">
                            <SelectComponent onChange={this.onLangChange} selected={this.state.filter.language} options={langs} />
                        </div>
                        <div className="col-md-3 filter-item">
                            <TextBoxComponent onChange={this.onKeywordChange} />
                        </div>
                        <div className="col-md-3 filter-item">
                        <div className="range-title">Select minimum start</div>
                            <InputRange maxValue={10000} minValue={0} value={this.state.filter.star} onChange={this.onStartChange} />
                        </div>
                        <div className="col-md-3 filter-item filter-search">
                            <ButtonComponent onClick={this.getReposList} />
                        </div>
                    </div>
                </div>
                <div className="card-details-container container">
                    <div className="card-list-header row">
                        Repo Search Result
                    </div>
                    <div className="card-list-container container">
                        <div>{this.renderRepoCards()}</div>
                    </div>
                    <div className="card-pagination">
                        {!!this.props.repos && !!this.props.repos.total_count ?
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.perPageResultCount}
                                totalItemsCount={this.props.repos.total_count}
                                pageRangeDisplayed={7}
                                onChange={this.handlePageChange}
                            />
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
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