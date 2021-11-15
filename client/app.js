function getGoals(){
    $.get('http://localhost:3000/goals', function(data){
        viewModel.goals(data);
    });
}

function viewModel(){
var self = this;
self.goals = ko.observableArray();
self.goalInputName = ko.observable();
self.goalInputDate = ko.observable();
self.goalInputType = ko.observable();

self.addGoal = function(){
    var name = $('#name').val();
    var type = $('#type').val();
    var deadline = $('#deadline').val();
    self.goals.push({
        name:name,
        type: type,
        deadline: deadline
    })
   $.ajax({
       url: "http://localhost:3000/goals",
       data: JSON.stringify({
           "name": name,
           "type": type,
           "deadline": deadline
       }),
       type: "POST",
       contentType: "application/json",
       success: function(data){
           console.log('Goal added...')
       }, 
       error: function(xhr, status, err){
       console.log(err);
       }
   }) 
} 

self.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Self Help'])
}

var viewModel = new viewModel();

ko.applyBindings(viewModel);