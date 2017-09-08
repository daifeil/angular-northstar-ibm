var northStar = angular.module('northStar',[]);

northStar.factory('northStarUtil',['$window','$timeout','$compile','$rootScope',function($window,$timeout,$compile,$rootScope){
    return{     //存储单个属性
      setScopeProperty :function(scope,attrName,value){
        var names = attrName.split('.');
        var varDef = scope[names[0]];
        if(names.length > 1){

          if(!varDef){
            varDef = {};
          }
          for (var i = 1; i < names.length-1; i++) {
            varDef = varDef[names[i]];
            if(!varDef){
              varDef = {};
            }
          }
          varDef[names[names.length-1]] = value;
        }else{
          varDef = value;
        }
      },
      getScopeProperty :function(scope,attrName){
        var names = attrName.split('.');
        var varDef = scope[names[0]];
        if(names.length > 1){

          // if(!varDef){
          //   varDef = {};
          // }
          for (var i = 1; i < names.length-1; i++) {
            varDef = varDef[names[i]];
            // if(!varDef){
            //   varDef = {};
            // }
          }
          return varDef[names[names.length-1]] ;
        }else{
          return varDef;
        }
      },
      isMobileMenuInited: false,

      mobileMenuInit:function(){
         $timeout(function () {
            if(this.isMobileMenuInited){
              return;
            }
            IBMCore.common.module.sitenavmenu.init();
            IBMCore.common.module.mobilemenu.addSiteNavigation();

            isMobileMenuInited = true;
            setTimeout(function(){
              $mobilemenu = jQuery('.ibm-mobilemenu-section.ibm-mobilemenu-sitenavmenu');
              $compile($mobilemenu.contents())($rootScope);
              $mobilemenu.find("a").each(function () {
                // var newUrl = IBMCore.common.util.url.removeParam({
                //       url: this.getAttribute("href"),
                //       paramName: "lnk"
                //     });
                // this.href = newUrl;
                if(this.getAttribute("href"))
                  this.href = this.getAttribute("href").replace('?lnk=hm','');
                jQuery(this).click(function(){
                  IBMCore.common.module.mobilemenu.hide();
                });
              
              });
            },5);
        });
      },
      mobileDestroy:function(){
        $mobilemenu = jQuery('.ibm-mobilemenu-section.ibm-mobilemenu-sitenavmenu');
        $mobilemenu.remove();
        isMobileMenuInited = false;          
      }    
    }
  }
]);
// // ng-repeat, when last ,rebuild the datatable
// northStar.directive('northstarRefreshDatatable', ['$timeout',function($timeout) {
//   return function(scope, element, attrs) {

//     if (scope.$last){
//       // iteration is complete, do whatever post-processing
//       // is necessary
//       $timeout( function () {
//         // jQuery("[data-widget='datatable']").DataTable().destroy();
//         var dtInst = jQuery(element).parents("[data-widget='datatable']");
//         IBMCore.common.widget.datatable.init(dtInst);
//       });
//     }
//   };
// }]);

// use to init v18 element, like showhide,dyntabs for display
northStar.directive("northstarAngular", ['$timeout',function($timeout) {
    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {
                    IBMCore.common.widget[attrs.widget].init(element);
                });
            }
    };
}]);

// init v18 element display, for 
northStar.directive("northstarAngularConstruct", ['$timeout',function($timeout) {

    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {
                  jQuery(element)[attrs.widget]();
                });
            }
    };
}]);

// v18 overlay
northStar.directive("northstarAngularOverlay", ['$timeout',function($timeout) {

    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {

                  jQuery(element)[attrs.widget]();

                  //destroy the overlay, actually not called
                  element.on('$destroy', function() {
                    IBMCore.common.widget.overlay.destroy(element[0].id);
                  }); 

                  //destroy the overlay
                  $scope.$on('$destroy', function() {
                    IBMCore.common.widget.overlay.destroy(element[0].id);
                  });
                });
            }
    };
}]);

