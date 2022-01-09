import React, {useState, useEffect} from 'react';

import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import {feedQuery, searchQuery} from '../utils/data';

const Search = ({searchTerm}) => {
	const [pins, setPins] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		client
			.fetch(searchTerm ? searchQuery(searchTerm.toLowerCase()) : feedQuery)
			.then(data => setPins(data))
			.then(() => setLoading(false));
	}, [searchTerm]);

	return (
		<div>
			{loading && <Spinner message="Searching for pins..." />}
			{pins?.length && !loading && <MasonryLayout pins={pins} />}
			{pins?.length === 0 && searchTerm?.length && !loading && <div className="mt-10 text-center text-xl">No pins found!</div>}
		</div>
	);
};

export default Search;
