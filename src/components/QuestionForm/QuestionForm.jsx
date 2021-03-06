import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './QuestionForm.css';
import questionService from '../../utils/questionService';

class QuestionForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
        question: '',
        description: '',
        tips: '',
        script: '',
        timer: null,
        minutes: null,
        seconds: null,
        user: this.props.user._id,
        completed: false,
        id: ''
    }
}

    async componentDidMount() {
        try {
            this.setState({id: this.props.match.params.id});
            const existQuestion = await questionService.getOneQuestion(`/api/questions/${this.props.match.params.id}`);
            let mins = this.timeToMin(existQuestion.timer);
            let secs = this.timeToSec(existQuestion.timer);
            this.setState({
                question: existQuestion.question,
                description: existQuestion.description,
                tips: existQuestion.tips,
                script: existQuestion.script,
                timer: existQuestion.timer,
                minutes: mins,
                seconds: secs
            });
        } catch(err) {
            console.log('No question or couldn\'t find question');
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.minutes !== prevState.minutes || this.state.seconds !== prevState.seconds) {
            this.setState({
                timer: (Number(this.state.minutes) * 60) + Number(this.state.seconds)
            })
        }
    }

    timeToMin = (timeInput) => {
        if (timeInput === null)
            return null
        let convertedTime = Math.floor(timeInput/60);
        return convertedTime;
    }

    timeToSec = (timeInput) => {
        if (timeInput === null)
            return null
        let convertedTime = timeInput % 60;
        return convertedTime;
    }

    minToTime = (mins) => {
        return mins * 60;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSecondsChange = (e) => {
        if (e.target.value > 59) {
            var mins = Math.floor(e.target.value/60)
            this.setState({
                minutes: this.state.minutes + mins,
                seconds: e.target.value % 60
            });
        } else if (e.target.value < 0) {
            this.setState({
                seconds: 0
            })
        } else {
        this.setState({
            seconds: e.target.value,
        })
    }
    }

    handleNewSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            timer: (this.state.minutes * 60) + this.state.seconds,
        })
        try {
            await questionService.newQuestion(this.state, '/api/questions/new');
            this.props.history.push('/questions');
        } catch (err) {
            console.log(err.message);
        };
    };

    handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await questionService.updateQuestion(this.state, `/api/questions/${this.state.id}`)
            this.props.history.push('/questions')
        } catch (err) {
            console.log(err.message);
        }
    }

    handleDelete = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this question? All data will be removed")) {
            try {
                questionService.deleteQuestion(`/api/questions/${this.state.id}`);
                alert("Successfully deleted question, bringing you back to main questions page");
                this.props.history.push('/questions');
            } catch (err) {
                console.log(err.message);
            };
        }
    }

    isFormInvalid() {
        return !(this.state.question);
    }

    render() {
        let title;
        let deleteBtn;
        if (!this.state.id) {
            title = <h1>Enter a new Question:</h1>
            deleteBtn = null
        } else {
            title = <h1>Edit question</h1>
            deleteBtn = <button className="btn btn-default Large-btn btn-danger" onClick={this.handleDelete}>Delete</button>
        }
        
        return(
            <div className="question-form">
                <div className="form-group">
                    <h1>{this.props.location}</h1>
                    <form className="questionForm" onSubmit={this.state.id ?  this.handleEditSubmit : this.handleNewSubmit}>
                    <div className="formLayout">
                            {title}
                            <div className="col-sm-12 question">
                                <h2>Question: </h2>
                                <input type="text" className="form-control customLarge" placeholder="Question" value={this.state.question} name="question" onChange={this.handleChange} />
                            </div>
                            <div className="col-sm-12">
                                <h2>Description: </h2>
                                <textarea className= "form-control customArea" placeholder="Description" value={this.state.description} name="description" onChange={this.handleChange} rows='5' cols='100'/>
                            </div>
                            <div className="col-sm-12">
                                <h2>Tips: </h2>
                                <textarea className= "form-control customArea" placeholder="Tips" value={this.state.tips} name="tips" onChange={this.handleChange} rows='5' cols='100'/>
                            </div>
                            <div className="col-sm-12">
                                <h2>Script: </h2>
                                <textarea className= "form-control customArea" placeholder="Script" value={this.state.script} name="script" onChange={this.handleChange} rows='5' cols='100'/>
                            </div>
                            <div className="col-sm-12">
                                <h2>Timer [Minutues : Seconds]: </h2>
                                <div className="time-input">
                                    <input type="number" className="time-field" placeholder="min" value={this.state.minutes} name="minutes" onChange={this.handleChange} />&nbsp;:&nbsp;
                                    <input type="number" className="time-field" placeholder="sec" value={this.state.seconds} name="seconds" onChange={this.handleSecondsChange} />
                                </div>
                            </div>
                            <div className="col-sm-12 text-center">
                                <button className="btn btn-default Large-btn btn-info" disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;&nbsp;
                                <Link to='/questions'>Cancel</Link>&nbsp;&nbsp;&nbsp;
                                {deleteBtn}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};

export default QuestionForm;