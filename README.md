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
        export default {
            data () {
              return {
                scrolldata: 'no'
              }
            },
            components: {
              Hello
            },
            created () {
              console.log(this)
              console.log('$scroll' in this)
              // 装载测试函数
              // move测试
              this.$scroll.push({
                fn (_height) {
                  console.log('move' + _height)
                },
                position: 'move'
              });
              // 到顶测试
              this.$scroll.push({
                fn () {
                  console.log('go to top')
                },
                position: 'top'
              });
              // 到底测试
              // bottom可能需要进行锁定
              this.$scroll.push({
                fn () {
                  console.log('go to bottom')
                },
                position: 'bottom'
              });
            }
          }
```