// use to init v18 datatable
northStar.directive("northstarAngularDatatable", ['$timeout','$compile','$interpolate',function($timeout,$compile,$interpolate) {

    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {
                    var passedSettings = {};
                    passedSettings.columns = $scope[attrs.ngTableColumns];
                    passedSettings.data = $scope[attrs.ngTableData];
                    // IBMCore.common.widget[attrs.widget].init('#test1table',passedSettings);
                    var dataTable = IBMCore.common.widget[attrs.widget].init(element,passedSettings);
  //                     var dataArray = [{"IncidentNo":"1415754","CallNo":"P4FFBJ2","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"84394CW","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 17:07"},{"IncidentNo":"1415719","CallNo":"P4FFBN3","Status":"ETA","MachineType":"8408","MachineModel":"E8D","MachineSN":"84DB5EV","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 16:42"},{"IncidentNo":"1415711","CallNo":"P4FFB5F","Status":"CNT","MachineType":"9848","MachineModel":"AC2","MachineSN":"78AZ020","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 16:36"},{"IncidentNo":"1413981","CallNo":"P4FFKT1","Status":"ETA","MachineType":"2076","MachineModel":"124","MachineSN":"78RG76A","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-10 17:19"},{"IncidentNo":"1413536","CallNo":"P4FFVPT","Status":"ETA","MachineType":"2076","MachineModel":"224","MachineSN":"78RX1B6","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-09 16:09"},{"IncidentNo":"1412917","CallNo":"P4FFJKV","Status":"HPE","MachineType":"2145","MachineModel":"DH8","MachineSN":"75ANGA0","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-08 10:21"},{"IncidentNo":"1412327","CallNo":"P4FFN25","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"841CA2W","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 18:17"},{"IncidentNo":"1412326","CallNo":"P4FFN29","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"84E4D7V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 18:05"},{"IncidentNo":"1412325","CallNo":"P4FFNJZ","Status":"CLS","MachineType":"8284","MachineModel":"22A","MachineSN":"848801V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 17:53"},{"IncidentNo":"1412229","CallNo":"P4FFN1H","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"210924V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 16:36"},{"IncidentNo":"1412119","CallNo":"P4FF5Y7","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"21220BV","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 15:08"},{"IncidentNo":"1412118","CallNo":"P4FF5TV","Status":"CLS","MachineType":"8286","MachineModel":"41A","MachineSN":"841C9EW","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 15:05"},{"IncidentNo":"1412084","CallNo":"P4FF5HJ","Status":"CLS","MachineType":"8286","MachineModel":"41A","MachineSN":"841CA1W","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 14:32"},{"IncidentNo":"1409317","CallNo":"P4F7RWW","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"84CD12V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 17:43"},{"IncidentNo":"1409180","CallNo":"P4F7RDD","Status":"CLS","MachineType":"8202","MachineModel":"E4D","MachineSN":"84E543V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 14:52"},{"IncidentNo":"1409113","CallNo":"P4F7B2P","Status":"CLS","MachineType":"2076","MachineModel":"224","MachineSN":"78RGCD7","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 11:05"},{"IncidentNo":"1409104","CallNo":"P4F7BNB","Status":"CLS","MachineType":"2076","MachineModel":"124","MachineSN":"78RGCNP","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 10:41"}];
  // var columnDef = [
  //       { data: 'CustomerName' },
  //       { data: 'IncidentNo' },
  //       { data: 'Status' },
  //       { data: 'MachineSN' },
  //       { data: 'ReportTime' },
  //       {
            
  //           "data": null,
  //           "defaultContent": "<button  onClick=\"IBMCore.common.widget.overlay.show('fwaj-overlay'); return false;\" class=\"ibm-btn-pri ibm-btn-blue-50 ibm-btn-small\">详细</button>"
  //       }
  // ];
    // var dataTable = IBMCore.common.widget.datatable.init('#test1table', {
    // "data" : passedSettings.data,
    // "columns" : passedSettings.columns,
    //     "language": {
    //         "sProcessing":    "",
    //         "sLengthMenu":    "每页显示 _MENU_ 条记录",
    //         "sZeroRecords":   "Nothing found - 没有检索到记录",
    //         "sEmptyTable":    "",
    //         "sInfo":          "显示第 _START_ 条到第 _END_ 条记录,一共 _TOTAL_ 条记录",
    //         "sInfoEmpty":     "显示0条记录",
    //         "sInfoFiltered":  "(从全部 _MAX_ 条数据中检索)",
    //         "sInfoPostFix":   "",
    //         "sSearch":        "搜索:",
    //         "sUrl":           "",
    //         "sInfoThousands":  ",",
    //         "sLoadingRecords": "Cargando...",
    //         "oPaginate": {
    //             "sFirst":    "",
    //             "sLast":    "",
    //             "sNext":    "上一页",
    //             "sPrevious": "下一页"
    //         }
    //     }  
    // });          
                    function tablerowselector(){
                      if(attrs.tablerowselector=="enable"){
                        jQuery(element).tablesrowselector();
                      }                      
                    }

                    tablerowselector();

                    if($scope[attrs.ngDtReady] && typeof ($scope[attrs.ngDtReady]) ==='function'){
                      $scope[attrs.ngDtReady](dataTable);
                    }

                    if(attrs.ngTableData){
                      // update the datatable by listener
                      $scope.$watchCollection(attrs.ngTableData, function(data) {
                        data = data || [];
                        dataTable.clear().rows.add(data).draw();
                        // $interpolate(element.contents());
                        //$compile(element.contents())($scope);
                        tablerowselector();
                      });
                      // compile the html after every draw 
                      dataTable.on('draw', function () {
                          jQuery(element).find("td [ng-click]").each(function() {
                            //$(this).addClass( "foo" );
                            this.outerHTML = this.outerHTML;
                          });
                          jQuery(element).find("th [ng-click]").each(function() {
                              //$(this).addClass( "foo" );
                              this.outerHTML = this.outerHTML;
                            });
                          $compile(element.contents())($scope);
                      });
                    }




                                      //destroy the overlay, actually not called
                    element.on('$destroy', function() {
                      dataTable.destroy();
                    }); 

                    $scope.$on('$destroy', function() {
                      dataTable.destroy();
                    });
                } );
            }
    };
}]);


