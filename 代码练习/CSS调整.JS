// 获取输入框的元素
var input = $("#sing-search");

// 获取音频元素
var audio = $("#sing-audio")[0];

// 获取图片元素
var img = $("#sing-img")[0];

// 定义一个函数，用于发送请求并处理响应
function searchSong() {
// 获取输入框的值
$("#demo").remove();
$("#search").remove();
$("#gedanneirong").remove();
$(".col-sm-3").remove();
var songName = input.val();

// 拼接请求的URL
var url = "http://127.0.0.1:3000/search?keywords=" + songName;

// 发送GET请求
$.get(url, function(data) {
// 查找songs信息
var songs = data.result.songs;

// 创建一个表格
var table = $("<table id='gequbiaoge'></table>");

// 给表格添加样式
table.css({
    "background-color":"rgb(143, 128, 128)",
    "background-image":"/img/播放.png",
});

// 遍历songs数组，获取每个歌曲的id和name
for (var i = 0; i < songs.length; i++) {
var name = songs[i].name;

// 这他妈居然能运行起来？？？？？？？
var singname=songs[i].artists;
let singname2 = Array.from(singname,({name})=>name);

// 创建一个按钮，用于播放该歌曲
var button = $("<button id='bofanganniu'><img id='startimg-update' src='/img/播放.png' width='32px'></buttom>");

// 添加按钮样式


button.click(function() {
// 获取歌曲的id
var index = $(this).parent().parent().index();
var id = songs[index].id;

// 拼接请求的URL
var url = "http://127.0.0.1:3000/song/url?id=" + id;

// 发送GET请求
$.get(url, function(data) {
// 获取歌曲的URL
var songUrl = data.data[0].url;

// 设置音频元素的src属性
audio.src = songUrl;

// 播放音频
audio.play();
});

// 拼接请求的URL
var url = "http://127.0.0.1:3000/song/detail?ids=" + id;

// 发送GET请求
$.get(url, function(data) {
// 获取歌曲的封面链接
var picUrl = data.songs[0].al.picUrl;
img.src = picUrl
});
}
);

// 将按钮添加到第三列中
var td3 = $("<td></td>").append(button);

// 创建一行
var tr = $("<tr id='sing-tr'></tr>");

// 添加行样式
// tr.css();

// 创建两列，分别显示歌曲和歌手名
var td1 = $("<td id='sing-gequname'></td>").text(name);
var td2 = $("<td id='sing-geshou'></td>").text(singname2);

// 添加列样式
// td1.css();
// td2.css();

// 将三列添加到行中
tr.append(td1);
tr.append(td2);
tr.append(td3);

// 将行添加到表格中
table.append(tr);
};

// 将表格添加到页面上
$("#result").html(table);

// 点击播放时要触发函数
$(document).ready(function(){
    $("#bofanganniu").click(function(){
    $("#bofanganniu").css({
        "background-image":"url(/img/暂停.png)",
        "background-size":"32px",
        // "background-color":"rgb(202, 74, 74)",
    });
    });
    });
});
};

// 给输入框绑定回车键事件，触发搜索函数
// $("#sing-search").on("keydown", function(event) {
//     if (event.keyCode == 13) {
//         searchSong();
//     }
// });
