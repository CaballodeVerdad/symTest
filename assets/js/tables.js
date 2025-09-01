import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import jsZip from 'jszip';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;
window.JSZip = jsZip;
// window.$ = $;

window.addEventListener("load", function () {
	console.log("DataTables loaded");
	
	$('.datatable-basic').DataTable({
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-export').DataTable({
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
		layout: {
			topStart: 'pageLength',
			top2Start: {
				buttons: ['copy', 'csv', 'excel', 'print']
			}
		}
	});

	$('.datatable-filters').DataTable({
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},

		initComplete: function () {
			// Add search inputs to each column header
			this.api()
			.columns()
			.every(function () {
				let column = this;
				let title = column.header().textContent;
 
				// Create input element
				let input = document.createElement('input');
				input.setAttribute('class', 'form-control form-control-sm mt-2');
				input.placeholder = 'Filtrar '+title+'...';
				column.header().appendChild(input);
 
				// Event listener for user input
				input.addEventListener('keyup', () => {
					if (column.search() !== this.value) {
						column.search(input.value).draw();
					}
				});

				// Event listener to prevent sort by clicking input
				input.addEventListener('click', function(e) {
					e.stopPropagation();
				});
			});
		},
	});

	$('.datatable-emailer').DataTable({
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
			buttons: {
				copyTitle: '¡Copiado al portapapeles!',
				copySuccess: {
					_: '%d correos electrónicos copiados.',
					1: '1 correo electrónico copiado.'
				}
			}
		},
		order : [0, 'asc'],
		layout: {
			top2Start: {
				buttons: [
					{
						extend: 'copy',
						text: 'Copiar Emails',
						header: false, // disables column headers
						title: '',	 // disables the table title
						exportOptions: {
							columns: [0],
						},
						customize: function (copy) {
							// Split copied text into lines, remove duplicates, and rejoin
							let lines = copy.split('\n');
							let uniqueLines = [...new Set(lines)].filter(line => line.trim() !== '');
							return uniqueLines.join('\n');
						}
					},
					'excel'
				],
			},
		},

		initComplete: function () {
			// Add search inputs to each column header
			this.api()
			.columns()
			.every(function () {
				let column = this;
				let title = column.header().textContent;
 
				// Create input element
				let input = document.createElement('input');
				input.setAttribute('class', 'form-control form-control-sm mt-2 min-width-100 small-text');
				input.placeholder = 'Filtrar '+title+'...';
				column.header().appendChild(input);
 
				// Event listener for user input
				input.addEventListener('keyup', () => {
					if (column.search() !== this.value) {
						column.search(input.value).draw();
					}
				});

				// Event listener to prevent sort by clicking input
				input.addEventListener('click', function(e) {
					e.stopPropagation();
				});
			});
		},
		
	});

	$('.datatable-users').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "lastName", width: "15%", "targets": 1 },
			{ name: "name", width: "15%", "targets": 2 },
			{ name: "email", width: "17%", "targets": 3 },
			{ name: "rut", width: "13%", "targets": 4 },
			{ name: "roles", width: "15%", "targets": 5 },
			{ name: "Actions", width: "20%", "targets": 6, orderable: false, searchable: false },
		],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/user/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getLastName', 'getName', 'getEmail', 'getRutText', 'getRolesTextArray'];
				d.buttons = [
					{ path: 'app_user_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_user_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_user_siding_update', class: 'btn btn-xs btn-primary', label: 'Sincronizar', target: '_blank', icon: 'sync' },
					{ path: 'app_user_impersonate', class: 'btn btn-xs btn-danger', label: 'personificar', icon: 'people_alt' }
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-users-students').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "lastName", width: "15%", "targets": 0 },
			{ name: "name", width: "15%", "targets": 1 },
			{ name: "email", width: "17%", "targets": 2 },
			{ name: "sex", width: "8%", "targets": 3 },
			{ name: "faculty", width: "15%", "targets": 4 },
			{ name: "major", width: "15%", "targets": 5 },
			{ name: "Actions", width: "15%", "targets": 6, orderable: false, searchable: false },
		],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/user/student/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getLastName', 
					'getName', 
					'getEmail',
					'getSexChar',
					'getStudentFacultyName',
					'getStudentMajorName'
				];
				d.buttons = [
					{ path: 'app_user_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_user_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_user_siding_update', class: 'btn btn-xs btn-primary', label: 'Sincronizar', target: '_blank', icon: 'sync' },
					{ path: 'app_user_impersonate', class: 'btn btn-xs btn-danger', label: 'personificar', icon: 'people_alt' }
				];
				d.searchBy = {
					'faculty': {
						'columns': ['f.name'],
					},
					'major': {
						'columns': ['m.name'],
					},
				};
			}
		},

		language: {
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-users-mentors').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "lastName", width: "15%", "targets": 0 },
			{ name: "name", width: "15%", "targets": 1 },
			{ name: "email", width: "17%", "targets": 2 },
			{ name: "sex", width: "8%", "targets": 3 },
			{ name: "faculty", width: "15%", "targets": 4 },
			{ name: "department", width: "15%", "targets": 5 },
			{ name: "Actions", width: "15%", "targets": 6, orderable: false, searchable: false },
		],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/user/mentor/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getLastName', 
					'getName', 
					'getEmail',
					'getSexChar',
					'getMentorFacultyName',
					'getMentorDepartmentNames',
				];
				d.buttons = [
					{ path: 'app_user_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_user_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_user_siding_update', class: 'btn btn-xs btn-primary', label: 'Sincronizar', target: '_blank', icon: 'sync' },
					{ path: 'app_user_impersonate', class: 'btn btn-xs btn-danger', label: 'personificar', icon: 'people_alt' },
				];
				d.searchBy = {
					'faculty': {
						'columns': ['f.name'],
					},
					'department': {
						'columns': ['d.name'],
					},
				};
			}
		},

		language: {
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-users-others').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "lastName", width: "30%", "targets": 0 },
			{ name: "name", width: "30%", "targets": 1 },
			{ name: "email", width: "20%", "targets": 2 },
			{ name: "Actions", width: "20%", "targets": 3, orderable: false, searchable: false },
		],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/user/other/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getLastName', 'getName', 'getEmail']; // Array of getter methods
				d.buttons = [
					{
						path: 'app_user_show',
						class: 'btn btn-xs btn-info',
						label: 'ver'
					},
					{
						path: 'app_user_edit',
						class: 'btn btn-xs btn-secondary',
						label: 'editar',
						icon: 'edit'
					},
					{
						path: 'app_user_siding_update',
						class: 'btn btn-xs btn-primary',
						label: 'Sincronizar',
						target: '_blank',
						icon: 'sync'
					},
					{
						path: 'app_user_impersonate',
						class: 'btn btn-xs btn-danger',
						label: 'personificar',
						icon: 'people_alt'
					}
				];
			}
		},

		language: {
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-users-admins').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "lastName", width: "30%", "targets": 0 },
			{ name: "name", width: "30%", "targets": 1 },
			{ name: "email", width: "20%", "targets": 2 },
			{ name: "Actions", width: "20%", "targets": 3, orderable: false, searchable: false },
		],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/user/admin/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getLastName', 
					'getName', 
					'getEmail',
				];
				d.buttons = [
					{ path: 'app_user_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_user_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_user_siding_update', class: 'btn btn-xs btn-primary', label: 'Sincronizar', target: '_blank', icon: 'sync' },
					{ path: 'app_user_impersonate', class: 'btn btn-xs btn-danger', label: 'personificar', icon: 'people_alt' }
				];
			}
		},

		language: {
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_report_show', class: 'btn btn-xs btn-primary', label: 'ver informe', conditional: 'hasReport', params: {'id': 'getReportId'} },
					{ path: 'app_report_new', class: 'btn btn-xs btn-danger', label: 'subir informe', conditional: 'reportPending' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-to-publish').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/to-publish/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-graded').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/graded/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-ungraded').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/ungraded/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_report_show', class: 'btn btn-xs btn-primary', label: 'ver informe', conditional: 'hasReport', params: {'id': 'getReportId'} },
					{ path: 'app_report_new', class: 'btn btn-xs btn-danger', label: 'subir informe', conditional: 'reportPending' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-with-report').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/with-report/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_report_show', class: 'btn btn-xs btn-primary', label: 'ver informe', conditional: 'hasReport', params: {'id': 'getReportId'} },
					{ path: 'app_report_new', class: 'btn btn-xs btn-danger', label: 'subir informe', conditional: 'reportPending' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-without-report').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/without-report/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_report_show', class: 'btn btn-xs btn-primary', label: 'ver informe', conditional: 'hasReport', params: {'id': 'getReportId'} },
					{ path: 'app_report_new', class: 'btn btn-xs btn-danger', label: 'subir informe', conditional: 'reportPending' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-researches-rcer').DataTable({
		autoWidth: false,
		columnDefs: [
			{ name: "id", width: "5%", "targets": 0 },
			{ name: "creationDate", width: "12%", "targets": 1 },
			{ name: "initialsCode", width: "12%", "targets": 2 },
			{ name: "academicYear", width: "11%", "targets": 3 },
			{ name: "nameOP", width: "22%", "targets": 4 },
			{ name: "student", width: "16%", "targets": 5 },
			{ name: "score", width: "11%", "targets": 6 },
			{ name: "Actions", width: "11%", "targets": 7, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/research/rcer/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = ['getId', 'getCreationDate', 'getClassCodeWithSection', 'getPeriod', 'getNameOPWithTagsSimple', 'getStudentName', 'getScoreInformation'];
				d.searchBy = {
					'student': {
						'columns': ['u.name', 'u.lastName'],
					},
					'initialsCode': {
						'columns': ['table.initialsCode', 'table.numbersCode', 'table.section'],
						'pattern': '/^([A-Za-z]+)(\\d+)(?:-(\\d+))?$/',
					},
					'academicYear': {
						'columns': ['table.academicYear', 'table.semester'],
						'pattern': '/^(\\d+)(?:-(\\d+))?$/',
					},
					'score': {
						'columns': ['table.numericScore'],
					},
				};
				
				d.buttons = [
					{ path: 'app_research_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_research_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_report_show', class: 'btn btn-xs btn-primary', label: 'ver informe', conditional: 'hasReport', params: {'id': 'getReportId'} },
					{ path: 'app_rcer_submission_show', class: 'btn btn-xs btn-success', label: 'ver material RCER', conditional: 'hasRcerSubmission', params: {'id': 'getRcerSubmissionId'} },
					{ path: 'app_report_new', class: 'btn btn-xs btn-danger', label: 'subir informe', conditional: 'reportPending' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-log-states').DataTable({
		autoWidth: false,

		columnDefs: [
			{ name: "datetime", width: "10%", "targets": 0 },
			{ name: "oportunityId", width: "10%", "targets": 1 },
			{ name: "applicationId", width: "10%", "targets": 2 },
			{ name: "oportunityName", width: "10%", "targets": 3 },
			{ name: "studentName", width: "10%", "targets": 4 },
			{ name: "mentors", width: "10%", "targets": 5 },
			{ name: "oldStateText", width: "10%", "targets": 6 },
			{ name: "newStateText", width: "10%", "targets": 7 },
			{ name: "userFullName", width: "10%", "targets": 8 },
		],
		order: [[0, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/log-state/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getDatetime', 
					'getOportunityId',
					'getApplicationId', 
					'getOportunityName', 
					'getStudentShowName', 
					'getMentorsNameText', 
					'getOldStateText', 
					'getNewStateText', 
					'getUserShowName',
				];

				d.searchBy = {
					'oportunityId': {
						'columns': ['o.id'],
					},
					'applicationId': {
						'columns': ['a.id'],
					},
					'oportunityName': {
						'columns': ['o.name'],
					},
					'studentName': {
						'columns': ['su.name', 'su.lastName'],
					},
					'mentors': {
						'columns': ['mu.name', 'mu.lastName'],
					},
					'userFullName': {
						'columns': ['u.name', 'u.lastName'],
					},
					'oldStateText': {
						'columns': ['ns.text'],
					},
					'newStateText': {
						'columns': ['os.text'],
					},
				};
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-applications').DataTable({
		autoWidth: false,

		columnDefs: [
			{ name: "oportunityName", width: "20%", "targets": 0 },
			{ name: "studentName", width: "15%", "targets": 1 },
			{ name: "mentorsNames", width: "15%", "targets": 2 },
			{ name: "stateText", width: "15%", "targets": 3 },
			{ name: "applicationDate", width: "10%", "targets": 4 },
			{ name: "lastUpdateDate", width: "10%", "targets": 5 },
			{ name: "Actions", width: "15%", "targets": 6, orderable: false, searchable: false },
		],
		order: [[4, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/application/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getOportunityResearchName',
					'getStudentShowName',
					'getMentorsNames',
					'getStateHTMLText',
					'getApplicationDate',
					'getLastUpdateDate',
				];

				d.searchBy = {
					'oportunityName': {
						'columns': ['o.name'],
					},
					'studentName': {
						'columns': ['su.name', 'su.lastName'],
					},
					'mentorsNames': {
						'columns': ['mu.name', 'mu.lastName'],
					},
					'stateText': {
						'columns': ['st.text'],
					},
				};
				
				d.buttons = [
					{ path: 'app_application_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_application_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_log_state_index_application', class: 'btn btn-xs btn-primary', label: 'historial', icon: 'history' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-applications-pending').DataTable({
		autoWidth: false,

		columnDefs: [
			{ name: "oportunityName", width: "20%", "targets": 0 },
			{ name: "studentName", width: "15%", "targets": 1 },
			{ name: "mentorsNames", width: "15%", "targets": 2 },
			{ name: "stateText", width: "15%", "targets": 3 },
			{ name: "applicationDate", width: "10%", "targets": 4 },
			{ name: "lastUpdateDate", width: "10%", "targets": 5 },
			{ name: "Actions", width: "15%", "targets": 6, orderable: false, searchable: false },
		],
		order: [[4, 'desc']],
		processing: true,
		serverSide: true,
		ajax: {
			url: '/application/pending/ajax',
			type: 'POST',
			data: function (d) {
				d.getters = [
					'getOportunityResearchName', 
					'getStudentShowName',
					'getMentorsNames', 
					'getStateHTMLText', 
					'getApplicationDate', 
					'getLastUpdateDate',
				];

				d.searchBy = {
					'oportunityName': {
						'columns': ['o.name'],
					},
					'studentName': {
						'columns': ['su.name', 'su.lastName'],
					},
					'mentorsNames': {
						'columns': ['mu.name', 'mu.lastName'],
					},
					'stateText': {
						'columns': ['st.text'],
					},
				};
				
				d.buttons = [
					{ path: 'app_application_show', class: 'btn btn-xs btn-info', label: 'ver' },
					{ path: 'app_application_edit', class: 'btn btn-xs btn-secondary', label: 'editar', icon: 'edit' },
					{ path: 'app_log_state_index_application', class: 'btn btn-xs btn-primary', label: 'historial', icon: 'history' },
				];
			}
		},

		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-export-mentor-index').DataTable({
		autoWidth: false,
		columnDefs: [
			{ width: "10%", "targets": 0},
			{ width: "10%", "targets": 1 },
			{ width: "30%", "targets": 2 },
			{ width: "20%", "targets": 3 },
			{ width: "10%", "targets": 4 },
			{ width: "20%", "targets": 5, orderable: false, searchable: false },
		],
		order: [[0, 'desc']],
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
		layout: {
			topStart: 'pageLength',
			top2Start: {
				buttons: [
					{
						extend: 'excel',
						text: 'Excel',
						title: "",
						exportOptions: {
							columns: ':not(:eq(5))', // Exclude column 5 (index 4 in zero-based indexing)
						},
						customize: function (xlsx) {
							var sheet = xlsx.xl.worksheets['sheet1.xml'];
			
							// Apply style 25 to all cells by default
							$('row c', sheet).attr('s', '25');
							$('row:eq(0) c', sheet).attr('s', '47');
						}
					},
					{
						extend: 'pdf',
						text: 'PDF',
						exportOptions: {
							columns: ':not(:eq(5))', // Exclude column 5 (index 4 in zero-based indexing)
						}
					}
				]
			}
		}
	});

	$('.datatable-oportunities').DataTable({
		order: [[0, 'desc']],
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-class-codes').DataTable({
		order: [[0, 'asc']],
		columnDefs: [
			{ targets: '_all', orderable: false }, // Disable ordering on all columns
			{ targets: 0, orderable: true }		// Enable ordering only on the first column
		],
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});

	$('.datatable-my-applications').DataTable({
		order: [[4, 'desc']],
		language: { 
			url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
			paginate: {
				first: "«",
				last: "»",
				next: "›",
				previous: "‹"
			},
		},
	});
});