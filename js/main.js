
$(document).ready(function (){
    $("#input").fileinput({showCaption: false}); //输入框部件只显示选择文件按钮，隐藏标题

    // Init water bubble
    $('#waterbubble1').waterbubble({
        radius: 100,
        lineWidth: 5,
        data: 0.5,
        waterColor: 'rgba(25, 139, 201, 1)',
        textColor: 'rgba(06, 85, 128, 0.8)',
        txt: 'JavaScript',
        font: 'bold 30px "Microsoft YaHei"',
        wave: true,
        animation: true
    });


    // Upload File
    $("#input-b1").fileinput({
        uploadUrl: "http://localhost/file-upload-single/1", // 服务器端上传处理程序
        uploadAsync: true,  //异步上传
        maxFileCount: 5     //最大上传文件数为5
    }).on("fileuploaded",function (e, data) {
        let res = data.response;
        if (res.state > 0) {
            alert('上传成功');
            alert(res.path);
            // Update File List
            $.ajax({
                type:'GET',
                contentType:'application/json',
                url:'http://localhost:8080/fileList',
                dataType:'JSON',
                success:function (data) {
                    $('#fileList').empty();
                    for(let i=0;i<data.length;i++){
                        $('#fileList').append('<tr id="'+data[i].fileID+'"><td style="width: 40%;cursor: pointer">' +
                            '<a class="fileDetails">'+data[i].fileName+'</a></td>' +
                            '<td style="width: 30%">'+data[i].fileSize+'</td>' +
                            '<td style="width: 30%;cursor: pointer">' +
                            '<span class="fa fa-cloud-download">下载</span></td></tr>')
                    }

                },
                error:function () {

                }
            })
        }
        else {
            alert('上传失败')
        }
    });

    // Get File Detail Information
    $('.fileDetails').on('click',function () {
        let fileID = $(this).parent().parent().attr('id');
        // console.log(fileID);
        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/fileDetail?fileID='+fileID,
            dataType:'JSON',
            success:function (data) {
                var chart = {
                    type: 'bar'
                };
                var title = {
                    text: 'File Size On Different Node'
                };
                var xAxis = {
                    categories: ['Node0', 'Node1', 'Node2','Node3'],
                    crosshair: true
                };
                var yAxis = {
                    min: 0,
                    title: {
                        text: 'Size'
                    }
                };
                var tooltip = {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                };
                var plotOptions = {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                };
                var credits = {
                    enabled: false
                };

                var series = [{
                    name: 'Size of File',
                    data: [13, 11, 51, 15]
                }];

                var json = {};
                json.chart = chart;
                json.title = title;
                json.tooltip = tooltip;
                json.xAxis = xAxis;
                json.yAxis = yAxis;
                json.series = series;
                json.plotOptions = plotOptions;
                json.credits = credits;
                $('#node_bar').highcharts(json);


            },
            error:function () {

            }

        });
    });


    // Download File
    $('.fa-cloud-download').on('click',function () {
        let fileID = $(this).parent().parent().attr('id');
        console.log(fileID);

        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/fileDownload?fileID='+fileID,
            dataType:'JSON',
            success:function (data) {


            },
            error:function () {

            }

        })

    });
});




// Init File List
$(document).ready(function () {
    $.ajax({
        type:'GET',
        contentType:'application/json',
        url:'http://localhost:8080/fileList',
        dataType:'JSON',
        success:function (data) {
            $('#fileList').empty();
            for(let i=0;i<data.length;i++){
                $('#fileList').append('<tr id="'+data[i].fileID+'"><td style="width: 40%;cursor: pointer">' +
                    '<a class="fileDetails">'+data[i].fileName+'</a></td>' +
                    '<td style="width: 30%">'+data[i].fileSize+'</td>' +
                    '<td style="width: 30%;cursor: pointer">' +
                    '<span class="fa fa-cloud-download">下载</span></td></tr>')
            }
        },
        error:function () {
            
        }
    })
});




