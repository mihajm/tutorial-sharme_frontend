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

	return !loading ? (
		<div>
			{pins && pins.length > 0 && <MasonryLayout pins={pins} />}
		</div>
	) : <Spinner message="Adding new ideas to your feed!" />;
};

export default Feed;
