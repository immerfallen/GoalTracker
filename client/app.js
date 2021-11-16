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
self.selectedGoals = ko.observableArray();
self.canEdit = ko.computed(function(){
    return self.selectedGoals().length > 0;
});

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
self.deleteSelected = function(){
    $.each(self.selectedGoals(), function(index, value){
        var id = self.selectedGoals()[index]._id;
        $.ajax({url: "http://localhost:3000/goals/"+id,        
        type: "DELETE",
        async: true,
        timeout: 300000,
        success: function(data){
            console.log('Goals removed...')
        }, 
        error: function(xhr, status, err){
        console.log(err);
        }})
    })
    self.goals.removeAll(this.selectedGoals());
    self.selectedGoals.removeAll();
}

self.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Self Help'])
}

var viewModel = new viewModel();

ko.applyBindings(viewModel);