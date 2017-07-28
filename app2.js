var map;

var markers = [];
var locations = [
          {title: 'White Tower', location: {lat: 40.626446, lng:22.948426}},
          {title: 'Museum of Photography', location: {lat: 40.632874, lng:22.935479}},
          {title: 'Teloglion Fine Arts Foundation', location: {lat: 40.632854, lng:22.941567}},
          {title: 'War Museum of Thessaloniki', location: {lat: 40.624308, lng: 22.95953}},
          {title: 'Jewish Museum of Thessaloniki', location: {lat: 40.635132, lng: 22.939538}}
        ];

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.6401, lng: 22.9444},
         zoom: 14
       });
       for (var i = 0; i < locations.length; i++) {
               // Get the position from the location array.
               var position = locations[i].location;
               var title = locations[i].title;
               // Create a marker per location, and put into markers array.
                var marker = new google.maps.Marker({
                 position: position,
                 title: title,
                 map: map,
                 animation: google.maps.Animation.DROP,
                 id: i
               });
            markers.push(marker);
     };

     var Loc = function(data){
       this.title = ko.observable(data.title);
       this.location = ko.observable(data.location);
     };

     var ViewModel = function(){
      var self = this;
      this.locList = ko.observableArray([]);

      locations.forEach(function(locItem){
      self.locList.push(new Loc(locItem) )
     });
     this.currentLoc = ko.observable(this.locList()[0]);
     this.setLoc = function(clickedLoc){
          for(var i = 0; i < self.locList.length; i++){
            if(clickedLoc.title == markers[i].title){
              markers[i].setAnimation(google.maps.Animation.BOUNCE);
            }
          }
        };
     };
     ko.applyBindings(new ViewModel())
};
