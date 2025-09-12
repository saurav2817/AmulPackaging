import React, { useEffect, useMemo, useRef, useState } from 'react';

const useCountUp = (endValue, isActive, durationMs = 1200) => {
	const [displayValue, setDisplayValue] = useState(0);
	const startTimestampRef = useRef(null);

	useEffect(() => {
		if (!isActive) {
			setDisplayValue(0);
			startTimestampRef.current = null;
			return;
		}

		let animationFrameId;
		const tick = (timestamp) => {
			if (startTimestampRef.current === null) {
				startTimestampRef.current = timestamp;
			}
			const elapsed = timestamp - startTimestampRef.current;
			const progress = Math.min(elapsed / durationMs, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setDisplayValue(Math.round(eased * endValue));
			if (progress < 1) {
				animationFrameId = requestAnimationFrame(tick);
			}
		};

		animationFrameId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(animationFrameId);
	}, [endValue, isActive, durationMs]);

	return displayValue;
};

const CounterCard = ({ label, value, suffix = '%' }) => {
	const containerRef = useRef(null);
	const [inView, setInView] = useState(false);
	const displayValue = useCountUp(value, inView);

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setInView(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative flex flex-col items-center justify-center text-white bg-primary shadow-md p-8"
			style={{
				clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
				aspectRatio: "1 / 1",
				width: "250px", // fixed hexagon size
			}}
		>
			<div className="text-[2.8rem] font-extrabold">{displayValue}{suffix}</div>
			<div className="text-lg font-medium opacity-90 text-center">{label}</div>
		</div>
	);
};


const Counters = () => {
	const countersData = useMemo(
		() => [
			{ label: 'Quality', value: 98,},
			{ label: 'Sustainable', value: 99 },
			{ label: 'Design', value: 98 },
		],
		[]
	);

	return (
		<section className="bg-white py-16">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid gap-y-6">
					{/* First row */}
					<div className="flex justify-center gap-6">
						{countersData.slice(0, 3).map((item) => (
							<CounterCard key={item.label} label={item.label} value={item.value} />
						))}
					</div>

					
				</div>
			</div>
		</section>
	);
};


export default Counters;