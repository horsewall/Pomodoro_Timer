/**
 * External Imports
 */
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

/**
 * Internal Imports
 */
import './App.css';
import breakPing from './sounds/workEnd.wav';
import workPing from './sounds/workStart.wav';
import fiveMinutes from './sounds/5minutes.wav';
import fourMinutes from './sounds/4minutes.wav';
import threeMinutes from './sounds/3minutes.wav';
import twoMinutes from './sounds/2minutes.wav';
import oneMinute from './sounds/1minute.wav';

const App = () => {
	/**
	 * Used for page header
	 */
	const [title, setTitle] = useState('Work');

	/**
	 * Time Variables
	 */
	const [minutes, setMinutes] = useState(new Date().getMinutes());
	const [seconds, setSeconds] = useState(new Date().getSeconds());

	/**
	 * Sound Variables
	 */
	const [playBreakPing] = useSound(breakPing);
	const [playWorkPing] = useSound(workPing);
	const [playFiveMinutes] = useSound(fiveMinutes);
	const [playFourMinutes] = useSound(fourMinutes);
	const [playThreeeMinutes] = useSound(threeMinutes);
	const [playTwoMinutes] = useSound(twoMinutes);
	const [playOneMinute] = useSound(oneMinute);

	/**
	 * remainingMinutes says how many minutes are left in the half hour
	 */
	var remainingMinutes = (60 - minutes) % 30;

	/**
	 * Update the time variables every second
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			setMinutes(new Date().getMinutes());
			setSeconds(new Date().getSeconds());
		}, 1000);
		return () => clearInterval(timer);
	});

	/**
	 * Alert sounds and title names based on how many minutes are left in the half hour
	 */
	useEffect(() => {
		switch (remainingMinutes) {
			case 10:
				playFiveMinutes();
				break;
			case 9:
				playFourMinutes();
				break;
			case 8:
				playThreeeMinutes();
				break;
			case 7:
				playTwoMinutes();
				break;
			case 6:
				playOneMinute();
				break;
			case 5:
				playBreakPing();
				setTitle('Break');
				break;
			case 0:
				playWorkPing();
				setTitle('Work');
				break;
			default:
				break;
		}
		//eslint-disable-next-line
	}, [remainingMinutes]);

	/**
	 * Splits remaining minutes into a 25 and a 5 minute timer
	 * - (seconds !== 0 && minutes !== 0 ? 1 : 0) is used to prevent the minute from advancing before the secnods
	 * return to 59.
	 *
	 * The reason that 1 is default is becuase we have a partial minute made up by the seconds.
	 */
	var timerMinuteValue = remainingMinutes - (remainingMinutes > 5 ? 5 : 0) - (seconds !== 0 ? 1 : 0);
	/**
	 * Need to switch the seconds variable from displaying how many seconds into the minute, to seconds remaining.
	 */
	var timerSecondValue = (60 - seconds) % 60;

	document.title = title + ':ㅤ' + (remainingMinutes - (remainingMinutes > 5 ? 5 : 0)) + 'm';

	return (
		<div className='App'>
			<h1 id={remainingMinutes <= 10 && remainingMinutes > 5 ? 'redLetter' : undefined}>{title}</h1>
			<p>
				{timerMinuteValue}:{timerSecondValue}
			</p>
		</div>
	);
};

export default App;
