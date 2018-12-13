
$(document).ready(function (){
    $("#input").fileinput({showCaption: false}); //输入框部件只显示选择文件按钮，隐藏标题

    // Init modal
    $('#myModal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget); // 触发事件的按钮  
        let fileName = button.data('whatever'); // 解析出whatever内容  
        let modal = $(this);  //获得模态框本身
        modal.find('.modal-title').text(fileName);  // 更改将title的text
    });

    // Change Node Status
    $('.button-circle').on('click',function () {
        let status = $(this).hasClass('button-action');
        let nodeStatus = $(this).parent().attr('id');
        let node = nodeStatus.charAt(nodeStatus.length - 1);
        if(status){
            $(this).removeClass('button-action');
            $(this).addClass('button-pill button-inverse');
            $(this).empty();
            $(this).append('<i class="fa fa-ban"></i>');
        }
        else {
            $(this).removeClass('button-pill button-inverse');
            $(this).addClass('button-action');
            $(this).empty();
            $(this).append('<i class="fa fa-gears"></i>');
        }
        let mydata = '{"node":"' + node + '","status":"' + !status + '"}';
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/nodeStatus',
            data: mydata,
            dataType: 'JSON',
            success: function (data) {
            },
            error: function () {
            }
        })


    });

    // Update and Save File
    $('#saveFile').on('click',function () {
        let fileName = $('#myModalLabel').text();
        let fileContent = $('#file_content').text();
        let blob = new Blob([fileContent]);
        let fileObj = new File([blob],fileName);
        let form = new FormData(); // FormData 对象
        form.append("file", fileObj); // 文件对象
        // let mydata = '{"fileName":"' + fileName + '","fileContent":"' + fileContent + '"}';
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/saveFile',
            data: form,
            dataType: 'JSON',
            success: function (data) {
                getFileList();
            },
            error: function () {

            }
        })
    });

    // Delete File
    $('#deleteFile').on('click',function () {
        let fileName = $('#myModalLabel').text();
        let mydata = '{"fileName":"' + fileName + '"}';
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/deleteFile',
            data: mydata,
            dataType: 'JSON',
            success: function (data) {
                getFileList();
            },
            error: function () {

            }
        })
    });

    // Get File Content
    $('.fa-pencil').on('click',function () {
        let fileName = $(this).parent().parent().attr('id');
        $.ajax({
            type: 'Get',
            contentType: 'application/json',
            url: 'http://localhost:8080/fileContent?fileName='+fileName,
            dataType: 'JSON',
            success: function (data) {
                $('#file_content').text(data);
            },
            error: function () {

            }
        })

    });

    // Init water bubble
    function setWaterBubbleData(data){
        $('#waterbubble1').waterbubble({
            radius: 60,
            lineWidth: 5,
            data: data[0],
            waterColor: 'rgb(124, 181, 236)',
            textColor: '#FF3030',
            txt: 'N1:'+ (data[0]*100).toString()+"%",
            font: 'bold 25px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble2').waterbubble({
            radius: 60,
            lineWidth: 5,
            data: data[1],
            waterColor: 'rgb(124, 181, 236)',
            textColor: '#FF3030',
            txt: 'N2:'+ (data[1]*100).toString()+"%",
            font: 'bold 25px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble3').waterbubble({
            radius: 60,
            lineWidth: 5,
            data: data[2],
            waterColor: 'rgb(124, 181, 236)',
            textColor: '#FF3030',
            txt: 'N3:'+ (data[2]*100).toString()+"%",
            font: 'bold 25px "Microsoft YaHei"',
            wave: true,
            animation: true
        });

        $('#waterbubble4').waterbubble({
            radius: 60,
            lineWidth: 5,
            data: data[3],
            // waterColor: 'rgba(25, 139, 201, 1)',
            waterColor:'rgb(124, 181, 236)',
            textColor: '#FF3030',
            txt: 'N4:'+ (data[3]*100).toString()+"%",
            font: 'bold 25px "Microsoft YaHei"',
            wave: true,
            animation: true
        });
    }


    function setNodeStatus(data){
        for(let i=0;i<4;i++){
            let id = 'nodeStatus'+i.toString();
            $('#'+id).empty();
            if(data[i] === 0){
                $('#'+id).append(
                    '<button class="button button-raised button-action button-circle button-small button-glow">' +
                    '<i class="fa fa-gears"></i></button>');
            }
            else{
                $('#'+id).append(
                    '<button class="button button-raised button-pill button-inverse button-circle button-small button-glow">' +
                    '<i class="fa fa-ban"></i></button>');
            }
        }

    }


    function getNodeInfo(){
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: 'http://localhost:8080/nodeInfo',
            dataType: 'JSON',
            success: function (data) {
                setWaterBubbleData(data);
                setNodeStatus(data);
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
                    $('#fileList').append('<tr id="'+data[i].fileName+'">' +
                        '<td style="width: 30%;cursor: pointer">' +
                        '<a class="fileDetails">'+data[i].fileName+'</a></td>' +
                        '<td style="width: 20%">'+data[i].fileSize+'</td>' +
                        '<td style="width: 15%">'+data[i].fileBlock+'</td>' +
                        '<td style="width: 20%;cursor: pointer">' +
                        '<span class="fa fa-cloud-download">下载</span></td></tr>'+
                        '<td style="width: 15%;cursor: pointer">' +
                        '<span class="fa fa-pencil" data-toggle="modal" data-target="#myModal" ' +
                        'data-whatever="'+data[i].fileName+'"> 编辑</span></td>')
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
        let mydata='{"fileName":"' + fileName + '"}';
        $(this).text("正在上传中....");
        $(this).append('<span class="fa fa-refresh fa-spin"></span>');
        alert('上传成功');
        $('.fileinput-remove').click();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            data:mydata,
            url: 'http://localhost:8080/upload',
            dataType: 'JSON',
            success: function (data) {
                alert('上传成功');
                $('.fileinput-remove').click();
                console.log(data);
                // getFileList();
                // getNodeInfo();
            },
            error: function () {

            }
        })
    });


    // Upload File
    // $("#input-b1").fileinput({
    //     theme:"fa",
    //     uploadUrl: "http://localhost:8080/file-upload-single", // 服务器端上传处理程序
    //     // uploadAsync: true,  //异步上传
    //     // maxFileCount: 5     //最大上传文件数为5
    // }).on("fileuploaded",function (e, data) {
    //     let res = data.response;
    //     if (res.state > 0) {
    //         alert('上传成功');
    //     }
    //     else {
    //         alert('上传失败')
    //     }
    // });

    // Get File Detail Information
    $('.fileDetails').on('click',function () {
        let fileName = $(this).parent().parent().attr('id');

        var chart = {
            type: 'bar'
        };
        var title = {
            text: 'Size On Different Node of '+ fileName
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
            name: 'Size',
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
            url:'http://localhost:8080/fileDetail?fileName='+fileName,
            dataType:'JSON',
            success:function (data) {
                var chart = {
                    type: 'bar'
                };
                var title = {
                    text: 'Size On Different Node of '+fileName
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
                    name: 'Size',
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
        let fileName = $(this).parent().parent().attr('id');
        console.log(fileName);
        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/fileDownload?fileName='+fileName,
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





