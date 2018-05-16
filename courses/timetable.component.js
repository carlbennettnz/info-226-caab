angular
  .module('courses')
  .component('timetable', {
    templateUrl: 'courses/timetable.template.html',
    controller: timetableComponent
  })

function timetableComponent($scope, store) {
  $scope.timeslots = getBlankTimetable()

  $scope.timeslots[3].days[1] = {
    ...$scope.timeslots[3].days[1],
    code: 'INFO226'
  }

  $scope.timeslots[3].days[3] = {
    ...$scope.timeslots[3].days[3],
    code: 'INFO226'
  }

  $scope.timeslots[6].days[1] = {
    ...$scope.timeslots[3].days[1],
    code: 'INFO226'
  }

  $scope.timeslots[6].days[3] = {
    ...$scope.timeslots[3].days[3],
    code: 'INFO226'
  }
}

function getBlankTimetable() {
  const timetable = []

  for (let i = 0; i < 10; i++) {
    const slot = {}

    slot.time = `${(i + 7) % 12 + 1}:00 ${i > 4 ? 'PM' : 'AM'}`
    slot.days = []

    for (let j = 0; j < 5; j++) {
      slot.days.push({ slotId: i * 5 + j })
    }

    timetable.push(slot)
  }

  return timetable
}
