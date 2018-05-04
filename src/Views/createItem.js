export default function createItem ({ id, created, title }) {
	return $.parseHTML(`
	<div id="${id}" class="card">
		<div class="content">
			<div class="right floated">
				<button class="ui tiny icon button">
					<i class="edit icon"></i>
				</button>
			</div>
			<div class="header">
				${title} - ${id}
			</div>
			<div class="meta">
				${created}
			</div>
			<div class="description">
				Description
			</div>
		</div>
		<div class="extra content">
			<div class="ui two buttons">
				<div class="ui basic green button">
					<i class="plus user"></i>
					Создать отчет
				</div>
			</div>
		</div>
			<div class="extra content">
				<div class="right floated author">
					<img class="ui avatar tiny image" src="/matt.jpg">
				</div>
			</div>
	</div>
	`);
}
