/*global Meteor, Session, Template */
var lists = new Meteor.Collection("Lists");

/////Generic Helper Functions/////
/////Generic Helper Functions/////
//this function puts our cursor where it needs to be.
function focusText(input) {
  input.focus();
  input.select();
}

if (Meteor.isClient) {
  Template.categories.lists = function () {
    return lists.find({}, {sort: {Category: 1}});
  };

  Template.categories.new_category = function () {
    return Session.equals('adding_category', true);
  };

  Template.categories.events({
    'click #btnNewCategory': function (event, template) {
      Session.set('adding_category', true);
      Meteor.flush();
      focusText(template.find("#add-category"));
    },
    'keyup #add-category': function (event, template) {
      if (event.which === 13) {
        var categoryValue = String(event.target.value || "");
        if (categoryValue) {
          lists.insert({Category: categoryValue});
          Session.set('adding_category', false);
        }
      }
    },
    'focusout #add-category': function (event, template) {
      Session.set('adding_category', false);
    }
  });
  Session.set('adding_category', false);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
