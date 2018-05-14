import moment from 'moment';

export default function createItem ({ id, created, title = 'empty', userId = ''}) {
	return $.parseHTML(`
	<div id="${id}" class="card">
		<div class="content">
			<div class="header home-icon">
				<i class="ui home icon"></i>
			</div>
			<div class="header last-letter">
				${title[title.length - 1].toUpperCase()}
			</div>
			<div class="header">
				${title}
			</div>
			<div class="meta">
				${moment(created).format('YYYY MMMM DD')}
			</div>
			<div class="description user-id">
				${userId}
			</div>
		</div>
		<div class="extra content">
			<div class="right floated author">
				<img class="ui avatar tiny image" src="dist/matt.jpg">
			</div>
		</div>
	</div>
	`);
}
