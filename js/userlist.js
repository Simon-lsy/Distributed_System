$(document).ready(function () {
    $.ajax({
        type:'GET',
        contentType:'application/json',
        url:'http://localhost:8080/userList',
        dataType:'JSON',
        success:function (data) {
            $('#totalnum').text(data.count);

            for (let i = 0; i < data.users.length; i++) {
                $('#result').append('<tr> <td>' + data.users[i].calling_nbr + '</td> ' +
                    '<td>' + data.users[i].number + '</td>' +
                    '<td>' + data.users[i].period1 + '</td>' +
                    '<td>' + data.users[i].period2 + '</td>' +
                    '<td>' + data.users[i].period3 + '</td>' +
                    '<td>' + data.users[i].period4 + '</td>' +
                    '<td>' + data.users[i].period5 + '</td>' +
                    '<td>' + data.users[i].period6 + '</td>' +
                    '<td>' + data.users[i].period7 + '</td>' +
                    '<td>' + data.users[i].period8 + '</td>' +
                    '</tr>');
            }
        },
        error:function () {

        }
    })
});