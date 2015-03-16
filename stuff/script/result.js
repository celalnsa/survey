/**
 * Created with JetBrains WebStorm.
 * User: High
 * Date: 29/04/14
 * Time: 20:26
 * To change this template use File | Settings | File Templates.
 */
var High = High || {};
High.drawChart = {};
High.drawChart.singleSelection = function ( renderBoxId, chartTitle, optionList, seriesList ){
    var optionCount = optionList.length;
    var chartData = [];
    for(var i=0; i<optionCount; i++){
        chartData.push([optionList[i],seriesList[0].data[i]]);
    }
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: renderBoxId,
            type: 'pie'
        },
        title: {
            text: chartTitle
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%的人选择了{point.name}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            data: chartData
        }]
    });
    return chart;
}
High.drawChart.multiSelection = function (renderBoxId, chartTitle, optionList, seriesList){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: renderBoxId,
            type: 'column',
            margin: [ 80, 50, 100, 80]
        },
        title: {
            text: chartTitle
        },
        xAxis: {
            categories:optionList,
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '选中人数'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{point.y}人选择了{point.category}'
        },
        series: [{
            data: seriesList[0].data,
            dataLabels: {
                enabled: true,
                color: '#706666',
                align: 'center',
                x: 0,
                y: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
    return chart;
}
High.drawChart.range = function (renderBoxId, chartTitle, optionList, seriesList){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo:renderBoxId,
            margin: [ 80, 50, 100, 80],
            type: 'line'
        },
        title: {
            text: chartTitle
        },
        xAxis: {
            categories: optionList
        },
        yAxis: {
            title: {
                text:'人数'
            }
        },
        tooltip: {
            enabled: true,
            pointFormat:'{point.y}人打了{point.category}分'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        legend:{
            enabled:false
        },
        series: [{
            data: seriesList[0].data,
            dataLabels: {
                enabled: true,
                color: '#706666',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
    return chart;
}
High.drawChart.trueFalse = function (renderBoxId, chartTitle,trueCount,falseCount){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: renderBoxId,
            type: 'pie'
        },
        title :{
            text:chartTitle
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{point.percentage:.1f}%的人选择了{point.name}'
        },
        plotOptions: {
            pie: {
                startAngle: -120,
                endAngle:120,
                center: ['50%', '60%']
            }
        },
        series: [{
            data: [{
                name: '是',
                color: '#FFA6E3',
                y: trueCount
            }, {
                name: '否',
                color: '#9BBFC1',
                y: falseCount
            }]
        }]
    });
    return chart;
}
High.drawChart.sort = function (renderBoxId, chartTitle, optionList, seriesList){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo:renderBoxId,
            type: 'column',
            margin: [ 80, 50, 100, 80]
        },
        title: {
            text: chartTitle
        },
        xAxis: {
            categories: optionList
        },
        yAxis: {
            min: 0,
            title: {
                text: '比例'
            }
        },
        tooltip: {
            pointFormat: '{point.y}人把{point.category}放在<span style="color:{series.color}">{series.name}</span><br>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: seriesList
    });
    return chart;
}
High.drawChart.text = function (){}
var jiathis_config={
    data_track_clickback:true,
    summary:"",
    shortUrl:false,
    hideMore:true
}
Highcharts.setOptions({
    lang:{
        contextButtonTitle: '导出图表',
        downloadJPEG: '导出成JPEG',
        downloadPDF:'导出成PDF',
        downloadPNG:'导出成PNG',
        downloadSVG:'导出成SVG',
        printChart:'打印图表'
    },
    colors: [
        '#DF8181',
        '#4BD2FF',
        '#4A8B9F',
        '#E3D0A9',
        '#857ABE',
        '#706666',
        '#FCB644',
        '#E0EBF1',
        '#FFA6E3',
        '#71D778',
        '#F74B61',
        '#97C9AC',
        '#F8B280',
        '#A3AC97'
    ],
    credits:{
        enabled:false
    },
    tooltip:{
        headerFormat:''
    }
});