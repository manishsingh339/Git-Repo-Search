import React from 'react';
import '../scss/repo-card.scss';

const RepoCard = (props) => {
    console.log(props);
    return(
        <div className="col-sm-4 col">
            <div className="repo-card">
                <div className="card-top">
                    <div className="image-container">
                        <img src={props.repo.owner.avatar_url} alt=""/>
                    </div>
                    <div className="repo-title" title={props.repo.name}>
                        {props.repo.name}
                    </div>
                </div>
                <div className="card-bottom">
                    <div className="tag-container">
                        <span className="tag-item">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <span>Starts {props.repo.stargazers_count}</span>
                        </span>
                        <span className="tag-item">
                            <i className="fa fa-code-fork" aria-hidden="true"></i>
                            <span>Fork {props.repo.forks_count}</span>
                        </span>
                        <span className="tag-item">
                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                            <span>Open Issues {props.repo.open_issues_count}</span>
                        </span>
                    </div>
                    <div className="description" title={props.repo.description}>
                        {props.repo.description}
                    </div>
                    <a className="profile-link-container" href={props.repo.html_url} target="_blank">
                        <span className="view-profile-text">View Profile</span>
                    </a>
                </div>
            </div> 
        </div>
    )
}

export default RepoCard;