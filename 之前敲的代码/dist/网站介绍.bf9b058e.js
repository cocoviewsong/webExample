"use strict";
///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// 跳转到第1部分的按钮 nav
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
// *************************************************************
// 跳转到第1部分 逻辑=> 点击按钮,触发滚动到section1父容器的事件
// Element 接口的 scrollIntoView() 方法会滚动元素的父容器
btnScrollTo.addEventListener("click", function(e) {
    const slcoords = section1.getBoundingClientRect(); //返回一个 DOMRect 对象，提供了元素的大小及其相对于视口的位置
    // console.log(slcoords);
    // console.log(e.target.getBoundingClientRect());
    // 滚动位置
    // console.log('Current scroll (X/Y)', window.pageXOffset.pageYOffset);
    //
    // window.scrollTo(   // scrollTo() 方法可以使界面滚动到给定元素的指定坐标位置。
    //   // slcoords.left + window.pageXOffset,  // 兼容性好但被提示弃用
    //   // slcoords.top + window.pageYOffset
    //   slcoords.left + window.scrollX,
    //   slcoords.top + window.scrollY
    // // );
    // window.scrollTo({
    //   left: slcoords.left + window.scrollX,
    //   top: slcoords.top + window.scrollY,
    //   // 行为属性 实现平滑
    //   behavior: 'smooth',
    // });
    // 现代方法 滚动到下一视图
    section1.scrollIntoView({
        behavior: "smooth"
    });
});
// *************************************************************
// 这里是模态框🟥
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn)=>btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
// *************************************************************
// 切换内容
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// 用事件委托
tabsContainer.addEventListener("click", function(e) {
    // e.preventDefault();
    const clicked = e.target.closest(".operations__tab");
    // console.log(clicked);
    if (!clicked) return;
    // 删除活动css
    tabs.forEach((t)=>t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c)=>c.classList.remove("operations__content--active"));
    // active tab
    clicked.classList.add("operations__tab--active");
    // 区域活动,文本框那里
    // console.log(clicked.dataset.tab);
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});
// *************************************************************
// // 平滑效果 nav
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     //
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// *************************************************************
// 导航栏跳转
// 1.公共元素 😅为什么有用——默认点击就会产生事件,然后冒泡到父元素身上,父元素触发事件
//  参见JS现代教程<浏览器事件简介> :当事件发生时，浏览器会创建一个 event 对象
// 事件委托
document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    // 匹配策略,存在某个类则加
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        // console.log(id);
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    // console.log('link');
    }
});
// *************************************************************
// 导航标签淡出效果
const nav = document.querySelector(".nav");
const handleHover = function(e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const sibling = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        sibling.forEach((el)=>{
            if (el !== link) el.style.opacity = this;
        // if (el !== link) el.style.opacity = opacity;
        });
        logo.style.opacity = this;
    // logo.style.opacity = opacity;
    }
};
// nav.addEventListener('mouseover',function( e) { handleHover(e, 0.5))};
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// *************************************************************
// 粘性导航
// const initalCoords = section1.getBoundingClientRect();
// // console.log(initalCoords);
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY);
//   if (this.window.screenY > initalCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// IntersectionObserver api方法 减轻性能压力 😅 可能的叫法：交叉观察器
// 🟥说明参见： https://ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
// const header = document.querySelector('.header');
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     // console.log(entry); //看参数 isIntersecting
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0, // 可见区域的交叉比例
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(header);
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickNav = function(entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header); //  observe()	开始监听选中的目标元素
// *************************************************************
// 移动到特定视口显示内容
const allSections = document.querySelectorAll(".section");
const revealSection = function(entries, observe) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observe.unobserve(entry.target); //移除观察
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
allSections.forEach(function(section) {
    sectionObserver.observe(section); //这里才开始执行
// section.classList.add('section--hidden');
});
// *************************************************************
// 懒惰加载图像
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);
const loadImg = function(entries, observer) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;
    // 替换src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target); //移除观察
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: `200px`
});
imgTargets.forEach((img)=>imgObserver.observe(img));
// *************************************************************
// 内容滑块 类似轮播
const slider = function() {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    // 下面的点
    const dotContainer = document.querySelector(".dots");
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    // createDots();
    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach((dot)=>dot.classList.remove("dots__dot--active"));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    };
    // activateDot(0); //开始时候0亮
    let curSlide = 0;
    const maxSlide = slides.length;
    const goToSlide = function(slide) {
        slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
    };
    // goToSlide(0); //开始时划到0
    // 函数调用  初始化
    const init = function() {
        createDots();
        goToSlide(0);
        activateDot(0);
    };
    init();
    // const slider = document.querySelector('.slider');
    // slider.style.transform = 'scale(0.2) translateX(-1200px)';
    // slider.style.overflow = 'visible';
    // 下一张幻灯片
    const nextSlide = function() {
        if (curSlide === maxSlide - 1) curSlide = 0;
        else curSlide++;
        goToSlide(curSlide);
        activateDot(curSlide); //激活点
    };
    const prevSlide = function() {
        if (curSlide === 0) curSlide = maxSlide - 1;
        else curSlide--;
        goToSlide(curSlide);
        activateDot(curSlide); //激活点
    };
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    //键盘事件
    document.addEventListener("keydown", function(e) {
        // console.log(e);
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    });
    // 点的处理 事件委托
    dotContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider(); // *************************************************************
 /* // 练习😅 start  ——sekectubg ekenebts
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// creating  and  inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improver functionlity and analytics.<button class="btn btn-close-cookie">Got it!</buttom>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// delete elements   remove()方法
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// style css  是内联样式
message.style.backgroundColor = '#37384d';
message.style.width = '120%';

console.log(message.style.height); //只能获取内联的值
console.log(message.style.backgroundColor);

// 获取某个元素的所有样式，再选取高度
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// css操控 传入属性名和值
document.documentElement.style.setProperty('--color-primary', 'orangered');

// 属性 __默认只能读取标准属性
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
// 非标准属性可以用下面这种方式获取  获取字母上的属性
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Banklist');

// getAttribute('') 获取字母上的属性
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data 属性
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// 不要用这个,会覆盖所有的类
logo.className = 'Jonas'; */  // // 现代的添加事件
 // const consoleH1 = function (e) {
 //   console.log('事件被触发,你正在悬浮在标题上:D'); //每次悬浮到这个位置都会打印一次
 //   h1.removeEventListener('mouseenter', consoleH1); //移除事件
 // };
 // const h1 = document.querySelector('h1');
 // h1.addEventListener('mouseenter', consoleH1);
 // 事件监听 直接添加到了属性上,old "旧代码用这个"
 // h1.onmouseenter = consoleH1;
 // 事件冒泡 最开始的事件,产生的event在树的顶端, 捕获的时候才下来到目标元素
 // 回调函数发生在目标阶段,就是在等捕获阶段的到达
 // 达到目标后,开始冒泡——冒泡阶段,只通过父元素,不包括兄弟元素
 // // rgb随机
 // const randomInt = (min, max) =>
 //   Math.floor(Math.random() * (max - min + 1) + min);
 // const randomColor = () =>
 //   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
 // // 父元素所加的,无论啥类型的事件都会触发
 // // 事情监听器作用于😅'冒泡'阶段  想监听捕获阶段加第三个参数(true/false) 如果true则光监听捕获阶段
 // document.querySelector('.nav__link').addEventListener(
 //   'click',
 //   function (e) {
 //     // e.preventDefault();
 //     this.style.backgroundColor = randomColor();
 //     // e.target指向事件发生的位置 返回DOM  currentTarget 没查MDN ===this
 //     console.log('事情的源头是:', e.target);
 //     // stop 冒泡
 //     e.stopPropagation();
 //   },
 //   true
 // );
 // document.querySelector('.nav__links').addEventListener('click', function (e) {
 //   this.style.backgroundColor = randomColor();
 //   console.log('事情的源头是:', e.target);
 // });
 // document.querySelector('.nav').addEventListener('click', function (e) {
 //   this.style.backgroundColor = randomColor();
 //   console.log('事情的源头是:', e.target);
 // });
 /* 
// 遍历dom tree
const h1 = document.querySelector('h1');

// 向下:child  node节点
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstChild);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 向上,选择父母
console.log(h1.parentNode);
console.log(h1.parentElement);

// 最近查找 选择距离最短的那个
// h1.closest('.header').style.background = 'var( --gradient-secondary)';
h1.closest('h1').style.background = 'var( --gradient-secondary)';

// 兄弟节点
console.log(h1.previousElementSibling); //节点之前的节点
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (mov) {}); */  // document.addEventListener('DOMContentLoaded', function (e) {
 //   console.log('加载完成', e);
 // });
 // window.addEventListener('load', function (e) {
 //   console.log('加载', e);
 // });
 // 是否离开网站
 // window.addEventListener('beforeunload', function (e) {
 //   e.preventDefault();
 //   console.log('?', e);
 //   e.returnValue = '';
 // });

//# sourceMappingURL=网站介绍.bf9b058e.js.map
