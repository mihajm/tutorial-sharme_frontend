import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import {searchQuery, feedQuery} from '../utils/data';

const Feed = () => {
	const [loading, setLoading] = useState(false);
	const [pins, setPins] = useState([]);

	const {categoryId} = useParams();

	useEffect(() => {
		setLoading(true);
		client.fetch(categoryId ? searchQuery(categoryId) : feedQuery).then(data => setPins(data)).then(() => setLoading(false));
	}, [categoryId]);

	if (loading) {
		return <Spinner message="Adding new ideas to your feed!" />;
	}

	if (!pins.length) {
		return <h2 className="font-semibold w-full text-center">No pins available! :-(</h2>;
	}

	return (
		<div>
			{pins && pins.length > 0 && <MasonryLayout pins={pins} />}
		</div>
	);
};

export default Feed;
