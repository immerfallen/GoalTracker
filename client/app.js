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
self.isUpdate = ko.observable(false);
self.updateId = ko.observable();
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

self.updateGoal = function(){
    var id = self.updateId;
    console.log(id)
    var name = $('#name').val();
    var type = $('#type').val();
    var deadline = $('#deadline').val();

    self.goals.remove(function(item){
        return item._id == id
    });

    self.goals.push({
        name:name,
        type: type,         
        deadline: deadline
    })
   $.ajax({
       url: "http://localhost:3000/goals/" + id,
       data: JSON.stringify({
           "name": name,
           "type": type,
           "deadline": deadline
       }),
       type: "PUT",
       contentType: "application/json",
       success: function(data){
           console.log('Goal updated...')
       }, 
       error: function(xhr, status, err){
       console.log(err);
       }
   }) 
}

self.editSelected = function (){
    self.updateId= self.selectedGoals()[0]._id;
    var name = self.selectedGoals()[0].name;
    var type = self.selectedGoals()[0].type;
    var deadline = self.selectedGoals()[0].deadline;

    self.isUpdate(true);
    self.goalInputName(name);
    self.goalInputType(type);
    self.goalInputDate(deadline);

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