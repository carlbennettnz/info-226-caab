angular
    .module('courses')
    .controller('assignment', assignmentController)

function assignmentController($scope, $http) {
    $scope.assignments =[]

    $http({
        method: 'GET',
        url: 'https://caab.sim.vuw.ac.nz/api/palmertarr/assignment_directory.json'
    }).then(response => {
        if (response.data.assignments) {
            $scope.assignments = response.data.assignments.map(assignment => ({
                name: assignment.Name,
                code: course.ID,
                date: assignment.dueDate
            }))
     }
    })
}
        