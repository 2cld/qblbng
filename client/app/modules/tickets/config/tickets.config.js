'use strict';
angular.module('com.module.tickets')
  .run(function($rootScope, Ticket, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Tickets'), 'app.tickets.list',
      'fa-calendar-o');

    Ticket.find(function(data) {
      $rootScope.addDashboardBox('Tickets', 'bg-purple', 'ion-calendar',
        data.length, 'app.tickets.list');
    });

  });
