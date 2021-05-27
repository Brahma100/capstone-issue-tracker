import React from 'react';
import { useSelector } from 'react-redux';
import { selectIssues } from '../issueSlice';
import avatar from '../../../assets/images/avatar.png'
import './TrendingIssues.css'


const TrendingIssues=()=>{

  let issues=useSelector(selectIssues);

  const sort=(issues)=>{
    return issues.length>0 && issues.slice().sort((a, b) => b.rank - a.rank)
  }

    return(
        <div>
        <div class="card-list">
        {issues.length>0 && sort(issues).map(issue=>(
          <article class="card1">
          <header class="card-header1">
            <p>{issue.date}</p>
            <h2>{issue.Issue}</h2>
          </header>
  
          <div class="card-author">
            <a class="author-avatar" href="#">
              <img src={avatar} />
            </a>
            <svg class="half-circle" viewBox="0 0 106 57">
              <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>
  
            <div class="author-name">
              <div class="author-name-prefix">User</div>
              {issue.user.fname+" "+issue.user.lname}
            </div>
          </div>
          <div class="tags">
            <a href="#">{issue.Severity}</a>
            <a href="#">{issue.Status}</a>
           
          </div>
          <div>
            <p>Rank:#{issue.rank}</p>
          </div>
        </article>
        ))}
  
  
   </div>
   </div>
    )
}



export default TrendingIssues;
 