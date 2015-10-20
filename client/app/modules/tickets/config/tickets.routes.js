'use strict';
angular.module('com.module.tickets')
  .config(function($stateProvider) {
    $stateProvider.state('app.tickets', {
      abstract: true,
      url: '/tickets',
      templateUrl: 'modules/tickets/views/main.html'
    }).state('app.tickets.list', {
      url: '',
      templateUrl: 'modules/tickets/views/list.html',
      controller: 'TicketsCtrl'
    }).state('app.tickets.add', {
      url: '/add',
      templateUrl: 'modules/tickets/views/form.html',
      controller: 'TicketsCtrl'
    }).state('app.tickets.edit', {
      url: '/:id/edit',
      templateUrl: 'modules/tickets/views/form.html',
      controller: 'TicketsCtrl'
    }).state('app.tickets.view', {
      url: '/:id',
      templateUrl: 'modules/tickets/views/view.html',
      controller: 'TicketsCtrl'
    });
  });
