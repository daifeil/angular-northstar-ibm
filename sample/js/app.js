var app = angular.module('sample', ['ui.router','northStar','pascalprecht.translate']);
app.config(['$translateProvider',function($translateProvider) {

    // // i18n
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'js/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'zh'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'zh' : 'zh', 'zh_cn': 'zh', 'zh_CN': 'zh'
      })
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

}]);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  // var helloState = {
  //   name: 'hello',
  //   url: '/hello',
  //   template: '<h3>hello world!</h3>'
  // }

  var mainState = {
    name: 'main',
    url: '/main',
    templateUrl: 'js/pages/page.html'
  }

  // $stateProvider.state(helloState);
  $stateProvider.state(mainState);
  $urlRouterProvider.otherwise('/main');

}]);
app.controller('SampleCtrl',['$scope', 'constants','$translate', function($scope,constants,$translate){
  var dataArray = [{"IncidentNo":"1415754","CallNo":"P4FFBJ2","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"84394CW","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 17:07"},{"IncidentNo":"1415719","CallNo":"P4FFBN3","Status":"ETA","MachineType":"8408","MachineModel":"E8D","MachineSN":"84DB5EV","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 16:42"},{"IncidentNo":"1415711","CallNo":"P4FFB5F","Status":"CNT","MachineType":"9848","MachineModel":"AC2","MachineSN":"78AZ020","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-14 16:36"},{"IncidentNo":"1413981","CallNo":"P4FFKT1","Status":"ETA","MachineType":"2076","MachineModel":"124","MachineSN":"78RG76A","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-10 17:19"},{"IncidentNo":"1413536","CallNo":"P4FFVPT","Status":"ETA","MachineType":"2076","MachineModel":"224","MachineSN":"78RX1B6","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-09 16:09"},{"IncidentNo":"1412917","CallNo":"P4FFJKV","Status":"HPE","MachineType":"2145","MachineModel":"DH8","MachineSN":"75ANGA0","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-10-08 10:21"},{"IncidentNo":"1412327","CallNo":"P4FFN25","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"841CA2W","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 18:17"},{"IncidentNo":"1412326","CallNo":"P4FFN29","Status":"ETA","MachineType":"8286","MachineModel":"41A","MachineSN":"84E4D7V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 18:05"},{"IncidentNo":"1412325","CallNo":"P4FFNJZ","Status":"CLS","MachineType":"8284","MachineModel":"22A","MachineSN":"848801V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 17:53"},{"IncidentNo":"1412229","CallNo":"P4FFN1H","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"210924V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 16:36"},{"IncidentNo":"1412119","CallNo":"P4FF5Y7","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"21220BV","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 15:08"},{"IncidentNo":"1412118","CallNo":"P4FF5TV","Status":"CLS","MachineType":"8286","MachineModel":"41A","MachineSN":"841C9EW","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 15:05"},{"IncidentNo":"1412084","CallNo":"P4FF5HJ","Status":"CLS","MachineType":"8286","MachineModel":"41A","MachineSN":"841CA1W","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-30 14:32"},{"IncidentNo":"1409317","CallNo":"P4F7RWW","Status":"CLS","MachineType":"8205","MachineModel":"E6D","MachineSN":"84CD12V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 17:43"},{"IncidentNo":"1409180","CallNo":"P4F7RDD","Status":"CLS","MachineType":"8202","MachineModel":"E4D","MachineSN":"84E543V","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 14:52"},{"IncidentNo":"1409113","CallNo":"P4F7B2P","Status":"CLS","MachineType":"2076","MachineModel":"224","MachineSN":"78RGCD7","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 11:05"},{"IncidentNo":"1409104","CallNo":"P4F7BNB","Status":"CLS","MachineType":"2076","MachineModel":"124","MachineSN":"78RGCNP","CustomerName":"江西银行股份有限公司","IsSlaOut":"N","CustCorpName":"江西银行股份有限公司","ReportTime":"16-09-23 10:41"}];
  $scope.items = dataArray;
  $scope.columns = [
        { data: 'CustomerName' },
        { data: 'IncidentNo' },
        { "data": 'Status',
          "render": function ( data, type, row, meta ) {
            var status;
            status = data==''? '':'LIST.CASE_STATUS.' + data;
            if(status!=''){
              status = $translate.instant(status);
            }
            return status;
          }
        },
        { data: 'MachineSN' },
        { data: 'ReportTime' },
        {
            
            "data": null,
            "render": function ( data, type, row, meta ) {
              return "<button ng-click=\"goToDetail(" + row.IncidentNo + ")\" class=\"ibm-btn-pri ibm-btn-blue-50 ibm-btn-small\">详细</button>";
            }
        }
  ];

  // go to detail page
  $scope.goToDetail = function(incidentNo){

 

    // caseService.getCaseDetailByNO(incidentNo).then(function(data){
    //   $log.debug ("get detail success");
    //   $log.debug (data);
    //   caseService.caseDetail = caseServiceHelper.setCaseInfo(data);
    //   $scope.caseInfo = caseService.caseDetail.caseInfo;
    //   //$scope.serviceLogs = caseService.caseDetail.serviceHistory;
    //   $scope.trackingInfo = caseService.caseDetail.trackingInfo;

    //   caseService.getChatListByNo($scope.caseInfo.rcmsNo).then(function(data){
    //     $scope.serviceLogs=caseServiceHelper.getServiceRecod(data);
    //   });

      jQuery('#fwaj-overlay').find('[data-widget="dyntabs"]').data("widget").showTab("fwaj-tab1");
      IBMCore.common.widget.overlay.show('fwaj-overlay');
    // });
  };  
  
    //add to my tracking?
  $scope.isTrackingCall = function(incno, isTracking) {
    // caseService.addToMyTracking(incno, isTracking);
  }
}]);

app.constant('constants', {
  CASE_CATA:{
    IN_PROG:"progressing",
    TODAY:"today",
    CLS:"close",
    FOVORITE:"fovorite",
    WEEK:"week",
    SLA:"sla",
    ALL:"all",
    SEARCH:"search"
  },
  CONTRACT_STATUS:{
    MA:"MA",
    WA:"WTY",
    OS:"EXPIRED"
  },
  CASE_STATUS:{
    CN:{
      "OPN":"OPN",   //新案件    
      "WTR":"WTR",   //CAG诊断中
      "PCR":"PCR",   //等待客户反馈
      "SCR":"SCR",   //人员调派中
      "PAK":"PAK",   //工程师接受案件
      "ACS":"ACS",   //抵达客户端
      "CNT":"CNT",   //客户另约到场时间
      "ETA":"ETA",   //到场延迟
      "MDD":"MDD",   //备件到达
      "NSL":"NSL",   //复杂拷机
      "APS":"APS",   //客户原因无法完成
      "API":"API",   //IBM原因无法完成
      "APC":"APC",   //方案实施成功
      "APF":"APF",   //方案实施失败
      "HPE":"HPE",   //等待备件
      "CLS":"CLS",   //结案
      "PCL":"PCL",   //观察七天后结案
      "SMS":"SMS"   //CRU备件已发​​
    }
  },
  DATA_STATUS:{
    NEW:"new",
    ALL:"all"
  }
});
