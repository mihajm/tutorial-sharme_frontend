import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
	default: 4,
	10000: 10,
	4000: 7,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

const MasonryLayout = ({pins}) => (
	<div>
		<Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
			{pins && pins.length && pins?.map(pin => <Pin key={pin._id} pin={pin} className="w-max"></Pin>)}
		</Masonry>
	</div>
);

export default MasonryLayout;