//v18 datapicker, 
northStar.directive("northstarDatepicker", ['$timeout','northStarUtil',function($timeout,northStarUtil) {

    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {
                    var passedSettings = {};

                    angular.forEach(attrs.$attr,function(value, key){
                      if(value.indexOf('data-') >= 0 && value != 'data-widget') {
                        passedSettings[value] = attrs[key];
                      }
                    });
                    console.log(passedSettings);
                    passedSettings.onClose = function() {
                      $scope.$apply(function() {
                        northStarUtil.setScopeProperty($scope,attrs.ngModel,jQuery(element).data('widget').get());
                        console.log('$scope.$apply() called');
                      });
                    };
                    IBMCore.common.widget[attrs.widget].init( element,passedSettings );
                } );
            }
    };
}]);

// v18 select
northStar.directive("northstarSelect", ['$timeout','northStarUtil',function($timeout,northStarUtil) {

    return {
            restrict: 'A',
            link: function ( $scope, element, attrs ) {
                // Wait until next angular cycle before initialising
                $timeout( function () {

                    IBMCore.common.widget[attrs.widget].init(element);
                    var $select2 = jQuery(element);
                    $select2.on("select2:close", function (e) { 
                      // log("select2:close", e); 
                      $scope.$apply(function() {
                        northStarUtil.setScopeProperty($scope,attrs.ngModel,$select2.val());
                        console.log('$scope.$apply() called');
                      });
                    });

                    if(attrs.ngModel){
                      // update the datatable by listener
                      $scope.$watch(attrs.ngModel, function(data) {
                        var selVal = northStarUtil.getScopeProperty($scope,attrs.ngModel);
                        $select2.val(selVal).trigger('change');
                      });
                    }

                } );
            }
    };
}]);



// init v18 element Dyntabs
// ng-tab-click : when tab ready, call back to fill the data with active tab id
northStar.directive("northstarAngularDyntabs", ['$timeout',function($timeout) {

    return {
      restrict: 'A',
      link: function ( $scope, element, attrs ) {
          // Wait until next angular cycle before initialising
          $timeout( function () {
            jQuery(element)[attrs.widget]();

            //deal with the ng-tab-click
            if(typeof ($scope[attrs.ngTabClick]) ==='function'){
              $scope[attrs.ngTabClick](jQuery(element).data("widget").activeTabId());
            }
          });
      }
    };