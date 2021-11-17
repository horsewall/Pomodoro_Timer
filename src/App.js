/**
 * External Imports
 */
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

/**
 * Internal Imports
 */
import './App.css'
import breakPing from './sounds/415510__inspectorj__bell-counter-a.wav';
import workPing from './sounds/268756__morrisjm__dingaling.mp3';
import warningPing from './sounds/400695__dm103__pashley-ding-dong-type-bike-bell.wav';

const App = () => {
	const [title, setTitle] = useState('Work'); // Used for the header name

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
	const [playWarningPing] = useSound(warningPing);

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
			case 9:
			case 8:
			case 7:
			case 6:
				playWarningPing();
				break;
			case 5:
				playBreakPing();
				setTitle('Break');
				break;
			case 0:
				playWorkPing();
				setTitle('work');
				break;
			default:
				break;
		}
	}, [minutes, playWarningPing, playBreakPing, playWorkPing, remainingMinutes]);

	return (
		<div className="App">
			<h1 id={remainingMinutes <= 10 && remainingMinutes > 5 ? "redLetter" : undefined}>{title}</h1>
			<p>
				{/**
				 * Splits remaining minutes into a 25 and a 5 minute timer
				 * - (seconds !== 0 && minutes !== 0 ? 1 : 0) is used to prevent the minute from advancing before the secnods
				 * return to 59.
				 *
				 * The reason that 1 is default is becuase we have a partial minute made up by the seconds.
				 */}
				{remainingMinutes - (remainingMinutes > 5 ? 5 : 0) - (seconds !== 0 ? 1 : 0)}
				{/**
				 * Need to switch the seconds variable from displaying how many seconds into the minute, to seconds remaining.
				 */}
				:{(60 - seconds) % 60}
			</p>
		</div>
	);
};

export default App