
import * as React from "react";
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) =>
Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

//Type used for setInterval
type IntervalType = ReturnType<typeof setInterval> | null| number | undefined;

interface StopwatchState {
  secondsElapsed: number,
  lastClearedIncrementer:  IntervalType ,
  laps: number[]
}

class Stopwatch extends Component<StopwatchProps, StopwatchState> {
  incrementer: IntervalType

  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: null,
      laps: []
    }
    //This was added in comments alternatively as an option compared to arrow functions implemented
   /* this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);*/
    /** */
  }

  handleStartClick = () => {
    this.incrementer = setInterval(() =>
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    }), 1000);
  }

  handleStopClick = () => {
    if(this.incrementer) {
      clearInterval(this.incrementer);
    }
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  }

  handleResetClick = () => {
    if(this.incrementer) {
      clearInterval(this.incrementer);
    }

    this.setState({
      secondsElapsed: 0,
      laps: []
    });
  }

  handleLabClick = () => {
    const newLaps = [...this.state.laps, this.state.secondsElapsed];
    this.setState({
      laps: newLaps
    });
  }

  handleDeleteClick = (index: number) => {
    const newLaps = [
      ...this.state.laps.slice(0, index),
      ...this.state.laps.slice(index + 1)
    ];
    return () => this.setState({
      laps: newLaps
    });
  }

  //We need to clear any uncleared timer intervals as component is destroyed
  componentWillUnmount() {
    if(this.incrementer) {
      clearInterval(this.incrementer);
    }
  }

  render() {
    const {
    secondsElapsed,
    laps,
    lastClearedIncrementer,
    } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {(secondsElapsed === 0 || this.incrementer === lastClearedIncrementer
        ? <button type="button" className="start-btn"
        onClick={this.handleStartClick}>start</button>
        : <button type="button" className="stop-btn"
        onClick={this.handleStopClick}>stop</button>
        )}
        {(secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer
        ? <button type="button" onClick={this.handleLabClick}>lap</button>
        : null
        )}
        {(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer
        ? <button type="button" onClick={this.handleResetClick}>reset</button>
        : null
        )}
        <div className="stopwatch-laps">
        { laps && laps.map((lap, i) =>
        <Lap key={i} index={i+1} lap={lap} onDelete={this.handleDeleteClick(i)} />) }
        </div>
      </div>
    );
  }

}

const Lap = (props: { index: number, lap: number, onDelete: ()=>void }) => (
<div key={props.index} className="stopwatch-lap">
<strong>{props.index}</strong>/ {formattedSeconds(props.lap)} <button
onClick={props.onDelete} > X </button>
</div>
);

const IntervalHolder = () =>{
  return (
    <Stopwatch initialSeconds={0} />
  )
}

export default IntervalHolder;

/*ReactDOM.render(
<Stopwatch initialSeconds={0} />,
document.getElementById("content"),
);*/