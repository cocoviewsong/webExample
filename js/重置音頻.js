const mediaElem = document.getElementById("yinyue");
mediaElem.load();


//音轨增删事件
//你可以监控媒体元素中的音频轨道，当音轨被添加或删除时，你可以通过监听相关事件来侦测到。
//具体来说，通过监听 AudioTrackList (en-US) 
//对象的 addtrack 事件（即 HTMLMediaElement.audioTracks 对象），你可以及时对音轨的增加做出响应。
const mediaElem = document.querySelector("video");
mediaElem.audioTracks.onaddtrack = function (event) {
  audioTrackAdded(event.track);
};
