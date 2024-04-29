import React from 'react'
import Home from './Home';

import CreatePost from './CreatePost';
import ProfileLink from './ProfileLink';
import Search from './Search';

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;