// En tu archivo app.js u otro archivo principal
import 'select2'; // Importa Select2

// Puedes inicializar Select2 en elementos específicos
$(document).ready(function () {

    $('.select2').select2({
        width: '100%',
    });

    $('.select2-users').select2({
        width: '100%',
        ajax: {
            url: '/user/search/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $('.select2-non-mentor-users').select2({
        width: '100%',
        ajax: {
            url: '/user/search/non-mentor-user/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $('.select2-student-users').select2({
        width: '100%',
        ajax: {
            url: '/user/search/student-user/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $('.select2-mentors').select2({
        width: '100%',
        ajax: {
            url: '/user/search/mentor/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results.map(item => ({
                        id: item.id,
                        text: item.text,
                        roles: item.roles
                    })),
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    // Add roles to the <option> elements in the <select>
    $('.select2-mentors').on('select2:select', function (e) {
        const selectedData = e.params.data;
        const option = $(this).find(`option[value="${selectedData.id}"]`);
        if (selectedData.roles) {
            option.attr('data-roles', JSON.stringify(selectedData.roles));
        }

        if (typeof window.updateResponsibleMentorOptions === 'function') {
            window.updateResponsibleMentorOptions();
        }
    });

    $('.select2-mentors').on('select2:unselect', function (e) {
        const unselectedData = e.params.data;
        const option = $(this).find(`option[value="${unselectedData.id}"]`);
        option.removeAttr('data-roles');

        if (typeof window.updateResponsibleMentorOptions === 'function') {
            window.updateResponsibleMentorOptions();
        }
    });

    $('.select2-students').select2({
        width: '100%',
        ajax: {
            url: '/user/search/student/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $('.select2-oportunities').select2({
        width: '100%',
        ajax: {
            url: '/oportunity-research/search/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $('.select2-researches').select2({
        width: '100%',
        ajax: {
            url: '/research/search/ajax',
            dataType: 'json',
            delay: 250, // Add a delay to prevent overloading the server
            data: function (params) {
                return {
                    search: params.term, // Send the search term
                    page: params.page || 1 // Handle pagination if needed
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
            
                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            }
        },
    });

    $(".select2-keywords").select2({
        width: '100%',
        tags: true,
        tokenSeparators: [','],
        maximumInputLength: 20,
        casesensitive: false,
        createTag: function(newTag) {
            if(/^\d.*/.test(newTag.term))
                return {
                    id: 'k' + newTag.term,
                    text: newTag.term
                };
            else
                return {
                id: newTag.term,
                text: newTag.term
            };

        }
    });

   $(".select2-prerequisites").select2({
        width: '100%',
        tags: true,
        tokenSeparators: [','],
        maximumInputLength: 10,
        casesensitive: false,
        createTag: function(params) {
            var term = $.trim(params.term);

            return {id: term.toUpperCase(), text: term.toUpperCase()};
        }
    });
});


window.updateResponsibleMentorOptions = function () {
    const mentorsField = document.getElementById('research_mentors') || document.getElementById('oportunity_research_mentors');
    const responsibleMentorField = document.getElementById('research_responsibleMentor') || document.getElementById('oportunity_research_responsibleMentor');

    if (!mentorsField || !responsibleMentorField) return;

    const selectedOptions = Array.from(mentorsField.selectedOptions || []);
    const currentResponsibleValue = responsibleMentorField.value;

    responsibleMentorField.innerHTML = '';

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Seleccione un mentor responsable';
    responsibleMentorField.appendChild(placeholderOption);

    let isCurrentResponsibleStillValid = false;

    selectedOptions.forEach(option => {
        const roles = option.getAttribute('data-roles') ? JSON.parse(option.getAttribute('data-roles')) : [];
        if (roles.includes('ROLE_PROFESSOR')) {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.textContent = option.textContent;

            // Check if the current responsible mentor is still valid
            if (option.value === currentResponsibleValue) {
                newOption.selected = true; // Keep it selected
                isCurrentResponsibleStillValid = true;
            }

            responsibleMentorField.appendChild(newOption);
        }
    });

    // If the current responsible mentor is no longer valid, keep the placeholder selected
    if (!isCurrentResponsibleStillValid) {
        responsibleMentorField.value = '';
    }

    responsibleMentorField.dispatchEvent(new Event('change'));
};

document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.updateResponsibleMentorOptions === 'function') {
        window.updateResponsibleMentorOptions();
    }
});