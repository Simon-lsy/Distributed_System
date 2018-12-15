
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
    $("body").on('click','.button-circle',function () {
        let nodeIP = $(this).parent().attr('ip');
        let status = $(this).hasClass('button-action');
        if(status){
            $(this).removeClass('button-action');
            $(this).addClass('button-pill button-inverse');
            $(this).empty();
            $(this).append('<i class="fa fa-ban"></i>');
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://localhost:8080/node/shutdown?ip='+nodeIP,
                dataType: 'JSON',
                success: function (data) {
                },
                error: function () {
                }
            })
        }
        else {
            $(this).removeClass('button-pill button-inverse');
            $(this).addClass('button-action');
            $(this).empty();
            $(this).append('<i class="fa fa-gears"></i>');
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://localhost:8080/node/recover?ip='+nodeIP,
                dataType: 'JSON',
                success: function (data) {
                },
                error: function () {
                }
            })
        }
    });

    // Update and Save File
    $('#saveFile').on('click',function () {
        let fileName = $('#myModalLabel').text();
        let fileContent = $('#file_content').val();
        console.log(fileContent);
        let blob = new Blob([fileContent]);
        let fileObj = new File([blob],fileName);
        console.log(fileObj);
        let form = new FormData(); // FormData 对象
        form.append("file", fileObj); // 文件对象
        $.ajax({
            type: 'POST',
            processData:false,
            contentType: false,
            url: 'http://localhost:8080/file/uploadFile',
            data:form,
            mimeType:"multipart/form-data",
            dataType: 'JSON',
            success: function (data) {
                updateFileList(data);
            },
            error: function () {

            }
        })
    });

    // Delete File
    $('#deleteFile').on('click',function () {
        let fileName = $('#myModalLabel').text();
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: 'http://localhost:8080/file?fileName='+fileName,
            dataType: 'JSON',
            success: function (data) {
                updateFileList(data);
            },
            error: function () {
            }
        })
    });

    // Get File Content
    $("body").on('click','.fa-pencil',function () {
        let fileName = $(this).parent().parent().attr('id');
        console.log(fileName);
        $.ajax({
            type: 'Get',
            // contentType: 'application/json',
            url: 'http://localhost:8080/file/content?fileName='+fileName,
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
            if(data[i] === true){
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
            url: 'http://localhost:8080/node',
            dataType: 'JSON',
            success: function (data) {
                let nodeStorage = [];
                let nodeStatus = [];
                for(let i=0;i<4;i++){
                    nodeStorage.push(Math.round(data[i].nodeUsedSize/data[i].nodeStorageSize * 10000)/10000);
                    // nodeStorage.push((data[i].nodeUsedSize/data[i].nodeStorageSize).toFixed(4));
                    nodeStatus.push(data[i].nodeStatus);
                }
                setWaterBubbleData(nodeStorage);
                setNodeStatus(nodeStatus);
            },
            error: function () {

            }
        })
    }

    getNodeInfo();


    function updateFileList(data){
        $('#fileList').empty();
        for(let i=0;i<data.length;i++){
            let fileSizeKB = data[i].fileSize;
            let fileSize;
            if(fileSizeKB/1024 < 1){
                fileSize = fileSizeKB.toString()+'KB';
            }else if(fileSizeKB/1024 >= 1 && fileSizeKB/1024 < 1024){
                fileSize = parseInt(fileSizeKB/1024).toString()+'MB';
            }else {
                fileSize = parseInt(fileSizeKB/1024/1024).toString()+'GB';
            }

            $('#fileList').append('<tr id="'+data[i].fileName+'">' +
                '<td style="width: 30%;cursor: pointer">' +
                '<a class="fileDetails">'+data[i].fileName+'</a></td>' +
                '<td style="width: 20%">'+fileSize+'</td>' +
                '<td style="width: 15%">'+data[i].blockList.length+'</td>' +
                '<td style="width: 20%;cursor: pointer">' +
                '<span class="fa fa-cloud-download">下载</span></td>'+
                '<td style="width: 15%;cursor: pointer">' +
                '<span class="fa fa-pencil" data-toggle="modal" data-target="#myModal" ' +
                'data-whatever="'+data[i].fileName+'"> 编辑</span></td></tr>')
        }
    }

    function getFileList(){
        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/fileList',
            dataType:'JSON',
            success:function (data) {
                updateFileList(data);
            },
            error:function () {

            }
        })
    }

    // Init File List
    getFileList();

    // upload file
    $('body').on('click','.fileinput-upload',function () {
        let fileName = $('.file-caption-name').attr('title');
        $(this).text("正在上传中....");
        $(this).append('<span class="fa fa-refresh fa-spin"></span>');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/file?fileName='+fileName,
            dataType: 'JSON',
            success: function (data) {
                alert('上传成功');
                $('.fileinput-remove').click();
                $('.fileinput-upload').text('');
                $('.fileinput-upload').append('<i class="glyphicon glyphicon-upload"></i>');
                $('.fileinput-upload').append('<span class="hidden-xs"> Upload</span>');
                // console.log(data);
                updateFileList(data);
                getNodeInfo();
            },
            error: function () {

            }
        })
    });

    // Get File Detail Information
    $("body").on('click','.fileDetails',function () {
        let fileName = $(this).text();

        console.log(fileName);
        $.ajax({
            type:'GET',
            contentType:'application/json',
            url:'http://localhost:8080/file/detail?fileName='+fileName,
            dataType:'JSON',
            success:function (data) {
                if(data.fileStatus){
                    $('#fileStatus').text('File Status：OK');
                }else {
                    $('#fileStatus').text('File Status：Failed');
                }

                let nodeUsage = [0, 0, 0, 0];
                let nodeInfo = data.fileBlockWithNodeInformation;

                for(let i=0;i<nodeInfo.length;i++){
                    let blockSize = nodeInfo[i].blockSize;
                    for (let id=0;id<nodeInfo[i].belongedNodes.length;id++){
                        let nodeID = nodeInfo[i].belongedNodes[id].nodeID;
                        nodeUsage[nodeID] += blockSize;
                    }
                }
                let chart = {
                    type: 'bar'
                };
                let title = {
                    text: 'Size On Different Node of '+fileName
                };
                let xAxis = {
                    categories: ['Node1', 'Node2', 'Node3','Node4'],
                    crosshair: true
                };
                let yAxis = {
                    min: 0,
                    title: {
                        text: 'Size'
                    }
                };
                let tooltip = {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                };
                let plotOptions = {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                };
                let credits = {
                    enabled: false
                };

                let series = [{
                    name: 'Size',
                    data: nodeUsage
                }];

                let json = {};
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
    $("body").on('click','.fa-cloud-download',function () {
        let fileName = $(this).parent().parent().attr('id');
        let a = document.createElement('a');
        a.download = fileName;
        a.href="http://localhost:8080/file?fileName="+fileName;
        a.click();
        // $.ajax({
        //     type:'GET',
        //     contentType:'application/json',
        //     url:'http://localhost:8080/file?fileName='+fileName,
        //     dataType:'JSON',
        //     success:function (data) {
        //         console.log(data);
        //         let blob = new Blob([data]);
        //         let a = document.createElement('a');
        //         a.download = fileName;
        //         a.href=window.URL.createObjectURL(blob);
        //         a.click();
        //     },
        //     error:function () {
        //
        //     }
        // })
    });
});





