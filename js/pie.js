$(document).ready(function () {
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: '市话各个运营商的占比'
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    };
    var series = [{
        type: 'pie',
        name: 'percentage',
        data: [
            ['电信', 45.0],
            ['移动', 26.8],
            {
                name: '联通',
                y: 12.8,
                sliced: true,
                selected: true
            }
        ]
    }];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#local_pie').highcharts(json);
});

$(document).ready(function () {
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: '长途各个运营商的占比'
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    };
    var series = [{
        type: 'pie',
        name: 'percentage',
        data: [
            ['电信', 45.0],
            ['移动', 26.8],
            {
                name: '联通',
                y: 12.8,
                sliced: true,
                selected: true
            }
        ]
    }];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#long_pie').highcharts(json);
});

$(document).ready(function () {
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: '漫游各个运营商的占比'
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    };
    var series = [{
        type: 'pie',
        name: 'percentage',
        data: [
            ['电信', 45.0],
            ['移动', 26.8],
            {
                name: '联通',
                y: 12.8,
                sliced: true,
                selected: true
            }
        ]
    }];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('#roaming_pie').highcharts(json);
});