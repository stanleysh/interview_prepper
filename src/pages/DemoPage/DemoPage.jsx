import React from 'react';
import './DemoPage.css';
import InterviewCard from '../../components/InterviewCard/InterviewCard';
const defaultQuestions = require('../../Data/questionData');

const DemoInterviewBoard = (props) => (
    <div className = 'InterviewBoard'>
        <h1>Top 20 Asked Questions</h1>
        <h3>Please note that the following features are not available in demo: </h3>
        <h4>
            - Creating/editing questions
            <br/>
            - Question timers
            <br/>
            - Adding/editing tips/script
        </h4>
        <div className = 'InterviewBoard-grid'>
            {defaultQuestions.map((interviewQuestion, index) =>
                <InterviewCard 
                interviewQuestion = {interviewQuestion}
                questionNum = {index + 1}
                demo = {true}
                />
            )}
        </div>
    </div>
);

export default DemoInterviewBoard;