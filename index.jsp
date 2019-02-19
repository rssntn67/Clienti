<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<jsp:include page="/includes/bootstrap.jsp" flush="false">
        <jsp:param name="title" value="Manage Customer" />
        <jsp:param name="headTitle" value="Manage Customer" />
        <jsp:param name="breadcrumb" value="Manage Customer" />
        <jsp:param name="script" value='<script type="text/javascript" src="lib/angular/angular.js"></script>' />
        <jsp:param name="script" value='<script type="text/javascript" src="lib/angular-resource/angular-resource.js"></script>' />

        <jsp:param name="script" value='<script type="text/javascript" src="js/angular-ritz.js"></script>' />
</jsp:include>


<div ng-app="Ritz" ng-controller="Customers">

<div>
<input type="text" ng-model="searchBox"/>
</div>

<table class="table">
        <tr>
                <th>Cliente
                </th>
                <th>Contratti
                </th>
                <th>Seleziona
                </th>
        </tr>
       <tr ng-repeat="cliente in customers | filter:searchBox ">
       <td>{{cliente.COMPANYNAME}}</td>
       <td>{{cliente.CONTRATTI}}</td>
       <td><input type="checkbox" id="cliente.ID" value="{{cliente}}" ng-checked="selection.indexOf(cliente) > -1" ng-click="toggleSelection(cliente)">
 </tr>
</table>
</br>
<p>Interfacce selezionate per contratto per cliente e codice attivazione</p>
<div ng-repeat="cli in itemList" >
</br>
Cliente:{{cli.name}}
<div ng-repeat="con in cli.contratti" >
Cliente:{{cli.name}} - Contratto:{{con.id}}
</br>
<div ng-repeat="cod in con.codiciAttivazione" >
Cliente:{{cli.name}} - Contratto:{{con.id}} - CodAttivazione:{{cod.codatt}}
<div ng-repeat="att in cod.onmsResource" >
<input type="checkbox" value="{{att.id}}" ng-checked="onmsselection.indexOf(att) > -1" ng-click="toggleOnmsSelection(att)">
</div>
</div>
</div>
</div>

</br>
<p>Risorse in opennms </p>
  <div ng-repeat="child in onmsres" >
    ID::{{child.id}}
    Label::{{child.label}}
 </div>
</div>

<jsp:include page="/includes/bootstrap-footer.jsp" flush="false"/>
