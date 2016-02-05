  require.config({
      baseUrl:"./",
      paths: {

        umdLoader : "../utils/umdLoader",
        ruleHandlerMapper : "../mapper/ruleHandlerMapper",
        ruleTagNameMapper : "../mapper/ruleTagNameMapper",
        JSUtils : "../jsutils/JSUtils",
        enumCreator : "../utils/enumCreator",
        auditRulesCreator : "../utils/auditRulesCreator",
        axsUtils : "../utils/axsUtils",
        enums : "../enums/enums",
        injectDeps : "../utils/injectDeps",
        run : "../audit/run",
        AX_01 : "../rulesImpl/AX_01",
        AX_02 : "../rulesImpl/AX_02",
        AX_03 : "../rulesImpl/AX_03",
        AX_04 : "../rulesImpl/AX_04",
        AX_05 : "../rulesImpl/AX_05",
        AX_06 : "../rulesImpl/AX_06",
        AX_07 : "../rulesImpl/AX_07",
        AX_08 : "../rulesImpl/AX_08",
        AX_09 : "../rulesImpl/AX_09",
        AX_10 : "../rulesImpl/AX_10",
        AX_11 : "../rulesImpl/AX_11",
        AX_12 : "../rulesImpl/AX_12",
        AX_13 : "../rulesImpl/AX_13",
        AX_14 : "../rulesImpl/AX_14",
        AX_15 : "../rulesImpl/AX_15",
        AX_16 : "../rulesImpl/AX_16",
        AX_17 : "../rulesImpl/AX_17",
        AX_18 : "../rulesImpl/AX_18",
        AX_19 : "../rulesImpl/AX_19",
        AX_20 : "../rulesImpl/AX_20",
        AX_21 : "../rulesImpl/AX_21",
        AX_22 : "../rulesImpl/AX_22",
        AX_23 : "../rulesImpl/AX_23",
        AX_24 : "../rulesImpl/AX_24",
        AX_25 : "../rulesImpl/AX_25",
        AX_26 : "../rulesImpl/AX_26",
        AX_27 : "../rulesImpl/AX_27",
        AX_28 : "../rulesImpl/AX_28",
        AX_29 : "../rulesImpl/AX_29",
        AX_30 : "../rulesImpl/AX_30",
        AX_31 : "../rulesImpl/AX_31",
        AX_32 : "../rulesImpl/AX_32",
        AX_33 : "../rulesImpl/AX_33",
        AX_34 : "../rulesImpl/AX_34",
        AX_35 : "../rulesImpl/AX_35"

      }
  });


  define('main',[ 'umdLoader', 'JSUtils', 'ruleHandlerMapper', 'ruleTagNameMapper',
            'enumCreator', 'enums', 'axsUtils', 'auditRulesCreator', 'injectDeps',
            'AX_01', 'AX_02', 'AX_03', 'AX_04', 'AX_05', 'AX_06', 'AX_07', 'AX_08',
            'AX_09', 'AX_10', 'AX_11', 'AX_12', 'AX_13', 'AX_14', 'AX_15',
            'AX_16', 'AX_17', 'AX_18', 'AX_19', 'AX_20', 'AX_21', 'AX_22',
            'AX_23', 'AX_24', 'AX_25', 'AX_26', 'AX_27', 'AX_28', 'AX_29',
            'AX_30', 'AX_31', 'AX_32', 'AX_33', 'AX_34', 'AX_35', 'run'],
            function(umdLoader, JSUtils, ruleHandlerMapper, ruleTagNameMapper,
              enumCreator, enums, axsUtils, auditRulesCreator, injectDeps, AX_01,
              AX_02, AX_03, AX_04, AX_05, AX_06, AX_07, AX_08, AX_09, AX_10, AX_11,
              AX_12, AX_13, AX_14, AX_15, AX_16, AX_17, AX_18, AX_19, AX_20, AX_21,
              AX_22, AX_23, AX_24, AX_25, AX_26, AX_27, AX_28, AX_29, AX_30,
              AX_31, AX_32, AX_33, AX_34, AX_35, run){

    var axs = axs || {}; //> define an audit object globally
    axs.audit = axs.audit || {}; // all related audit to go in here
    axs.audit.run = run;
    return axs;
  });
