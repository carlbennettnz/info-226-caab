angular

function validateAssignment (assignment){
    const thingstoCheck = [
        { value: assignment.name, message:'The assignment needs a name'},
        { value: assignment.overview, message:'The assignment needs an overview'},
        { value: assignment.dueDate, message:'The assignment needs a due date'}        
    ]

    return thingstoCheck
        .filter(({ value }) => notPresent(value))
        .map(({ message }) => message)
}

function notPresent(value){
    return value == null || value.length === 0

}