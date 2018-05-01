angular
  .module('courses')
  .component('lecturerCourseCard', {
    templateUrl: 'courses/lecturer-course-card.template.html',
    component: lecturerCourseCardComponent,
    bindings: { course: '<' }
  })

function lecturerCourseCardComponent() {
  console.log('hi')
}