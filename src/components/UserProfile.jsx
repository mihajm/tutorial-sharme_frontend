import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';

import {AiOutlineLogout} from 'react-icons/ai';

import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology';

const activeBtnStyle = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const inactiveBtnStyle = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [pins, setPins] = useState(null);
	const [text, setText] = useState('Created');
	const [activeBtn, setActiveBtn] = useState('created');
	const {userId} = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (!userId) {
			return;
		}

		client.fetch(userQuery(userId))
			.then(data => setUser(data[0]));
	}, [userId]);

	useEffect(() => {
		if (!userId || !text) {
			return;
		}

		const query = text === 'Created' ? userCreatedPinsQuery(userId) : userSavedPinsQuery(userId);

		client.fetch(query).then(data => setPins(data));
	}, [text, userId]);

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	if (!user) {
		return <Spinner message="Loading profile..." />;
	}

	return (

		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img
							src={randomImage}
							referrerPolicy="no-referrer"
							className="w-full h-370 2xl:h-510 shadow-lg object-cover mb-10"
							alt="banner-pic"
						/>
						<img
							src={user?.image}
							className="rounded-full w-20 h-20 shadow-xl object-cover"
							alt="user-profile"
						/>
						<h1 className="font-bold text-3xl text-center mt-3">{user?.userName}</h1>
						<div className="absolute top-0 z-1 right-0 p-2">
							{userId === user?._id && user?._id && (
								<GoogleLogout clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} render={renderProps => (
									<button
										type="button"
										className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}>
										<AiOutlineLogout fontSize={21}/>
									</button>
								)}
								onLogoutSuccess={logout}
								cookiePolicy="single_host_origin"
								/>
							)}
						</div>
					</div>
					<div className="text-center mb-7">
						<button
							type="button"
							onClick={e => {
								setText(e.target.textContent);
								setActiveBtn('created');
							}}
							className={`${activeBtn === 'created' ? activeBtnStyle : inactiveBtnStyle}`}
						>
							Created
						</button>
						<button
							type="button"
							onClick={e => {
								setText(e.target.textContent);
								setActiveBtn('saved');
							}}
							className={`${activeBtn === 'saved' ? activeBtnStyle : inactiveBtnStyle}`}
						>
							Saved
						</button>
					</div>
					{pins?.length ? (
						<div className="px-2">
							<MasonryLayout pins={pins}/>
						</div>
					) : (
						<div className="flex justify-center font-bold items-center w-full text-xl mt-2">
							No Pins Found!
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
