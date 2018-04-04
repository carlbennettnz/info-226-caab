angular
  .module('courses')
  .component('courseList', {
    templateUrl: 'courses/course-list.template.html',
    controller: [
      function CourseListController() {
        this.courses = []
      }
    ]
  })
