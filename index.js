var lrc = `	[00:00.000]作词 : 电量不足嘛~
[00:00.660]作曲 : Orange Soda
[00:01.320]编曲 : Orange Soda
[00:01.980]如果是 今天的你对我说
[00:07.560]“奇迹没能出现”什么的
[00:13.380]我想我 除了去为你祈祷
[00:19.470]也不能再做到什么吧
[00:24.810]如果能 再听到她的歌声
[00:30.900]你会再次展露 笑颜吗
[00:36.240]可最终 连她带来的痕迹
[00:42.330]也在上个黎明前 散了
[00:48.060]明明梅花就要开了
[00:50.970]明明春天就要到了
[00:53.760]明明你在渴望着
[00:59.520]明明在你面前的我
[01:02.130]都失去了死的资格
[01:05.160]却在被你仰望着
[01:10.530]如何 拯救你呢
[01:16.650]无论多圣洁的赞歌
[01:22.260]诉说着未来 那数不清的欢乐
[01:27.690]可人们 却无论如何
[01:33.780]也只是微弱 的小小一点对吧
[01:39.480]存在的 若只是哭声
[01:45.240]也太过懦弱 如何再面对你呢
[01:50.610]当追逐着奇迹的时候 你会笑着吗
[02:02.010]当从未有奇迹的时候 你会笑着吗
[02:14.840]这一定是，世界上最恶劣的惩罚吧。
[02:17.740]如果奇迹出现就好了。
[02:20.430]如果我能碰到就好了。
[02:24.770]即使如此，活下去一定是没错的吧。
[02:27.050]如此一年，
[02:29.320]如此十年，
[02:32.590]如此百年。
[02:35.860]活下去就好了。
[02:39.240]而过去 你只是会对我说
[02:44.670]“希望变得顺利”之类的
[02:50.550]我想我 只是能让你安心
[02:56.640]对我也已经足够了吧
[03:02.340]在这一次你虔诚地
[03:04.950]合起双手去许下的
[03:07.770]和百年前一样呢
[03:12.600]“和平”“顺利”“更幸福”和
[03:16.380]“别再挨饿”之类的
[03:19.500]一直如此盼望着
[03:24.810]可你 却在哭啊
[03:30.900]如果你 也走到终末
[03:36.540]诉说着面前 无可奈何的结果
[03:41.970]可人们 却无论如何
[03:48.060]也只是散落 的匆匆行者对吧
[03:53.790]连愿望 也只是空壳
[03:59.520]也太过堕落 该怎样给予你呢
[04:04.890]当追逐着奇迹的时候 你会笑着吗
[04:16.260]当从未有奇迹的时候 你会笑着吗
[04:30.210]将声音咽下去 再没有信者的足迹
[04:35.850]碎裂的石像也 撑不过下一场暴雨
[04:41.640]地球逐渐沉溺 在名为人类的海里
[04:47.370]我却又看到了 无数祈祷着的你
[04:53.850]如果你 也走到终末
[04:59.430]诉说着未来 那名为别离的歌
[05:04.800]可我们 却无论如何
[05:10.890]也只是想要 如今的笑容对吧
[05:16.680]百年也 只换来沉默
[05:22.380]你正看着我 终于能说出口了
[05:27.750]当追逐着奇迹的时候 你会笑着吗
[05:39.180]当从未有奇迹的时候 你在笑着啊
[05:53.430]还留在这手心的温度 就是奇迹啊`;

function $(id) {
    return document.getElementById(id);
}//这样写以后getid方便

function getLrcArray() {
    var parts = lrc.split("\n");
    for (let index = 0; index < parts.length; index++) {
        parts[index] = getLrcObj(parts[index]);
    }
    return parts;

    function getLrcObj(content) {
        var twoParts = content.split("]");
        var time = twoParts[0].substr(1);
        var timeParts = time.split(":");
        var seconds = +timeParts[1];
        var min = +timeParts[0];
        seconds = min * 60 + seconds;
        var words = twoParts[1];
        return{
            seconds: seconds,
            words: words,
        };
    } 
}

var lrcArray = getLrcArray();

function inputLrc() {
    for (let index = 0; index < lrcArray.length; index++) {
        var li = document.createElement("li");
        li.innerText = lrcArray[index].words;
        $("ullrc").appendChild(li);
    }
}

inputLrc();

function setPosition() {
    var index = getLrcIndex();
    if (index == -1) {
        return;
    }
    var lrc_li_height = 35, lrc_ul_height = 450;
    var top = index * lrc_li_height + lrc_li_height / 2 - lrc_ul_height / 2;
    if (top < 0) {
        top = 0;
    }
    $("ullrc").style.marginTop = -top + "px";
    var activeLi = $("ullrc").querySelector(".active");
    if(activeLi){
        activeLi.classList.remove("active");
    }
    $("ullrc").children[index].classList.add("active");
}

var turn = 0;

function getLrcIndex(){
    var time = $("MusicPlayer").currentTime + turn;
    for (var index = 0; index < lrcArray.length; index++) {
        if (lrcArray[index].seconds > time) {
            return index - 1;
        }
    }
}

$("MusicPlayer").ontimeupdate = setPosition;