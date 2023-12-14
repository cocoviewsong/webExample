// 获取输入框的元素
var input = $("#input");
var songnum = $("#songnum");

// 获取音频元素
var audio = $("#audio")[0];

// 获取图片元素
var img = $("#img")[0];

// 获取歌词元素
var lyric = $("#lyric");

// 定义一个函数，用于发送请求并处理响应
function searchSong() {
  // 获取输入框的值
  var songName = input.val();
  var songnumer = songnum.val();

  // 拼接请求的URL
  var url =
    "http://localhost:3000/search?keywords=" + songName + "&limit=" + songnumer;

  // 发送GET请求
  $.get(url, function (data) {
    // 查找songs信息
    var songs = data.result.songs;

    // 创建一个表格
    var table = $("<table></table>");

    // 遍历songs数组，获取每个歌曲的id和name
    for (var i = 0; i < songs.length; i++) {
      var id = songs[i].id;
      var name = songs[i].name;

      // 创建一行
      var tr = $("<tr></tr>");

      // 创建两列，分别显示id和name
      var td1 = $("<td></td>").text(name);
      var td2 = $("<td></td>").text(id);

      // 创建一个按钮，用于播放该歌曲
      var button = $("<button></button>").text("播放");
      button.click(function () {
        // 获取歌曲的id
        var index = $(this).parent().parent().index();
        var id = songs[index].id;
        var name = songs[index].name;

        $("#songsnamesp").text(name);

        // 拼接请求的URL
        var url = "http://localhost:3000/song/url?id=" + id;

        // 发送GET请求
        $.get(url, function (data) {
          // 获取歌曲的URL
          var songUrl = data.data[0].url;

          // 设置音频元素的src属性
          audio.src = songUrl;

          // 播放音频
          audio.play();
        });

        console.clear();

        var index = $(this).parent().parent().index();
        var id = songs[index].id;

        // 拼接请求的URL
        var url = "http://localhost:3000/song/detail?ids=" + id;

        // 发送GET请求
        $.get(url, function (data) {
          // 获取歌曲的封面链接
          var picUrl = data.songs[0].al.picUrl;
          img.src = picUrl;
        });

        // 获取歌曲的id
        var index = $(this).parent().parent().index();
        var id = songs[index].id;

        // 拼接请求的URL
        var url = "http://localhost:3000/lyric?id=" + id;

        // 发送GET请求
        $.get(url, function (data) {
          // 获取歌词
          var lrc = data.lrc.lyric;

          // 将歌词分割成每一行
          var lines = lrc.split("\n");
          document.getElementById("lyric").innerText = lines;
          // 创建一个div，用于显示歌词
          var div = $("<div></div>");

          // 遍历每一行歌词
          for (var i = 0; i < lines.length; i++) {
            // 获取当前行的歌词
            var line = lines[i];
            document.getElementById("lyric").innerText = line;
            // 如果当前行的歌词为空，则跳过
            if (line == "") {
              continue;
            }

            // 获取当前行的时间戳
            var timestamp = line.substring(1, 9);

            // 获取当前行的歌词内容
            var content = line.substring(10);

            // 创建一个span，用于显示当前行的歌词
            var span = $("<span></span>")
              .text(content)
              .attr("id", "line-" + i);

            // 将span添加到div中
            div.append(span);

            // 将div添加到歌词元素中
            lyric.html(div);
          }

          // 监听音频的timeupdate事件
          audio.addEventListener("timeupdate", function () {
            // 获取当前播放时间
            var currentTime = audio.currentTime;

            // 遍历每一行歌词
            for (var i = 0; i < lines.length; i++) {
              // 获取当前行的时间戳
              var timestamp = lines[i].substring(1, 9);

              // 将时间戳转换为秒数
              var time =
                parseInt(timestamp.substring(0, 2)) * 60 +
                parseInt(timestamp.substring(3, 5));

              // 如果当前时间小于该行歌词的时间戳，则跳过
              if (currentTime < time) {
                $("#line-" + i).removeClass("active");
                break;
              }

              // 如果当前时间大于该行歌词的时间戳，则将该行歌词突出显示
              $("#line-" + i).addClass("active");
            }
          });
        });
      });

      // 将按钮添加到第三列中
      var td3 = $("<td></td>").append(button);

      // 将三列添加到行中
      tr.append(td1);
      tr.append(td2);
      tr.append(td3);

      // 将行添加到表格中
      table.append(tr);
    }

    // 将表格添加到页面上
    $("#result").html(table);
  });
}

// 给输入框绑定回车键事件，触发搜索函数
input.on("keydown", function (event) {
  if (event.keyCode == 13) {
    searchSong();
  }
});
// 给输入框绑定回车键事件，触发搜索函数
songnum.on("keydown", function (event) {
  if (event.keyCode == 13) {
    searchSong();
  }
});
