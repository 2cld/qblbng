/*jshint sub:true*/
'use strict';
angular.module('com.module.tickets')
  .controller('TicketsCtrl', function($scope, $state, $stateParams, CoreService,
    Ticket, gettextCatalog) {

    var ticketId = $stateParams.id;

    var createDate = function(date, time) {

      console.log(date);
      console.log(time);
      if (!date || !time) {
        return date || time;
      }

      var out = angular.copy(time);
      out.setFullYear(date.getFullYear());
      out.setMonth(date.getMonth());
      out.setDate(date.getDate());
      return out;
    };

    var splitDate = function() {
      var ticket = $scope.ticket;
      ticket.sDate = ticket.sTime = ticket.startTime;
      ticket.eDate = ticket.eTime = Date.parse(ticket['end_time']);
      //      ticket['start_time'] =  ticket['end_time'] = null;
    };

    if (ticketId) {
      $scope.ticket = Ticket.findById({
        id: ticketId
      }, function() {
        splitDate();
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.ticket = {};
    }

    function loadItems() {
      $scope.tickets = Ticket.find();
    }

    loadItems();

    $scope.delete = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Ticket.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Ticket deleted'), gettextCatalog.getString(
              'Your ticket is deleted!'));
            loadItems();
            $state.go('app.tickets.list');
            console.log();
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting ticket'), gettextCatalog.getString(
              'Your ticket is not deleted: ') + err);
          });
        },
        function() {
          return false;
        });
    };

    var dateOpen = function($ticket) {
      $ticket.preventDefault();
      $ticket.stopPropagation();

      this.opened = true;
    };

    $scope.formFields = [{
        key: 'name',
        label: gettextCatalog.getString('Name'),
        type: 'text',
        required: true
      }, {
        key: 'description',
        type: 'text',
        label: gettextCatalog.getString('Description'),
        required: true
      }, {
        key: 'sDate',
        required: true,
        label: gettextCatalog.getString('Start Date'),
        type: 'date',
        format: gettextCatalog.getString('dd/MM/yyyy'),
        opened: false,
        switchOpen: dateOpen
      }, {
        key: 'sTime',
        required: true,
        label: gettextCatalog.getString('Start Time'),
        type: 'time',
        hstep: 1,
        mstep: 5,
        ismeridian: true
      }, {
        key: 'eDate',
        label: gettextCatalog.getString('End'),
        type: 'date',
        format: gettextCatalog.getString('dd/MM/yyyy'),
        opened: false,
        switchOpen: dateOpen
      }, {
        key: 'eTime',
        required: true,
        label: gettextCatalog.getString('End Time'),
        type: 'time',
        hstep: 1,
        mstep: 5,
        ismeridian: true
      }

    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };
    $scope.alerts = [];

    $scope.onSubmit = function() {
      var ticket = $scope.ticket;

      ticket['start_time'] = createDate(ticket.sDate, ticket.sTime);
      ticket.sDate = null;
      ticket.sTime = null;

      ticket['end_time'] = createDate(ticket.eDate, ticket.eTime);
      ticket.eDate = null;
      ticket.eTime = null;

      Ticket.upsert($scope.ticket, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Ticket saved'),
          gettextCatalog.getString('Your ticket is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        $scope.alerts.push({
          type: 'danger',
          msg: err.data.error.message
        });
        CoreService.toastError(gettextCatalog.getString(
          'Ticket not added'), err.data.error.message);
        console.log(err);
      });
    };


  });
