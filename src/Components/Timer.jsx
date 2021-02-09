import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker'
import '../assets/styles.css'
import timer from '../assets/images/timer.png'
export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {chosenTime:new Date(), days:"00",hours:"00", minutes:"00", seconds:"00", clicked:false}
    }
    

    componentDidUpdate = () => {
        this.interval = setTimeout(() => {
            let now = new Date()
            let countdown = this.state.chosenTime - now
            if (countdown >= 0){
                let days = Math.floor(countdown/1000/60/60/24)
                days = days<10 ? "0"+days : days;
                countdown = countdown%(1000*60*60*24)
                let hours = Math.floor(countdown/1000/60/60)
                hours = hours<10 ? "0"+hours : hours;
                countdown = countdown%(1000*60*60)
                let minutes = Math.floor(countdown/1000/60)
                minutes = minutes<10 ? "0"+minutes : minutes;
                countdown = countdown%(1000*60)
                let seconds = Math.floor(countdown/1000)
                seconds = seconds<10 ? "0"+seconds : seconds;
                
                this.setState({days,hours, minutes, seconds})
            }
            else{
                this.setState({clicked:false})
            }
        }, 1000);
    }
  
    updateTime = (e) =>{
        this.setState({chosenTime:e})
    }


    shouldComponentUpdate = (nextProps, nextState)=>{
        if (!nextState.clicked){
            return false;
        }
        else{
            return true;
        }

    }

    render() {
        console.log("rendering")
        return (
            <div>
                <h1>countdown timer</h1>
               
                <DateTimePicker value={this.state.chosenTime} onChange={this.updateTime}/>
                <div className="mt-3">
                    <Button variant="primary" type="submit" onClick={()=>this.setState({clicked:true})}>
                        Begin Countdown
                        <img src={timer}/>
                    </Button>
                </div>
                <div className="counter">
                    <div>
                        <span className="time-value time">{this.state.days} </span>
                        <br/>
                        <span className="time-label time">Days</span>
                    </div>
                    <div>
                        <span className="time-value time">{this.state.hours} </span>
                        <br/>
                        <span className="time-label time">Hours</span>
                    </div>
                    <div>
                        <span className="time-value time">{this.state.minutes} </span>
                        <br/>
                        <span className="time-label time">Minutes</span>
                    </div>
                    <div>
                        <span className="time-value time">{this.state.seconds} </span>
                        <br/>
                        <span className="time-label time">Seconds</span>
                    </div>
                </div>
               

            </div>
        )
    }
}
