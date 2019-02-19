angular.module('Ritz', [])
.controller('Customers', function($scope, $http) {
    $scope.customers = [];
    $http.get('rest/resources').
        then(function(response) {
            $scope.onmsres = [];
            var onmsdata = response.data.resource;
            for (var topid in onmsdata ) {
                 for (var id in onmsdata[topid].children.resource) {
                 var child = onmsdata[topid].children.resource[id];
                    if ( child.id.indexOf('interfaceSnmp') > 0 ) {
                          $scope.onmsres.push(child);
                    }
                 }
            }
        $http.get('http://80.86.159.19:5000/api/clienti').
        then(function(response) {
            var clientdata = response.data;

            var pages = clientdata.total_pages;
            var clientes = clientdata.objects;
            for (var cc in clientes) {
                 $scope.customers.push(clientes[cc]);
            }
            for (var il =2; il <= pages; il++) {
             $http.get('http://80.86.159.19:5000/api/clienti?page='+il).
              then(function(response) {
            var clientdata1 = response.data;
            var clientes1 = clientdata1.objects;
            for (var cc1 in clientes1) {
                 $scope.customers.push(clientes1[cc1]);
            }
              });
            }

        });
       });
    $scope.selection=[];
    $scope.onmsselection=[];
    $scope.itemList=[];
    $scope.toggleOnmsSelection = function toggleOnmsSelection(att) {
       var onmsidx = $scope.onmsselection.indexOf(att);
       // is currently selected
       if (onmsidx > -1) {
          $scope.onmsselection.splice(onmsidx, 1);
       }

       else {
          $scope.onmsselection.push(att);
       }

    }
    $scope.toggleSelection = function toggleSelection(cliente) {
       var idx = $scope.selection.indexOf(cliente);

       // is currently selected
       if (idx > -1) {
          $scope.selection.splice(idx, 1);
       }

       // is newly selected
       else {
          var cont = cliente.CONTRATTI.replace(/\s/g,'').split(",");
          var contratti=[];
          var objClientVar={}
          objClientVar.name=cliente.COMPANYNAME;
          var contratti=[];
          for (var i in cont ) {
              var objContratto = {};
              objContratto.id = cont[i];
              var codatt = [];
              $http.get('http://80.86.159.19:5000/api/service?q={%22filters%22:[{%22name%22:%22CUSTOMERCODE%22,%22op%22:%22ilike%22,%22val%22:%22'+cont[i]+'%%22}]}').then(function(response) {
                 var codici = response.data.objects;
                 for ( var ctid in codici ) {
                    var objAttivazione = {};
                    objAttivazione.codatt= codici[ctid].ID;
                    var onmsattlist = [];
                    for ( var k in $scope.onmsrest ) {
                        if ( $scope.onmsrest[k].label.indexOf(objAttivazione.codatt) > 1 ) {
            onmsattlist.push($scope.onmsrest[k]);
}
                    }
                    objAttivazione.onmsResource = onmsattlist;
                    codatt.push(objAttivazione);

                 }
               });
               objContratto.codiciAttivazione=codatt;
               contratti.push(objContratto);
          }
          objClientVar.contratti=contratti;
          $scope.itemList.push(objClientVar);
          $scope.selection.push(cliente);
       }};
});
