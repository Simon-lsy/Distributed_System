
$(document).ready(function (){
    $("#input").fileinput({showCaption: false}); //输入框部件只显示选择文件按钮，隐藏标题

    // Init water bubble
    function setWaterBubbleData(data){
        $('#waterbubble1').waterbubble({
            radius: 100,
            lineWidth: 5,
            data: data[0],
            waterColor: 'rgba(25, 139, 201, 1)',
            textColor: 'rgba(06, 85, 128, 0.8)',
            txt: 'N1:'+ (data[0]*100).toString()+"%",
            font: 'bold 30px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble2').waterbubble({
            radius: 100,
            lineWidth: 5,
            data: data[1],
            waterColor: 'rgba(25, 139, 201, 1)',
            textColor: 'rgba(06, 85, 128, 0.8)',
            txt: 'N2:'+ (data[1]*100).toString()+"%",
            font: 'bold 30px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble3').waterbubble({
            radius: 100,
            lineWidth: 5,
            data: data[2],
            waterColor: 'rgba(25, 139, 201, 1)',
            textColor: 'rgba(06, 85, 128, 0.8)',
            txt: 'N3:'+ (data[2]*100).toString()+"%",
            font: 'bold 30px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble4').waterbubble({
            radius: 100,
            lineWidth: 5,
            data: data[3],
            waterColor: 'rgba(25, 139, 201, 1)',
            textColor: 'rgba(06, 85, 128, 0.8)',
            txt: 'N4:'+ (data[3]*100).toString()+"%",
            font: 'bold 30px "Microsoft YaHei"',
            wave: true,
            animation: true
        });
    }


    function getNodeInfo(){
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: 'http://localhost:8080/nodeInfo',
            dataType: 'JSON',
            success: function (data) {
                setWaterBubbleData(data);
            },
            error: function () {

            }
        })
    }

    setWaterBubbleData([0.5,0.4,0.4,0.4]);

    getNodeInfo();


    function getFileList(){
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
                        '<td style="width: 25%">'+data[i].fileSize+'</td>' +
                        '<td style="width: 20%">'+data[i].fileBlock+'</td>' +
                        '<td style="width: 15%;cursor: pointer">' +
                        '<span class="fa fa-cloud-download">下载</span></td></tr>')
                }
            },
            error:function () {

            }
        })
    }

    // Init File List
    getFileList();



    // upload file
    $('.fileinput-upload').on('click',function () {
        let fileName = $('.file-caption-name').attr('title');
        console.log(fileName);
        var mydata='{"fileName":"' + fileName + '"}';
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data:mydata,
            url: 'http://localhost:8080/fileUpload',
            dataType: 'JSON',
            success: function (data) {
                getFileList();
                getNodeInfo();
            },
            error: function () {

            }
        })
    });


    // Upload File
    // $("#input-b1").fileinput({
    //     uploadUrl: "http://localhost/file-upload-single/1", // 服务器端上传处理程序
    //     uploadAsync: true,  //异步上传
    //     maxFileCount: 5     //最大上传文件数为5
    // }).on("fileuploaded",function (e, data) {
    //     let res = data.response;
    //     if (res.state > 0) {
    //         alert('上传成功');
    //         alert(res.path);
    //     }
    //     else {
    //         alert('上传失败')
    //     }
    // });

    // Get File Detail Information
    $('.fileDetails').on('click',function () {
        let fileID = $(this).parent().parent().attr('id');
        // console.log(fileID);

        var chart = {
            type: 'bar'
        };
        var title = {
            text: 'File Size On Different Node'
        };
        var xAxis = {
            categories: ['Node1', 'Node2', 'Node3','Node4'],
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
                    categories: ['Node1', 'Node2', 'Node3','Node4'],
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
        let fileName = $(this).parent().prev().prev().children().text();
        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/fileDownload?fileID='+fileID,
            dataType:'JSON',
            success:function (data) {
                let blob = new Blob([data]);
                let a = document.createElement('a');
                a.download = fileName;
                a.href=window.URL.createObjectURL(blob);
                a.click();
            },
            error:function () {

            }

        })

    });
});





