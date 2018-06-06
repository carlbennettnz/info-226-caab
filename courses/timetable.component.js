angular
  .module('courses')
  .component('timetable', {
    templateUrl: 'courses/timetable.template.html',
    controller: timetableComponent
  })

function timetableComponent($scope, store, session) {
  $scope.timeslots = getBlankTimetable()

  const user = session.getUser()

  store.get('courseAssociations', assoc => assoc.studentId === user.id)
    .then(assocs => assocs.map(assoc => assoc.courseId))
    .then(courseIds => store.get('courses', course => courseIds.includes(course.id)))
    .then(courses => courses.forEach(course => fillTimetable($scope.timeslots, course)))
}

function getBlankTimetable() {
  const timetable = []

  for (let i = 0; i < 10; i++) {
    const slot = {}

    slot.time = `${(i + 7) % 12 + 1}:00 ${i >= 4 ? 'PM' : 'AM'}`
    slot.days = []

    for (let j = 0; j < 5; j++) {
      slot.days.push({ slotId: i * 5 + j })
    }

    timetable.push(slot)
  }

  return timetable
}

function fillTimetable(timetable, course) {
  const [ dayStr, timeStr ] = course.lectureTimes.split(' ')
  const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(dayStr)
  let time = parseInt(timeStr.match(/\d+/)[0], 10) - 8
  
  if (/pm/i.test(timeStr) && time !== 4) time += 12

  timetable[time].days[day] = {
    ...timetable[time].days[day],
    code: course.id 
  }
}
