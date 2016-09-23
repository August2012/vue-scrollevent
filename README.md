# 滚动条事件
采用window监听onscroll操作

## 如何使用

### 安装
```
npm install vue-scrollevent
```

### 在vue中引用
```js
import vue from 'vue';
import vue-scrollevent from 'vue-scrollevent';
vue.use(vue-scrollevent);
```

### 在页面中使用
```js
vue.scroll.push({
    fn (e) {
        console.log('执行函数');
        console.log(JSON.stringify(e));
    },
    position:'bottom'
    // 支持类型数字为滚动条距离,字符为top bottom left right move,对应滚动条到哪个底部位置触发
});
```

### api操作